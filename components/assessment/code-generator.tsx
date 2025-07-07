"use client";

interface SchemaProperty {
  id: string;
  name: string;
  type: string;
  isRequired: boolean;
  description: string;
  arrayItemType?: string;
  properties?: SchemaProperty[];
}

interface SchemaDefinition {
  inputs: SchemaProperty[];
  output: {
    type: string;
    description: string;
    arrayItemType?: string;
    properties?: SchemaProperty[];
  };
}

export function generateSolutionTemplate(schema: SchemaDefinition, language: string): string {
  switch (language) {
    case "javascript":
      return generateJavaScriptSolution(schema);
    case "python":
      return generatePythonSolution(schema);
    case "java":
      return generateJavaSolution(schema);
    default:
      return `// Solution template for ${language} not implemented yet`;
  }
}

export function generateTestCases(schema: SchemaDefinition, language: string): string {
  switch (language) {
    case "javascript":
      return generateJavaScriptTests(schema);
    case "python":
      return generatePythonTests(schema);
    case "java":
      return generateJavaTests(schema);
    default:
      return `// Test cases for ${language} not implemented yet`;
  }
}

export function generateVerificationCode(schema: SchemaDefinition, language: string): string {
  switch (language) {
    case "javascript":
      return generateJavaScriptVerification(schema);
    case "python":
      return generatePythonVerification(schema);
    case "java":
      return generateJavaVerification(schema);
    default:
      return `// Verification code for ${language} not implemented yet`;
  }
}

// JavaScript code generators
function generateJavaScriptSolution(schema: SchemaDefinition): string {
  const params = schema.inputs.map((input) => input.name).join(", ");
  const returnType =
    schema.output.type === "array" ? `${schema.output.arrayItemType}[]` : schema.output.type;

  return `/**
${schema.inputs
  .map(
    (input) =>
      ` * @param {${
        input.type === "array" ? `${input.arrayItemType}[]` : input.type
      }} ${input.name} - ${input.description}`
  )
  .join("\n")}
 * @return {${returnType}} ${schema.output.description}
 */
function solution(${params}) {
  // Your code here

  return result;
}`;
}

function generateJavaScriptTests(schema: SchemaDefinition): string {
  const params = schema.inputs.map((input) => {
    if (input.type === "array") {
      if (input.arrayItemType === "number") {
        return "[1, 2, 3]";
      } else if (input.arrayItemType === "string") {
        return '["a", "b", "c"]';
      } else if (input.arrayItemType === "boolean") {
        return "[true, false, true]";
      }
    } else if (input.type === "number") {
      return "42";
    } else if (input.type === "string") {
      return '"example"';
    } else if (input.type === "boolean") {
      return "true";
    }
    return "{}";
  });

  const expectedOutput =
    schema.output.type === "array"
      ? schema.output.arrayItemType === "number"
        ? "[6, 7, 8]"
        : schema.output.arrayItemType === "string"
          ? '["x", "y", "z"]'
          : "[true, false]"
      : schema.output.type === "number"
        ? "15"
        : schema.output.type === "string"
          ? '"result"'
          : schema.output.type === "boolean"
            ? "true"
            : "{}";

  return `// Test cases
function runTests() {
  const testCases = [
    {
      input: {${schema.inputs.map((input, i) => `${input.name}: ${params[i]}`).join(", ")}},
      expected: ${expectedOutput}
    },
    {
      input: {${schema.inputs.map((input, i) => `${input.name}: ${params[i]}`).join(", ")}},
      expected: ${expectedOutput}
    }
  ];

  for (const tc of testCases) {
    const result = solution(${schema.inputs.map((input) => `tc.input.${input.name}`).join(", ")});

    // Check if result matches expected output
    const isEqual = JSON.stringify(result) === JSON.stringify(tc.expected);
    if (!isEqual) {
      throw new Error(\`Test failed: Expected \${JSON.stringify(tc.expected)}, got \${JSON.stringify(result)}\`);
    }
  }

  return 'All tests passed!';
}`;
}

