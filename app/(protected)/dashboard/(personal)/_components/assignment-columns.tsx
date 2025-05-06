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
import axios from "axios";

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
      const id = row.original.assignment.id;
      const shortId = id.split("-")?.[0];
      return <div className="font-mono text-xs">{shortId}..</div>;
    },
  },
  {
    accessorKey: "name",
    header: "Assessment Name",
    cell: ({ row }) => {
      const test = row.original.test.name;
      // console.log(test);
      return <div className="font-medium">{test}</div>;
    },
  },
  {
    accessorKey: "jobTitle",
    header: "Job Title",
    cell: ({ row }) => {
      const jobTitle = row.original.job.title;
      return <div>{jobTitle}</div>;
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.assignment.status;
      const variant =
        status === "COMPLETED"
          ? "success"
          : status === "IN_PROGRESS"
            ? "secondary"
            : status === "COMPLETED"
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
      const startTime = row.original.test.startTime;
      return <div>{startTime}</div>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const id = row.original.assignment.id;
      console.log(`🥢🥢🥢🥢🥢🥢🥢🥢🥢:${id}`);
      const jobId = row.original.jobId;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={async () => {
                localStorage.setItem("selectedAssessment", JSON.stringify(row.original));
                window.location.assign(`/dashboard/assessment/${row.original.assignment.id}`);
              }}
            >
              View assessment details
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                // const job = await getJob(jobId)
                // console.log(job);
                window.location.assign(
                  `/dashboard/organization/${row.original.job.organizationId}/job/${row.original.job.id}`
                );
              }}
            >
              View job details
            </DropdownMenuItem> 
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
