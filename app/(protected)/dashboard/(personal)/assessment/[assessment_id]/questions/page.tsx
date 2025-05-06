"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { API_URL } from "@/config";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Code } from "lucide-react";
import toast from "react-hot-toast";

// Define the question type based on the provided data
interface Question {
  id: string;
  type: "MULTIPLE_CHOICE" | "CODING" | "TEXT";
  text: string;
  options: Record<string, string>;
  correctAnswer?: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  order: number;
  testId: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export default function QuestionsPage() {
  const params = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [expandedCodeQuestions, setExpandedCodeQuestions] = useState<string[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${API_URL}/questions/test/${params.assessment_id}`,
          { withCredentials: true }
        );
        
        if (response.data.success) {
          const sortedQuestions = response.data.data.sort((a, b) => a.order - b.order);
          setQuestions(sortedQuestions);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
        toast.error("Failed to load questions");
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [params.assessment_id]);

  const handleInputChange = (id: string, value: any) => {
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Test submitted:", formData);
    toast.success("Test submitted successfully!");
    // Redirect to results page or dashboard
    window.location.href = `/dashboard/assessment`;
  };

  // Separate code questions from other questions
  const getCodeQuestions = () => {
    return questions.filter(q => q.type === "CODING");
  };

  const getNonCodeQuestions = () => {
    return questions.filter(q => q.type !== "CODING");
  };

  const toggleCodeQuestion = (id: string) => {
    if (expandedCodeQuestions.includes(id)) {
      setExpandedCodeQuestions(expandedCodeQuestions.filter(qId => qId !== id));
    } else {
      setExpandedCodeQuestions([...expandedCodeQuestions, id]);
    }
  };

  const renderFormElement = (element: Question, index: number) => {
    const { id, type, text } = element;

    return (
      <div key={id} className="border-b pb-6 last:border-0">
        <div className="mb-4">
          <h3 className="text-primary font-bold text-lg">
            {index + 1}. {text}
          </h3>
        </div>

        {type === "TEXT" && (
          <div className="space-y-2">
            <Textarea
              id={id}
              value={formData[id] || ""}
              onChange={(e) => handleInputChange(id, e.target.value)}
              placeholder="Type your answer here..."
              className="min-h-[150px]"
            />
          </div>
        )}

        {type === "MULTIPLE_CHOICE" && (
          <div className="space-y-2">
            <RadioGroup
              value={formData[id] || ""}
              onValueChange={(value) => handleInputChange(id, value)}
            >
              {Object.entries(element.options).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <RadioGroupItem value={key} id={`${id}-option-${key}`} />
                  <Label htmlFor={`${id}-option-${key}`}>{key}: {value}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}
      </div>
    );
  };

  const renderCodeChallenge = (element: Question, index: number) => {
    const { id, text } = element;
    const isExpanded = expandedCodeQuestions.includes(id);

    return (
      <Card key={id} className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Code className="h-5 w-5" />
            {index + 1}. {text}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!isExpanded ? (
            <div>
              <div className="bg-muted p-4 rounded-md border border-dashed mb-4">
                <p className="text-sm text-muted-foreground">
                  This is a coding challenge. Click the button below to solve it.
                </p>
              </div>
              <Button 
                className="w-full" 
                onClick={() => toggleCodeQuestion(id)}
              >
                Solve Challenge Now
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-md border border-dashed flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Code editor will be available in the future. For now, please use the text area below.
                </p>
              </div>
              <Textarea
                id={id}
                value={formData[id] || ""}
                onChange={(e) => handleInputChange(id, e.target.value)}
                placeholder="// Write your code here"
                className="min-h-[200px] font-mono"
              />
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => toggleCodeQuestion(id)}
              >
                Hide Code Editor
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-1/3" />
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-4 w-1/4 mt-2" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center">No questions found for this assessment.</p>
            <Button 
              className="mt-4 w-full" 
              onClick={() => window.location.href = `/dashboard/assessment`}
            >
              Return to Assessments
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const codeQuestions = getCodeQuestions();
  const nonCodeQuestions = getNonCodeQuestions();

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="text-2xl">Assessment Questions</CardTitle>
          <CardDescription>
            Answer all questions and submit your test when complete.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Show code challenges at the top */}
          {codeQuestions.map((question, index) => renderCodeChallenge(question, index))}
          
          {/* Show regular questions */}
          {nonCodeQuestions.map((element, index) => renderFormElement(element, index))}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => window.location.href = `/dashboard/assessment`}
          >
            Cancel
          </Button>
          <Button type="submit">Submit Test</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
