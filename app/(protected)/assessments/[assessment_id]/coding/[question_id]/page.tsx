"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MonacoCodeEditor } from "@/components/assessment/monaco-code-editor";

import {
  Play,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
  Save,
  Terminal,
} from "lucide-react";
import axios from "axios";
import { useSession } from "next-auth/react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

// Types
interface TestCase {
  input: string;
  expectedOutput: string;
  actualOutput?: string;
  passed?: boolean;
}

interface CodingQuestion {
  id: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  language: string;
  timeLimit: number;
  testCases: TestCase[];
  starterCode?: string;
}

// Mock coding question data
const mockCodingQuestions: Record<string, CodingQuestion> = {
  "52": {
    id: "52",
    title: "Reverse a String",
    description: `Implement a function to reverse a string without using built-in reverse methods.

**Example:**
- Input: "hello"
- Output: "olleh"
- Input: ""
- Output: ""
- Input: "racecar"
- Output: "racecar"

**Constraints:**
- No use of language built-in reverse functions

**Function Signature:**
\`\`\`python
def reverse_string(s):
    # Your code here
    pass
\`\`\``,
    difficulty: "Easy",
    language: "python",
    timeLimit: 5,
    testCases: [
      { input: "hello", expectedOutput: "olleh" },
      { input: "", expectedOutput: "" },
      { input: "racecar", expectedOutput: "racecar" },
    ],
    starterCode: `def reverse_string(s):
    # Your code here
    pass

# Test your function
if __name__ == "__main__":
    print(reverse_string("hello"))  # Should output: olleh`,
  },
  "53": {
    id: "53",
    title: "Find Duplicates",
    description: `Implement a function to find all duplicates in an array.

**Example:**
- Input: [1, 2, 3, 4]
- Output: []
- Input: [1, 2, 2, 3, 4, 4]
- Output: [2, 4]
- Input: [1, 1, 1, 1]
- Output: [1]

**Constraints:**
- Return duplicates in any order

**Function Signature:**
\`\`\`python
def find_duplicates(nums):
    # Your code here
    pass
\`\`\``,
    difficulty: "Medium",
    language: "python",
    timeLimit: 10,
    testCases: [
      { input: "[1, 2, 3, 4]", expectedOutput: "[]" },
      { input: "[1, 2, 2, 3, 4, 4]", expectedOutput: "[2, 4]" },
      { input: "[1, 1, 1, 1]", expectedOutput: "[1]" },
    ],
    starterCode: `def find_duplicates(nums):
    # Your code here
    pass

# Test your function
if __name__ == "__main__":
    print(find_duplicates([1, 2, 2, 3, 4, 4]))  # Should output: [2, 4]`,
  },
};


