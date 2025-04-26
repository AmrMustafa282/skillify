// "use client";

// import { useState } from "react";
// import { Plus, Trash } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { MonacoCodeEditor } from "@/components/assessment/monaco-code-editor";

// interface TestCaseEditorProps {
//   language: string;
//   value: string;
//   onChange: (value: string) => void;
// }

// export function TestCaseEditor({ language, value, onChange }: TestCaseEditorProps) {
//   const [testCases, setTestCases] = useState([
//     { input: "[1, 2, 3]", expected: "6" },
//     { input: "[4, 5, 6]", expected: "15" },
//   ]);

//   const addTestCase = () => {
//     setTestCases([...testCases, { input: "", expected: "" }]);
//   };

//   const removeTestCase = (index: number) => {
//     const newTestCases = [...testCases];
//     newTestCases.splice(index, 1);
//     setTestCases(newTestCases);
//   };

//   const updateTestCase = (index: number, field: "input" | "expected", value: string) => {
//     const newTestCases = [...testCases];
//     newTestCases[index][field] = value;
//     setTestCases(newTestCases);
//   };

//   // Generate test code based on test cases and language
//   const generateTestCode = () => {
//     let code = "";

//     switch (language) {
//       case "javascript":
//         code = `// Test cases\nfunction runTests() {\n  const testCases = [\n`;
//         testCases.forEach((tc, i) => {
//           code += `    { input: ${tc.input}, expected: ${tc.expected} }${i < testCases.length - 1 ? ",\n" : "\n"}`;
//         });
//         code += `  ];\n  \n  for (const tc of testCases) {\n    const result = solution(tc.input);\n    if (result !== tc.expected) {\n      throw new Error(\`Test failed: Expected \${tc.expected}, got \${result}\`);\n    }\n  }\n  \n  return 'All tests passed!';\n}`;
//         break;

//       case "python":
//         code = `# Test cases\ndef run_tests():\n    test_cases = [\n`;
//         testCases.forEach((tc, i) => {
//           code += `        {'input': ${tc.input}, 'expected': ${tc.expected}}${i < testCases.length - 1 ? ",\n" : "\n"}`;
//         });
//         code += `    ]\n    \n    for tc in test_cases:\n        result = solution(tc['input'])\n        assert result == tc['expected'], f"Test failed: Expected {tc['expected']}, got {result}"\n    \n    return 'All tests passed!'`;
//         break;

//       default:
//         code = value;
//     }

//     return code;
//   };

//   return (
//     <div className="space-y-4">
//       <div className="space-y-4">
//         {testCases.map((testCase, index) => (
//           <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-md">
//             <div className="space-y-2">
//               <Label>Input</Label>
//               <Input
//                 value={testCase.input}
//                 onChange={(e) => updateTestCase(index, "input", e.target.value)}
//                 placeholder="e.g., [1, 2, 3]"
//               />
//             </div>
//             <div className="space-y-2 flex items-center">
//               <div className="flex-1 space-y-2">
//                 <Label>Expected Output</Label>
//                 <Input
//                   value={testCase.expected}
//                   onChange={(e) => updateTestCase(index, "expected", e.target.value)}
//                   placeholder="e.g., 6"
//                 />
//               </div>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={() => removeTestCase(index)}
//                 className="mt-8 ml-2"
//               >
//                 <Trash className="h-4 w-4" />
//               </Button>
//             </div>
//           </div>
//         ))}

//         <Button variant="outline" onClick={addTestCase} className="w-full">
//           <Plus className="mr-2 h-4 w-4" />
//           Add Test Case
//         </Button>
//       </div>

//       <div className="pt-4 border-t">
//         {/* <Label className="mb-2 block">Generated Test Code</Label> */}
//         <MonacoCodeEditor
//           language={language}
//           value={value}
//           onChange={onChange}
//           height="400px"
//           title="Generated Test Code"
//         />
//         <Button variant="outline" onClick={() => onChange(generateTestCode())} className="mt-2">
//           Update Test Code
//         </Button>
//       </div>
//     </div>
//   );
// }

"use client"

