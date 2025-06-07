"use client";
import { useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  Save,
  Search,
  Building2,
  ArrowLeft,
  Plus,
  Clock,
  Tag,
  BookOpen,
  Sparkles,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MonacoCodeEditor } from "@/components/assessment/monaco-code-editor";
import { MarkdownEditor } from "@/components/markdown-editor";
import {
  PREDEFINED_QUESTIONS,
  QUESTION_TOPICS,
  SUPPORTED_LANGUAGES,
  searchQuestions,
  getImplementationByLanguage,
  type PredefinedQuestion,
} from "@/lib/predefined-questions";

// Types for our question structure
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

export default function CreateCodingProblemPage() {
  const router = useRouter();
  const searchParams = useSearchParams()
  const { org_id, job_id, form_id } = useParams();

  // Main state
  const [mode, setMode] = useState<"predefined" | "custom">("predefined");
  const [selectedQuestion, setSelectedQuestion] = useState<PredefinedQuestion | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>(searchParams.get("template") || "python");

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [selectedCompany, setSelectedCompany] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");

  // Custom question state
  const [customQuestion, setCustomQuestion] = useState<Partial<QuestionOutput>>({
    order: 1,
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

  // Get filtered questions based on search and filters
  const getFilteredQuestions = () => {
    let questions = PREDEFINED_QUESTIONS;

    if (searchQuery) {
      questions = searchQuestions(searchQuery);
    }

    if (selectedTopic !== "all") {
      questions = questions.filter((q) => q.metadata.topic === selectedTopic);
    }

    if (selectedCompany !== "all") {
      questions = questions.filter((q) => q.metadata.companies.includes(selectedCompany));
    }

    if (selectedDifficulty !== "all") {
      questions = questions.filter(
        (q) => q.metadata.difficulty === selectedDifficulty.toUpperCase()
      );
    }

    return questions;
  };

  // Convert predefined question to our output format
  const convertPredefinedToOutput = (
    question: PredefinedQuestion,
    language: string
  ): QuestionOutput => {
    const implementation = getImplementationByLanguage(question, language);
    if (!implementation) {
      throw new Error(`Language ${language} not supported for question ${question.title}`);
    }

    return {
      order: parseInt(question.id.split("-")[0]) || 1,
      title: question.title,
      text: question.text,
      language: implementation.language,
      starterCode: implementation.starterCode,
      solutionCode: implementation.solutionCode,
      testCases: question.testCases,
      evaluationCriteria: question.evaluationCriteria,
      gradingRules: question.gradingRules,
      metadata: {
        difficulty: question.metadata.difficulty,
        estimatedDuration: question.metadata.estimatedDuration,
        tags: question.metadata.tags,
      },
    };
  };

  if (selectedQuestion) {
    console.log("selectedQuestion", convertPredefinedToOutput(selectedQuestion, selectedLanguage));
  }
  console.log("customQuestion", customQuestion);

  // Handle selecting a predefined question
  const handleSelectPredefinedQuestion = (question: PredefinedQuestion) => {
    setSelectedQuestion(question);
  };

  // Handle creating final question output
  const handleCreateQuestion = () => {
    let finalQuestion: QuestionOutput;

    if (mode === "predefined" && selectedQuestion) {
      finalQuestion = convertPredefinedToOutput(selectedQuestion, selectedLanguage);
    } else {
      finalQuestion = customQuestion as QuestionOutput;
    }

    // Here you would typically save to your backend
    console.log("Final Question Output:", JSON.stringify(finalQuestion, null, 2));

    // Navigate back to the assessments page
    const basePath = `/dashboard/organization/${org_id}/job/${job_id}/assessments/${form_id}/code`;
    router.push(basePath);
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Create Coding Problem</h1>
            <p className="text-muted-foreground">
              Choose from popular questions or create your own
            </p>
          </div>
        </div>
        <Button
          onClick={handleCreateQuestion}
          disabled={mode === "predefined" && !selectedQuestion}
        >
          <Save className="mr-2 h-4 w-4" />
          Create Question
        </Button>
      </div>

      {/* Mode Selection */}
      <div className="flex items-center gap-4">
        <Button
          variant={mode === "predefined" ? "default" : "outline"}
          onClick={() => setMode("predefined")}
          className="gap-2"
        >
          <BookOpen className="h-4 w-4" />
          Predefined Questions
        </Button>
        <Button
          variant={mode === "custom" ? "default" : "outline"}
          onClick={() => setMode("custom")}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Custom Question
        </Button>
      </div>

      {mode === "predefined" ? (
        <div className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Find Popular Questions
              </CardTitle>
              <CardDescription>
                Browse questions from top tech companies like Google, Amazon, Microsoft, and more
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="space-y-2">
                  <Label>Search</Label>
                  <Input
                    placeholder="Search questions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {SUPPORTED_LANGUAGES.map((lang) => (
                        <SelectItem key={lang} value={lang}>
                          {lang.charAt(0).toUpperCase() + lang.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Topic</Label>
                  <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                    <SelectTrigger>
                      <SelectValue placeholder="All topics" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Topics</SelectItem>
                      {QUESTION_TOPICS.map((topic) => (
                        <SelectItem key={topic} value={topic}>
                          {topic}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Company</Label>
                  <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                    <SelectTrigger>
                      <SelectValue placeholder="All companies" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Companies</SelectItem>
                      <SelectItem value="Google">Google</SelectItem>
                      <SelectItem value="Amazon">Amazon</SelectItem>
                      <SelectItem value="Microsoft">Microsoft</SelectItem>
                      <SelectItem value="Facebook">Facebook</SelectItem>
                      <SelectItem value="Apple">Apple</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Difficulty</Label>
                  <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                    <SelectTrigger>
                      <SelectValue placeholder="All levels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Questions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getFilteredQuestions().map((question) => (
              <Card
                key={question.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedQuestion?.id === question.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => handleSelectPredefinedQuestion(question)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{question.title}</CardTitle>
                    <Badge
                      variant={
                        question.metadata.difficulty === "EASY"
                          ? "default"
                          : question.metadata.difficulty === "MEDIUM"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {question.metadata.difficulty}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {question.text.split("\n")[0]}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {question.metadata.estimatedDuration} min
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Tag className="h-4 w-4" />
                      {question.metadata.topic}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Building2 className="h-4 w-4" />
                      {question.metadata.companies.slice(0, 2).join(", ")}
                      {question.metadata.companies.length > 2 &&
                        ` +${question.metadata.companies.length - 2}`}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {question.metadata.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Selected Question Preview */}
          {selectedQuestion && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Preview: {selectedQuestion.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Problem Description */}
                  <div>
                    <h4 className="font-semibold mb-3">Problem Description</h4>
                    <div className="prose prose-sm max-w-none bg-gray-50 p-4 rounded-lg">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: selectedQuestion.text
                            .replace(/\n/g, "<br>")
                            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                        }}
                      />
                    </div>
                  </div>

                  {/* Problem Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <h5 className="font-medium text-sm text-gray-700">Difficulty</h5>
                      <Badge
                        variant={
                          selectedQuestion.metadata.difficulty === "EASY"
                            ? "default"
                            : selectedQuestion.metadata.difficulty === "MEDIUM"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {selectedQuestion.metadata.difficulty}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <h5 className="font-medium text-sm text-gray-700">Estimated Duration</h5>
                      <p className="text-sm">
                        {selectedQuestion.metadata.estimatedDuration} minutes
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h5 className="font-medium text-sm text-gray-700">Topic</h5>
                      <p className="text-sm">{selectedQuestion.metadata.topic}</p>
                    </div>
                  </div>

                  {/* Evaluation Criteria */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h5 className="font-medium text-sm text-gray-700">Time Complexity</h5>
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                        {selectedQuestion.evaluationCriteria.timeComplexity}
                      </code>
                    </div>
                    <div className="space-y-2">
                      <h5 className="font-medium text-sm text-gray-700">Space Complexity</h5>
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                        {selectedQuestion.evaluationCriteria.spaceComplexity}
                      </code>
                    </div>
                  </div>

                  {/* Test Cases */}
                  <div>
                    <h5 className="font-medium text-sm text-gray-700 mb-3">Test Cases</h5>
                    <div className="space-y-2">
                      {selectedQuestion.testCases.map((testCase, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-lg">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                            <div>
                              <span className="font-medium">Input:</span>{" "}
                              <code>{testCase.input}</code>
                            </div>
                            <div>
                              <span className="font-medium">Output:</span>{" "}
                              <code>{testCase.expected_output}</code>
                            </div>
                            <div>
                              <span className="font-medium">Weight:</span> {testCase.weight}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Code Implementation */}
                  <div>
                    <h4 className="font-semibold mb-3">
                      Code Implementation (
                      {selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)})
                    </h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <MonacoCodeEditor
                          title="Starter Code"
                          language={selectedLanguage}
                          value={
                            getImplementationByLanguage(selectedQuestion, selectedLanguage)
                              ?.starterCode || "// No implementation available for this language"
                          }
                          onChange={() => {}}
                          height="200px"
                          readOnly
                        />
                      </div>
                      <div>
                        <MonacoCodeEditor
                          title="Solution Code"
                          language={selectedLanguage}
                          value={
                            getImplementationByLanguage(selectedQuestion, selectedLanguage)
                              ?.solutionCode || "// No implementation available for this language"
                          }
                          onChange={() => {}}
                          height="200px"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        // Custom Question Creation Mode
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Create Custom Question
              </CardTitle>
              <CardDescription>
                Build your own coding problem with custom requirements and test cases
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Question Order</Label>
                  <Input
                    type="number"
                    value={customQuestion.order}
                    onChange={(e) => updateCustomQuestion("order", parseInt(e.target.value))}
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
                  {/* <Label>Starter Code</Label> */}
                  <MonacoCodeEditor
                    title="Starter Code"
                    language={customQuestion.language || "python"}
                    value={customQuestion.starterCode || ""}
                    onChange={(value) => updateCustomQuestion("starterCode", value)}
                    height="200px"
                  />
                </div>
                <div className="space-y-2">
                  {/* <Label>Solution Code</Label> */}
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
                    <Plus className="h-4 w-4 mr-2" />
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
                              placeholder="e.g., [0,1]"
                              value={testCase.expected_output}
                              onChange={(e) =>
                                updateTestCase(index, "expected_output", e.target.value)
                              }
                            />
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
                                  updateTestCase(index, "weight", parseFloat(e.target.value))
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
                          testCaseWeight: parseFloat(e.target.value),
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
                          codeQualityWeight: parseFloat(e.target.value),
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
                          efficiencyWeight: parseFloat(e.target.value),
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
                          estimatedDuration: parseInt(e.target.value),
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
        </div>
      )}
    </div>
  );
}
