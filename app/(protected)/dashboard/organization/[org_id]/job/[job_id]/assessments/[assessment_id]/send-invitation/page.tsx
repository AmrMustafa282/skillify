"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import * as XLSX from "xlsx";
import {
  Upload,
  FileText,
  Users,
  CheckCircle,
  AlertCircle,
  X,
  Download,
  Mail,
  FileSpreadsheet,
  ArrowLeft,
  Loader2,
  Send,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { API_URL } from "@/config";
import toast from "react-hot-toast";

interface UploadedFile {
  file: File;
  id: string;
  status: "pending" | "parsing" | "parsed" | "sending" | "success" | "error";
  progress: number;
  error?: string;
  emails?: string[];
  validEmails?: string[];
  invalidEmails?: string[];
  preview?: string[];
}

interface TestAssignment {
  id: string;
  testId: string;
  candidateEmail: string;
  status: "PENDING" | "SENT" | "COMPLETED" | "EXPIRED";
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

interface ApiResponse<T> {
  status: string;
  success: boolean;
  data: T;
  timestamp: string;
}

interface InvitationResult {
  total_emails: number;
  valid_emails: number;
  invalid_emails: number;
  sent_invitations: number;
  failed_invitations: number;
  assignments: TestAssignment[];
}

const InvitationsPage = () => {
  const params = useParams();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // const orgId = params.org_id as string;
  const jobId = params.job_id as string;
  const assessmentId = params.assessment_id as string;
  const assessment_id = params.assessment_id as string;

  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadResults, setUploadResults] = useState<InvitationResult[]>([]);
  const [testAssignments, setTestAssignments] = useState<TestAssignment[]>([]);

  const acceptedExtensions = [".csv", ".xls", ".xlsx"];

  const isValidFileType = (file: File): boolean => {
    const extension = file.name.toLowerCase().substring(file.name.lastIndexOf("."));
    return acceptedExtensions.includes(extension);
  };

  const generateId = (): string => {
    return Math.random().toString(36).substr(2, 9);
  };

  // Email validation function
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  // Extract emails from file
  const extractEmailsFromFile = async (file: File): Promise<string[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const data = e.target?.result;
          let workbook: XLSX.WorkBook;

          if (file.name.endsWith(".csv")) {
            workbook = XLSX.read(data, { type: "binary" });
          } else {
            workbook = XLSX.read(data, { type: "array" });
          }

          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

          if (jsonData.length === 0) {
            reject(new Error("File is empty"));
            return;
          }

          // Find email column
          const headers = jsonData[0] as string[];
          const emailColumnIndex = headers.findIndex(
            (header) => header && header.toLowerCase().includes("email")
          );

          if (emailColumnIndex === -1) {
            reject(
              new Error(
                'No email column found. Please ensure your file has a column containing "email" in the header.'
              )
            );
            return;
          }

          // Extract emails
          const emails: string[] = [];
          for (let i = 1; i < jsonData.length; i++) {
            const row = jsonData[i] as string[];
            const email = row[emailColumnIndex];
            if (email && typeof email === "string" && email.trim()) {
              emails.push(email.trim());
            }
          }

          resolve(emails);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = () => reject(new Error("Failed to read file"));

      if (file.name.endsWith(".csv")) {
        reader.readAsBinaryString(file);
      } else {
        reader.readAsArrayBuffer(file);
      }
    });
  };

  const handleFileSelect = useCallback((selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles: UploadedFile[] = [];

    Array.from(selectedFiles).forEach((file) => {
      if (isValidFileType(file)) {
        newFiles.push({
          file,
          id: generateId(),
          status: "pending",
          progress: 0,
        });
      }
    });

    setFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      handleFileSelect(e.dataTransfer.files);
    },
    [handleFileSelect]
  );

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  // Process files and extract emails
  const processFiles = async () => {
    if (files.length === 0) return;

    setIsProcessing(true);

    for (const fileData of files) {
      if (fileData.status !== "pending") continue;

      try {
        // Update status to parsing
        setFiles((prev) =>
          prev.map((f) => (f.id === fileData.id ? { ...f, status: "parsing", progress: 25 } : f))
        );

        // Extract emails from file
        const extractedEmails = await extractEmailsFromFile(fileData.file);

        // Validate emails
        const validEmails: string[] = [];
        const invalidEmails: string[] = [];

        extractedEmails.forEach((email) => {
          if (isValidEmail(email)) {
            validEmails.push(email);
          } else {
            invalidEmails.push(email);
          }
        });

        // Remove duplicates
        const uniqueValidEmails = [...new Set(validEmails)];
        const uniqueInvalidEmails = [...new Set(invalidEmails)];

        // Update file status to parsed
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileData.id
              ? {
                  ...f,
                  status: "parsed",
                  progress: 50,
                  emails: extractedEmails,
                  validEmails: uniqueValidEmails,
                  invalidEmails: uniqueInvalidEmails,
                  preview: uniqueValidEmails.slice(0, 5), // Show first 5 emails as preview
                }
              : f
          )
        );
      } catch (error: any) {
        console.error("File processing error:", error);
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileData.id
              ? {
                  ...f,
                  status: "error",
                  error: error.message || "Failed to process file",
                }
              : f
          )
        );
      }
    }

    setIsProcessing(false);
  };

  // Send invitations using test-assignments API
  const sendInvitations = async () => {
    const parsedFiles = files.filter(
      (f) => f.status === "parsed" && f.validEmails && f.validEmails.length > 0
    );

    if (parsedFiles.length === 0) return;

    setIsProcessing(true);
    const results: InvitationResult[] = [];

    for (const fileData of parsedFiles) {
      try {
        // Update status to sending
        setFiles((prev) =>
          prev.map((f) => (f.id === fileData.id ? { ...f, status: "sending", progress: 75 } : f))
        );

        const assignments: TestAssignment[] = [];
        let sentCount = 0;
        let failedCount = 0;
        try {
          const response = await axios.post(
            `http://localhost:8080/api/test-assignments`,
            {
              testId: assessmentId,
              assignments: fileData?.validEmails?.map((email) => ({ email })),
            },
            {
              withCredentials: true,
            }
          );

          if (response.data.success && response.data.data) {
            assignments.push(response.data.data);
            sentCount = response.data.data.length;
          }
        } catch (error) {
          failedCount++;
        }

        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileData.id
              ? {
                  ...f,
                  status: "success",
                  progress: 100,
                }
              : f
          )
        );

        const result: InvitationResult = {
          total_emails: fileData.emails?.length || 0,
          valid_emails: fileData.validEmails?.length || 0,
          invalid_emails: fileData.invalidEmails?.length || 0,
          sent_invitations: sentCount,
          failed_invitations: failedCount,
          assignments,
        };

        results.push(result);
      } catch (error: any) {
        console.error("Invitation sending error:", error);
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileData.id
              ? {
                  ...f,
                  status: "error",
                  error: error.response?.data?.message || "Failed to send invitations",
                }
              : f
          )
        );
      }
    }

    setUploadResults(results);
    setIsProcessing(false);
  };

  // Load existing test assignments
  useEffect(() => {
    const loadTestAssignments = async () => {
      try {
        const response = await axios.get<ApiResponse<TestAssignment[]>>(
          `http://localhost:8080/api/tests/${assessmentId}/test-assignments`,
          {
            withCredentials: true,
          }
        );

        console.log("Test assignments response:", response.data);

        if (response.data.success && response.data.data) {
          setTestAssignments(response.data.data);
        }
      } catch (error) {
        console.error("Failed to load test assignments:", error);
      }
    };

    if (assessmentId) {
      loadTestAssignments();
    }
  }, [assessmentId]);

  return (
    <div className="min-h-screen">
      <div>
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-2xl font-bold ">Send Invitations</h1>
                <p className="text-sm text-gray-600">
                  Upload candidate files to send assessment invitations
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-blue-600 border-blue-200">
                <Users className="h-3 w-3 mr-1" />
                Bulk Upload
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  File Requirements
                </CardTitle>
                <CardDescription>
                  Please ensure your file meets the following requirements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">CSV, XLS, or XLSX format</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Must contain an "email" column</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Maximum file size: 10MB</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Valid email addresses only</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Up to 1000 emails per file</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Download className="h-4 w-4 text-blue-600" />
                      <button className="text-sm text-blue-600 hover:underline">
                        Download sample template
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="h-5 w-5 mr-2 text-blue-600" />
                  Upload Files
                </CardTitle>
                <CardDescription>Drag and drop your files here or click to browse</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
                    isDragOver
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".csv,.xls,.xlsx"
                    onChange={(e) => handleFileSelect(e.target.files)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />

                  <div className="space-y-4">
                    <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <Upload className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-gray-900">
                        Drop your files here, or{" "}
                        <button
                          type="button"
                          className="text-blue-600 hover:text-blue-700 underline"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          browse
                        </button>
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Supports CSV, XLS, XLSX files up to 10MB
                      </p>
                    </div>
                  </div>
                </div>

                {files.length > 0 && (
                  <div className="mt-6 space-y-3">
                    <h4 className="font-medium text-gray-900">Selected Files</h4>
                    <AnimatePresence>
                      {files.map((fileData) => (
                        <motion.div
                          key={fileData.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="flex-shrink-0">
                                {fileData.file.name.endsWith(".csv") ? (
                                  <FileText className="h-8 w-8 text-green-600" />
                                ) : (
                                  <FileSpreadsheet className="h-8 w-8 text-blue-600" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {fileData.file.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {(fileData.file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2">
                              {fileData.status === "pending" && (
                                <Badge variant="secondary">Pending</Badge>
                              )}
                              {fileData.status === "parsing" && (
                                <Badge variant="secondary">
                                  <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                                  Parsing
                                </Badge>
                              )}
                              {fileData.status === "parsed" && (
                                <Badge variant="outline" className="border-blue-500 text-blue-700">
                                  <Eye className="h-3 w-3 mr-1" />
                                  Parsed
                                </Badge>
                              )}
                              {fileData.status === "sending" && (
                                <Badge variant="secondary">
                                  <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                                  Sending
                                </Badge>
                              )}
                              {fileData.status === "success" && (
                                <Badge variant="default" className="bg-green-600">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Success
                                </Badge>
                              )}
                              {fileData.status === "error" && (
                                <Badge variant="destructive">
                                  <AlertCircle className="h-3 w-3 mr-1" />
                                  Error
                                </Badge>
                              )}

                              {!["parsing", "sending"].includes(fileData.status) && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFile(fileData.id)}
                                  className="h-8 w-8 p-0"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </div>

                          {["parsing", "sending"].includes(fileData.status) && (
                            <div className="mt-3">
                              <Progress value={fileData.progress} className="h-2" />
                              <p className="text-xs text-gray-500 mt-1">
                                {fileData.progress}%{" "}
                                {fileData.status === "parsing" ? "parsed" : "sent"}
                              </p>
                            </div>
                          )}

                          {fileData.status === "parsed" && (
                            <div className="mt-3">
                              <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                                <div className="text-center">
                                  <div className="font-medium text-gray-900">
                                    {fileData.emails?.length || 0}
                                  </div>
                                  <div className="text-gray-500">Total Emails</div>
                                </div>
                                <div className="text-center">
                                  <div className="font-medium text-green-600">
                                    {fileData.validEmails?.length || 0}
                                  </div>
                                  <div className="text-gray-500">Valid</div>
                                </div>
                                <div className="text-center">
                                  <div className="font-medium text-red-600">
                                    {fileData.invalidEmails?.length || 0}
                                  </div>
                                  <div className="text-gray-500">Invalid</div>
                                </div>
                              </div>

                              {fileData.preview && fileData.preview.length > 0 && (
                                <div className="bg-blue-50 border border-blue-200 rounded p-3">
                                  <p className="text-xs font-medium text-blue-800 mb-2">
                                    Email Preview:
                                  </p>
                                  <div className="space-y-1">
                                    {fileData.preview.map((email, index) => (
                                      <p key={index} className="text-xs text-blue-700">
                                        {email}
                                      </p>
                                    ))}
                                    {fileData.validEmails && fileData.validEmails.length > 5 && (
                                      <p className="text-xs text-blue-600">
                                        +{fileData.validEmails.length - 5} more emails...
                                      </p>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          {fileData.status === "success" && (
                            <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
                              <div className="text-center">
                                <div className="font-medium text-gray-900">
                                  {fileData.emails?.length || 0}
                                </div>
                                <div className="text-gray-500">Total Emails</div>
                              </div>
                              <div className="text-center">
                                <div className="font-medium text-green-600">
                                  {fileData.validEmails?.length || 0}
                                </div>
                                <div className="text-gray-500">Valid</div>
                              </div>
                              <div className="text-center">
                                <div className="font-medium text-blue-600">Sent Successfully</div>
                                <div className="text-gray-500">Status</div>
                              </div>
                            </div>
                          )}

                          {fileData.status === "error" && fileData.error && (
                            <div className="mt-3">
                              <Alert>
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{fileData.error}</AlertDescription>
                              </Alert>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}

                {files.length > 0 && (
                  <div className="mt-6 flex justify-end space-x-3">
                    {files.some((f) => f.status === "pending") && (
                      <Button onClick={processFiles} disabled={isProcessing} variant="outline">
                        {isProcessing ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <FileText className="h-4 w-4 mr-2" />
                            Process Files
                          </>
                        )}
                      </Button>
                    )}

                    {files.some((f) => f.status === "parsed") && (
                      <Button
                        onClick={sendInvitations}
                        disabled={isProcessing}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Send Invitations
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-blue-600" />
                  Upload Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                {uploadResults.length > 0 ? (
                  <div className="space-y-4">
                    {uploadResults.map((result, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <div className="font-medium text-gray-900">{result.total_emails}</div>
                            <div className="text-gray-500">Total Emails</div>
                          </div>
                          <div>
                            <div className="font-medium text-green-600">{result.valid_emails}</div>
                            <div className="text-gray-500">Valid</div>
                          </div>
                          <div>
                            <div className="font-medium text-blue-600">
                              {result.sent_invitations}
                            </div>
                            <div className="text-gray-500">Sent</div>
                          </div>
                          <div>
                            <div className="font-medium text-red-600">
                              {result.failed_invitations}
                            </div>
                            <div className="text-gray-500">Failed</div>
                          </div>
                        </div>
                        {result.assignments && result.assignments.length > 0 && (
                          <div className="mt-3 text-xs text-gray-500">
                            {result.assignments.length} test assignments created
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500">No uploads yet</p>
                    <p className="text-sm text-gray-400">Upload files to see summary</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tips for Success</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Clean your data</p>
                      <p className="text-gray-600">
                        Remove duplicates and invalid emails before uploading
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Use proper headers</p>
                      <p className="text-gray-600">
                        Ensure your email column is clearly labeled as "email"
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Test with small batches</p>
                      <p className="text-gray-600">
                        Start with a small file to verify the format works
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Monitor results</p>
                      <p className="text-gray-600">
                        Check the summary to see successful and failed invitations
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {files.filter((f) => f.status === "success").length > 0 ? (
                    files
                      .filter((f) => f.status === "success")
                      .slice(0, 3)
                      .map((file) => (
                        <div key={file.id} className="flex items-center space-x-3 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <div className="flex-1">
                            <p className="font-medium truncate">{file.file.name}</p>
                            <p className="text-gray-500">
                              {file.validEmails?.length || 0} emails processed
                            </p>
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="text-center py-4">
                      <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500 text-sm">No recent activity</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Test Assignments Table */}
        {testAssignments.length > 0 && (
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Test Assignments</span>
                  <Badge variant="outline">{testAssignments.length} assignments</Badge>
                </CardTitle>
                <CardDescription>Manage existing test assignments for this job</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Candidate Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created At</TableHead>
                      <TableHead>Updated At</TableHead>
                      <TableHead>Created By</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {testAssignments.slice(0, 10).map((assignment) => (
                      <TableRow key={assignment.id}>
                        <TableCell className="font-medium">{assignment.candidateEmail}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              assignment.status === "COMPLETED"
                                ? "default"
                                : assignment.status === "EXPIRED"
                                  ? "destructive"
                                  : assignment.status === "SENT"
                                    ? "secondary"
                                    : "outline"
                            }
                            className={
                              assignment.status === "COMPLETED"
                                ? "bg-green-600"
                                : assignment.status === "EXPIRED"
                                  ? "bg-red-600"
                                  : assignment.status === "SENT"
                                    ? "bg-blue-600"
                                    : "bg-gray-600"
                            }
                          >
                            {assignment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(assignment.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(assignment.updatedAt).toLocaleDateString()}</TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {assignment.createdBy}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {testAssignments.length > 10 && (
                  <div className="mt-4 text-center">
                    <Button variant="outline" size="sm">
                      View All {testAssignments.length} Assignments
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvitationsPage;
