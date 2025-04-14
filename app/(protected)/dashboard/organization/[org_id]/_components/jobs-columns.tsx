"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Job } from "../page";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import ConfirmAction from "@/components/ui/confirm-action";
import axios from "axios";
import { API_URL } from "@/config";

// id: string;
// title: string;
// description: string;
// organizationId: string;
// createdBy: string;
// updatedBy: string;
// updatedAt: string;
// createdAt: string;
// active: boolean;

const deleteJob = async (orgId: string, job_id: string) => {
  try {
    const res = await axios.delete(`${API_URL}/jobs/${job_id}`, {
      withCredentials: true,
    });
    if (res.data.success) {
      toast.success("Organization deleted successfully");
      // window.location.assign("/dashboard/organization");
    } else {
      toast.error(res.data.error);
    }
  } catch (error: any) {
    console.log(error.message);
  }
};

export const job_columns: ColumnDef<Job>[] = [
  {
    accessorKey: "id",
    header: () => <div className="">ID</div>,
    cell: ({ row }) => {
      const id = row.getValue("id") as string;
      const shortId = id.split("-")[0];
      return <div className="">{shortId}..</div>;
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string;
      return <div className="">{new Date(createdAt).toLocaleDateString()}</div>;
    },
  },
  {
    accessorKey: "active",
    header: "Active",
    cell: ({ row }) => {
      const active = row.getValue("active") as boolean;
      return (
        <Badge className={cn(active ? "bg-green-600" : "bg-gray-400")}>
          {active ? "Active" : "Inactive"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const job = row.original;
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
              onClick={() =>
                window.location.assign(
                  `/dashboard/organization/${job.organizationId}/job/${job.id}`
                )
              }
            >
              Open
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(job.id);
                toast.success("Job ID copied to clipboard");
              }}
            >
              Copy job ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem> */}
            <ConfirmAction
              action="Delete"
              onAction={() => deleteJob(job.organizationId, job.id)}
            ></ConfirmAction>
            {/* </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