import { useState } from "react"
import { PlusCircle, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { MonacoCodeEditor } from "@/components/assessment/monaco-code-editor"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

interface TestCase {
  id: string
  input: string
  expected: string
}

interface TestCaseEditorProps {
  language: string
  value: string
  onChange: (value: string) => void
}

export function TestCaseEditor({ language, value, onChange }: TestCaseEditorProps) {
  const [activeTab, setActiveTab] = useState("visual");
  const [testCases, setTestCases] = useState<TestCase[]>([
    { id: "1", input: "[1, 2, 3]", expected: "6" },
    { id: "2", input: "[4, 5, 6]", expected: "15" },
  ])

  const addTestCase = () => {
    const newId = (testCases.length + 1).toString()
    setTestCases([...testCases, { id: newId, input: "[]", expected: "0" }])
    generateTestCode()
  }

  const updateTestCase = (id: string, field: keyof TestCase, value: string) => {
    setTestCases(testCases.map((tc) => (tc.id === id ? { ...tc, [field]: value } : tc)))
    generateTestCode()
  }

  const removeTestCase = (id: string) => {
    setTestCases(testCases.filter((tc) => tc.id !== id))
    generateTestCode()
  }

  const generateTestCode = () => {
    let code = ""
    switch (language) {
      case "javascript":
        code = `// Test cases
function runTests() {
  const testCases = [
${testCases.map((tc) => `    { input: ${tc.input}, expected: ${tc.expected} }`).join(",\n")}
  ];

  for (const tc of testCases) {
    const result = solution(tc.input);
    if (result !== tc.expected) {
      throw new Error(\`Test failed: Expected \${tc.expected}, got \${result}\`);
    }
  }

  return 'All tests passed!';
}`
        break
      case "python":
        code = `# Test cases
def run_tests():
    test_cases = [
${testCases.map((tc) => `        {'input': ${tc.input}, 'expected': ${tc.expected}}`).join(",\n")}
    ]

    for tc in test_cases:
        result = solution(tc['input'])
        assert result == tc['expected'], f"Test failed: Expected {tc['expected']}, got {result}"

    return 'All tests passed!'`
        break
      case "java":
        code = `// Test cases
public class TestRunner {
    public static void main(String[] args) {
        Solution solution = new Solution();

${testCases
  .map(
    (tc, i) => `        // Test case ${i + 1}
        int[] test${i + 1} = ${tc.input};
        int expected${i + 1} = ${tc.expected};
        int result${i + 1} = solution.solution(test${i + 1});
        assert result${i + 1} == expected${i + 1} : "Test failed: Expected " + expected${i + 1} + ", got " + result${i + 1};`,
  )
  .join("\n\n")}

        System.out.println("All tests passed!");
    }
}`
        break
      default:
        code = `// Test cases for ${language} not implemented yet`
    }
    onChange(code)
  }

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="visual">Visual Editor</TabsTrigger>
          <TabsTrigger value="code">Code Editor</TabsTrigger>
        </TabsList>

        <TabsContent value="visual" className="space-y-6 pt-4">
          <div className="space-y-4">
            {testCases.map((testCase) => (
              <Card key={testCase.id} className="overflow-hidden">
                <CardContent className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`input-${testCase.id}`}>Input</Label>
                    <MonacoCodeEditor
                      language={language}
                      value={testCase.input}
                      onChange={(value) => updateTestCase(testCase.id, "input", value)}
                      height="100px"
                      title={`Test Case ${testCase.id} Input`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`expected-${testCase.id}`}>Expected Output</Label>
                    <MonacoCodeEditor
                      language={language}
                      value={testCase.expected}
                      onChange={(value) => updateTestCase(testCase.id, "expected", value)}
                      height="100px"
                      title={`Test Case ${testCase.id} Expected Output`}
                    />
                  </div>
                  <div className="flex justify-end md:col-span-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeTestCase(testCase.id)}
                      disabled={testCases.length <= 1}
                      className="gap-1"
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button variant="outline" size="sm" onClick={addTestCase} className="gap-1">
              <PlusCircle className="h-4 w-4" />
              Add Test Case
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="code">
          <MonacoCodeEditor
            language={language}
            value={value}
            onChange={onChange}
            height="400px"
            title="Test Cases"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
