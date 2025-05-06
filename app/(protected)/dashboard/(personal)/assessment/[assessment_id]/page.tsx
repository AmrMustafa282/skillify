"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Edit, Save, Settings, Trash2, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";
import { Job, Test } from "@/types";
import Loader from "@/components/ui/Loader";
import { API_URL } from "@/config";
import ConfirmAction from "@/components/ui/confirm-action";
import useAssessments from "@/app/(protected)/dashboard/(personal)/_hooks/use-assessment";
const variant = (status) => {
  return status === "Active"
    ? "success"
    : status === "Missed"
      ? "secondary"
      : status === "Taken"
        ? "default"
        : "ghost";
};
const AssessmentPage = () => {
  const params = useParams();
  const [rowObj, setRowObj] = useState(() => {
    const storedAssessment = localStorage.getItem("selectedAssessment");
    return storedAssessment ? JSON.parse(storedAssessment) : null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const test=rowObj?.test;
  const assignment=rowObj?.assignment;

  if (!test)
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader />
        </div>
      </div>
    );

  return (
    <>
      <div className="flex w-full justify-between items-center mb-6">
        <div className="flex items-start gap-4 w-full">
          <h1 className="text-3xl font-bold">{test.name}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Test Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{test.description}</p>
                <Button className="mt-4 ml-auto block" onClick={() => toast.success("Test started!")}>
                Take the test
                </Button>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Test Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Status</h3>
                <Badge variant={variant(assignment.status) || undefined}>{assignment.status}</Badge>
              </div>
              <Separator />

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Created</h3>
                <p>{formatDate(test.createdAt)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Last Updated</h3>
                <p>{formatDate(test.updatedAt)}</p>
              </div>

              <Separator />
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Job ID</h3>
                <p className="text-sm font-mono">{test.jobId}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AssessmentPage;
