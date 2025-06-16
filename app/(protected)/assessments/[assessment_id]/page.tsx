"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Clock,
  Code,
  CheckCircle,
  AlertCircle,
  Play,
  ArrowRight,
  ArrowLeft,
  FileText,
  Timer,
  Loader2,
} from "lucide-react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { PY_URL } from "@/config";

// Types
interface Question {
  order: string;
  type: "MCQ" | "OPEN_ENDED";
  question: string;
  options?: Array<{
    id: string;
    text: string;
  }>;
  timeLimit?: number;
}

interface CodingQuestion {
  order: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  language: string;
  timeLimit: number;
  testCases: Array<{
    input: string;
    expectedOutput: string;
  }>;
}

interface Assessment {
  id: string;
  title: string;
  description: string;
  timeLimit: number;
  questions: Question[];
  codingQuestions: CodingQuestion[];
}

// API response types based on your actual response
interface ApiAssessment {
  _id: string;
  testId: string;
  title: string;
  description: string;
  duration: number;
  questions: Array<{
    order: number;
    text: string;
    type: "MCQ" | "OPEN_ENDED";
    options?: {
      choices: Array<{
        id: string;
        text: string;
      }>;
    };
    correctAnswer?: {
      value: string;
    };
    difficulty?: string;
  }>;
  codingQuestions: Array<{
    order: number;
    title: string;
    text: string;
    language: string;
    starterCode: string;
    solutionCode: string;
    testCases: Array<{
      input: string;
      expected_output: string;
      weight: number;
    }>;
    evaluationCriteria: {
      timeComplexity: string;
      spaceComplexity: string;
      constraints: string[];
    };
    gradingRules: {
      testCaseWeight: number;
      codeQualityWeight: number;
      efficiencyWeight: number;
      partialCredit: boolean;
    };
    metadata: {
      difficulty: string;
      estimatedDuration: number;
      tags: string[];
    };
  }>;
  createdAt: string;
  updatedAt: string;
}

// Transform API response to match our component types
const transformAssessment = (apiAssessment: ApiAssessment): Assessment => {
  return {
    id: apiAssessment.testId || apiAssessment._id,
    title: apiAssessment.title,
    description: apiAssessment.description,
    timeLimit: apiAssessment.duration,
    questions: apiAssessment.questions.map((q) => ({
      id: q.order.toString(),
      order: q.order.toString(),
      type: q.type,
      question: q.text,
      options: q.options?.choices.map((choice) => ({
        id: choice.id,
        text: choice.text,
      })),
      timeLimit: undefined, // Not provided in API response
    })),
    codingQuestions: apiAssessment.codingQuestions.map((cq) => ({
      id: cq.order.toString(),
      order: cq.order.toString(),
      title: cq.title,
      description: cq.text,
      difficulty: cq.metadata.difficulty as "Easy" | "Medium" | "Hard",
      language: cq.language,
      timeLimit: cq.metadata.estimatedDuration,
      testCases: cq.testCases.map((tc) => ({
        input: tc.input,
        expectedOutput: tc.expected_output,
      })),
    })),
  };
};

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

