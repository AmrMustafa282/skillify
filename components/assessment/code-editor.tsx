"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeEditorProps {
  language: string;
  value: string;
  onChange: (value: string) => void;
  height?: string;
}

export function CodeEditor({ language, value, onChange, height = "300px" }: CodeEditorProps) {
  const [copied, setCopied] = useState(false);

  // Map language to highlight class
  const getLanguageClass = () => {
    switch (language) {
      case "javascript":
        return "language-javascript";
      case "python":
        return "language-python";
      case "java":
        return "language-java";
      case "cpp":
        return "language-cpp";
      case "ruby":
        return "language-ruby";
      case "go":
        return "language-go";
      default:
        return "language-javascript";
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-md border">
      <div className="absolute right-2 top-2 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopy}
          className="h-8 w-8 rounded-md bg-background/80 backdrop-blur-sm"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-md font-mono text-sm p-4 focus:outline-none focus:ring-2 focus:ring-ring ${getLanguageClass()}`}
        style={{ height, resize: "vertical" }}
        spellCheck="false"
      />
    </div>
  );
}
