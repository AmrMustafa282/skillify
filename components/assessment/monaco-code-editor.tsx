"use client";
import { useEffect, useRef, useState } from "react";
import { Braces, Check, Copy, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import Editor, { type Monaco } from "@monaco-editor/react";
import { toast } from "react-hot-toast";
import type * as monaco from "monaco-editor";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Label } from "../ui/label";

interface MonacoCodeEditorProps {
  language: string;
  value: string;
  onChange: (value: string) => void;
  height?: string;
  title?: string;
  readOnly?: boolean;
}

export function MonacoCodeEditor({
  language,
  value,
  onChange,
  height = "300px",
  title,
  readOnly = false,
}: MonacoCodeEditorProps) {
  const [copied, setCopied] = useState(false);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<Monaco | null>(null);
  const { theme: currentTheme } = useTheme();
  // const [theme, setTheme] = useState(currentTheme === "light" ? "vs-light-custom" : "vs-light-custom");

  console.log(currentTheme)

  const getMonacoLanguage = () => {
    switch (language.toLowerCase()) {
      case "javascript":
        return "javascript";
      case "python":
        return "python";
      case "java":
        return "java";
      case "cpp":
        return "cpp";
      case "ruby":
        return "ruby";
      case "go":
        return "go";
      default:
        return "javascript";
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    toast.success("Code copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor, monaco: Monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    // Define custom themes
    monaco.editor.defineTheme("vs-dark-custom", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#1e1e2e",
        "editor.foreground": "#f8f8f2",
        "editor.lineHighlightBackground": "#2a2a3c",
        "editor.selectionBackground": "#44475a",
        "editor.inactiveSelectionBackground": "#3a3a4e",
      },
    });

    monaco.editor.defineTheme("vs-light-custom", {
      base: "vs",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#ffffff",
        "editor.foreground": "#1f1f1f",
        "editor.lineHighlightBackground": "#f5f5f5",
        "editor.selectionBackground": "#d0d0d0",
        "editor.inactiveSelectionBackground": "#e5e5e5",
      },
    });

    editor.updateOptions({
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      fontSize: 14,
      lineNumbers: "on",
      readOnly: readOnly,
      tabSize: 2,
      wordWrap: "on",
      padding: { top: 16, bottom: 16 },
      smoothScrolling: true,
      cursorBlinking: "smooth",
      cursorSmoothCaretAnimation: "on",
      renderLineHighlight: "all",
      roundedSelection: true,
      automaticLayout: true,
    });

    monaco.editor.setTheme(currentTheme === "dark" ? "vs-dark-custom" : "vs-light-custom");
  };

  // const handleTheme = () => {
  //   const newTheme = theme === "vs-dark-custom" ? "vs-light-custom" : "vs-dark-custom";
  //   // setTheme(newTheme);
  //   localStorage.setItem("code-editor-theme", newTheme);
  //   if (monacoRef.current) {
  //     monacoRef.current.editor.setTheme(newTheme);
  //   }
  // };

  useEffect(() => {
    if (monacoRef.current) {
      monacoRef.current.editor.setTheme(currentTheme === "dark" ? "vs-dark-custom" : "vs-light-custom");
    }
  }, [currentTheme]);

  const formatCode = () => {
    if (editorRef.current) {
      editorRef.current.getAction("editor.action.formatDocument")?.run();
      toast.success("Code formatted successfully");
    }
  };

  return (
    <div className="relative rounded-md border overflow-hidden">
      <div
        className={cn(
          "flex justify-between items-center p-2",
          currentTheme === "dark"
            ? "bg-[#1e1e2e]/80 backdrop-blur-sm"
            : "bg-[#ffffff] backdrop-blur-sm"
        )}
      >
        <Label
          className={cn(
            "text-md font-medium",
            currentTheme === "dark" ? "text-white" : "text-black"
          )}
        >
          {title}
        </Label>
        <div className="space-x-2">
          {/* <Button
            variant="secondary"
            size="icon"
            onClick={handleTheme}
            className="h-8 w-8 rounded-md bg-background/80 backdrop-blur-sm transition-all"
            title="Toggle theme"
          >
            {theme === "vs-dark-custom" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button> */}
          <Button
            variant="secondary"
            size="icon"
            onClick={formatCode}
            className="h-8 w-8 rounded-md bg-background/80 backdrop-blur-sm transition-all"
            title="Format code"
          >
            <Braces className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={handleCopy}
            className="h-8 w-8 rounded-md bg-background/80 backdrop-blur-sm transition-all"
            title="Copy code"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      <Editor
        height={height}
        language={getMonacoLanguage()}
        value={value}
        onChange={(value) => onChange(value || "")}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
          lineNumbers: "on",
          readOnly: readOnly,
          tabSize: 2,
          wordWrap: "on",
          padding: { top: 16, bottom: 16 },
          smoothScrolling: true,
          cursorBlinking: "smooth",
          cursorSmoothCaretAnimation: "on",
          renderLineHighlight: "all",
          roundedSelection: true,
          automaticLayout: true,
        }}
        className="rounded-md"
      />
    </div>
  );
}
