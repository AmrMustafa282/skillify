"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  PlusCircle,
  FileText,
  Users,
  Eye,
  Edit,
  MoreVertical,
  Copy,
  Trash2,
  BarChart3,
  Calendar,
  Clock,
  AlertCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InvitationsAPI } from "@/lib/api/invitations";
import { InvitationForm } from "@/types/index";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

export default function InvitationsPage() {
  const params = useParams();
  const [forms, setForms] = useState<InvitationForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const orgId = params.org_id as string;
  const jobId = params.job_id as string;

  useEffect(() => {
    fetchForms();
  }, [orgId, jobId]);

  const fetchForms = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await InvitationsAPI.getInvitationForms(orgId, jobId);
      if (response.success) {
        setForms(response.data);
      } else {
        setError(response.error || "Failed to fetch forms");
      }
    } catch (err: any) {
      setError(err.message);
      console.error("Error fetching forms:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDuplicateForm = async (formId: string) => {
    try {
      const response = await InvitationsAPI.duplicateForm(orgId, jobId, formId);
      if (response.success) {
        toast.success("Form duplicated successfully");
        fetchForms(); // Refresh the list
      } else {
        toast.error(response.error || "Failed to duplicate form");
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleDeleteForm = async (formId: string) => {
    if (!confirm("Are you sure you want to delete this form? This action cannot be undone.")) {
      return;
    }

    try {
      const response = await InvitationsAPI.deleteInvitationForm(orgId, jobId, formId);
      if (response.success) {
        toast.success("Form deleted successfully");
        fetchForms(); // Refresh the list
      } else {
        toast.error(response.error || "Failed to delete form");
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleToggleStatus = async (formId: string, currentStatus: string) => {
    const newStatus = currentStatus === "published" ? "draft" : "published";

    try {
      const response = await InvitationsAPI.toggleFormStatus(orgId, jobId, formId, newStatus);
      if (response.success) {
        toast.success(
          `Form ${newStatus === "published" ? "published" : "unpublished"} successfully`
        );
        fetchForms(); // Refresh the list
      } else {
        toast.error(response.error || "Failed to update form status");
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "draft":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "closed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading invitation forms...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <AlertCircle className="h-8 w-8 text-destructive mx-auto mb-4" />
          <p className="text-destructive mb-4">{error}</p>
          <Button onClick={fetchForms} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Invitation Forms</h1>
          <p className="text-muted-foreground mt-1">
            Create and manage job application forms for candidates
          </p>
        </div>
        <Link href="invitations/form/create">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Form
          </Button>
        </Link>
      </div>

      {/* Forms Grid */}
      {forms.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No invitation forms yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first invitation form to start collecting applications
            </p>
            <Link href="invitations/form/create">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Your First Form
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {forms.map((form, index) => (
            <motion.div
              key={form.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg line-clamp-2">{form.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {form.description}
                      </p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`invitations/form/${form.id}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`invitations/form/${form.id}/preview`}>
                            <Eye className="mr-2 h-4 w-4" />
                            Preview
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`invitations/form/${form.id}/analytics`}>
                            <BarChart3 className="mr-2 h-4 w-4" />
                            Analytics
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDuplicateForm(form.id)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleStatus(form.id, form.status)}>
                          {form.status === "published" ? "Unpublish" : "Publish"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDeleteForm(form.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Status and Stats */}
                  <div className="flex items-center justify-between">
                    <Badge className={getStatusColor(form.status)}>
                      {form.status.charAt(0).toUpperCase() + form.status.slice(1)}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-1" />
                      {form.responseCount} responses
                    </div>
                  </div>

                  {/* Form Info */}
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2" />
                      {form.elements.length} questions
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Created {new Date(form.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      Updated {new Date(form.updatedAt).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Link href={`invitations/form/${form.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                    </Link>
                    <Link href={`invitations/form/${form.id}/responses`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <Users className="mr-2 h-4 w-4" />
                        Responses
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
