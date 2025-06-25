"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Save, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MonacoCodeEditor } from "@/components/assessment/monaco-code-editor";
import { MarkdownEditor } from "@/components/markdown-editor";
import axios from "axios";
import { PY_URL } from "@/config";
import toast from "react-hot-toast";

interface TestCase {
  input: string;
  expected_output: string;
  weight: number;
}

interface QuestionOutput {
  order: number;
  title: string;
  text: string;
  language: string;
  starterCode: string;
  solutionCode: string;
  testCases: TestCase[];
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
    difficulty: "EASY" | "MEDIUM" | "HARD";
    estimatedDuration: number;
    tags: string[];
  };
}

export default function UpdateCodingProblemPage() {
  const router = useRouter();
  const { org_id, job_id, assessment_id, code_id: questionOrder } = useParams();

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Custom question state
  const [customQuestion, setCustomQuestion] = useState<Partial<QuestionOutput>>({
    order: Number.parseInt((questionOrder as string) || "1"),
    title: "",
    text: "",
    language: "python",
    starterCode: "",
    solutionCode: "",
    testCases: [{ input: "", expected_output: "", weight: 1.0 }],
    evaluationCriteria: {
      timeComplexity: "",
      spaceComplexity: "",
      constraints: [],
    },
    gradingRules: {
      testCaseWeight: 0.7,
      codeQualityWeight: 0.2,
      efficiencyWeight: 0.1,
      partialCredit: true,
    },
    metadata: {
      difficulty: "EASY",
      estimatedDuration: 15,
      tags: [],
    },
  });

  // Fetch existing question data
  useEffect(() => {
    if (questionOrder) {
      fetchExistingQuestion();
    }
  }, [questionOrder]);

  const fetchExistingQuestion = async () => {
    try {
      setInitialLoading(true);
      const response = await axios.get(
        `${PY_URL}/assessments/${assessment_id}/code/${questionOrder}/full`
      );

      if (response.data) {
        const existingQuestion = response.data;
        setCustomQuestion({
          order: existingQuestion.order,
          title: existingQuestion.title,
          text: existingQuestion.text,
          language: existingQuestion.language,
          starterCode: existingQuestion.starterCode,
          solutionCode: existingQuestion.solutionCode,
          testCases: existingQuestion.testCases || [
            { input: "", expected_output: "", weight: 1.0 },
          ],
          evaluationCriteria: existingQuestion.evaluationCriteria || {
            timeComplexity: "",
            spaceComplexity: "",
            constraints: [],
          },
          gradingRules: existingQuestion.gradingRules || {
            testCaseWeight: 0.7,
            codeQualityWeight: 0.2,
            efficiencyWeight: 0.1,
            partialCredit: true,
          },
          metadata: existingQuestion.metadata || {
            difficulty: "EASY",
            estimatedDuration: 15,
            tags: [],
          },
        });
      }
    } catch (error: any) {
      console.error("Error fetching existing question:", error);
      toast.error("Failed to load existing question");
    } finally {
      setInitialLoading(false);
    }
  };

  // Handle updating question
  const handleUpdateQuestion = async () => {
    const finalQuestion = customQuestion as QuestionOutput;

    try {
      setLoading(true);

      const res = await axios.patch(
        `${PY_URL}/assessments/${assessment_id}/code/${questionOrder}`,
        finalQuestion
      );

      if (res.data.success) {
        toast.success("Question updated successfully!");
      }

      const basePath = `/dashboard/organization/${org_id}/job/${job_id}/assessments/${assessment_id}/code`;
      router.push(basePath);
    } catch (error: any) {
      toast.error(error.message || "Failed to update question");
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteQuestion = async () => {
    try {
      setLoading(true);

      const res = await axios.delete(
        `${PY_URL}/assessments/${assessment_id}/code/${questionOrder}`
      );

      if (res.data.success) {
        toast.success("Question delete successfully!");
        const basePath = `/dashboard/organization/${org_id}/job/${job_id}/assessments/${assessment_id}/code`;
        router.push(basePath);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to delete question");
    } finally {
      setLoading(false);
    }
  };

  // Handle updating custom question fields
  const updateCustomQuestion = (field: string, value: any) => {
    setCustomQuestion((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle updating test cases
  const updateTestCase = (index: number, field: string, value: any) => {
    setCustomQuestion((prev) => ({
      ...prev,
      testCases: prev.testCases?.map((tc, i) => (i === index ? { ...tc, [field]: value } : tc)),
    }));
  };

  // Add new test case
  const addTestCase = () => {
    setCustomQuestion((prev) => ({
      ...prev,
      testCases: [...(prev.testCases || []), { input: "", expected_output: "", weight: 1.0 }],
    }));
  };

  // Remove test case
  const removeTestCase = (index: number) => {
    setCustomQuestion((prev) => ({
      ...prev,
      testCases: prev.testCases?.filter((_, i) => i !== index),
    }));
  };

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading question data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Update Coding Problem</h1>
            <p className="text-muted-foreground">
              Modify the existing coding question #{questionOrder}
            </p>
          </div>
        </div>
        <Button onClick={handleDeleteQuestion} disabled={loading} variant="destructive">
          {loading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          ) : (
            <Trash2 className="mr-2 h-4 w-4" />
          )}
          Delete
        </Button>
      </div>

      {/* Custom Question Update Form */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Update Custom Question
            </CardTitle>
            <CardDescription>Modify the existing coding problem details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Question Order</Label>
                <Input
                  type="number"
                  value={customQuestion.order}
                  onChange={(e) => updateCustomQuestion("order", Number.parseInt(e.target.value))}
                  disabled // Don't allow changing order in update mode
                />
              </div>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  placeholder="e.g., Two Sum"
                  value={customQuestion.title}
                  onChange={(e) => updateCustomQuestion("title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Language</Label>
                <Select
                  value={customQuestion.language}
                  onValueChange={(value) => updateCustomQuestion("language", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                    <SelectItem value="cpp">C++</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Problem Description */}
            <div className="space-y-2">
              <Label>Problem Description</Label>
              <MarkdownEditor
                value={customQuestion.text || ""}
                onChange={(value) => updateCustomQuestion("text", value)}
                label="Problem Description"
                placeholder="Describe the problem, constraints, and examples..."
              />
            </div>

            {/* Code Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <MonacoCodeEditor
                  title="Starter Code"
                  language={customQuestion.language || "python"}
                  value={customQuestion.starterCode || ""}
                  onChange={(value) => updateCustomQuestion("starterCode", value)}
                  height="200px"
                />
              </div>
              <div className="space-y-2">
                <MonacoCodeEditor
                  title="Solution Code"
                  language={customQuestion.language || "python"}
                  value={customQuestion.solutionCode || ""}
                  onChange={(value) => updateCustomQuestion("solutionCode", value)}
                  height="200px"
                />
              </div>
            </div>

            {/* Test Cases */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-lg">Test Cases</Label>
                <Button onClick={addTestCase} size="sm" variant="outline">
                  <Save className="h-4 w-4 mr-2" />
                  Add Test Case
                </Button>
              </div>
              <div className="space-y-3">
                {customQuestion.testCases?.map((testCase, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Input</Label>
                          <Input
                            placeholder="e.g., [2,7,11,15], 9"
                            value={testCase.input}
                            onChange={(e) => updateTestCase(index, "input", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Expected Output</Label>
                          <Input
                            placeholder={
                              customQuestion.language === "python"
                                ? "e.g., [0,1] or True/False"
                                : "e.g., [0,1] or true/false"
                            }
                            value={testCase.expected_output}
                            onChange={(e) =>
                              updateTestCase(index, "expected_output", e.target.value)
                            }
                          />
                          <p className="text-xs text-gray-500">
                            {customQuestion.language === "python"
                              ? "For boolean outputs, use True/False (capitalized)"
                              : "For boolean outputs, use true/false (lowercase)"}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label>Weight</Label>
                          <div className="flex gap-2">
                            <Input
                              type="number"
                              step="0.1"
                              min="0"
                              max="1"
                              value={testCase.weight}
                              onChange={(e) =>
                                updateTestCase(index, "weight", Number.parseFloat(e.target.value))
                              }
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeTestCase(index)}
                              disabled={customQuestion.testCases?.length === 1}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Evaluation Criteria */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Evaluation Criteria</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Time Complexity</Label>
                  <Input
                    placeholder="e.g., O(n)"
                    value={customQuestion.evaluationCriteria?.timeComplexity}
                    onChange={(e) =>
                      updateCustomQuestion("evaluationCriteria", {
                        ...customQuestion.evaluationCriteria,
                        timeComplexity: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Space Complexity</Label>
                  <Input
                    placeholder="e.g., O(1)"
                    value={customQuestion.evaluationCriteria?.spaceComplexity}
                    onChange={(e) =>
                      updateCustomQuestion("evaluationCriteria", {
                        ...customQuestion.evaluationCriteria,
                        spaceComplexity: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Constraints</Label>
                  <Textarea
                    placeholder="e.g., No built-in functions allowed"
                    value={customQuestion.evaluationCriteria?.constraints?.join("\n")}
                    onChange={(e) =>
                      updateCustomQuestion("evaluationCriteria", {
                        ...customQuestion.evaluationCriteria,
                        constraints: e.target.value.split("\n").filter((c) => c.trim()),
                      })
                    }
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* Grading Rules */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Grading Rules</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>Test Case Weight</Label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    max="1"
                    value={customQuestion.gradingRules?.testCaseWeight}
                    onChange={(e) =>
                      updateCustomQuestion("gradingRules", {
                        ...customQuestion.gradingRules,
                        testCaseWeight: Number.parseFloat(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Code Quality Weight</Label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    max="1"
                    value={customQuestion.gradingRules?.codeQualityWeight}
                    onChange={(e) =>
                      updateCustomQuestion("gradingRules", {
                        ...customQuestion.gradingRules,
                        codeQualityWeight: Number.parseFloat(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Efficiency Weight</Label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    max="1"
                    value={customQuestion.gradingRules?.efficiencyWeight}
                    onChange={(e) =>
                      updateCustomQuestion("gradingRules", {
                        ...customQuestion.gradingRules,
                        efficiencyWeight: Number.parseFloat(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Partial Credit</Label>
                  <Select
                    value={customQuestion.gradingRules?.partialCredit ? "true" : "false"}
                    onValueChange={(value) =>
                      updateCustomQuestion("gradingRules", {
                        ...customQuestion.gradingRules,
                        partialCredit: value === "true",
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Enabled</SelectItem>
                      <SelectItem value="false">Disabled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Metadata */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Metadata</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Difficulty</Label>
                  <Select
                    value={customQuestion.metadata?.difficulty}
                    onValueChange={(value) =>
                      updateCustomQuestion("metadata", {
                        ...customQuestion.metadata,
                        difficulty: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EASY">Easy</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="HARD">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Estimated Duration (minutes)</Label>
                  <Input
                    type="number"
                    value={customQuestion.metadata?.estimatedDuration}
                    onChange={(e) =>
                      updateCustomQuestion("metadata", {
                        ...customQuestion.metadata,
                        estimatedDuration: Number.parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tags (comma-separated)</Label>
                  <Input
                    placeholder="e.g., arrays, hash-table, algorithms"
                    value={customQuestion.metadata?.tags?.join(", ")}
                    onChange={(e) =>
                      updateCustomQuestion("metadata", {
                        ...customQuestion.metadata,
                        tags: e.target.value
                          .split(",")
                          .map((tag) => tag.trim())
                          .filter((tag) => tag),
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Button onClick={handleUpdateQuestion} disabled={loading} className="w-full">
          {loading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          ) : (
            <Edit className="mr-2 h-4 w-4" />
          )}
          Save
        </Button>
      </div>
    </div>
  );
}