const CodingDashboard = () => {
  const params = useParams();
  const router = useRouter();
  const {data:session} = useSession()
  const assessmentId = params.assessment_id as string;
  const questionId = params.question_id as string;

  const [question] = useState<CodingQuestion>(mockCodingQuestions[questionId]);
  const [code, setCode] = useState(question?.starterCode || "");
  const [testResults, setTestResults] = useState<TestCase[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(question?.timeLimit * 60 || 900); // in seconds
  const [output, setOutput] = useState("");

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleSaveAndReturn();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput("");

    try {
      // API call to test code using your exact endpoint
      const response = await axios.post(
        `http://localhost:5000/api/assessments/${assessmentId}/test-code`,
        {
          question_id: questionId,
          code,
          language: question.language,
        }
      );

      console.log("Code execution result:", response.data);

      // Process the API response based on your API structure
      const results = response.data.results;

      // Map the results to our test case format
      const processedResults = question.testCases.map((testCase, index) => {
        const apiResult = results?.testResults?.[index] || results?.[index];
        return {
          ...testCase,
          actualOutput: apiResult?.output || apiResult?.actualOutput || "No output",
          passed: apiResult?.passed || false,
        };
      });

      setTestResults(processedResults);

      // Set output with execution details
      const executionOutput = results?.execution_output || results?.output || results?.message || "";
      const summary = `Code executed successfully!\n\n${executionOutput ? `Output:\n${executionOutput}\n\n` : ""}Test Results:\n` +
        processedResults
          .map((result, i) => `Test ${i + 1}: ${result.passed ? "✅ PASSED" : "❌ FAILED"}`)
          .join("\n");

      setOutput(summary);
    } catch (error: any) {
      console.error("Code execution error:", error);
      setOutput(
        "Error executing code: " + (error.response?.data?.message || error.message || error)
      );

      // Fallback to mock results for demo
      const mockResults = question.testCases.map((testCase) => {
        const passed = Math.random() > 0.3;
        return {
          ...testCase,
          actualOutput: passed ? testCase.expectedOutput : "wrong_output",
          passed,
        };
      });

      setTestResults(mockResults);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSaveAndReturn = async () => {
    setIsSaving(true);

    try {
      // API call to submit coding answer using your exact endpoint
      const submissionData = {
        candidate_id: session?.user?.email,
        question_id: questionId,
        code,
        language: question.language,
        execution_time: Math.random() * 0.5, // Mock execution time
        memory_usage: Math.floor(Math.random() * 5000) + 1000, // Mock memory usage
      };

      const response = await axios.post(
        `http://localhost:5000/api/assessments/${assessmentId}/submit/coding`,
        submissionData
      );

      console.log("Coding answer submitted successfully:", response.data);

      // Update the assessment state with the coding answer
      const savedState = localStorage.getItem(`assessment_${assessmentId}_state`);
      if (savedState) {
        try {
          const state = JSON.parse(savedState);
          state.codingAnswers = {
            ...state.codingAnswers,
            [questionId]: submissionData,
          };
          localStorage.setItem(`assessment_${assessmentId}_state`, JSON.stringify(state));
        } catch (error) {
          console.error("Failed to update assessment state:", error);
        }
      }

      // Return to assessment
      router.push(`/assessments/${assessmentId}`);
    } catch (error: any) {
      console.error("Failed to save coding answer:", error);
      // For demo purposes, still return to assessment even if API fails
      router.push(`/assessments/${assessmentId}`);
    } finally {
      setIsSaving(false);
    }
  };

  if (!question) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Question not found</h2>
          <Button onClick={() => router.push(`/assessments/${assessmentId}`)} className="mt-4">
            Return to Assessment
          </Button>
        </div>
      </div>
    );
  }

  const passedTests = testResults.filter((result) => result.passed).length;
  const totalTests = testResults.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push(`/assessments/${assessmentId}`)}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Assessment
              </Button>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-xl font-semibold text-gray-900">{question.title}</h1>
              <Badge
                variant={
                  question.difficulty === "Easy"
                    ? "default"
                    : question.difficulty === "Medium"
                      ? "secondary"
                      : "destructive"
                }
              >
                {question.difficulty}
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span
                  className={`font-mono text-lg ${timeRemaining < 300 ? "text-red-600" : "text-gray-900"}`}
                >
                  {formatTime(timeRemaining)}
                </span>
              </div>
              <Button onClick={handleSaveAndReturn} disabled={isSaving}>
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? "Saving..." : "Save & Return"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* LeetCode-style Layout */}
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Left Panel - Problem Description */}
        <div className="w-1/2 border-r border-border">
          <div className="h-full flex flex-col">
            {/* Problem Header */}
            <div className="p-4 border-b border-border bg-white">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-gray-900">{question.title}</h1>
                <Badge
                  className={`text-xs font-medium ${
                    question.difficulty === "Easy"
                      ? "bg-green-100 text-green-800 border-green-200"
                      : question.difficulty === "Medium"
                        ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                        : "bg-red-100 text-red-800 border-red-200"
                  }`}
                >
                  {question.difficulty}
                </Badge>
              </div>
            </div>

            {/* Problem Content */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={vscDarkPlus}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {question.description}
                </ReactMarkdown>
              </div>

              {/* Test Cases Section */}
              <div className="mt-6 bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Examples</h3>
                <div className="space-y-4">
                  {question.testCases.map((testCase, index) => {
                    const result = testResults[index];
                    const hasResult = result !== undefined;
                    const passed = hasResult ? result.passed : null;

                    return (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border transition-all ${
                          !hasResult
                            ? "bg-white border-gray-200"
                            : passed
                              ? "bg-green-50 border-green-200"
                              : "bg-red-50 border-red-200"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-semibold text-sm text-gray-900">
                            Example {index + 1}
                          </span>
                          {!hasResult ? (
                            <div className="h-4 w-4 rounded-full bg-gray-300" />
                          ) : passed ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                        <div className="space-y-3 text-sm">
                          <div>
                            <div className="font-medium text-gray-700 mb-1">Input:</div>
                            <code className="block bg-gray-100 px-3 py-2 rounded text-xs font-mono border">
                              {testCase.input}
                            </code>
                          </div>
                          <div>
                            <div className="font-medium text-gray-700 mb-1">Output:</div>
                            <code className="block bg-gray-100 px-3 py-2 rounded text-xs font-mono border">
                              {testCase.expectedOutput}
                            </code>
                          </div>
                          {hasResult && result.actualOutput && (
                            <div>
                              <div className="font-medium text-gray-700 mb-1">Your Output:</div>
                              <code
                                className={`block px-3 py-2 rounded text-xs font-mono border ${
                                  passed
                                    ? "bg-green-100 text-green-800 border-green-200"
                                    : "bg-red-100 text-red-800 border-red-200"
                                }`}
                              >
                                {result.actualOutput}
                              </code>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {value}
            </ReactMarkdown> */}
          </div>
        </div>

        {/* Right Panel - Code Editor and Console */}
        <div className="w-1/2 flex flex-col">
          {/* Code Editor Header */}
          <div className="p-4 border-b border-border bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">Code</span>
                <Badge
                  variant="outline"
                  className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                >
                  {question.language.charAt(0).toUpperCase() + question.language.slice(1)}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="gap-2 bg-white hover:bg-gray-50"
                >
                  <Play className="h-4 w-4" />
                  {isRunning ? "Running..." : "Run"}
                </Button>
                <Button
                  size="sm"
                  onClick={handleSaveAndReturn}
                  disabled={isSaving}
                  className="gap-2 bg-green-600 hover:bg-green-700"
                >
                  <Save className="h-4 w-4" />
                  {isSaving ? "Saving..." : "Submit"}
                </Button>
              </div>
            </div>
          </div>

          {/* Code Editor */}
          <div className="min-h-96">
            <MonacoCodeEditor
              language={question.language}
              value={code}
              onChange={setCode}
              height="500px"
            />
          </div>

          {/* Console Output */}
          <div className="h-48 border-t border-border">
            <div className="p-3 border-b border-border bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Console</span>
                </div>
                {testResults.length > 0 && (
                  <Badge
                    variant={passedTests === totalTests ? "default" : "destructive"}
                    className={`text-xs ${
                      passedTests === totalTests
                        ? "bg-green-100 text-green-800 border-green-200"
                        : "bg-red-100 text-red-800 border-red-200"
                    }`}
                  >
                    {passedTests}/{totalTests} test cases passed
                  </Badge>
                )}
              </div>
            </div>
            <div className="p-4 h-full overflow-y-auto bg-gray-900 text-gray-100 font-mono text-sm">
              <pre className="whitespace-pre-wrap">
                {output || (
                  <span className="text-gray-400">
                    Click 'Run' to execute your code and see the output here...
                  </span>
                )}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingDashboard;
