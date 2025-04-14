"use client";

import { Button } from "@/components/ui/button";
import { Edit, Settings } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import CreateAssessmentForm from "../_components/create-assessment-form";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { API_URL } from "@/config";
import Loader from "@/components/ui/Loader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AssessmentProps } from "@/types";



export default function CreateAssessmentPage() {
  const { form_id } = useParams();
  const router = useRouter();
  const [assessment, setAssessment] = useState<null | AssessmentProps>(null);
  const [onEdit, setOnEdit] = useState(false);

  const handleEdit = () => {
    setOnEdit(true);
  };

  const handleCancel = () => {
    setOnEdit(false);
  };

  useEffect(() => {
    const getTest = async () => {
      try {
        const res = await axios.get(`${API_URL}/tests/${form_id}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setAssessment(res.data.data);
        }
      } catch {
        toast.error("Failed to fetch assessment");
      }
    };
    getTest();
  }, [router, form_id]);

  if (!assessment) {
    return <Loader />;
  }

  return (
    <div className="h-full flex flex-col">
      <div>
        {/* <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Forms
        </Button> */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">{assessment?.name}</h1>
          {onEdit || (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleEdit}>
                  <Edit className="h-4 w-4 mr-2" /> Edit Job
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={() => {
                    // This assumes your ConfirmAction component is used differently
                    // If it's a modal trigger, you might need to adjust this
                    const confirmed = window.confirm("Are you sure you want to delete this job?");
                    if (confirmed) {
                    }
                  }}
                >
                  Delete Job
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      <CreateAssessmentForm onShow={!onEdit} handleCancel={handleCancel} assessment={assessment} />
    </div>
  );
}