const AssessmentPage = () => {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const assessmentId = params.assessment_id as string;

  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusLoading, setStatusLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [assessmentStatus, setAssessmentStatus] = useState<AssessmentStatus>("not_started");
  const [statusData, setStatusData] = useState<AssessmentStatusResponse | null>(null);
  const [solutionId, setSolutionId] = useState<string | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [codingAnswers, setCodingAnswers] = useState<Record<string, any>>({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [autoSaving, setAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Fetch assessment data and status from API
  useEffect(() => {
    const initializeAssessment = async () => {
      try {
        if (!session) return;
        setLoading(true);
        setStatusLoading(true);

        // First, check assessment status to determine if we should even load the assessment
        const statusResponse = await axios.get(
          `${PY_URL}/assessments/${assessmentId}/status?candidate_id=${session?.user?.email}`
        );
        console.log("Assessment status:", statusResponse.data);
        const statusData: AssessmentStatusResponse = statusResponse.data;

        setStatusData(statusData);
        setAssessmentStatus(statusData.status);
        setStatusLoading(false);

        // Handle completed and expired status - show thank you message
        if (statusData.status === "completed" || statusData.status === "expired") {
          // Store status data for thank you message
          if (statusData.solution_id) {
            setSolutionId(statusData.solution_id);
          }

          setLoading(false);
          return; // Don't proceed with loading assessment data
        }

        // Now load assessment data for non-expired, non-completed assessments
        const assessmentResponse = await axios.get(`${PY_URL}/assessments/${assessmentId}`);
        console.log("Assessment data:", assessmentResponse.data);
        const transformedAssessment = transformAssessment(assessmentResponse.data);
        setAssessment(transformedAssessment);

        // Handle remaining status scenarios (completed and expired already handled above)
        switch (statusData.status) {
          case "in_progress":
            // Assessment already started - automatically push into assessment
            setHasStarted(true);
            setSolutionId(statusData.solution_id || null);
            setTimeRemaining(statusData.time_remaining || transformedAssessment.timeLimit * 60);

            // Get full solution data to restore draft answers and current question
            try {
              const solutionResponse = await axios.get(
                `${PY_URL}/assessments/${assessmentId}/candidate/${session?.user?.email || "candidate-current"}/solution`
              );
              const solutionData = solutionResponse.data;

              // Restore draft answers if available
              if (solutionData.draft_answers) {
                const answersMap: Record<string, string> = {};
                solutionData.draft_answers.forEach((answer: any) => {
                  answersMap[answer.question_id] = answer.value;
                });
                setAnswers(answersMap);
              }

              // Restore coding answers if available
              if (solutionData.coding_answers && Array.isArray(solutionData.coding_answers)) {
                const codingAnswersMap: Record<string, any> = {};
                solutionData.coding_answers.forEach((answer: any) => {
                  codingAnswersMap[answer.question_id] = {
                    code: answer.code,
                    language: answer.language,
                    execution_time: answer.execution_time,
                    memory_usage: answer.memory_usage,
                    submitted_at: answer.submitted_at,
                    status: "submitted", // Mark as submitted to prevent re-opening
                  };
                });
                setCodingAnswers(codingAnswersMap);
              }

              // Restore current question index if available
              if (solutionData.current_question !== undefined) {
                setCurrentQuestionIndex(solutionData.current_question);
              }

              console.log(
                "Assessment state restored from solution data - automatically continuing"
              );
            } catch (solutionError) {
              console.error("Failed to restore solution data:", solutionError);
              // Continue without restored state - user can still take the assessment
            }
            break;

          case "not_started":
          default:
            // Assessment not started yet - will show start screen
            break;
        }

        setError(null);
      } catch (err: any) {
        console.error("Failed to initialize assessment:", err);

        // Handle specific API errors with detailed messages
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
          // Use the specific error message from the API
          setError(err.response.data.message);

          // Set status if provided
          if (err.response.data.status) {
            setAssessmentStatus(err.response.data.status);
          }
        } else if (err.code === "NETWORK_ERROR" || !err.response) {
          setError("Network error. Please check your internet connection and try again.");
        } else {
          setError("Failed to load assessment. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    initializeAssessment();
  }, [assessmentId, router, session]);

  // Auto-save progress every 30 seconds and heartbeat every 60 seconds
  useEffect(() => {
    if (!hasStarted || !assessment) return;

    const autoSaveInterval = setInterval(async () => {
      await saveProgress();
    }, 30000); // Save every 30 seconds

    const heartbeatInterval = setInterval(async () => {
      await sendHeartbeat();
    }, 60000); // Heartbeat every 60 seconds

    return () => {
      clearInterval(autoSaveInterval);
      clearInterval(heartbeatInterval);
    };
  }, [hasStarted, solutionId, assessment, answers, currentQuestionIndex, timeRemaining]);

  // Send heartbeat to keep session alive using your dedicated heartbeat endpoint
  const sendHeartbeat = async () => {
    if (!hasStarted) return;

    try {
      const response = await axios.post(`${PY_URL}/assessments/${assessmentId}/heartbeat`, {
        candidate_id: session?.user?.email || "candidate-current",
        timestamp: new Date().toISOString(),
      });

      console.log("Heartbeat sent successfully:", response.data);

      // Handle heartbeat response
      if (response.data.status === "expired" || response.data.should_submit) {
        const expiredMessage = response.data.message || "Assessment time has expired.";
        setError(expiredMessage);
        setAssessmentStatus("expired");
        handleAutoSubmit("time_expired");
      }
    } catch (error: any) {
      console.error("Failed to send heartbeat:", error);

      // Handle heartbeat errors based on your API responses
      if (error.response?.status === 404) {
        setError(
          "Assessment session not found. Your session may have expired. Please restart the assessment."
        );
        setHasStarted(false);
        setAssessmentStatus("not_started");
      } else if (error.response?.status === 410) {
        const expiredMessage = error.response?.data?.message || "Assessment time has expired.";
        setError(expiredMessage);
        setAssessmentStatus("expired");
        handleAutoSubmit("time_expired");
      } else if (error.response?.status === 409) {
        setError("Assessment has already been completed.");
        setAssessmentStatus("completed");
        // router.push(`/assessments/${assessmentId}/results`);
        router.refresh();
      } else if (error.code === "NETWORK_ERROR" || !error.response) {
        // Don't show error for network issues during heartbeat - just log it
        console.warn("Heartbeat failed due to network issues - will retry on next interval");
      } else {
        console.warn("Heartbeat failed with unexpected error:", error.response?.status);
      }
    }
  };

  // Auto-submit assessment using your dedicated endpoint
  const handleAutoSubmit = async (reason: string = "time_expired") => {
    try {
      const response = await axios.post(`${PY_URL}/assessments/${assessmentId}/auto-submit`, {
        candidate_id: session?.user?.email || "candidate-current",
        reason: reason,
      });

      console.log("Assessment auto-submitted:", response.data);

      // Clear saved state
      localStorage.removeItem(`assessment_${assessmentId}_state`);
      localStorage.removeItem(`assessment_${assessmentId}_solution_id`);

      // Redirect to dashboard or results
      router.push("/");
    } catch (error: any) {
      console.error("Failed to auto-submit assessment:", error);
      // Fallback to regular submit if auto-submit fails
      handleSubmitAssessment();
    }
  };

  type Submission = {
    code: string;
    language: string;
    execution_time: number;
    memory_usage: number;
    submitted_at: string;
    status: string;
  };

  type TransformedSubmission = {
    question_id: string;
    code: string;
    language: string;
    execution_time: number;
    memory_usage: number;
    submitted_at: string;
  };

  function transformSubmissions(obj: Record<string, Submission>): TransformedSubmission[] {
    return Object.entries(obj).map(([question_id, data]) => ({
      question_id,
      code: data.code,
      language: data.language,
      execution_time: data.execution_time,
      memory_usage: data.memory_usage,
      submitted_at: data.submitted_at,
    }));
  }

  // Retry mechanism for API calls
  const retryApiCall = async (apiCall: () => Promise<any>, maxRetries = 3, delay = 1000) => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await apiCall();
      } catch (error) {
        console.error(`API call attempt ${attempt} failed:`, error);
        if (attempt === maxRetries) {
          throw error;
        }
        await new Promise((resolve) => setTimeout(resolve, delay * attempt));
      }
    }
  };

  // Save progress function with retry mechanism
  const saveProgress = async () => {
    if (!hasStarted || !assessment) return;

    try {
      setAutoSaving(true);
      // Prepare draft answers in the format your API expects
      const draftAnswers = Object.entries(answers).map(([question_id, value]) => ({
        question_id,
        answer_type: assessment?.questions.find((q) => q.order === question_id)?.type || "MCQ",
        value,
      }));

      console.log("coding answers", codingAnswers);
      await retryApiCall(() =>
        axios.post(`${PY_URL}/assessments/${assessmentId}/save-progress`, {
          candidate_id: session?.user?.email || "candidate-current", // Your API expects candidate_id
          draft_answers: draftAnswers,
          current_question: currentQuestionIndex,
          progress_data: {
            time_remaining: timeRemaining,
            coding_answers: transformSubmissions(codingAnswers),
            total_questions: assessment.questions.length,
            answered_questions: Object.keys(answers).length,
            last_activity: new Date().toISOString(),
          },
        })
      );
      setLastSaved(new Date());
      console.log("Progress saved successfully");
    } catch (error: any) {
      console.error("Failed to save progress after retries:", error);

      // Handle specific error cases from your API
      if (error.response?.status === 404) {
        setError("Assessment session not found. Please restart the assessment.");
        setHasStarted(false);
      } else if (error.response?.status === 409) {
        setError("Assessment already completed.");
        router.push(`/assessments/${assessmentId}/results`);
      } else if (error.response?.status === 410) {
        setError("Assessment time has expired.");
        handleSubmitAssessment(); // Auto-submit expired assessment
      }
      // For other errors, just log but don't block the UI
    } finally {
      setAutoSaving(false);
    }
  };

  // Save progress when user navigates away or closes tab
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasStarted && !isSubmitting) {
        e.preventDefault();
        const message =
          "Are you sure you want to leave? Your progress will be saved automatically.";
        e.returnValue = message;
        saveProgress(); // Save before leaving
        return message;
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden && hasStarted) {
        saveProgress(); // Save when tab becomes hidden
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [hasStarted, isSubmitting, saveProgress]);

  // Timer effect
  useEffect(() => {
    if (!hasStarted) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleAutoSubmit("time_expired");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [hasStarted]);

  // Handle coding submission results when returning from coding dashboard
  useEffect(() => {
    const checkCodingSubmission = () => {
      const submissionResult = localStorage.getItem(`coding_submission_${assessmentId}`);
      if (submissionResult) {
        try {
          const result = JSON.parse(submissionResult);
          if (result.success && result.questionId) {
            // Mark the coding question as submitted
            setCodingAnswers((prev) => ({
              ...prev,
              [result.questionId]: {
                ...prev[result.questionId],
                status: "submitted",
                submitted_at: new Date().toISOString(),
                code: result.code,
                language: result.language,
                execution_time: result.execution_time || 0,
                memory_usage: result.memory_usage || 0,
              },
            }));

            // Clear the submission result
            localStorage.removeItem(`coding_submission_${assessmentId}`);

            // Show success message
            console.log(`Coding question ${result.questionId} submitted successfully`);
          }
        } catch (error) {
          console.error("Failed to process coding submission result:", error);
        }
      }
    };

    // Check immediately
    checkCodingSubmission();

    // Also check when the component becomes visible (user returns from coding dashboard)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkCodingSubmission();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [assessmentId]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartAssessment = async () => {
    try {
      // API call to start assessment using your exact endpoint
      const response = await axios.post(`${PY_URL}/assessments/${assessmentId}/start`, {
        candidate_id: session?.user?.email,
      });

      console.log("Assessment started:", response.data);
      setHasStarted(true);
      setAssessmentStatus("in_progress");
      setTimeRemaining(assessment?.timeLimit ? assessment.timeLimit * 60 : 90 * 60);

      // Store solution_id for state management
      const newSolutionId = response.data.solution_id;
      setSolutionId(newSolutionId);
      localStorage.setItem(`assessment_${assessmentId}_solution_id`, newSolutionId);
    } catch (error: any) {
      console.error("Failed to start assessment:", error);
      if (error.response?.status === 409) {
        // Assessment already started
        console.log("Assessment already started, continuing...");
        setHasStarted(true);
        setAssessmentStatus("in_progress");
        setTimeRemaining(assessment?.timeLimit ? assessment.timeLimit * 60 : 90 * 60);

        if (error.response.data.solution_id) {
          const existingSolutionId = error.response.data.solution_id;
          setSolutionId(existingSolutionId);
          localStorage.setItem(`assessment_${assessmentId}_solution_id`, existingSolutionId);
        }
      } else {
        // For demo purposes, still allow starting even if API fails
        setHasStarted(true);
        setTimeRemaining(assessment?.timeLimit ? assessment.timeLimit * 60 : 90 * 60);
      }
    }
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));

    // Trigger auto-save after a short delay
    setTimeout(() => {
      saveProgress();
    }, 2000);
  };

  const handleCodingQuestion = (questionId: string) => {
    // Check if this coding question has already been submitted
    const existingAnswer = codingAnswers[questionId];
    if (existingAnswer && existingAnswer.status === "submitted") {
      // Show message that question is already submitted and cannot be reopened
      setError("This coding question has already been submitted and cannot be reopened.");
      return;
    }

    // Store current assessment state before navigating
    localStorage.setItem(
      `assessment_${assessmentId}_state`,
      JSON.stringify({
        answers,
        codingAnswers,
        timeRemaining,
        currentQuestionIndex,
      })
    );

    // Navigate to coding dashboard
    router.push(`/assessments/${assessmentId}/coding/${questionId}`);
  };

  const handleSubmitAssessment = async () => {
    console.log("Submitting answers:", answers);
    setIsSubmitting(true);
    try {
      // Prepare answers in the format your API expects
      const formattedAnswers = Object.entries(answers).map(([questionId, value]) => ({
        question_id: questionId,
        answer_type: assessment?.questions.find((q) => q.order === questionId)?.type || "MCQ",
        value,
        submitted_at: new Date().toISOString(),
      }));

      console.log("Formatted answers for submission:", formattedAnswers);

      // API call to submit assessment using your exact endpoint
      const response = await axios.post(`${PY_URL}/assessments/${assessmentId}/submit/complete`, {
        candidate_id: session?.user?.email,
        answers: formattedAnswers,
      });

      console.log("Assessment submitted successfully:", response.data);

      // Clear saved state
      localStorage.removeItem(`assessment_${assessmentId}_state`);
      localStorage.removeItem(`assessment_${assessmentId}_solution_id`);

      router.push("/");
    } catch (error: any) {
      console.error("Failed to submit assessment:", error);
      if (error.response?.status === 409) {
        console.log("Assessment already completed");
      }
      // For demo purposes, still redirect even if API fails
      localStorage.removeItem(`assessment_${assessmentId}_state`);
      localStorage.removeItem(`assessment_${assessmentId}_solution_id`);
      router.push("/");
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentQuestion = assessment?.questions[currentQuestionIndex];
  const totalQuestions = assessment?.questions.length || 1;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  const answeredQuestions = Object.keys(answers).length;
  const completedCodingQuestions = Object.keys(codingAnswers).length;

  // Loading state - show loading while checking status or loading assessment
  if (loading || statusLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {statusLoading ? "Checking Assessment Status" : "Loading Assessment"}
            </h3>
            <p className="text-sm text-gray-600 text-center">
              {statusLoading
                ? "Please wait while we check your assessment status..."
                : "Please wait while we load your assessment..."}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show thank you message for completed and expired assessments
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

  // Error state for other errors
  if (error || !assessment) {
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
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Unable to Load Assessment</h3>
                <p className="text-gray-600 mb-6">
                  {error || "Assessment not found. Please check the URL and try again."}
                </p>
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

  // Only show start screen for not_started assessments
  if (!hasStarted && assessmentStatus === "not_started" && assessment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="w-full max-w-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-900">{assessment.title}</CardTitle>
              <CardDescription className="text-lg mt-2">{assessment.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">{assessment.timeLimit} Minutes</div>
                  <div className="text-sm text-gray-600">Time Limit</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <FileText className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">
                    {assessment.questions.length} Questions
                  </div>
                  <div className="text-sm text-gray-600">Regular Questions</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Code className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">
                    {assessment.codingQuestions.length} Problems
                  </div>
                  <div className="text-sm text-gray-600">Coding Challenges</div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />
                  <div>
                    <h4 className="font-semibold text-yellow-800">Important Instructions:</h4>
                    <ul className="mt-2 text-sm text-yellow-700 space-y-1">
                      <li>
                        • You have {assessment.timeLimit} minutes to complete the entire assessment
                      </li>
                      <li>• Coding questions will open in a separate coding environment</li>
                      <li>
                        • <strong>Coding questions can only be submitted once</strong> - make sure
                        your solution passes all tests
                      </li>
                      <li>• You can navigate between questions freely</li>
                      <li>• Make sure to submit before time runs out</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Button onClick={handleStartAssessment} className="w-full py-3 text-lg" size="lg">
                <Play className="mr-2 h-5 w-5" />
                Start Assessment
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with timer and progress */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">{assessment.title}</h1>
              <Badge variant="outline">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </Badge>
            </div>
            <div className="flex items-center space-x-6">
              {/* Auto-save status */}
              <div className="flex items-center space-x-2">
                {autoSaving ? (
                  <>
                    <Loader2 className="h-3 w-3 animate-spin text-blue-600" />
                    <span className="text-xs text-blue-600">Saving...</span>
                  </>
                ) : lastSaved ? (
                  <>
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span className="text-xs text-green-600">
                      Saved {lastSaved.toLocaleTimeString()}
                    </span>
                  </>
                ) : null}
              </div>

              <div className="flex items-center space-x-2">
                <Timer className="h-4 w-4 text-gray-500" />
                <span
                  className={`font-mono text-lg ${timeRemaining < 300 ? "text-red-600" : "text-gray-900"}`}
                >
                  {formatTime(timeRemaining)}
                </span>
              </div>
              <Progress value={progress} className="w-32" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Assessment Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Coding Questions */}
                <div>
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">Coding Questions</h4>
                  <div className="space-y-2">
                    {assessment.codingQuestions.map((cq) => {
                      const isSubmitted = codingAnswers[cq.order]?.status === "submitted";
                      const hasAnswer = codingAnswers[cq.order];

                      return (
                        <Button
                          key={cq.order}
                          variant={isSubmitted ? "default" : hasAnswer ? "secondary" : "outline"}
                          size="sm"
                          className={`w-full justify-start ${isSubmitted ? "bg-green-600 hover:bg-green-700 cursor-not-allowed" : ""}`}
                          onClick={() => handleCodingQuestion(cq.order)}
                          disabled={isSubmitted}
                          title={
                            isSubmitted
                              ? "This coding question has been submitted and cannot be reopened"
                              : "Click to open coding environment"
                          }
                        >
                          <Code className="mr-2 h-4 w-4" />
                          {cq.title}
                          {isSubmitted ? (
                            <div className="ml-auto flex items-center">
                              <CheckCircle className="h-4 w-4 mr-1" />
                            </div>
                          ) : hasAnswer ? (
                            <div className="ml-auto flex items-center">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              <span className="text-xs">Draft</span>
                            </div>
                          ) : null}
                        </Button>
                      );
                    })}
                  </div>
                </div>

                {/* Regular Questions */}
                <div>
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">Questions</h4>
                  <div className="grid grid-cols-5 gap-1">
                    {assessment.questions.map((q, index) => (
                      <Button
                        key={q.order}
                        variant={
                          answers[q.order]
                            ? "default"
                            : index === currentQuestionIndex
                              ? "secondary"
                              : "outline"
                        }
                        size="sm"
                        className="aspect-square p-0"
                        onClick={() => setCurrentQuestionIndex(index)}
                      >
                        {index + 1}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>
                      Answered: {answeredQuestions}/{totalQuestions}
                    </div>
                    <div>
                      Coding: {completedCodingQuestions}/{assessment.codingQuestions.length}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  {currentQuestion ? (
                    <>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl">
                            Question {currentQuestionIndex + 1}
                          </CardTitle>
                          <Badge variant={currentQuestion.type === "MCQ" ? "default" : "secondary"}>
                            {currentQuestion.type === "MCQ" ? "Multiple Choice" : "Open Ended"}
                          </Badge>
                        </div>
                        <CardDescription className="text-lg">
                          {currentQuestion.question}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {currentQuestion.type === "MCQ" ? (
                          <RadioGroup
                            value={answers[currentQuestion.order] || ""}
                            onValueChange={(value) =>
                              handleAnswerChange(currentQuestion.order, value)
                            }
                          >
                            {currentQuestion.options?.map((option, index) => (
                              <div key={option.id} className="flex items-center space-x-2">
                                <RadioGroupItem value={option.id} id={`option-${index}`} />
                                <Label
                                  htmlFor={`option-${index}`}
                                  className="text-base cursor-pointer"
                                >
                                  {option.text}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        ) : (
                          <Textarea
                            placeholder="Type your answer here..."
                            value={answers[currentQuestion.order] || ""}
                            onChange={(e) =>
                              handleAnswerChange(currentQuestion.order, e.target.value)
                            }
                            className="min-h-[200px]"
                          />
                        )}

                        <div className="flex justify-between pt-6">
                          <Button
                            variant="outline"
                            onClick={() =>
                              setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))
                            }
                            disabled={currentQuestionIndex === 0}
                          >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Previous
                          </Button>

                          {currentQuestionIndex === totalQuestions - 1 ? (
                            <Button
                              onClick={handleSubmitAssessment}
                              disabled={isSubmitting}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              {isSubmitting ? "Submitting..." : "Submit Assessment"}
                            </Button>
                          ) : (
                            <Button
                              onClick={() =>
                                setCurrentQuestionIndex(
                                  Math.min(totalQuestions - 1, currentQuestionIndex + 1)
                                )
                              }
                            >
                              Next
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </>
                  ) : (
                    <CardContent className="flex items-center justify-center py-8">
                      <p className="text-gray-500">No question available</p>
                    </CardContent>
                  )}
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentPage;
