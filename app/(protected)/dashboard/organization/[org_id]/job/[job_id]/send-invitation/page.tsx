"use client";

import React, { useState, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
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
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { API_URL } from "@/config";

interface UploadedFile {
  file: File;
  id: string;
  status: "pending" | "uploading" | "processing" | "success" | "error";
  progress: number;
  error?: string;
  emailCount?: number;
  validEmails?: number;
  invalidEmails?: number;
  preview?: string[];
}

interface InvitationResult {
  total_emails: number;
  valid_emails: number;
  invalid_emails: number;
  sent_invitations: number;
  failed_invitations: number;
  job_id: string;
  upload_id: string;
}

const InvitationsPage = () => {
  const params = useParams();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const orgId = params.org_id as string;
  const jobId = params.job_id as string;

  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResults, setUploadResults] = useState<InvitationResult[]>([]);

  const acceptedExtensions = [".csv", ".xls", ".xlsx"];

  const isValidFileType = (file: File): boolean => {
    const extension = file.name.toLowerCase().substring(file.name.lastIndexOf("."));
    return acceptedExtensions.includes(extension);
  };

  const generateId = (): string => {
    return Math.random().toString(36).substr(2, 9);
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

  const uploadFiles = async () => {
    if (files.length === 0) return;

    setIsUploading(true);
    const results: InvitationResult[] = [];

    for (const fileData of files) {
      if (fileData.status !== "pending") continue;

      try {
        setFiles((prev) =>
          prev.map((f) => (f.id === fileData.id ? { ...f, status: "uploading", progress: 0 } : f))
        );
        const formData = new FormData();
        formData.append("file", fileData.file);
        formData.append("job_id", jobId);
        formData.append("org_id", orgId);

        const response = await axios.post(`${API_URL}/test-assignments`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const progress = progressEvent.total
              ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
              : 0;

            setFiles((prev) => prev.map((f) => (f.id === fileData.id ? { ...f, progress } : f)));
          },
        });
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileData.id
              ? {
                  ...f,
                  status: "success",
                  progress: 100,
                  emailCount: response.data.total_emails,
                  validEmails: response.data.valid_emails,
                  invalidEmails: response.data.invalid_emails,
                }
              : f
          )
        );

        results.push(response.data);
      } catch (error: any) {
        console.error("Upload error:", error);
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileData.id
              ? {
                  ...f,
                  status: "error",
                  error: error.response?.data?.message || "Upload failed",
                }
              : f
          )
        );
      }
    }

    setUploadResults(results);
    setIsUploading(false);
  };

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
                              {fileData.status === "uploading" && (
                                <Badge variant="secondary">
                                  <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                                  Uploading
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

                              {fileData.status !== "uploading" && (
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

                          {fileData.status === "uploading" && (
                            <div className="mt-3">
                              <Progress value={fileData.progress} className="h-2" />
                              <p className="text-xs text-gray-500 mt-1">
                                {fileData.progress}% uploaded
                              </p>
                            </div>
                          )}

                          {fileData.status === "success" && (
                            <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
                              <div className="text-center">
                                <div className="font-medium text-gray-900">
                                  {fileData.emailCount}
                                </div>
                                <div className="text-gray-500">Total Emails</div>
                              </div>
                              <div className="text-center">
                                <div className="font-medium text-green-600">
                                  {fileData.validEmails}
                                </div>
                                <div className="text-gray-500">Valid</div>
                              </div>
                              <div className="text-center">
                                <div className="font-medium text-red-600">
                                  {fileData.invalidEmails}
                                </div>
                                <div className="text-gray-500">Invalid</div>
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
                  <div className="mt-6 flex justify-end">
                    <Button
                      onClick={uploadFiles}
                      disabled={isUploading || files.every((f) => f.status !== "pending")}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {isUploading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Invitations
                        </>
                      )}
                    </Button>
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
                        {result.upload_id && (
                          <div className="mt-3 text-xs text-gray-500">
                            Upload ID: {result.upload_id}
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
                            <p className="text-gray-500">{file.validEmails} emails processed</p>
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
      </div>
    </div>
  );
};

export default InvitationsPage;
