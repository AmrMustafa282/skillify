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
} from "lucide-react";
import axios from "axios";

// Types
interface Question {
  id: string;
  type: "MCQ" | "OPEN_ENDED";
  question: string;
  options?: string[];
  timeLimit?: number;
}

interface CodingQuestion {
  id: string;
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

// Mock assessment data
const mockAssessment: Assessment = {
  id: "python-basics",
  title: "Python Basics Assessment",
  description: "Comprehensive assessment covering Python fundamentals and problem-solving skills",
  timeLimit: 90, // minutes
  questions: [
    {
      id: "1",
      type: "MCQ",
      question: "What is the output of print(type([]))?",
      options: ["<class 'list'>", "<class 'dict'>", "<class 'tuple'>", "<class 'set'>"],
    },
    {
      id: "2",
      type: "MCQ",
      question: "Which of the following is used to define a function in Python?",
      options: ["function", "def", "define", "func"],
    },
    {
      id: "3",
      type: "OPEN_ENDED",
      question: "Explain the difference between a list and a tuple in Python. Provide examples.",
    },
  ],
  codingQuestions: [
    {
      id: "52",
      title: "Reverse String",
      description: "Write a function that reverses a string",
      difficulty: "Easy",
      language: "python",
      timeLimit: 15,
      testCases: [
        { input: "hello", expectedOutput: "olleh" },
        { input: "world", expectedOutput: "dlrow" },
      ],
    },
    {
      id: "53",
      title: "Find Duplicates",
      description: "Write a function that finds duplicate numbers in an array",
      difficulty: "Medium",
      language: "python",
      timeLimit: 20,
      testCases: [
        { input: "[1,2,3,2,4,5,1]", expectedOutput: "[1,2]" },
        { input: "[1,2,3,4,5]", expectedOutput: "[]" },
      ],
    },
  ],
};

const AssessmentPage = () => {
  const params = useParams();
  const router = useRouter();
  const assessmentId = params.assessment_id as string;

  const [assessment] = useState<Assessment>(mockAssessment);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [codingAnswers, setCodingAnswers] = useState<Record<string, any>>({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Restore state when returning from coding dashboard
  useEffect(() => {
    const savedState = localStorage.getItem(`assessment_${assessmentId}_state`);
    if (savedState) {
      try {
        const state = JSON.parse(savedState);
        setAnswers(state.answers || {});
        setCodingAnswers(state.codingAnswers || {});
        setTimeRemaining(state.timeRemaining || assessment.timeLimit * 60);
        setCurrentQuestionIndex(state.currentQuestionIndex || 0);
        setHasStarted(true);
      } catch (error) {
        console.error("Failed to restore assessment state:", error);
      }
    }
  }, [assessmentId, assessment?.timeLimit]);

  // Timer effect
  useEffect(() => {
    if (!hasStarted) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleSubmitAssessment();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [hasStarted]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartAssessment = async () => {
    try {
      // API call to start assessment using your exact endpoint
      const response = await axios.post(
        `http://localhost:5000/api/assessments/${assessmentId}/start`,
        {
          candidate_id: "candidate-current",
        }
      );

      console.log("Assessment started:", response.data);
      setHasStarted(true);
      setTimeRemaining(mockAssessment.timeLimit * 60);

      // Store solution_id for later use
      localStorage.setItem(`assessment_${assessmentId}_solution_id`, response.data.solution_id);
    } catch (error: any) {
      console.error("Failed to start assessment:", error);
      if (error.response?.status === 409) {
        // Assessment already started
        console.log("Assessment already started, continuing...");
        setHasStarted(true);
        setTimeRemaining(mockAssessment.timeLimit * 60);
        if (error.response.data.solution_id) {
          localStorage.setItem(
            `assessment_${assessmentId}_solution_id`,
            error.response.data.solution_id
          );
        }
      } else {
        // For demo purposes, still allow starting even if API fails
        setHasStarted(true);
        setTimeRemaining(mockAssessment.timeLimit * 60);
      }
    }
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleCodingQuestion = (questionId: string) => {
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
    setIsSubmitting(true);
    try {
      // Prepare answers in the format your API expects
      const formattedAnswers = Object.entries(answers).map(([questionId, value]) => ({
        question_id: questionId,
        answer_type: assessment.questions.find((q) => q.id === questionId)?.type || "MCQ",
        value,
      }));

      // API call to submit assessment using your exact endpoint
      const response = await axios.post(
        `http://localhost:5000/api/assessments/${assessmentId}/submit/complete`,
        {
          candidate_id: "candidate-current",
          answers: formattedAnswers,
        }
      );

      console.log("Assessment submitted successfully:", response.data);

      // Clear saved state
      localStorage.removeItem(`assessment_${assessmentId}_state`);
      localStorage.removeItem(`assessment_${assessmentId}_solution_id`);

      router.push("/dashboard");
    } catch (error: any) {
      console.error("Failed to submit assessment:", error);
      if (error.response?.status === 409) {
        console.log("Assessment already completed");
      }
      // For demo purposes, still redirect even if API fails
      localStorage.removeItem(`assessment_${assessmentId}_state`);
      localStorage.removeItem(`assessment_${assessmentId}_solution_id`);
      router.push("/dashboard");
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentQuestion = assessment?.questions[currentQuestionIndex];
  const totalQuestions = assessment?.questions.length || 1;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  const answeredQuestions = Object.keys(answers).length;
  const completedCodingQuestions = Object.keys(codingAnswers).length;

  if (!hasStarted) {
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
                    {assessment.codingQuestions.map((cq) => (
                      <Button
                        key={cq.id}
                        variant={codingAnswers[cq.id] ? "default" : "outline"}
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => handleCodingQuestion(cq.id)}
                      >
                        <Code className="mr-2 h-4 w-4" />
                        {cq.title}
                        {codingAnswers[cq.id] && <CheckCircle className="ml-auto h-4 w-4" />}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Regular Questions */}
                <div>
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">Questions</h4>
                  <div className="grid grid-cols-5 gap-1">
                    {assessment.questions.map((q, index) => (
                      <Button
                        key={q.id}
                        variant={
                          answers[q.id]
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
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">Question {currentQuestionIndex + 1}</CardTitle>
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
                        value={answers[currentQuestion.id] || ""}
                        onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
                      >
                        {currentQuestion.options?.map((option, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <RadioGroupItem
                              value={`q${currentQuestion.id}_${String.fromCharCode(97 + index)}`}
                              id={`option-${index}`}
                            />
                            <Label htmlFor={`option-${index}`} className="text-base cursor-pointer">
                              {option}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    ) : (
                      <Textarea
                        placeholder="Type your answer here..."
                        value={answers[currentQuestion.id] || ""}
                        onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
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
