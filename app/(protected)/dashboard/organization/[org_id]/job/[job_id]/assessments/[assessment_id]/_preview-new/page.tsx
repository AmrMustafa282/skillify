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
  AlertCircle,
  Play,
  ArrowRight,
  ArrowLeft,
  FileText,
  Timer,
  Loader2,
  Eye,
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

const AssessmentPreviewPage = () => {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const assessmentId = params.assessment_id as string;

  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [viewedCodingQuestions, setViewedCodingQuestions] = useState<Record<string, boolean>>({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [message, setMessage] = useState<string | null>(null);

  // Fetch assessment data for preview mode
  useEffect(() => {
    const loadAssessment = async () => {
      try {
        if (!session) return;
        setLoading(true);

        // Load assessment data for preview
        const assessmentResponse = await axios.get(`${PY_URL}/assessments/${assessmentId}`);
        console.log("Assessment data:", assessmentResponse.data);
        const transformedAssessment = transformAssessment(assessmentResponse.data);
        setAssessment(transformedAssessment);

        setMessage("Preview Mode: No data will be saved in this mode.");

        setError(null);
      } catch (err: any) {
        console.error("Failed to load assessment:", err);

        // Handle specific API errors with detailed messages
        if (err.response?.status === 404) {
          setError("Assessment not found. Please check the URL and try again.");
        } else if (err.response?.status === 403) {
          setError(
            "You don't have permission to access this assessment. Please contact your administrator."
          );
        } else if (err.code === "NETWORK_ERROR" || !err.response) {
          setError("Network error. Please check your internet connection and try again.");
        } else {
          setError("Failed to load assessment. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    loadAssessment();
  }, [assessmentId, session]);

  // Timer effect for preview mode (just for demonstration)
  useEffect(() => {
    if (!hasStarted || !assessment) return;

    // Set initial time for preview
    setTimeRemaining(assessment.timeLimit * 60);
  }, [hasStarted, assessment]);



  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartAssessment = () => {
    setHasStarted(true);
    setTimeRemaining(assessment?.timeLimit ? assessment.timeLimit * 60 : 90 * 60);

    setMessage("Preview started! No data will be saved in this mode.");
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));

    setMessage("Answer updated (preview mode only).");
  };

  const handleCodingQuestion = async (questionId: string) => {
    // Check if already viewed
    if (viewedCodingQuestions[questionId]) {
      setMessage("You have already viewed this coding question in preview mode.");
      return;
    }

    try {
      // Fetch coding question data for preview
      const response = await axios.get(`${PY_URL}/assessments/${assessmentId}/code/${questionId}`);
      console.log("Coding question data:", response.data);

      // Mark as viewed
      setViewedCodingQuestions(prev => ({
        ...prev,
        [questionId]: true
      }));

      setMessage("Coding question loaded! In actual assessment, this would open the coding environment.");
    } catch (error: any) {
      console.error("Failed to load coding question:", error);
      setMessage("Failed to load coding question data.");
    }
  };

  const handleSubmitAssessment = () => {
    const answeredCount = Object.keys(answers).length;
    const totalQuestions = assessment?.questions.length || 0;

    setMessage(`Preview complete! You answered ${answeredCount} out of ${totalQuestions} questions. In actual assessment, this would be submitted.`);

    // Go back to assessment management
    router.back();
  };

  const currentQuestion = assessment?.questions[currentQuestionIndex];
  const totalQuestions = assessment?.questions.length || 1;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  const answeredQuestions = Object.keys(answers).length;
  const viewedCodingQuestionsCount = Object.keys(viewedCodingQuestions).length;

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Loading Assessment Preview
            </h3>
            <p className="text-sm text-gray-600 text-center">
              Please wait while we load the assessment for preview...
            </p>
          </CardContent>
        </Card>
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

  // Show start screen for preview mode
  if (!hasStarted && assessment) {
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
              {/* Preview mode indicator */}
              <div className="flex items-center space-x-2">
                <Eye className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-blue-600 font-medium">Preview Mode</span>
              </div>

              <div className="flex items-center space-x-2">
                <Timer className="h-4 w-4 text-gray-500" />
                <span className="font-mono text-lg text-gray-900">
                  {formatTime(timeRemaining)}
                </span>
              </div>
              <Progress value={progress} className="w-32" />
            </div>
          </div>
        </div>
      </div>

      {/* Message Display */}
      {message && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">{message}</p>
              </div>
              <div className="ml-auto pl-3">
                <div className="-mx-1.5 -my-1.5">
                  <button
                    type="button"
                    className="inline-flex bg-blue-50 rounded-md p-1.5 text-blue-500 hover:bg-blue-100"
                    onClick={() => setMessage(null)}
                  >
                    <span className="sr-only">Dismiss</span>
                    <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
                      const isViewed = viewedCodingQuestions[cq.order];

                      return (
                        <Button
                          key={cq.order}
                          variant={isViewed ? "default" : "outline"}
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => handleCodingQuestion(cq.order)}
                          title="Click to preview coding question"
                        >
                          <Code className="mr-2 h-4 w-4" />
                          {cq.title}
                          {isViewed && (
                            <div className="ml-auto flex items-center">
                              <Eye className="h-4 w-4 mr-1" />
                              <span className="text-xs">Viewed</span>
                            </div>
                          )}
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
                      Coding: {viewedCodingQuestionsCount}/{assessment.codingQuestions.length}
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
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Complete Preview
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

export default AssessmentPreviewPage;
