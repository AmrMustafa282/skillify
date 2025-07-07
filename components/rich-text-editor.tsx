"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

// import "react-quill-new/dist/quill.snow.css";

// Import ReactQuill dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <div className="h-[200px] w-full border rounded-md bg-muted/20 animate-pulse" />,
});

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  onAIEnhance?: () => void;
  label?: string;
  placeholder?: string;
  className?: string;
}

export function RichTextEditor({
  value,
  onChange,
  onAIEnhance,
  label = "Description",
  placeholder = "Enter description...",
  className = "",
}: RichTextEditorProps) {
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before rendering Quill
  useEffect(() => {
    setMounted(true);
  }, []);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      // [{ list: "ordered" }, { list: "bullet" }],
      [{ list: "ordered" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      ["link", "code-block"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    // "bullet",
    "indent",
    "link",
    "code-block",
  ];

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <Label className="text-lg font-medium">{label}</Label>
        {onAIEnhance && (
          <Button variant="outline" size="sm" onClick={onAIEnhance} className="gap-1">
            <Sparkles className="h-4 w-4" />
            AI Enhance
          </Button>
        )}
      </div>
      {mounted && (
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          className="min-h-[200px] [&_.ql-editor]:min-h-[150px]"
        />
      )}
    </div>
  );
}
