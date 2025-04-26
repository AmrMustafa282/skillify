"use client"

import { useState, useEffect } from "react"
import { PlusCircle, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { MonacoCodeEditor } from "@/components/assessment/monaco-code-editor"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface EdgeCase {
  id: string
  description: string
  input: string
  expected: string
}

interface PerformanceTest {
  id: string
  description: string
  inputSize: number
  timeLimit: number
}

interface VerificationEditorProps {
  language: string
  value: string
  onChange: (value: string) => void
  schema?: any
}

export function VerificationEditor({ language, value, onChange, schema }: VerificationEditorProps) {
  const [activeTab, setActiveTab] = useState("visual")
  const [edgeCases, setEdgeCases] = useState<EdgeCase[]>([
    {
      id: "edge1",
      description: "Empty input",
      input: "[]",
      expected: "0",
    },
    {
      id: "edge2",
      description: "Negative numbers",
      input: "[-1, -2, -3]",
      expected: "-6",
    },
  ])

  const [performanceTests, setPerformanceTests] = useState<PerformanceTest[]>([
    {
      id: "perf1",
      description: "Large array test",
      inputSize: 10000,
      timeLimit: 100,
    },
  ])

  const [includeErrorHandling, setIncludeErrorHandling] = useState(true)

  useEffect(() => {
    if (activeTab === "visual") {
      generateVerificationCode()
    }
  }, [edgeCases, performanceTests, includeErrorHandling, language])

  const addEdgeCase = () => {
    const newId = `edge${edgeCases.length + 1}`
    setEdgeCases([
      ...edgeCases,
      {
        id: newId,
        description: "New edge case",
        input: "[]",
        expected: "0",
      },
    ])
  }

  const updateEdgeCase = (id: string, field: keyof EdgeCase, value: string) => {
    setEdgeCases(edgeCases.map((ec) => (ec.id === id ? { ...ec, [field]: value } : ec)))
  }

  const removeEdgeCase = (id: string) => {
    setEdgeCases(edgeCases.filter((ec) => ec.id !== id))
  }

  const addPerformanceTest = () => {
    const newId = `perf${performanceTests.length + 1}`
    setPerformanceTests([
      ...performanceTests,
      {
        id: newId,
        description: "New performance test",
        inputSize: 5000,
        timeLimit: 100,
      },
    ])
  }

  const updatePerformanceTest = (id: string, field: keyof PerformanceTest, value: any) => {
    setPerformanceTests(performanceTests.map((pt) => (pt.id === id ? { ...pt, [field]: value } : pt)))
  }

  const removePerformanceTest = (id: string) => {
    setPerformanceTests(performanceTests.filter((pt) => pt.id !== id))
  }

  const generateVerificationCode = () => {
    let code = ""
    switch (language) {
      case "javascript":
        code = `// Private verification code
function verifyImplementation(solution) {
  try {
    // Edge cases
${edgeCases
  .map(
    (ec) => `    // ${ec.description}
    if (JSON.stringify(solution(${ec.input})) !== JSON.stringify(${ec.expected})) {
      console.error("Edge case failed: ${ec.description}");
      return false;
    }`,
  )
  .join("\n\n")}

    // Performance tests
${performanceTests
  .map(
    (pt) => `    // ${pt.description}
    const largeArray = Array(${pt.inputSize}).fill(1);
    const start = performance.now();
    solution(largeArray);
    const end = performance.now();

    // Should complete in less than ${pt.timeLimit}ms
    if ((end - start) > ${pt.timeLimit}) {
      console.error("Performance test failed: ${pt.description}");
      return false;
    }`,
  )
  .join("\n\n")}

    return true;
  }${
    includeErrorHandling
      ? ` catch (error) {
    console.error("Verification failed:", error);
    return false;
  }`
      : ""
  }
}`
        break

      case "python":
        code = `# Private verification code
def verify_implementation(solution_func):
    try:
        # Edge cases
${edgeCases
  .map(
    (ec) => `        # ${ec.description}
        if solution_func(${ec.input}) != ${ec.expected}:
            print("Edge case failed: ${ec.description}")
            return False`,
  )
  .join("\n\n")}

        # Performance tests
${performanceTests
  .map(
    (pt) => `        # ${pt.description}
        import time
        large_array = [1] * ${pt.inputSize}
        start = time.time()
        solution_func(large_array)
        end = time.time()

        # Should complete in less than ${pt.timeLimit / 1000} seconds
        if (end - start) > ${pt.timeLimit / 1000}:
            print("Performance test failed: ${pt.description}")
            return False`,
  )
  .join("\n\n")}

        return True
    ${
      includeErrorHandling
        ? `except Exception as e:
        print(f"Verification failed: {e}")
        return False`
        : ""
    }`
        break

      case "java":
        code = `// Private verification code
public class Verifier {
    public static boolean verifyImplementation(Solution solution) {
        try {
            // Edge cases
${edgeCases
  .map(
    (ec) => `            // ${ec.description}
            if (solution.solution(${ec.input.replace(/\[/g, "new int[]{").replace(/\]/g, "")}) != ${ec.expected}) {
                System.err.println("Edge case failed: ${ec.description}");
                return false;
            }`,
  )
  .join("\n\n")}

            // Performance tests
${performanceTests
  .map(
    (pt) => `            // ${pt.description}
            int[] largeArray = new int[${pt.inputSize}];
            java.util.Arrays.fill(largeArray, 1);

            long start = System.nanoTime();
            solution.solution(largeArray);
            long end = System.nanoTime();

            // Should complete in less than ${pt.timeLimit}ms
            if ((end - start) / 1_000_000 > ${pt.timeLimit}) {
                System.err.println("Performance test failed: ${pt.description}");
                return false;
            }`,
  )
  .join("\n\n")}

            return true;
        }${
          includeErrorHandling
            ? ` catch (Exception e) {
            System.err.println("Verification failed: " + e.getMessage());
            return false;
        }`
            : ""
        }
    }
}`
        break

      default:
        code = `// Verification code for ${language} not implemented yet`
    }

    onChange(code)
  }

  const handleCodeChange = (newCode: string) => {
    onChange(newCode)
    // Note: We're not parsing the code back to UI state
    // That would require complex parsing logic
  }

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="visual">Visual Editor</TabsTrigger>
          <TabsTrigger value="code">Code Editor</TabsTrigger>
        </TabsList>

        <TabsContent value="visual" className="space-y-6 pt-4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Edge Cases</h3>
                  <Button variant="outline" size="sm" onClick={addEdgeCase} className="gap-1">
                    <PlusCircle className="h-4 w-4" />
                    Add Edge Case
                  </Button>
                </div>

                {edgeCases.map((edgeCase) => (
                  <div key={edgeCase.id} className="grid grid-cols-1 gap-4 p-4 border rounded-md">
                    <div className="space-y-2">
                      <Label htmlFor={`edge-desc-${edgeCase.id}`}>Description</Label>
                      <Input
                        id={`edge-desc-${edgeCase.id}`}
                        value={edgeCase.description}
                        onChange={(e) => updateEdgeCase(edgeCase.id, "description", e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`edge-input-${edgeCase.id}`}>Input</Label>
                        <Input
                          id={`edge-input-${edgeCase.id}`}
                          value={edgeCase.input}
                          onChange={(e) => updateEdgeCase(edgeCase.id, "input", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`edge-expected-${edgeCase.id}`}>Expected Output</Label>
                        <Input
                          id={`edge-expected-${edgeCase.id}`}
                          value={edgeCase.expected}
                          onChange={(e) => updateEdgeCase(edgeCase.id, "expected", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeEdgeCase(edgeCase.id)}
                        disabled={edgeCases.length <= 1}
                        className="gap-1"
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Performance Tests</h3>
                  <Button variant="outline" size="sm" onClick={addPerformanceTest} className="gap-1">
                    <PlusCircle className="h-4 w-4" />
                    Add Performance Test
                  </Button>
                </div>

                {performanceTests.map((perfTest) => (
                  <div key={perfTest.id} className="grid grid-cols-1 gap-4 p-4 border rounded-md">
                    <div className="space-y-2">
                      <Label htmlFor={`perf-desc-${perfTest.id}`}>Description</Label>
                      <Input
                        id={`perf-desc-${perfTest.id}`}
                        value={perfTest.description}
                        onChange={(e) => updatePerformanceTest(perfTest.id, "description", e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`perf-size-${perfTest.id}`}>Input Size</Label>
                        <Input
                          id={`perf-size-${perfTest.id}`}
                          type="number"
                          value={perfTest.inputSize}
                          onChange={(e) =>
                            updatePerformanceTest(perfTest.id, "inputSize", Number.parseInt(e.target.value) || 1000)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`perf-time-${perfTest.id}`}>Time Limit (ms)</Label>
                        <Input
                          id={`perf-time-${perfTest.id}`}
                          type="number"
                          value={perfTest.timeLimit}
                          onChange={(e) =>
                            updatePerformanceTest(perfTest.id, "timeLimit", Number.parseInt(e.target.value) || 100)
                          }
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removePerformanceTest(perfTest.id)}
                        disabled={performanceTests.length <= 1}
                        className="gap-1"
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="error-handling"
                  checked={includeErrorHandling}
                  onCheckedChange={(checked) => setIncludeErrorHandling(!!checked)}
                />
                <Label htmlFor="error-handling" className="text-base">
                  Include error handling
                </Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="code">
          <MonacoCodeEditor
            language={language}
            value={value}
            onChange={handleCodeChange}
            height="500px"
            title="Verification Code"
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
