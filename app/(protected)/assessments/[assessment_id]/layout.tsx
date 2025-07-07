"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { API_URL, PY_URL } from "@/config";

// Assessment status types
type AssessmentStatus = "not_started" | "in_progress" | "completed" | "expired";

interface AssessmentStatusResponse {
  status: AssessmentStatus;
  solution_id?: string;
  started_at?: string;
  expired_at?: string;
  time_remaining?: number;
  answers?: Array<{ question_id: string; value: string }>;
  coding_answers?: Array<{ question_id: string; code: string; status: string }>;
  current_question_index?: number;
  message?: string;
}

interface AssessmentLayoutProps {
  children: React.ReactNode;
}

export default function AssessmentLayout({ children }: AssessmentLayoutProps) {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const assessmentId = params.assessment_id as string;

  const [statusLoading, setStatusLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [assessmentStatus, setAssessmentStatus] = useState<AssessmentStatus>("not_started");
  const [statusData, setStatusData] = useState<AssessmentStatusResponse | null>(null);

  // Check assessment status and user permissions
  useEffect(() => {
    const checkAssessmentStatus = async () => {
      try {
        if (!session) {
          // Wait for session to load
          return;
        }

        setStatusLoading(true);

        const isAssigned = await axios.get(`${API_URL}/tests/${assessmentId}/is-assigned`, {
          withCredentials: true,
        });

        if (!isAssigned.data.data) {
          router.push('/')
          setStatusLoading(false);
          return;
        }

        // Check assessment status
        const statusResponse = await axios.get(
          `${PY_URL}/assessments/${assessmentId}/status?candidate_id=${session?.user?.email}`
        );

        console.log("Assessment status:", statusResponse.data);

        const statusData: AssessmentStatusResponse = statusResponse.data;
        setStatusData(statusData);
        setAssessmentStatus(statusData.status);
        setError(null);
      } catch (err: any) {
        console.error("Failed to check assessment status:", err);

        // Handle specific API errors
        if (err.response?.status === 404) {
          setError("Assessment not found. Please check the URL and try again.");
        } else if (err.response?.status === 403) {
          setError(
            "You don't have permission to access this assessment. Please contact your administrator."
          );
        } else if (err.response?.status === 410) {
          setError("This assessment has expired and is no longer available.");
          setAssessmentStatus("expired");
        } else if (err.response?.data?.message) {
          setError(err.response.data.message);
          if (err.response.data.status) {
            setAssessmentStatus(err.response.data.status);
          }
        } else if (err.code === "NETWORK_ERROR" || !err.response) {
          setError("Network error. Please check your internet connection and try again.");
        } else {
          setError("Failed to load assessment. Please try again later.");
        }
      } finally {
        setStatusLoading(false);
      }
    };

    checkAssessmentStatus();
  }, [assessmentId, session]);

  // Loading state while checking status
  if (statusLoading || !session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Checking Assessment Status</h3>
            <p className="text-sm text-gray-600 text-center">
              Please wait while we verify your access to this assessment...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show completion screen for completed and expired assessments
  if (assessmentStatus === "completed" || assessmentStatus === "expired") {
    const isExpired = assessmentStatus === "expired";

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="w-full max-w-2xl">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {isExpired ? "Assessment Completed" : "Thank You!"}
                </h3>
                <div className="space-y-4 mb-8">
                  <p className="text-lg text-gray-600">
                    {isExpired
                      ? "We have received your response. Your assessment has been submitted successfully."
                      : "We have received your response. Thank you for completing the assessment!"}
                  </p>

                  {statusData && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="text-sm text-blue-800">
                        <div className="font-medium mb-2">Assessment Details:</div>
                        {statusData.started_at && (
                          <div>Started: {new Date(statusData.started_at).toLocaleString()}</div>
                        )}
                        {statusData.expired_at && isExpired && (
                          <div>Completed: {new Date(statusData.expired_at).toLocaleString()}</div>
                        )}
                        {statusData.solution_id && (
                          <div className="mt-2 text-xs text-blue-600">
                            Reference ID: {statusData.solution_id}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    onClick={() => router.push("/dashboard")}
                    className="bg-blue-600 hover:bg-blue-700"
                    size="lg"
                  >
                    Return to Dashboard
                  </Button>
                  <Button onClick={() => router.back()} variant="outline" size="lg">
                    Go Back
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Show error screen for access issues
  if (error) {
    const isNetworkError = error?.includes("Network error") || error?.includes("connection");

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardContent className="flex flex-col items-center justify-center py-8">
            {isNetworkError ? (
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 mb-6">
                  <AlertCircle className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Connection Problem</h3>
                <p className="text-gray-600 mb-6">{error}</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    onClick={() => window.location.reload()}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Try Again
                  </Button>
                  <Button onClick={() => router.back()} variant="outline">
                    Go Back
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
                  <AlertCircle className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Unable to Access Assessment
                </h3>
                <p className="text-gray-600 mb-6">{error}</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={() => window.location.reload()} variant="outline">
                    Retry
                  </Button>
                  <Button onClick={() => router.back()} variant="outline">
                    Go Back
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return <div className="assessment-layout">{children}</div>;
}
