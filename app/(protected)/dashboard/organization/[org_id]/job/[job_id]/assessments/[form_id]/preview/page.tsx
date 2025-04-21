"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import FormPreview from "@/components/assessment-preview";
import { ElementType, type FormData, type FormElement } from "@/types";

export default function PreviewFormPage() {
  const router = useRouter();
  const { form_id } = useParams();
  const [formData, setFormData] = useState<FormData | null>(null);

  useEffect(() => {
    // In a real app, you would fetch the form data from a database
    // This is mock data for demonstration
    setFormData({
      title: `Sample Form ${form_id}`,
      description: "This is a preview of your form. Fill it out to see how it works.",
      elements: [
        {
          id: "element-1",
          type: ElementType.SHORT_TEXT,
          question: "What is your name?",
          required: true,
          options: [],
        } as FormElement,
        {
          id: "element-2",
          type: ElementType.LONG_TEXT,
          question: "Please provide your feedback",
          required: false,
          options: [],
        } as FormElement,
        {
          id: "element-3",
          type: ElementType.MULTIPLE_CHOICE,
          question: "How would you rate our service?",
          required: true,
          options: ["Excellent", "Good", "Average", "Poor", "Very Poor"],
        } as FormElement,
        {
          id: "element-4",
          type: ElementType.CHECKBOX,
          question: "Which features do you use?",
          required: false,
          options: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
        } as FormElement,
        {
          id: "element-5",
          type: ElementType.DATE,
          question: "When did you start using our service?",
          required: false,
          options: [],
        } as FormElement,
      ],
    });
  }, [form_id]);

  if (!formData) {
    return (
      <div>
        <div className="flex items-center justify-center h-[60vh]">
          <p>Loading form preview...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Button variant="ghost" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Forms
      </Button>

      <div className="mb-6">
        <h1 className="text-2xl font-bold">Form Preview</h1>
        <p className="text-muted-foreground">This is how your form will appear to respondents</p>
      </div>

      <div className="max-w-3xl mx-auto">
        <FormPreview
          title={formData.title}
          description={formData.description}
          elements={formData.elements}
        />
      </div>
    </div>
  );
}
