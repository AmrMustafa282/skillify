"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Code, Edit, Eye, EyeOff, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MonacoCodeEditor } from "@/components/assessment/monaco-code-editor";

export default function ProblemDetailPage({
  params,
}: {
  params: { org_id: string; job_id: string; form_id: string; id: string };
}) {
  const [showSolution, setShowSolution] = useState(false);
  const basePath = `/dashboard/organization/${params.org_id}/job/${params.job_id}/assessments/${params.form_id}/add-coding`;

  // Mock data for the problem
  const problem = {
    id: params.id,
    title: "Array Sum Problem",
    description: `## Description

Given an array of integers, return the sum of all elements in the array.

## Examples

**Example 1:**

\`\`\`
Input: [1, 2, 3]
Output: 6
Explanation: 1 + 2 + 3 = 6
\`\`\`

**Example 2:**

\`\`\`
Input: [4, 5, 6]
Output: 15
Explanation: 4 + 5 + 6 = 15
\`\`\`

## Constraints

- The length of the input array will be between 0 and 10^5
- Each element in the array will be between -10^9 and 10^9`,
    language: "javascript",
    difficulty: "Easy",
    createdAt: "2023-04-15",
    submissions: 45,
    solutionCode: `/**
 * @param {number[]} nums
 * @return {number}
 */
function solution(nums) {
  // Initialize sum to 0
  let sum = 0;

  // Iterate through each element and add to sum
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
  }

  return sum;
}`,
    testCode: `// Test cases
function runTests() {
  const testCases = [
    { input: [1, 2, 3], expected: 6 },
    { input: [4, 5, 6], expected: 15 },
    { input: [], expected: 0 },
    { input: [-1, -2, -3], expected: -6 }
  ];

  for (const tc of testCases) {
    const result = solution(tc.input);
    if (result !== tc.expected) {
      throw new Error(\`Test failed: Expected \${tc.expected}, got \${result}\`);
    }
  }

  return 'All tests passed!';
}`,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`${basePath}/problems`}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">{problem.title}</h2>
        <span
          className={`ml-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            problem.difficulty === "Easy"
              ? "bg-green-100 text-green-800"
              : problem.difficulty === "Medium"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
          }`}
        >
          {problem.difficulty}
        </span>
      </div>

      <div className="flex justify-end gap-2">
        <Link href={`${basePath}/problems/${problem.id}/edit`}>
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit Problem
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Problem Description</CardTitle>
          <CardDescription>
            Language: {problem.language} | Created: {problem.createdAt} | Submissions:{" "}
            {problem.submissions}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none dark:prose-invert">
            <div
              dangerouslySetInnerHTML={{ __html: problem.description.replace(/\n/g, "<br />") }}
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="solution">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="solution" className="gap-2">
            <Code className="h-4 w-4" />
            Solution
          </TabsTrigger>
          <TabsTrigger value="tests" className="gap-2">
            <FlaskConical className="h-4 w-4" />
            Test Cases
          </TabsTrigger>
        </TabsList>

        <TabsContent value="solution" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Solution Template</CardTitle>
              <Button variant="outline" size="sm" onClick={() => setShowSolution(!showSolution)}>
                {showSolution ? (
                  <>
                    <EyeOff className="mr-2 h-4 w-4" />
                    Hide Solution
                  </>
                ) : (
                  <>
                    <Eye className="mr-2 h-4 w-4" />
                    Show Solution
                  </>
                )}
              </Button>
            </CardHeader>
            <CardContent>
              <MonacoCodeEditor
                language={problem.language}
                value={
                  showSolution
                    ? problem.solutionCode
                    : problem.solutionCode.replace(
                        /\/\/ Initialize.*return sum;/s,
                        "  // Your code here\n  \n  return result;"
                      )
                }
                onChange={() => {}}
                readOnly={true}
                height="300px"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tests" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Test Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <MonacoCodeEditor
                language={problem.language}
                value={problem.testCode}
                onChange={() => {}}
                readOnly={true}
                height="300px"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
