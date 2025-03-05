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
import { Badge } from "@/components/ui/badge";
import { ORG_ROLES } from "@/types";

export type Member = {
  userId: string;
  email: string;
  roles: ["ROLE_ORG_ADMIN" | "ROLE_ORG_MEMBER"];
};

export const columns: ColumnDef<Member>[] = [
  {
    accessorKey: "userId",
    header: () => <div className="">ID</div>,
    cell: ({ row }) => {
      const userId = row.getValue("userId") as string;
      const shortId = userId.split("-")[0];
      return <div className="">{shortId}..</div>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "roles",
    header: "Role",
    cell: ({ row }) => {
      const roles = row.getValue("roles") as ["ROLE_ORG_ADMIN" | "ROLE_ORG_MEMBER"];
      return (
        <Badge
          variant={ORG_ROLES[roles[0]] === ORG_ROLES.ROLE_ORG_ADMIN ? "default" : "secondary"}
          className="text-xs"
        >
          {ORG_ROLES[roles[0]]}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(row.getValue("userId"))}>
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
