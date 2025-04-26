"use client";

import { useState, useEffect } from "react";
import { PlusCircle, Trash2, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MonacoCodeEditor } from "@/components/assessment/monaco-code-editor";

type SchemaType = "string" | "number" | "boolean" | "array" | "object";

interface SchemaProperty {
  id: string;
  name: string;
  type: SchemaType;
  isRequired: boolean;
  description: string;
  arrayItemType?: SchemaType;
  properties?: SchemaProperty[];
}

interface SchemaDefinition {
  inputs: SchemaProperty[];
  output: {
    type: SchemaType;
    description: string;
    arrayItemType?: SchemaType;
    properties?: SchemaProperty[];
  };
}

// Helper function to generate descriptions based on type
const generateDescription = (
  type: SchemaType,
  name: string,
  isOutput = false,
  arrayItemType?: SchemaType
): string => {
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

  switch (type) {
    case "string":
      return isOutput ? `A string representing the ${name}` : `A string input for ${name}`;
    case "number":
      return isOutput ? `A numeric value representing the ${name}` : `A numeric input for ${name}`;
    case "boolean":
      return isOutput
        ? `A boolean indicating whether the operation was successful`
        : `A boolean flag indicating ${name}`;
    case "array":
      if (arrayItemType === "number") {
        return isOutput
          ? `An array of numbers representing the result`
          : `An array of numbers to process`;
      } else if (arrayItemType === "string") {
        return isOutput
          ? `An array of strings representing the result`
          : `An array of strings to process`;
      } else if (arrayItemType === "boolean") {
        return isOutput
          ? `An array of boolean values representing the result`
          : `An array of boolean flags`;
      } else {
        return isOutput
          ? `An array of items representing the result`
          : `An array of items to process`;
      }
    case "object":
      return isOutput
        ? `An object containing the result data`
        : `An object containing the ${name} data`;
    default:
      return isOutput ? `The result of the operation` : `Parameter description`;
  }
};

export function SchemaEditor({
  language,
  onChange,
}: {
  language: string;
  onChange: (schema: SchemaDefinition, schemaCode: string) => void;
}) {
  const [schema, setSchema] = useState<SchemaDefinition>({
    inputs: [
      {
        id: "input1",
        name: "nums",
        type: "array",
        arrayItemType: "number",
        isRequired: true,
        description: "An array of integers",
      },
    ],
    output: {
      type: "number",
      description: "The result of the operation",
    },
  });
  const [isMounted, setIsMounted] = useState(false);

  const generateSchemaCode = (schema: SchemaDefinition): string => {
    const getTypeAnnotation = (type: SchemaType, arrayItemType?: SchemaType): string => {
      switch (language) {
        case "javascript":
        case "typescript":
          if (type === "array" && arrayItemType) {
            return `${arrayItemType}[]`;
          }
          return type;
        case "python":
          if (type === "array" && arrayItemType) {
            return `List[${arrayItemType.charAt(0).toUpperCase() + arrayItemType.slice(1)}]`;
          }
          return type === "number" ? "int" : type.charAt(0).toUpperCase() + type.slice(1);
        case "java":
          if (type === "array" && arrayItemType) {
            switch (arrayItemType) {
              case "number":
                return "int[]";
              case "string":
                return "String[]";
              case "boolean":
                return "boolean[]";
              default:
                return "Object[]";
            }
          }
          switch (type) {
            case "number":
              return "int";
            case "string":
              return "String";
            case "boolean":
              return "boolean";
            case "object":
              return "Object";
            default:
              return type;
          }
        default:
          return type;
      }
    };

    let code = "";
    switch (language) {
      case "javascript":
        code = `/**
 * @typedef {Object} ProblemSchema
 * @property {Object} inputs - Input parameters
${schema.inputs
  .map(
    (input) =>
      ` * @property {${getTypeAnnotation(
        input.type,
        input.arrayItemType
      )}} inputs.${input.name} - ${input.description}`
  )
  .join("\n")}
 * @property {${getTypeAnnotation(
   schema.output.type,
   schema.output.arrayItemType
 )}} output - ${schema.output.description}
 */

/**
${schema.inputs
  .map(
    (input) =>
      ` * @param {${getTypeAnnotation(input.type, input.arrayItemType)}} ${input.name} - ${input.description}`
  )
  .join("\n")}
 * @return {${getTypeAnnotation(schema.output.type, schema.output.arrayItemType)}} ${schema.output.description}
 */`;
        break;
      case "python":
        code = `from typing import List, Dict, Any

# Problem Schema
# Inputs:
${schema.inputs
  .map(
    (input) =>
      `#   ${input.name}: ${getTypeAnnotation(input.type, input.arrayItemType)} - ${input.description}`
  )
  .join("\n")}
# Output:
#   ${getTypeAnnotation(schema.output.type, schema.output.arrayItemType)} - ${schema.output.description}`;
        break;
      case "java":
        code = `/**
 * Problem Schema
 * Inputs:
${schema.inputs
  .map(
    (input) =>
      ` *   ${input.name}: ${getTypeAnnotation(input.type, input.arrayItemType)} - ${input.description}`
  )
  .join("\n")}
 * Output:
 *   ${getTypeAnnotation(schema.output.type, schema.output.arrayItemType)} - ${schema.output.description}
 */`;
        break;
      default:
        code = `// Schema definition
// Inputs:
${schema.inputs
  .map(
    (input) =>
      `//   ${input.name}: ${getTypeAnnotation(input.type, input.arrayItemType)} - ${input.description}`
  )
  .join("\n")}
