"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import type { TestAssignment } from "@/types";

export const columns: ColumnDef<TestAssignment>[] = [
  {
    accessorKey: "id",
    header: () => <div className="">ID</div>,
    cell: ({ row }) => {
      const id = row.original.id;
      const shortId = id.split("-")?.[0];
      return <div className="font-mono text-xs">{shortId}..</div>;
    },
  },
  {
    accessorKey: "name",
    header: "Assessment",
    cell: ({ row }) => {
      const title = row.original.testTitle;
      return <div className="font-medium">{title}</div>;
    },
  },

  // {
  //   accessorKey: "status",
  //   header: "Status",
  //   cell:  ({ row }) => {
  //     // const status = row.original.status;
  //     const status = (await axios.get(
  //       `${PY_URL}/assessments/${row.original.testId}/status?candidate_id=${row.original.candidateEmail}`
  //     )) as "COMPLETED" | "IN_PROGRESS" | "PENDING";
  //     const variant =
  //       status === "COMPLETED"
  //         ? "success"
  //         : status === "IN_PROGRESS"
  //           ? "secondary"
  //           : status === "PENDING"
  //             ? "default"
  //             : "ghost";
  //     //@ts-ignore
  //     return <Badge variant={variant}>{status}</Badge>;
  //   },
  // },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const id = row.original.id;
      console.log(`🥢🥢🥢🥢🥢🥢🥢🥢🥢:${id}`);

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
                window.location.assign(`/assessments/${row.original.testId}`);
              }}
            >
              Start
            </DropdownMenuItem>
            {/* <DropdownMenuItem
              onClick={async () => {
                // const job = await getJob(jobId)
                // console.log(job);
                // window.location.assign(
                  // `/dashboard/organization/${row.original.job.organizationId}/job/${row.original.job.id}`
                // );
              }}
            >
              View job details
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
        // <Button size={"sm"} disabled={row.original.status !== "IN_PROGRESS"} onClick={() => {
        //   window.location.assign(`/assessments/${row.original.testId}`)
        // }}>
        //   Start
        // </Button>
      );
    },
  },
];
