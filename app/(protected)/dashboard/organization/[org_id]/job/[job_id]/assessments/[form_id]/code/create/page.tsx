"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Check, Code, FlaskConical, Lightbulb, Save, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MonacoCodeEditor } from "@/components/assessment/monaco-code-editor";
import { TestCaseEditor } from "@/components/assessment/test-case-editor";
import { AIEnhanceDialog } from "@/components/assessment/ai-enhance-dialog";
import { SchemaEditor } from "@/components/assessment/schema-editor";
import { MarkdownEditor } from "@/components/markdown-editor";
import { VerificationEditor } from "@/components/assessment/verification-editor";
import {
  generateSolutionTemplate,
  generateTestCases,
  generateVerificationCode,
} from "@/components/assessment/code-generator";

export default function CreateCodingProblemPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateParam = searchParams.get("template");
  const { org_id, job_id, form_id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [language, setLanguage] = useState(templateParam || "javascript");
  const [showAIDialog, setShowAIDialog] = useState(false);

  // Schema state
  const [schema, setSchema] = useState<any>(null);
  const [schemaCode, setSchemaCode] = useState("");

  // Template code based on selected language
  const getTemplateCode = (language: string) => {
    if (schema) {
      return generateSolutionTemplate(schema, language);
    }

    switch (language) {
      case "javascript":
        return "/**\n * @param {number[]} nums\n * @return {number}\n */\nfunction solution(nums) {\n  // Your code here\n  \n  return result;\n}";
      case "python":
        return "def solution(nums):\n    # Your code here\n    \n    return result";
      case "java":
        return "public class Solution {\n    public int solution(int[] nums) {\n        // Your code here\n        \n        return result;\n    }\n}";
      default:
        return "// Write your solution here";
    }
  };

  // Template test code based on selected language
  const getTemplateTestCode = (language: string) => {
    if (schema) {
      return generateTestCases(schema, language);
    }

    switch (language) {
      case "javascript":
        return "// Test cases\nfunction runTests() {\n  const testCases = [\n    { input: [1, 2, 3], expected: 6 },\n    { input: [4, 5, 6], expected: 15 }\n  ];\n  \n  for (const tc of testCases) {\n    const result = solution(tc.input);\n    if (result !== tc.expected) {\n      throw new Error(`Test failed: Expected ${tc.expected}, got ${result}`);\n    }\n  }\n  \n  return 'All tests passed!';\n}";
      case "python":
        return "# Test cases\ndef run_tests():\n    test_cases = [\n        {'input': [1, 2, 3], 'expected': 6},\n        {'input': [4, 5, 6], 'expected': 15}\n    ]\n    \n    for tc in test_cases:\n        result = solution(tc['input'])\n        assert result == tc['expected'], f\"Test failed: Expected {tc['expected']}, got {result}\"\n    \n    return 'All tests passed!'";
      case "java":
        return '// Test cases\npublic class TestRunner {\n    public static void main(String[] args) {\n        Solution solution = new Solution();\n        \n        int[] test1 = {1, 2, 3};\n        int expected1 = 6;\n        int result1 = solution.solution(test1);\n        assert result1 == expected1 : "Test failed: Expected " + expected1 + ", got " + result1;\n        \n        int[] test2 = {4, 5, 6};\n        int expected2 = 15;\n        int result2 = solution.solution(test2);\n        assert result2 == expected2 : "Test failed: Expected " + expected2 + ", got " + result2;\n        \n        System.out.println("All tests passed!");\n    }\n}';
      default:
        return "// Write your test cases here";
    }
  };

  // Template verification code based on selected language
  const getTemplateVerificationCode = (language: string) => {
    if (schema) {
      return generateVerificationCode(schema, language);
    }

    switch (language) {
      case "javascript":
        return "// Private verification code\nfunction verifyImplementation(solution) {\n  // Edge cases\n  if (solution([]) !== 0) return false;\n  if (solution([-1, -2, -3]) !== -6) return false;\n  \n  // Performance test\n  const largeArray = Array(10000).fill(1);\n  const start = performance.now();\n  solution(largeArray);\n  const end = performance.now();\n  \n  // Should complete in less than 100ms\n  return (end - start) < 100;\n}";
      case "python":
        return "# Private verification code\ndef verify_implementation(solution_func):\n    # Edge cases\n    if solution_func([]) != 0:\n        return False\n    if solution_func([-1, -2, -3]) != -6:\n        return False\n    \n    # Performance test\n    import time\n    large_array = [1] * 10000\n    start = time.time()\n    solution_func(large_array)\n    end = time.time()\n    \n    # Should complete in less than 100ms\n    return (end - start) < 0.1";
      case "java":
        return "// Private verification code\npublic class Verifier {\n    public static boolean verifyImplementation(Solution solution) {\n        // Edge cases\n        if (solution.solution(new int[]{}) != 0) return false;\n        if (solution.solution(new int[]{-1, -2, -3}) != -6) return false;\n        \n        // Performance test\n        int[] largeArray = new int[10000];\n        java.util.Arrays.fill(largeArray, 1);\n        \n        long start = System.nanoTime();\n        solution.solution(largeArray);\n        long end = System.nanoTime();\n        \n        // Should complete in less than 100ms\n        return (end - start) / 1_000_000 < 100;\n    }\n}";
      default:
        return "// Write your verification code here";
    }
  };

  const [solutionCode, setSolutionCode] = useState(getTemplateCode(language));
  const [testCode, setTestCode] = useState(getTemplateTestCode(language));
  const [verificationCode, setVerificationCode] = useState(getTemplateVerificationCode(language));

  useEffect(() => {
    setSolutionCode(getTemplateCode(language));
    setTestCode(getTemplateTestCode(language));
    setVerificationCode(getTemplateVerificationCode(language));
  }, [language, schema]);

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    const params = new URLSearchParams(searchParams.toString());
    params.set("template", value);
    router.replace(
      `/dashboard/organization/${org_id}/job/${job_id}/assessments/${form_id}/code/create?${params.toString()}`
    );
  };

  const handleAIEnhance = () => {
    setShowAIDialog(true);
  };

  const handleAIEnhanceComplete = (enhancedDescription: string) => {
    setDescription(enhancedDescription);
    setShowAIDialog(false);
  };

  const handleSchemaChange = (newSchema: any, newSchemaCode: string) => {
    setSchema(newSchema);
    setSchemaCode(newSchemaCode);

    // Update solution, test, and verification code based on the new schema
    setSolutionCode(generateSolutionTemplate(newSchema, language));
    setTestCode(generateTestCases(newSchema, language));
    setVerificationCode(generateVerificationCode(newSchema, language));
  };

  const handleSave = () => {
    const basePath = `/dashboard/organization/${org_id}/job/${job_id}/assessments/${form_id}/code`;
    router.push(basePath);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Create Coding Assessment</h1>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Assessment
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Problem Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Two Sum"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Programming Language</Label>
                <Select value={language} onValueChange={handleLanguageChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                    <SelectItem value="cpp">C++</SelectItem>
                    <SelectItem value="ruby">Ruby</SelectItem>
                    <SelectItem value="go">Go</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <MarkdownEditor
              value={description}
              onChange={setDescription}
              onAIEnhance={handleAIEnhance}
              label="Problem Description"
              placeholder="Describe the problem, constraints, and examples..."
            />

            <AIEnhanceDialog
              open={showAIDialog}
              onOpenChange={setShowAIDialog}
              originalDescription={description}
              onEnhance={handleAIEnhanceComplete}
            />
          </CardContent>
        </Card>

        <Tabs defaultValue="schema">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="schema" className="gap-2">
              <Database className="h-4 w-4" />
              Question Schema
            </TabsTrigger>
            <TabsTrigger value="solution" className="gap-2">
              <Code className="h-4 w-4" />
              Solution Template
            </TabsTrigger>
            <TabsTrigger value="tests" className="gap-2">
              <FlaskConical className="h-4 w-4" />
              Test Cases
            </TabsTrigger>
            <TabsTrigger value="verification" className="gap-2">
              <Check className="h-4 w-4" />
              Verification Code
            </TabsTrigger>
          </TabsList>

          <TabsContent value="schema" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <SchemaEditor
                  language={language}
                  onChange={handleSchemaChange}
                  key={language} // Add a key prop to force re-render when language changes
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="solution" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <MonacoCodeEditor
                    language={language}
                    value={solutionCode}
                    onChange={setSolutionCode}
                    height="400px"
                    title="Solution Template"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tests" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-lg font-medium">Test Cases</Label>
                    <Button variant="outline" size="sm">
                      <Lightbulb className="mr-2 h-4 w-4" />
                      Generate Tests
                    </Button>
                  </div>
                  <TestCaseEditor language={language} value={testCode} onChange={setTestCode} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="verification" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <VerificationEditor
                  language={language}
                  value={verificationCode}
                  onChange={setVerificationCode}
                  schema={schema}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