// Output:
//   ${getTypeAnnotation(schema.output.type, schema.output.arrayItemType)} - ${schema.output.description}`;
    }

    return code;
  };

  const [schemaCode, setSchemaCode] = useState<string>(generateSchemaCode(schema));

  useEffect(() => {
    // Regenerate schema code when language changes
    const newSchemaCode = generateSchemaCode(schema);
    setSchemaCode(newSchemaCode);
    onChange(schema, newSchemaCode);
  }, [language]);

  const handleSchemaChange = (newSchema: SchemaDefinition) => {
    setSchema(newSchema);
    const newSchemaCode = generateSchemaCode(newSchema);
    setSchemaCode(newSchemaCode);
    onChange(newSchema, newSchemaCode);
  };

  const addInput = () => {
    const newInput: SchemaProperty = {
      id: `input${schema.inputs.length + 1}`,
      name: `param${schema.inputs.length + 1}`,
      type: "number",
      isRequired: true,
      description: generateDescription("number", `param${schema.inputs.length + 1}`),
    };
    handleSchemaChange({
      ...schema,
      inputs: [...schema.inputs, newInput],
    });
  };

  const updateInput = (index: number, updatedInput: Partial<SchemaProperty>) => {
    const newInputs = [...schema.inputs];
    const currentInput = newInputs[index];

    // If type is changing, update the description automatically
    if (updatedInput.type && updatedInput.type !== currentInput.type) {
      const newType = updatedInput.type;
      const arrayItemType =
        newType === "array" ? updatedInput.arrayItemType || "number" : undefined;
      updatedInput.description = generateDescription(
        newType,
        currentInput.name,
        false,
        arrayItemType
      );
    }

    // If array item type is changing, update the description
    if (updatedInput.arrayItemType && currentInput.type === "array") {
      updatedInput.description = generateDescription(
        "array",
        currentInput.name,
        false,
        updatedInput.arrayItemType
      );
    }

    // If name is changing, update the description to reflect the new name
    if (updatedInput.name && updatedInput.name !== currentInput.name) {
      updatedInput.description = generateDescription(
        currentInput.type,
        updatedInput.name,
        false,
        currentInput.type === "array" ? currentInput.arrayItemType : undefined
      );
    }

    newInputs[index] = { ...currentInput, ...updatedInput };
    handleSchemaChange({
      ...schema,
      inputs: newInputs,
    });
  };

  const removeInput = (index: number) => {
    const newInputs = [...schema.inputs];
    newInputs.splice(index, 1);
    handleSchemaChange({
      ...schema,
      inputs: newInputs,
    });
  };

  const updateOutput = (updatedOutput: Partial<typeof schema.output>) => {
    const currentOutput = schema.output;

    // If type is changing, update the description automatically
    if (updatedOutput.type && updatedOutput.type !== currentOutput.type) {
      const newType = updatedOutput.type;
      const arrayItemType =
        newType === "array" ? updatedOutput.arrayItemType || "number" : undefined;
      updatedOutput.description = generateDescription(newType, "result", true, arrayItemType);
    }

    // If array item type is changing, update the description
    if (updatedOutput.arrayItemType && currentOutput.type === "array") {
      updatedOutput.description = generateDescription(
        "array",
        "result",
        true,
        updatedOutput.arrayItemType
      );
    }

    handleSchemaChange({
      ...schema,
      output: { ...currentOutput, ...updatedOutput },
    });
  };

  const handleCodeChange = (newCode: string) => {
    setSchemaCode(newCode);
    // Note: We're not updating the schema object from code changes
    // This would require parsing the code back to schema which is complex
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Prevent rendering until mounted
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Input Parameters</h3>
                  <Button variant="outline" size="sm" onClick={addInput} className="gap-1">
                    <PlusCircle className="h-4 w-4" />
                    Add Input
                  </Button>
                </div>

                {schema.inputs.map((input, index) => (
                  <div key={input.id} className="grid grid-cols-1 gap-4 p-4 border rounded-md">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`input-name-${index}`}>Name</Label>
                        <Input
                          id={`input-name-${index}`}
                          value={input.name}
                          onChange={(e) => updateInput(index, { name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`input-type-${index}`}>Type</Label>
                        <Select
                          value={input.type}
                          onValueChange={(value: SchemaType) => {
                            const update: Partial<SchemaProperty> = { type: value };
                            if (value === "array") {
                              update.arrayItemType = "number";
                            } else {
                              delete update.arrayItemType;
                            }
                            updateInput(index, update);
                          }}
                        >
                          <SelectTrigger id={`input-type-${index}`}>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="string">String</SelectItem>
                            <SelectItem value="number">Number</SelectItem>
                            <SelectItem value="boolean">Boolean</SelectItem>
                            <SelectItem value="array">Array</SelectItem>
                            <SelectItem value="object">Object</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {input.type === "array" && (
                      <div className="space-y-2">
                        <Label htmlFor={`input-array-type-${index}`}>Array Item Type</Label>
                        <Select
                          value={input.arrayItemType || "number"}
                          onValueChange={(value: SchemaType) =>
                            updateInput(index, { arrayItemType: value })
                          }
                        >
                          <SelectTrigger id={`input-array-type-${index}`}>
                            <SelectValue placeholder="Select array item type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="string">String</SelectItem>
                            <SelectItem value="number">Number</SelectItem>
                            <SelectItem value="boolean">Boolean</SelectItem>
                            <SelectItem value="object">Object</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`input-desc-${index}`}>Description</Label>
                        <span className="text-xs text-muted-foreground">(Auto-generated)</span>
                      </div>
                      <Input
                        id={`input-desc-${index}`}
                        value={input.description}
                        onChange={(e) => updateInput(index, { description: e.target.value })}
                        className="text-muted-foreground"
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeInput(index)}
                        disabled={schema.inputs.length <= 1}
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
                <h3 className="text-lg font-medium">Output</h3>

                <div className="grid grid-cols-1 gap-4 p-4 border rounded-md">
                  <div className="space-y-2">
                    <Label htmlFor="output-type">Type</Label>
                    <Select
                      value={schema.output.type}
                      onValueChange={(value: SchemaType) => {
                        const update: Partial<typeof schema.output> = {
                          type: value,
                        };
                        if (value === "array") {
                          update.arrayItemType = "number";
                        } else {
                          delete update.arrayItemType;
                        }
                        updateOutput(update);
                      }}
                    >
                      <SelectTrigger id="output-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="string">String</SelectItem>
                        <SelectItem value="number">Number</SelectItem>
                        <SelectItem value="boolean">Boolean</SelectItem>
                        <SelectItem value="array">Array</SelectItem>
                        <SelectItem value="object">Object</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {schema.output.type === "array" && (
                    <div className="space-y-2">
                      <Label htmlFor="output-array-type">Array Item Type</Label>
                      <Select
                        value={schema.output.arrayItemType || "number"}
                        onValueChange={(value: SchemaType) =>
                          updateOutput({ arrayItemType: value })
                        }
                      >
                        <SelectTrigger id="output-array-type">
                          <SelectValue placeholder="Select array item type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="string">String</SelectItem>
                          <SelectItem value="number">Number</SelectItem>
                          <SelectItem value="boolean">Boolean</SelectItem>
                          <SelectItem value="object">Object</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="output-desc">Description</Label>
                      <span className="text-xs text-muted-foreground">(Auto-generated)</span>
                    </div>
                    <Input
                      id="output-desc"
                      value={schema.output.description}
                      onChange={(e) => updateOutput({ description: e.target.value })}
                      className="text-muted-foreground"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>UI Schema</span>
            <ArrowDown className="h-4 w-4" />
            <span>Generated Code</span>
          </div>
          <MonacoCodeEditor
            language={language}
            value={schemaCode}
            onChange={handleCodeChange}
            height="500px"
            title="Schema Definition"
          />
        </div>
      </div>
    </div>
  );
}