function generateJavaScriptVerification(schema: SchemaDefinition): string {
  const params = schema.inputs
    .map((input) => {
      if (input.type === "array") {
        return `${input.name}`;
      }
      return input.name;
    })
    .join(", ");

  return `// Private verification code
function verifyImplementation(solution) {
  // Edge cases
  try {
    ${
      schema.inputs.length > 0
        ? `// Empty inputs
    solution(${schema.inputs
      .map((input) => {
        if (input.type === "array") return "[]";
        if (input.type === "number") return "0";
        if (input.type === "string") return '""';
        if (input.type === "boolean") return "false";
        return "{}";
      })
      .join(", ")});`
        : ""
    }

    // Large inputs
    ${
      schema.inputs.some((input) => input.type === "array")
        ? `const largeArray = Array(10000).fill(1);
    const start = performance.now();
    solution(${schema.inputs
      .map((input) => {
        if (input.type === "array") return "largeArray";
        if (input.type === "number") return "1";
        if (input.type === "string") return '"test"';
        if (input.type === "boolean") return "true";
        return "{}";
      })
      .join(", ")});
    const end = performance.now();

    // Should complete in less than 100ms
    if ((end - start) > 100) {
      return false;
    }`
        : ""
    }

    return true;
  } catch (error) {
    console.error("Verification failed:", error);
    return false;
  }
}`;
}

// Python code generators
function generatePythonSolution(schema: SchemaDefinition): string {
  const params = schema.inputs.map((input) => input.name).join(", ");
  const typingImports = ["List", "Dict", "Any", "Tuple", "Set", "Union", "Optional"].filter(
    (type) =>
      schema.inputs.some((input) => input.type === "array") ||
      schema.output.type === "array" ||
      schema.inputs.some((input) => input.type === "object") ||
      schema.output.type === "object"
  );

  const typeHints = schema.inputs
    .map((input) => {
      if (input.type === "array") {
        const itemType =
          input.arrayItemType === "number"
            ? "int"
            : input.arrayItemType === "string"
              ? "str"
              : input.arrayItemType === "boolean"
                ? "bool"
                : "Any";
        return `${input.name}: List[${itemType}]`;
      } else if (input.type === "number") {
        return `${input.name}: int`;
      } else if (input.type === "string") {
        return `${input.name}: str`;
      } else if (input.type === "boolean") {
        return `${input.name}: bool`;
      }
      return `${input.name}: Dict[str, Any]`;
    })
    .join(", ");

  const returnType =
    schema.output.type === "array"
      ? `List[${
          schema.output.arrayItemType === "number"
            ? "int"
            : schema.output.arrayItemType === "string"
              ? "str"
              : schema.output.arrayItemType === "boolean"
                ? "bool"
                : "Any"
        }]`
      : schema.output.type === "number"
        ? "int"
        : schema.output.type === "string"
          ? "str"
          : schema.output.type === "boolean"
            ? "bool"
            : "Dict[str, Any]";

  return `from typing import ${typingImports.join(", ")}

def solution(${typeHints}) -> ${returnType}:
    """
${schema.inputs.map((input) => `    ${input.name}: ${input.description}`).join("\n")}

    Returns:
        ${returnType}: ${schema.output.description}
    """
    # Your code here

    return result`;
}

