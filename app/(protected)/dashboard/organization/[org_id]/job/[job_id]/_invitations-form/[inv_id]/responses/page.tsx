"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowLeft,
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  MoreVertical,
  Mail,
  Calendar,
  AlertCircle,
  Users,
} from "lucide-react";
import { InvitationsAPI } from "@/lib/api/invitations";
import { InvitationFormSubmission, InvitationForm } from "@/types/index";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

export default function FormResponsesPage() {
  const params = useParams();
  const [form, setForm] = useState<InvitationForm | null>(null);
  const [submissions, setSubmissions] = useState<InvitationFormSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const orgId = params.org_id as string;
  const jobId = params.job_id as string;
  const formId = params.invitation_id as string;

  useEffect(() => {
    fetchFormAndSubmissions();
  }, [orgId, jobId, formId]);

  const fetchFormAndSubmissions = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch form details and submissions in parallel
      const [formResponse, submissionsResponse] = await Promise.all([
        InvitationsAPI.getInvitationForm(orgId, jobId, formId),
        InvitationsAPI.getFormSubmissions(orgId, jobId, formId),
      ]);

      if (formResponse.success && formResponse.data) {
        setForm(formResponse.data);
      } else {
        setError(formResponse.error || "Failed to fetch form");
        return;
      }

      if (submissionsResponse.success) {
        setSubmissions(submissionsResponse.data);
      } else {
        setError(submissionsResponse.error || "Failed to fetch submissions");
      }
    } catch (err: any) {
      setError(err.message);
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (
    submissionId: string,
    newStatus: InvitationFormSubmission["status"]
  ) => {
    try {
      const response = await InvitationsAPI.updateSubmissionStatus(
        orgId,
        jobId,
        formId,
        submissionId,
        newStatus
      );

      if (response.success) {
        toast.success(`Submission ${newStatus} successfully`);
        fetchFormAndSubmissions(); // Refresh data
      } else {
        toast.error(response.error || "Failed to update submission status");
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "reviewed":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "shortlisted":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted":
        return <Clock className="h-4 w-4" />;
      case "reviewed":
        return <Eye className="h-4 w-4" />;
      case "shortlisted":
        return <CheckCircle className="h-4 w-4" />;
      case "rejected":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  // Filter submissions based on search and status
  const filteredSubmissions = submissions.filter((submission) => {
    const matchesSearch =
      submission.candidateEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (submission.candidateName?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    const matchesStatus = statusFilter === "all" || submission.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate statistics
  const stats = {
    total: submissions.length,
    submitted: submissions.filter((s) => s.status === "submitted").length,
    reviewed: submissions.filter((s) => s.status === "reviewed").length,
    shortlisted: submissions.filter((s) => s.status === "shortlisted").length,
    rejected: submissions.filter((s) => s.status === "rejected").length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading responses...</p>
        </div>
      </div>
    );
  }

  if (error || !form) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <AlertCircle className="h-8 w-8 text-destructive mx-auto mb-4" />
          <p className="text-destructive mb-4">{error || "Form not found"}</p>
          <Link href={`/dashboard/organization/${orgId}/job/${jobId}/invitations`}>
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Forms
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href={`/dashboard/organization/${orgId}/job/${jobId}/invitations`}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{form.title} - Responses</h1>
            <p className="text-muted-foreground">{form.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Link href={`/dashboard/organization/${orgId}/job/${jobId}/invitations/form/${formId}`}>
            <Button variant="outline" size="sm">
              Edit Form
            </Button>
          </Link>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
            <div className="font-semibold text-blue-900 dark:text-blue-100">{stats.total}</div>
            <div className="text-sm text-blue-700 dark:text-blue-300">Total</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 text-yellow-600 dark:text-yellow-400 mx-auto mb-2" />
            <div className="font-semibold text-yellow-900 dark:text-yellow-100">
              {stats.submitted}
            </div>
            <div className="text-sm text-yellow-700 dark:text-yellow-300">Submitted</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Eye className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
            <div className="font-semibold text-purple-900 dark:text-purple-100">
              {stats.reviewed}
            </div>
            <div className="text-sm text-purple-700 dark:text-purple-300">Reviewed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
            <div className="font-semibold text-green-900 dark:text-green-100">
              {stats.shortlisted}
            </div>
            <div className="text-sm text-green-700 dark:text-green-300">Shortlisted</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <XCircle className="h-8 w-8 text-red-600 dark:text-red-400 mx-auto mb-2" />
            <div className="font-semibold text-red-900 dark:text-red-100">{stats.rejected}</div>
            <div className="text-sm text-red-700 dark:text-red-300">Rejected</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by email or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Status: {statusFilter === "all" ? "All" : statusFilter}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setStatusFilter("all")}>All Statuses</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setStatusFilter("submitted")}>
              Submitted
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("reviewed")}>
              Reviewed
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("shortlisted")}>
              Shortlisted
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("rejected")}>
              Rejected
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Responses Table */}
      {filteredSubmissions.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No responses yet</h3>
            <p className="text-muted-foreground">
              {submissions.length === 0
                ? "No one has submitted this form yet."
                : "No responses match your current filters."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Form Responses ({filteredSubmissions.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubmissions.map((submission, index) => (
                  <motion.tr
                    key={submission.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-muted/50"
                  >
                    <TableCell className="font-medium">
                      {submission.candidateName || "Anonymous"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        {submission.candidateEmail}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        {new Date(submission.submittedAt).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(submission.status)}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(submission.status)}
                          <span>
                            {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                          </span>
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>{submission.score ? `${submission.score}%` : "-"}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/dashboard/organization/${orgId}/job/${jobId}/invitations/form/${formId}/responses/${submission.id}`}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleStatusUpdate(submission.id, "reviewed")}
                          >
                            Mark as Reviewed
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleStatusUpdate(submission.id, "shortlisted")}
                          >
                            Shortlist
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleStatusUpdate(submission.id, "rejected")}
                          >
                            Reject
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
