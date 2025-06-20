"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Clock,
  User,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  Timer,
  MemoryStick,
} from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useParams } from "next/navigation";
import { PY_URL } from "@/config";

interface Assessment {
  _id: string;
  title: string;
  description: string;
  duration: number;
  testId: string;
  questions: Question[];
  codingQuestions: CodingQuestion[];
  createdAt: string;
}

interface Question {
  order: number;
  text: string;
  type: "MCQ" | "OPEN_ENDED";
  options?: {
    choices: Choice[];
  };
  difficulty?: string;
}

interface Choice {
  id: string;
  text: string;
}

interface CodingQuestion {
  title: string;
  text: string;
  language: string;
  order: number;
  starterCode: string;
  testCases: TestCase[];
  metadata: {
    difficulty: string;
    estimatedDuration: number;
    tags: string[];
  };
  evaluationCriteria: {
    timeComplexity: string;
    spaceComplexity: string;
    constraints: string[];
  };
}

interface TestCase {
  input: string;
  expected_output: string;
  weight: number;
}

interface Solution {
  _id: string;
  candidate_id: string;
  test_id: string;
  solution_id: string;
  started_at: string;
  completed_at: string;
  time_taken: number;
  answers: Answer[];
  coding_answers: CodingAnswer[];
}

interface Answer {
  question_id: string;
  answer_type: "MCQ" | "OPEN_ENDED";
  value: string;
  submitted_at: string;
}

interface CodingAnswer {
  question_id: string;
  code: string;
  language: string;
  execution_time: number;
  memory_usage: number;
  submitted_at: string;
}

