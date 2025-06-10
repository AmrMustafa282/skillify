"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import FormPreview from "@/components/assessment/assessment-preview";
import axios from "axios";
import { API_URL } from "@/config";
import toast from "react-hot-toast";
import { Assessment, AssessmentFormData, AssessmentQuestion } from "@/types";
import Loader from "@/components/ui/Loader";

export default function PreviewFormPage() {
  const router = useRouter();
  const { assessment_id } = useParams();

  const [loadingTestInfo, setLoadingTestInfo] = useState(true);
  const [loadingTestQuestions, setLoadingTestQuestions] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<AssessmentFormData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        setLoadingTestInfo(true);
        const infoRes = await axios.get(`${API_URL}/tests/${assessment_id}`, {
          withCredentials: true,
        });
        const infoData = infoRes.data.data as Assessment;
        if (infoData) {
          setFormData({
            title: infoData.name,
            description: infoData.description,
            elements: [],
          });
        }
      } catch {
        toast.error("Failed to fetch assessment data");
      } finally {
        setLoadingTestInfo(false);
      }

      try {
        setLoadingTestQuestions(true);
        const questionsRes = await axios.get(`${API_URL}/tests/${assessment_id}/questions`, {
          withCredentials: true,
        });
        const questionsData = questionsRes.data.data as AssessmentQuestion[];
        if (questionsData && questionsData.length > 0) {
          const sortedQuestion = [...questionsData].sort((a, b) => a.order - b.order);
          setFormData({
            ...formData!,
            elements: sortedQuestion,
          });
        }
      } catch {
        toast.error("Failed to fetch assessment questions");
      } finally {
        setLoadingTestQuestions(false);
      }
      setIsLoading(false);
    };

    if (assessment_id) {
      fetchData();
    }
  }, [assessment_id]);

  if (!formData) {
    return (
      <div>
        <div className="flex items-center justify-center h-[60vh]">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Button variant="ghost" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Assessment
      </Button>

      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold">Assessment Preview</h1>
        <p className="text-muted-foreground">
          This is how your assessment will appear to respondents
        </p>
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
