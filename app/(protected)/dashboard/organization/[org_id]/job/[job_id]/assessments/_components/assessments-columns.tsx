"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Clock, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import type { Assessment, AssessmentStatus } from "@/types";
import toast from "react-hot-toast";

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatTimeLimit = (minutes: number) => {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
};

export const columns: ColumnDef<Assessment>[] = [
  {
    accessorKey: "id",
    header: () => <div className="">ID</div>,
    cell: ({ row }) => {
      const id = row.getValue("id") as string;
      const shortId = id.split("-")[0];
      return <div className="font-mono text-xs">{shortId}..</div>;
    },
  },
  {
    accessorKey: "name",
    header: "Assessment Name",
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("name")}</div>;
    },
  },
  {
    accessorKey: "jobTitle",
    header: "Job Title",
  },
  {
    accessorKey: "timeLimit",
    header: "Time Limit",
    cell: ({ row }) => {
      const timeLimit = row.getValue("timeLimit") as number;
      return (
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3 text-muted-foreground" />
          <span>{formatTimeLimit(timeLimit)}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as AssessmentStatus;
      const variant =
        status === "PUBLISHED"
          ? "success"
          : status === "DRAFT"
            ? "secondary"
            : status === "ARCHIVED"
              ? "default"
              : "ghost";
      //@ts-ignore
      return <Badge variant={variant}>{status}</Badge>;
    },
  },
  {
    accessorKey: "startTime",
    header: "Start Date",
    cell: ({ row }) => {
      const startTime = row.getValue("startTime") as string;
      return <div>{formatDate(startTime)}</div>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const assessment = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(assessment.id);
                toast.success("ID copied to clipboard");
              }}
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                window.location.assign(
                  `/dashboard/organization/${assessment.orgId}/job/${assessment.jobId}/assessments/${assessment.id}`
                )
              }
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                window.location.assign(
                  `/dashboard/organization/${assessment.orgId}/job/${assessment.jobId}/assessments/${assessment.id}/add-questions`
                )
              }
            >
              Add Questions
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                window.location.assign(
                  `/dashboard/organization/${assessment.orgId}/job/${assessment.jobId}/assessments/${assessment.id}/code`
                )
              }
            >
              Add Coding
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                window.location.assign(
                  `/dashboard/organization/${assessment.orgId}/job/${assessment.jobId}/assessments/${assessment.id}/preview`
                )
              }
            >
              Preview
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                window.location.assign(
                  `/dashboard/organization/${assessment.orgId}/job/${assessment.jobId}/assessments/${assessment.id}/responses`
                )
              }
            >
              Responses
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