export default function AssessmentResultsPage() {
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [solution, setSolution] = useState<Solution | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [assessmentRes, solutionRes] = await Promise.all([
          fetch(`${PY_URL}/assessments/${params.assessment_id}`),
          fetch(`${PY_URL}/solutions/${params.answers_id}`),
        ]);

        if (!assessmentRes.ok || !solutionRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const assessmentData = await assessmentRes.json();
        const solutionData = await solutionRes.json();

        setAssessment(assessmentData);
        setSolution(solutionData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.assessment_id, params.answers_id]);

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toUpperCase()) {
      case "EASY":
        return "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800";
      case "MEDIUM":
        return "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800";
      case "HARD":
        return "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700";
    }
  };

  const getSelectedChoice = (questionOrder: number, selectedId: string) => {
    const question = assessment?.questions.find((q) => q.order === questionOrder);
    return question?.options?.choices.find((choice) => choice.id === selectedId);
  };

  const getCodingQuestion = (questionId: string) => {
    return assessment?.codingQuestions.find((q) => q.order.toString() === questionId);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading assessment results...</p>
        </div>
      </div>
    );
  }

  if (error || !assessment || !solution) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Error Loading Results
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {error || "Failed to load assessment data"}
              </p>
              <Button onClick={() => window.location.reload()}>Try Again</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {assessment.title}
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{assessment.description}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Created: {new Date(assessment.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>Duration: {assessment.duration} minutes</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                >
                  {assessment.testId}
                </Badge>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Candidate Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Candidate Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Candidate ID</div>
                <div className="font-semibold">{solution.candidate_id}</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Time Taken</div>
                <div className="font-semibold">{formatDuration(solution.time_taken)}</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Started At</div>
                <div className="font-semibold">
                  {new Date(solution.started_at).toLocaleString()}
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Completed At</div>
                <div className="font-semibold">
                  {new Date(solution.completed_at).toLocaleString()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Tabs */}
        <Tabs defaultValue="mcq" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="mcq">
              MCQ Questions ({assessment.questions.filter((q) => q.type === "MCQ").length})
            </TabsTrigger>
            <TabsTrigger value="open">
              Open-Ended ({assessment.questions.filter((q) => q.type === "OPEN_ENDED").length})
            </TabsTrigger>
            <TabsTrigger value="coding">Coding ({assessment.codingQuestions.length})</TabsTrigger>
          </TabsList>

          {/* MCQ Questions */}
          <TabsContent value="mcq" className="space-y-4">
            {assessment.questions
              .filter((q) => q.type === "MCQ")
              .sort((a, b) => a.order - b.order)
              .map((question) => {
                const answer = solution.answers.find(
                  (a) => a.question_id === question.order.toString()
                );
                const selectedChoice = answer
                  ? getSelectedChoice(question.order, answer.value)
                  : null;

                return (
                  <Card key={question.order}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg text-gray-900 dark:text-gray-100">
                          Question {question.order}
                        </CardTitle>
                        {question.difficulty && (
                          <Badge className={getDifficultyColor(question.difficulty)}>
                            {question.difficulty}
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{question.text}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {question.options?.choices.map((choice) => (
                          <div
                            key={choice.id}
                            className={`p-3 rounded-lg border transition-colors ${
                              answer?.value === choice.id
                                ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 ring-2 ring-blue-100 dark:ring-blue-900/50"
                                : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {answer?.value === choice.id && (
                                <CheckCircle className="h-4 w-4 text-blue-600" />
                              )}
                              <span
                                className={
                                  answer?.value === choice.id
                                    ? "font-medium text-blue-900 dark:text-blue-300"
                                    : "text-gray-700 dark:text-gray-300"
                                }
                              >
                                {choice.text}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                      {answer && (
                        <div className="mt-4 pt-4 border-t">
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Submitted: {new Date(answer.submitted_at).toLocaleString()}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
          </TabsContent>

          {/* Open-Ended Questions */}
          <TabsContent value="open" className="space-y-4">
            {assessment.questions
              .filter((q) => q.type === "OPEN_ENDED")
              .sort((a, b) => a.order - b.order)
              .map((question) => {
                const answer = solution.answers.find(
                  (a) => a.question_id === question.order.toString()
                );

                return (
                  <Card key={question.order}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg text-gray-900 dark:text-gray-100">
                          Question {question.order}
                        </CardTitle>
                        {question.difficulty && (
                          <Badge className={getDifficultyColor(question.difficulty)}>
                            {question.difficulty}
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{question.text}</p>
                    </CardHeader>
                    <CardContent>
                      {answer ? (
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                              Candidate Answer:
                            </h4>
                            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                              <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                                {answer.value}
                              </p>
                            </div>
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Submitted: {new Date(answer.submitted_at).toLocaleString()}
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                          <AlertCircle className="h-4 w-4" />
                          <span>No answer submitted</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
          </TabsContent>

          {/* Coding Questions */}
          <TabsContent value="coding" className="space-y-6">
            {assessment.codingQuestions
              .sort((a, b) => a.order - b.order)
              .map((question) => {
                const answer = solution.coding_answers.find(
                  (a) => a.question_id === question.order.toString()
                );

                return (
                  <Card key={question.order}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl mb-2 text-gray-900 dark:text-gray-100">
                            {question.title}
                          </CardTitle>
                          <p className="text-gray-700 dark:text-gray-300 mb-3">{question.text}</p>
                          <div className="flex flex-wrap gap-2">
                            <Badge className={getDifficultyColor(question.metadata.difficulty)}>
                              {question.metadata.difficulty}
                            </Badge>
                            <Badge variant="outline">{question.language}</Badge>
                            <Badge variant="outline">
                              <Clock className="h-3 w-3 mr-1" />
                              {question.metadata.estimatedDuration}min
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Tags */}
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Tags:</h4>
                        <div className="flex flex-wrap gap-1">
                          {question.metadata.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Evaluation Criteria */}
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                          Evaluation Criteria:
                        </h4>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-2 border border-gray-200 dark:border-gray-700">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Time Complexity:</span>{" "}
                              {question.evaluationCriteria.timeComplexity}
                            </div>
                            <div>
                              <span className="font-medium">Space Complexity:</span>{" "}
                              {question.evaluationCriteria.spaceComplexity}
                            </div>
                          </div>
                          {question.evaluationCriteria.constraints.length > 0 && (
                            <div>
                              <span className="font-medium text-sm">Constraints:</span>
                              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {question.evaluationCriteria.constraints.map((constraint, idx) => (
                                  <li key={idx}>{constraint}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Test Cases */}
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                          Test Cases:
                        </h4>
                        <div className="space-y-2">
                          {question.testCases.map((testCase, idx) => (
                            <div
                              key={idx}
                              className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-sm border border-gray-200 dark:border-gray-700"
                            >
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                <div>
                                  <span className="font-medium">Input:</span> {testCase.input}
                                </div>
                                <div>
                                  <span className="font-medium">Expected:</span>{" "}
                                  {testCase.expected_output}
                                </div>
                                <div>
                                  <span className="font-medium">Weight:</span>{" "}
                                  {(testCase.weight * 100).toFixed(0)}%
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      {/* Candidate Solution */}
                      {answer ? (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-900 dark:text-gray-100">
                              Candidate Solution:
                            </h4>
                            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                              <div className="flex items-center gap-1">
                                <Timer className="h-4 w-4" />
                                <span>{(answer.execution_time * 1000).toFixed(2)}ms</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MemoryStick className="h-4 w-4" />
                                <span>{(answer.memory_usage / 1024).toFixed(1)}KB</span>
                              </div>
                            </div>
                          </div>

                          <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                            <SyntaxHighlighter
                              language={answer.language}
                              style={tomorrow}
                              customStyle={{
                                margin: 0,
                                borderRadius: 0,
                                fontSize: "14px",
                              }}
                            >
                              {answer.code}
                            </SyntaxHighlighter>
                          </div>

                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Submitted: {new Date(answer.submitted_at).toLocaleString()}
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 py-8">
                          <AlertCircle className="h-4 w-4" />
                          <span>No solution submitted</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// "use client";

// import { useState, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   Clock,
//   User,
//   Calendar,
//   CheckCircle,
//   XCircle,
//   AlertCircle,
//   Timer,
//   MemoryStick,
// } from "lucide-react";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
// import { useParams } from "next/navigation";
// import { PY_URL } from "@/config";

// interface Assessment {
//   _id: string;
//   title: string;
//   description: string;
//   duration: number;
//   testId: string;
//   questions: Question[];
//   codingQuestions: CodingQuestion[];
//   createdAt: string;
// }

// interface Question {
//   order: number;
//   text: string;
//   type: "MCQ" | "OPEN_ENDED";
//   options?: {
//     choices: Choice[];
//   };
//   difficulty?: string;
// }

// interface Choice {
//   id: string;
//   text: string;
// }

// interface CodingQuestion {
//   title: string;
//   text: string;
//   language: string;
//   order: number;
//   starterCode: string;
//   testCases: TestCase[];
//   metadata: {
//     difficulty: string;
//     estimatedDuration: number;
//     tags: string[];
//   };
//   evaluationCriteria: {
//     timeComplexity: string;
//     spaceComplexity: string;
//     constraints: string[];
//   };
// }

// interface TestCase {
//   input: string;
//   expected_output: string;
//   weight: number;
// }

// interface Solution {
//   _id: string;
//   candidate_id: string;
//   test_id: string;
//   solution_id: string;
//   started_at: string;
//   completed_at: string;
//   time_taken: number;
//   answers: Answer[];
//   coding_answers: CodingAnswer[];
// }

// interface Answer {
//   question_id: string;
//   answer_type: "MCQ" | "OPEN_ENDED";
//   value: string;
//   submitted_at: string;
// }

// interface CodingAnswer {
//   question_id: string;
//   code: string;
//   language: string;
//   execution_time: number;
//   memory_usage: number;
//   submitted_at: string;
// }

// const CORRECT_ANSWERS: Record<string, string> = {
//   "1": "q1_a", // print(type([])) outputs <class 'list'>
//   "2": "q2_c", // List is mutable in Python
//   "3": "q3_b", // 'self' refers to the instance of the class
//   "4": "q4_d", // list.new() is NOT a valid way to create a list
//   "5": "q5_c", // '3' + '4' outputs '34' (string concatenation)
//   "6": "q6_b", // try-except is used to handle exceptions
//   "7": "q7_b", // len('Hello World') outputs 11
//   "8": "q8_a", // append() is used to add an element to the end of a list
//   "9": "q9_a", // import math is the correct way to import
//   "10": "q10_b", // 5 // 2 outputs 2 (floor division)
//   "11": "q11_c", // array is NOT a built-in data type in Python
//   "12": "q12_c", // 'pass' does nothing and acts as a placeholder
//   // Add more correct answers as needed for questions 13-50
//   "48": "q48_a", // Assuming this is correct based on your data
//   "49": "q49_d", // Assuming this is correct based on your data
//   "50": "q50_d", // Assuming this is correct based on your data
// };

// export default function AssessmentResultsPage() {
//   const [assessment, setAssessment] = useState<Assessment | null>(null);
//   const [solution, setSolution] = useState<Solution | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const params = useParams();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);

//         const [assessmentRes, solutionRes] = await Promise.all([
//           fetch(`${PY_URL}/assessments/${params.assessment_id}`),
//           fetch(`${PY_URL}/solutions/${params.answers_id}`),
//         ]);

//         if (!assessmentRes.ok || !solutionRes.ok) {
//           throw new Error("Failed to fetch data");
//         }

//         const assessmentData = await assessmentRes.json();
//         const solutionData = await solutionRes.json();

//         setAssessment(assessmentData);
//         setSolution(solutionData);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "An error occurred");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [params.assessment_id, params.answers_id]);

//   const formatDuration = (seconds: number) => {
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;

//     if (hours > 0) {
//       return `${hours}h ${minutes}m ${secs}s`;
//     } else if (minutes > 0) {
//       return `${minutes}m ${secs}s`;
//     } else {
//       return `${secs}s`;
//     }
//   };

//   const getDifficultyColor = (difficulty: string) => {
//     switch (difficulty?.toUpperCase()) {
//       case "EASY":
//         return "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800";
//       case "MEDIUM":
//         return "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800";
//       case "HARD":
//         return "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800";
//       default:
//         return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700";
//     }
//   };

//   const getSelectedChoice = (questionOrder: number, selectedId: string) => {
//     const question = assessment?.questions.find((q) => q.order === questionOrder);
//     return question?.options?.choices.find((choice) => choice.id === selectedId);
//   };

//   const getCodingQuestion = (questionId: string) => {
//     return assessment?.codingQuestions.find((q) => q.order.toString() === questionId);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <p className="text-gray-600 dark:text-gray-300">Loading assessment results...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !assessment || !solution) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <Card className="w-full max-w-md">
//           <CardContent className="pt-6">
//             <div className="text-center">
//               <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
//                 Error Loading Results
//               </h3>
//               <p className="text-gray-600 dark:text-gray-300 mb-4">
//                 {error || "Failed to load assessment data"}
//               </p>
//               <Button onClick={() => window.location.reload()}>Try Again</Button>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen">
//       <div className="max-w-6xl mx-auto space-y-6">
//         {/* Header */}
//         <Card>
//           <CardHeader>
//             <div className="flex items-start justify-between">
//               <div>
//                 <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
//                   {assessment.title}
//                 </CardTitle>
//                 <p className="text-gray-600 dark:text-gray-300 mb-4">{assessment.description}</p>
//                 <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
//                   <div className="flex items-center gap-1">
//                     <Calendar className="h-4 w-4" />
//                     <span>Created: {new Date(assessment.createdAt).toLocaleDateString()}</span>
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <Clock className="h-4 w-4" />
//                     <span>Duration: {assessment.duration} minutes</span>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Badge
//                   variant="outline"
//                   className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
//                 >
//                   {assessment.testId}
//                 </Badge>
//               </div>
//             </div>
//           </CardHeader>
//         </Card>

//         {/* Candidate Info */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <User className="h-5 w-5" />
//               Candidate Results
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//               <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
//                 <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Candidate ID</div>
//                 <div className="font-semibold">{solution.candidate_id}</div>
//               </div>
//               <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
//                 <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Time Taken</div>
//                 <div className="font-semibold">{formatDuration(solution.time_taken)}</div>
//               </div>
//               <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
//                 <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Started At</div>
//                 <div className="font-semibold">
//                   {new Date(solution.started_at).toLocaleString()}
//                 </div>
//               </div>
//               <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
//                 <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Completed At</div>
//                 <div className="font-semibold">
//                   {new Date(solution.completed_at).toLocaleString()}
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Results Tabs */}
//         <Tabs defaultValue="mcq" className="w-full">
//           <TabsList className="grid w-full grid-cols-3">
//             <TabsTrigger value="mcq">
//               MCQ Questions ({assessment.questions.filter((q) => q.type === "MCQ").length})
//             </TabsTrigger>
//             <TabsTrigger value="open">
//               Open-Ended ({assessment.questions.filter((q) => q.type === "OPEN_ENDED").length})
//             </TabsTrigger>
//             <TabsTrigger value="coding">Coding ({assessment.codingQuestions.length})</TabsTrigger>
//           </TabsList>

//           {/* MCQ Questions */}
//           <TabsContent value="mcq" className="space-y-4">
//             {assessment.questions
//               .filter((q) => q.type === "MCQ")
//               .sort((a, b) => a.order - b.order)
//               .map((question) => {
//                 const answer = solution.answers.find(
//                   (a) => a.question_id === question.order.toString()
//                 );
//                 const selectedChoice = answer
//                   ? getSelectedChoice(question.order, answer.value)
//                   : null;
//                 const isCorrect =
//                   answer &&
//                   CORRECT_ANSWERS[question.order.toString()] &&
//                   answer.value === CORRECT_ANSWERS[question.order.toString()];
//                 const isAnswered = !!answer;

//                 return (
//                   <Card key={question.order}>
//                     <CardHeader>
//                       <div className="flex items-start justify-between">
//                         <div className="flex items-center gap-3">
//                           <CardTitle className="text-lg text-gray-900 dark:text-gray-100">
//                             Question {question.order}
//                           </CardTitle>
//                           {isAnswered && (
//                             <div className="flex items-center gap-1">
//                               {isCorrect ? (
//                                 <Badge className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800">
//                                   <CheckCircle className="h-3 w-3 mr-1" />
//                                   Correct
//                                 </Badge>
//                               ) : (
//                                 <Badge className="bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800">
//                                   <XCircle className="h-3 w-3 mr-1" />
//                                   Incorrect
//                                 </Badge>
//                               )}
//                             </div>
//                           )}
//                           {!isAnswered && (
//                             <Badge className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700">
//                               <AlertCircle className="h-3 w-3 mr-1" />
//                               Not Answered
//                             </Badge>
//                           )}
//                         </div>
//                         {question.difficulty && (
//                           <Badge className={getDifficultyColor(question.difficulty)}>
//                             {question.difficulty}
//                           </Badge>
//                         )}
//                       </div>
//                       <p className="text-gray-700 dark:text-gray-300">{question.text}</p>
//                     </CardHeader>
//                     <CardContent>
//                       <div className="space-y-2">
//                         {question.options?.choices.map((choice) => {
//                           const isSelected = answer?.value === choice.id;
//                           const isCorrectAnswer =
//                             CORRECT_ANSWERS[question.order.toString()] === choice.id;

//                           let choiceStyle = "p-3 rounded-lg border transition-colors ";

//                           if (isSelected && isCorrectAnswer) {
//                             // Selected and correct
//                             choiceStyle +=
//                               "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 ring-2 ring-green-100 dark:ring-green-900/50";
//                           } else if (isSelected && !isCorrectAnswer) {
//                             // Selected but incorrect
//                             choiceStyle +=
//                               "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 ring-2 ring-red-100 dark:ring-red-900/50";
//                           } else if (!isSelected && isCorrectAnswer && isAnswered) {
//                             // Not selected but is the correct answer (show what should have been selected)
//                             choiceStyle +=
//                               "bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800 border-dashed";
//                           } else {
//                             // Default style
//                             choiceStyle +=
//                               "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700";
//                           }

//                           return (
//                             <div key={choice.id} className={choiceStyle}>
//                               <div className="flex items-center gap-2">
//                                 {isSelected && isCorrectAnswer && (
//                                   <CheckCircle className="h-4 w-4 text-green-600" />
//                                 )}
//                                 {isSelected && !isCorrectAnswer && (
//                                   <XCircle className="h-4 w-4 text-red-600" />
//                                 )}
//                                 {!isSelected && isCorrectAnswer && isAnswered && (
//                                   <CheckCircle className="h-4 w-4 text-green-600 opacity-60" />
//                                 )}
//                                 <span
//                                   className={
//                                     isSelected && isCorrectAnswer
//                                       ? "font-medium text-green-900 dark:text-green-300"
//                                       : isSelected && !isCorrectAnswer
//                                         ? "font-medium text-red-900 dark:text-red-300"
//                                         : !isSelected && isCorrectAnswer && isAnswered
//                                           ? "font-medium text-green-700 dark:text-green-400 opacity-75"
//                                           : "text-gray-700 dark:text-gray-300"
//                                   }
//                                 >
//                                   {choice.text}
//                                 </span>
//                                 {!isSelected && isCorrectAnswer && isAnswered && (
//                                   <span className="text-xs text-green-600 dark:text-green-400 ml-auto opacity-75">
//                                     (Correct Answer)
//                                   </span>
//                                 )}
//                               </div>
//                             </div>
//                           );
//                         })}
//                       </div>
//                       {answer && (
//                         <div className="mt-4 pt-4 border-t">
//                           <div className="flex items-center justify-between text-sm">
//                             <div className="text-gray-500 dark:text-gray-400">
//                               Submitted: {new Date(answer.submitted_at).toLocaleString()}
//                             </div>
//                             {isCorrect ? (
//                               <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
//                                 <CheckCircle className="h-4 w-4" />
//                                 <span className="font-medium">Correct Answer</span>
//                               </div>
//                             ) : (
//                               <div className="flex items-center gap-1 text-red-600 dark:text-red-400">
//                                 <XCircle className="h-4 w-4" />
//                                 <span className="font-medium">Incorrect Answer</span>
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       )}
//                     </CardContent>
//                   </Card>
//                 );
//               })}
//           </TabsContent>

//           {/* Open-Ended Questions */}
//           <TabsContent value="open" className="space-y-4">
//             {assessment.questions
//               .filter((q) => q.type === "OPEN_ENDED")
//               .sort((a, b) => a.order - b.order)
//               .map((question) => {
//                 const answer = solution.answers.find(
//                   (a) => a.question_id === question.order.toString()
//                 );

//                 return (
//                   <Card key={question.order}>
//                     <CardHeader>
//                       <div className="flex items-start justify-between">
//                         <CardTitle className="text-lg text-gray-900 dark:text-gray-100">
//                           Question {question.order}
//                         </CardTitle>
//                         {question.difficulty && (
//                           <Badge className={getDifficultyColor(question.difficulty)}>
//                             {question.difficulty}
//                           </Badge>
//                         )}
//                       </div>
//                       <p className="text-gray-700 dark:text-gray-300">{question.text}</p>
//                     </CardHeader>
//                     <CardContent>
//                       {answer ? (
//                         <div className="space-y-4">
//                           <div>
//                             <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
//                               Candidate Answer:
//                             </h4>
//                             <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
//                               <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
//                                 {answer.value}
//                               </p>
//                             </div>
//                           </div>
//                           <div className="text-sm text-gray-500 dark:text-gray-400">
//                             Submitted: {new Date(answer.submitted_at).toLocaleString()}
//                           </div>
//                         </div>
//                       ) : (
//                         <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
//                           <AlertCircle className="h-4 w-4" />
//                           <span>No answer submitted</span>
//                         </div>
//                       )}
//                     </CardContent>
//                   </Card>
//                 );
//               })}
//           </TabsContent>

//           {/* Coding Questions */}
//           <TabsContent value="coding" className="space-y-6">
//             {assessment.codingQuestions
//               .sort((a, b) => a.order - b.order)
//               .map((question) => {
//                 const answer = solution.coding_answers.find(
//                   (a) => a.question_id === question.order.toString()
//                 );

//                 return (
//                   <Card key={question.order}>
//                     <CardHeader>
//                       <div className="flex items-start justify-between">
//                         <div>
//                           <CardTitle className="text-xl mb-2 text-gray-900 dark:text-gray-100">
//                             {question.title}
//                           </CardTitle>
//                           <p className="text-gray-700 dark:text-gray-300 mb-3">{question.text}</p>
//                           <div className="flex flex-wrap gap-2">
//                             <Badge className={getDifficultyColor(question.metadata.difficulty)}>
//                               {question.metadata.difficulty}
//                             </Badge>
//                             <Badge variant="outline">{question.language}</Badge>
//                             <Badge variant="outline">
//                               <Clock className="h-3 w-3 mr-1" />
//                               {question.metadata.estimatedDuration}min
//                             </Badge>
//                           </div>
//                         </div>
//                       </div>
//                     </CardHeader>
//                     <CardContent className="space-y-6">
//                       {/* Tags */}
//                       <div>
//                         <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Tags:</h4>
//                         <div className="flex flex-wrap gap-1">
//                           {question.metadata.tags.map((tag) => (
//                             <Badge key={tag} variant="secondary" className="text-xs">
//                               {tag}
//                             </Badge>
//                           ))}
//                         </div>
//                       </div>

//                       {/* Evaluation Criteria */}
//                       <div>
//                         <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
//                           Evaluation Criteria:
//                         </h4>
//                         <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-2 border border-gray-200 dark:border-gray-700">
//                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//                             <div>
//                               <span className="font-medium">Time Complexity:</span>{" "}
//                               {question.evaluationCriteria.timeComplexity}
//                             </div>
//                             <div>
//                               <span className="font-medium">Space Complexity:</span>{" "}
//                               {question.evaluationCriteria.spaceComplexity}
//                             </div>
//                           </div>
//                           {question.evaluationCriteria.constraints.length > 0 && (
//                             <div>
//                               <span className="font-medium text-sm">Constraints:</span>
//                               <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 mt-1">
//                                 {question.evaluationCriteria.constraints.map((constraint, idx) => (
//                                   <li key={idx}>{constraint}</li>
//                                 ))}
//                               </ul>
//                             </div>
//                           )}
//                         </div>
//                       </div>

//                       {/* Test Cases */}
//                       <div>
//                         <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
//                           Test Cases:
//                         </h4>
//                         <div className="space-y-2">
//                           {question.testCases.map((testCase, idx) => (
//                             <div
//                               key={idx}
//                               className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-sm border border-gray-200 dark:border-gray-700"
//                             >
//                               <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
//                                 <div>
//                                   <span className="font-medium">Input:</span> {testCase.input}
//                                 </div>
//                                 <div>
//                                   <span className="font-medium">Expected:</span>{" "}
//                                   {testCase.expected_output}
//                                 </div>
//                                 <div>
//                                   <span className="font-medium">Weight:</span>{" "}
//                                   {(testCase.weight * 100).toFixed(0)}%
//                                 </div>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>

//                       <Separator />

//                       {/* Candidate Solution */}
//                       {answer ? (
//                         <div className="space-y-4">
//                           <div className="flex items-center justify-between">
//                             <h4 className="font-medium text-gray-900 dark:text-gray-100">
//                               Candidate Solution:
//                             </h4>
//                             <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
//                               <div className="flex items-center gap-1">
//                                 <Timer className="h-4 w-4" />
//                                 <span>{(answer.execution_time * 1000).toFixed(2)}ms</span>
//                               </div>
//                               <div className="flex items-center gap-1">
//                                 <MemoryStick className="h-4 w-4" />
//                                 <span>{(answer.memory_usage / 1024).toFixed(1)}KB</span>
//                               </div>
//                             </div>
//                           </div>

//                           <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
//                             <SyntaxHighlighter
//                               language={answer.language}
//                               style={tomorrow}
//                               customStyle={{
//                                 margin: 0,
//                                 borderRadius: 0,
//                                 fontSize: "14px",
//                               }}
//                             >
//                               {answer.code}
//                             </SyntaxHighlighter>
//                           </div>

//                           <div className="text-sm text-gray-500 dark:text-gray-400">
//                             Submitted: {new Date(answer.submitted_at).toLocaleString()}
//                           </div>
//                         </div>
//                       ) : (
//                         <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 py-8">
//                           <AlertCircle className="h-4 w-4" />
//                           <span>No solution submitted</span>
//                         </div>
//                       )}
//                     </CardContent>
//                   </Card>
//                 );
//               })}
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// }