function generatePythonTests(schema: SchemaDefinition): string {
  const params = schema.inputs.map((input) => {
    if (input.type === "array") {
      if (input.arrayItemType === "number") {
        return "[1, 2, 3]";
      } else if (input.arrayItemType === "string") {
        return '["a", "b", "c"]';
      } else if (input.arrayItemType === "boolean") {
        return "[True, False, True]";
      }
    } else if (input.type === "number") {
      return "42";
    } else if (input.type === "string") {
      return '"example"';
    } else if (input.type === "boolean") {
      return "True";
    }
    return "{}";
  });

  const expectedOutput =
    schema.output.type === "array"
      ? schema.output.arrayItemType === "number"
        ? "[6, 7, 8]"
        : schema.output.arrayItemType === "string"
          ? '["x", "y", "z"]'
          : "[True, False]"
      : schema.output.type === "number"
        ? "15"
        : schema.output.type === "string"
          ? '"result"'
          : schema.output.type === "boolean"
            ? "True"
            : "{}";

  return `# Test cases
def run_tests():
    test_cases = [
        {
            'input': {${schema.inputs.map((input, i) => `'${input.name}': ${params[i]}`).join(", ")}},
            'expected': ${expectedOutput}
        },
        {
            'input': {${schema.inputs.map((input, i) => `'${input.name}': ${params[i]}`).join(", ")}},
            'expected': ${expectedOutput}
        }
    ]

    for tc in test_cases:
        result = solution(${schema.inputs.map((input) => `tc['input']['${input.name}']`).join(", ")})
        assert result == tc['expected'], f"Test failed: Expected {tc['expected']}, got {result}"

    return 'All tests passed!'`;
}

function generatePythonVerification(schema: SchemaDefinition): string {
  return `# Private verification code
def verify_implementation(solution_func):
    # Edge cases
    try:
        ${
          schema.inputs.length > 0
            ? `# Empty inputs
        solution_func(${schema.inputs
          .map((input) => {
            if (input.type === "array") return "[]";
            if (input.type === "number") return "0";
            if (input.type === "string") return '""';
            if (input.type === "boolean") return "False";
            return "{}";
          })
          .join(", ")})`
            : ""
        }

        # Large inputs
        ${
          schema.inputs.some((input) => input.type === "array")
            ? `import time
        large_array = [1] * 10000
        start = time.time()
        solution_func(${schema.inputs
          .map((input) => {
            if (input.type === "array") return "large_array";
            if (input.type === "number") return "1";
            if (input.type === "string") return '"test"';
            if (input.type === "boolean") return "True";
            return "{}";
          })
          .join(", ")})
        end = time.time()

        # Should complete in less than 100ms
        if (end - start) > 0.1:
            return False`
            : ""
        }

        return True
    except Exception as e:
        print(f"Verification failed: {e}")
        return False`;
}

// Java code generators
function generateJavaSolution(schema: SchemaDefinition): string {
  const javaTypes = {
    number: "int",
    string: "String",
    boolean: "boolean",
    object: "Object",
  };

  const params = schema.inputs
    .map((input) => {
      if (input.type === "array") {
        const itemType = javaTypes[input.arrayItemType as keyof typeof javaTypes] || "Object";
        return `${itemType}[] ${input.name}`;
      }
      const type = javaTypes[input.type as keyof typeof javaTypes] || "Object";
      return `${type} ${input.name}`;
    })
    .join(", ");

  const returnType =
    schema.output.type === "array"
      ? `${javaTypes[schema.output.arrayItemType as keyof typeof javaTypes] || "Object"}[]`
      : javaTypes[schema.output.type as keyof typeof javaTypes] || "Object";

  return `/**
 * ${schema.output.description}
 *
${schema.inputs.map((input) => ` * @param ${input.name} ${input.description}`).join("\n")}
 * @return ${schema.output.description}
 */
public class Solution {
    public ${returnType} solution(${params}) {
        // Your code here

        return result;
    }
}`;
}

