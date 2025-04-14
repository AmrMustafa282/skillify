"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Edit, Save, Settings, X } from "lucide-react";
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
import { Job } from "@/types";
import Loader from "@/components/ui/Loader";
import { API_URL } from "@/config";

const JobPage = () => {
  const params = useParams();
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [editedJob, setEditedJob] = useState<Job | null>(null);
  const [onEdit, setOnEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = () => {
    setEditedJob({ ...job! });
    setOnEdit(true);
  };

  const handleCancel = () => {
    setOnEdit(false);
    setEditedJob(null);
  };

  const updateJob = async () => {
    if (!editedJob) return;

    setIsLoading(true);
    try {
      const res = await axios.put(`${API_URL}/jobs/${params.job_id}`, editedJob, {
        withCredentials: true,
      });
      if (res.data.success) {
        setJob(res.data.data);
        toast.success("Job updated successfully");
        setOnEdit(false);
      } else {
        toast.error(res.data.error || "Failed to update job");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteJob = async () => {
    if (!job) return;

    setIsLoading(true);
    try {
      const res = await axios.delete(`${API_URL}/jobs/${job.id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success("Job deleted successfully");
        router.push(`/organizations/${job.organizationId}`);
      } else {
        toast.error(res.data.error || "Failed to delete job");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getJob = async () => {
      setIsLoading(true);
      try {
        const res = await axios(`${API_URL}/jobs/${params.job_id}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setJob(res.data.data);
        } else {
          toast.error(res.data.error || "Failed to fetch job details");
        }
      } catch (error: any) {
        toast.error(error.message || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };
    getJob();
  }, [params.job_id]);

  if (!job)
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader />
        </div>
      </div>
    );

  return (
    <div>
      <div className="flex w-full justify-between items-center mb-6">
        <div className="flex items-start gap-4 w-full">
          {onEdit ? (
            <div className="w-full">
              <Input
                value={editedJob?.title || ""}
                onChange={(e) => setEditedJob({ ...editedJob!, title: e.target.value })}
                className="text-xl font-bold mb-2"
                placeholder="Job Title"
              />
            </div>
          ) : (
            <h1 className="text-3xl font-bold">{job.title}</h1>
          )}
        </div>
        <div className="flex items-center gap-2">
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
                    if (confirmed) deleteJob();
                  }}
                >
                  Delete Job
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
            </CardHeader>
            <CardContent>
              {onEdit ? (
                <Textarea
                  value={editedJob?.description || ""}
                  onChange={(e) => setEditedJob({ ...editedJob!, description: e.target.value })}
                  className="min-h-[150px]"
                  placeholder="Job Description"
                />
              ) : (
                <p className="whitespace-pre-wrap">{job.description}</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Status</h3>
                <Badge variant={job.active ? "default" : "secondary"}>
                  {job.active ? "Active" : "Inactive"}
                </Badge>
                {onEdit && (
                  <div className="mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditedJob({ ...editedJob!, active: !editedJob?.active })}
                    >
                      Set as {editedJob?.active ? "Inactive" : "Active"}
                    </Button>
                  </div>
                )}
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Created</h3>
                <p>{formatDate(job.createdAt)}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Last Updated</h3>
                <p>{formatDate(job.updatedAt)}</p>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Organization ID</h3>
                <p className="text-sm font-mono">{job.organizationId}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Job ID</h3>
                <p className="text-sm font-mono">{job.id}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      {onEdit && (
        <div className="w-full flex justify-end flex-grow items-end  gap-4 mt-12">
          <Button variant="outline" className="w-full" onClick={handleCancel} disabled={isLoading}>
            <X className="h-4 w-4 mr-1" /> Cancel
          </Button>
          <Button className="w-full" onClick={updateJob} disabled={isLoading}>
            <Save className="h-4 w-4 mr-1" /> Save
          </Button>
        </div>
      )}
    </div>
  );
};

export default JobPage;
