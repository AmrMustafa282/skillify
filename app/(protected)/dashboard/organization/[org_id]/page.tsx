"use client";
import { Button } from "@/components/ui/button";
import ConfirmAction from "@/components/ui/confirm-action";
import axios from "axios";
import { MoreHorizontal, MoreVertical, Settings } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { InviteUserDialog } from "./_components/invite-user";

interface Org {
  id: string;
  name: string;
  createdBy: string;
  members: {
    userId: string;
    email: string;
    roles: ["ROLE_ORG_ADMIN" | "ROLE_ORG_MEMBER"];
  }[];
}

const OrgPage = () => {
  const params = useParams();
  const router = useRouter();
  const [org, setOrg] = useState<Org | null>(null);

  const deleteOrg = async () => {
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/orgs/${params.org_id}`, {
        withCredentials: true,
      });
      if (res.data.success) toast.success("Organization deleted successfully");
      router.push("/dashboard/organization");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const inviteMember = async (userEmail: string) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/orgs/${params.org_id}/members`,
        {
          userEmail,
          roleName: "ROLE_ORG_INTERVIEWER",
        },
        {
          withCredentials: true,
        }
      );
      if (res.data.success) toast.success("Invitation sent successfully");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const getOrg = async () => {
      try {
        const res = await axios(`${process.env.NEXT_PUBLIC_API_URL}/orgs/${params.org_id}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setOrg(res.data.data);
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    };
    getOrg();
  }, [params.org_id]);

  if (!org) return null;

  return (
    <div>
      <div className="flex w-full justify-between items-center mb-12">
        <h1 className="text-3xl font-bold"> {org.name}</h1>
        <DropdownMenu>
          <DropdownMenuTrigger className="focus">
            <Settings className="h-6 w-6" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => router.push(`/dashboard/organization/${params.org_id}/edit`)}
            >
              Edit
            </DropdownMenuItem>
            {/* <DropdownMenuItem className="text-red-500"> */}
            <ConfirmAction action="Delete" onAction={deleteOrg}></ConfirmAction>
            {/* </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="text-end mb-4">
        <InviteUserDialog />
      </div>
      <DataTable columns={columns} data={org.members} />
    </div>
  );
};

export default OrgPage;