function generateJavaTests(schema: SchemaDefinition): string {
  const javaTypes = {
    number: "int",
    string: "String",
    boolean: "boolean",
    object: "Object",
  };

  const testInputs = schema.inputs.map((input, index) => {
    if (input.type === "array") {
      const itemType = javaTypes[input.arrayItemType as keyof typeof javaTypes] || "Object";
      if (itemType === "int") {
        return `${itemType}[] test${index + 1} = new ${itemType}[] {1, 2, 3};`;
      } else if (itemType === "String") {
        return `${itemType}[] test${index + 1} = new ${itemType}[] {"a", "b", "c"};`;
      } else if (itemType === "boolean") {
        return `${itemType}[] test${index + 1} = new ${itemType}[] {true, false, true};`;
      }
      return `${itemType}[] test${index + 1} = new ${itemType}[0];`;
    } else if (input.type === "number") {
      return `int test${index + 1} = 42;`;
    } else if (input.type === "string") {
      return `String test${index + 1} = "example";`;
    } else if (input.type === "boolean") {
      return `boolean test${index + 1} = true;`;
    }
    return `Object test${index + 1} = new Object();`;
  });

  const expectedOutput =
    schema.output.type === "array"
      ? schema.output.arrayItemType === "number"
        ? "new int[] {6, 7, 8}"
        : schema.output.arrayItemType === "string"
          ? 'new String[] {"x", "y", "z"}'
          : "new boolean[] {true, false}"
      : schema.output.type === "number"
        ? "15"
        : schema.output.type === "string"
          ? '"result"'
          : schema.output.type === "boolean"
            ? "true"
            : "new Object()";

  return `// Test cases
public class TestRunner {
    public static void main(String[] args) {
        Solution solution = new Solution();

        // Test case 1
        ${testInputs.join("\n        ")}
        ${
          schema.output.type === "array"
            ? `${javaTypes[schema.output.arrayItemType as keyof typeof javaTypes] || "Object"}[] expected = ${expectedOutput};`
            : `${javaTypes[schema.output.type as keyof typeof javaTypes] || "Object"} expected = ${expectedOutput};`
        }

        ${
          schema.output.type === "array"
            ? `${javaTypes[schema.output.arrayItemType as keyof typeof javaTypes] || "Object"}[] result = solution.solution(${schema.inputs
                .map((_, i) => `test${i + 1}`)
                .join(", ")});

        // Check if arrays are equal
        boolean arraysEqual = java.util.Arrays.equals(result, expected);
        assert arraysEqual : "Test failed: Arrays are not equal";`
            : `${javaTypes[schema.output.type as keyof typeof javaTypes] || "Object"} result = solution.solution(${schema.inputs
                .map((_, i) => `test${i + 1}`)
                .join(", ")});

        assert result.equals(expected) : "Test failed: Expected " + expected + ", got " + result;`
        }

        System.out.println("All tests passed!");
    }
}`;
}

function generateJavaVerification(schema: SchemaDefinition): string {
  const javaTypes = {
    number: "int",
    string: "String",
    boolean: "boolean",
    object: "Object",
  };

  return `// Private verification code
public class Verifier {
    public static boolean verifyImplementation(Solution solution) {
        try {
            ${
              schema.inputs.length > 0
                ? `// Empty inputs
            solution.solution(${schema.inputs
              .map((input) => {
                if (input.type === "array") {
                  const itemType =
                    javaTypes[input.arrayItemType as keyof typeof javaTypes] || "Object";
                  return `new ${itemType}[0]`;
                }
                if (input.type === "number") return "0";
                if (input.type === "string") return '""';
                if (input.type === "boolean") return "false";
                return "new Object()";
              })
              .join(", ")});`
                : ""
            }

            // Large inputs
            ${
              schema.inputs.some((input) => input.type === "array")
                ? `int[] largeArray = new int[10000];
            java.util.Arrays.fill(largeArray, 1);

            long start = System.nanoTime();
            solution.solution(${schema.inputs
              .map((input) => {
                if (input.type === "array") return "largeArray";
                if (input.type === "number") return "1";
                if (input.type === "string") return '"test"';
                if (input.type === "boolean") return "true";
                return "new Object()";
              })
              .join(", ")});
            long end = System.nanoTime();

            // Should complete in less than 100ms
            if ((end - start) / 1_000_000 > 100) {
                return false;
            }`
                : ""
            }

            return true;
        } catch (Exception e) {
            System.err.println("Verification failed: " + e.getMessage());
            return false;
        }
    }
}`;
}
