"use client";

import { Edit, Settings, Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import CreateAssessmentForm from "../_components/create-invitation-form";
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
import ConfirmAction from "@/components/ui/confirm-action";

export default function CreateAssessmentPage() {
  const { invitation_id } = useParams();
  const router = useRouter();
  const [assessment, setAssessment] = useState<null | AssessmentProps>(null);
  const [onEdit, setOnEdit] = useState(false);

  const handleEdit = () => {
    setOnEdit(true);
  };

  const handleCancel = () => {
    setOnEdit(false);
  };

  const deleteTest = async () => {
    try {
      const res = await axios.delete(`${API_URL}/tests/${invitation_id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success("Assessment deleted successfully");
        router.back();
      }
    } catch (error: any) {
      console.log(error.message);
      toast.error("Failed to delete assessment");
    }
  };

  useEffect(() => {
    const getTest = async () => {
      try {
        const res = await axios.get(`${API_URL}/tests/${invitation_id}`, {
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
  }, [router, invitation_id]);

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
              <DropdownMenuTrigger className="focus">
                <Settings className="h-6 w-6" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={handleEdit} className="cursor-pointer">
                  <Edit /> Edit
                </DropdownMenuItem>
                <ConfirmAction action="Delete" Icon={Trash2} onAction={deleteTest}></ConfirmAction>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      <CreateAssessmentForm onShow={!onEdit} handleCancel={handleCancel} assessment={assessment} />
    </div>
  );
}
