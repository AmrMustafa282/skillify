"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import QuestionField from "../_components/question-field";

type QuestionType =
  | "shortAnswer"
  | "paragraph"
  | "multipleChoice"
  | "checkboxes"
  | "dropdown"
  | "linearScale"
  | "dateTime";

type Question = {
  id: string;
  type: QuestionType;
  title: string;
  description?: string;
  required: boolean;
  options?: string[];
  min?: number;
  max?: number;
};

type FormData = {
  title: string;
  description: string;
  questions: Question[];
};

const initialFormData: FormData = {
  title: "Untitled Form",
  description: "",
  questions: [],
};

const defaultQuestion: Question = {
  id: "",
  type: "shortAnswer",
  title: "",
  description: "",
  required: false,
  options: ["Option 1"],
};

export default function FormCreator() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [selectedQuestionType, setSelectedQuestionType] = useState<QuestionType>("shortAnswer");

  const updateFormMetadata = (field: "title" | "description", value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const addQuestion = () => {
    const newQuestion: Question = {
      ...defaultQuestion,
      id: Date.now().toString(),
      type: selectedQuestionType,
    };
    setFormData({
      ...formData,
      questions: [...formData.questions, newQuestion],
    });
  };

  const updateQuestion = (id: string, updatedQuestion: Partial<Question>) => {
    setFormData({
      ...formData,
      questions: formData.questions.map((q) => (q.id === id ? { ...q, ...updatedQuestion } : q)),
    });
  };

  const deleteQuestion = (id: string) => {
    setFormData({
      ...formData,
      questions: formData.questions.filter((q) => q.id !== id),
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4 p-4 border rounded-lg">
        <div>
          <Label htmlFor="form-title">Form Title</Label>
          <Input
            id="form-title"
            value={formData.title}
            onChange={(e) => updateFormMetadata("title", e.target.value)}
            className="text-2xl font-bold"
          />
        </div>
        <div>
          <Label htmlFor="form-description">Form Description</Label>
          <Textarea
            id="form-description"
            value={formData.description}
            onChange={(e) => updateFormMetadata("description", e.target.value)}
            placeholder="Enter a description for your form"
          />
        </div>
      </div>

      {formData.questions.map((question) => (
        <QuestionField
          key={question.id}
          question={question}
          onUpdate={(updatedQuestion: Question) => updateQuestion(question.id, updatedQuestion)}
          onDelete={() => deleteQuestion(question.id)}
        />
      ))}

      <div className="flex items-center space-x-4">
        <Select
          value={selectedQuestionType}
          onValueChange={(value: QuestionType) => setSelectedQuestionType(value)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select question type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="shortAnswer">Short Answer</SelectItem>
            <SelectItem value="paragraph">Paragraph</SelectItem>
            <SelectItem value="multipleChoice">Multiple Choice</SelectItem>
            <SelectItem value="checkboxes">Checkboxes</SelectItem>
            <SelectItem value="dropdown">Dropdown</SelectItem>
            <SelectItem value="linearScale">Linear Scale</SelectItem>
            <SelectItem value="dateTime">Date/Time</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={addQuestion}>Add Question</Button>
      </div>

      <Button onClick={() => console.log(JSON.stringify(formData, null, 2))}>Save Form</Button>
    </div>
  );
}
