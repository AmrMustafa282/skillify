"use client";
import { Button } from "@/components/ui/button";
import ConfirmAction from "@/components/ui/confirm-action";
import axios from "axios";
import { Edit, Settings } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./_components/columns";
import { job_columns } from "./_components/jobs-columns";
import { InviteUserDialog } from "./_components/invite-user";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CreateJobDialog } from "./_components/create-job";

export interface Org {
  id: string;
  name: string;
  createdBy: string;
  members: {
    userId: string;
    email: string;
    roles: ["ROLE_ORG_ADMIN" | "ROLE_ORG_MEMBER"];
  }[];
}

export interface Job {
  id: string;
  title: string;
  description: string;
  organizationId: string;
  createdBy: string;
  updatedBy: string;
  updatedAt: string;
  createdAt: string;
  active: boolean;
}

const OrgPage = () => {
  const params = useParams();
  const router = useRouter();
  const [org, setOrg] = useState<Org | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [onTitleEdit, setOnTitleEdit] = useState(false);
  const [orgName, setOrgName] = useState("");

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

  const updateOrg = async (name: string) => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/orgs/${params.org_id}`,
        {
          name,
        },
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setOrg(res.data.data);
        toast.success("Organization updated successfully");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getOrgJobs = async () => {
    try {
      const res = await axios(`${process.env.NEXT_PUBLIC_API_URL}/jobs/org/${params.org_id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setJobs(res.data.data);
      }
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
          setOrgName(res.data.data.name);
          getOrgJobs();
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    };
    getOrg();
  }, [params.org_id, getOrgJobs]);

  if (!org) return null;

  return (
    <div>
      <div className="flex w-full justify-between items-center mb-12">
        <div className="flex items-start gap-4">
          {onTitleEdit ? (
            <>
              <Input value={orgName} onChange={(e) => setOrgName(e.target.value)} />
              <div className="flex gap-4">
                <Button variant={"ghost"} size={"sm"} onClick={() => setOnTitleEdit(false)}>
                  cancel
                </Button>
                <Button size={"sm"} onClick={() => updateOrg(orgName)}>
                  save
                </Button>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold"> {org.name}</h1>
              <Button size={"icon"} variant={"ghost"} onClick={() => setOnTitleEdit(true)}>
                <Edit />{" "}
              </Button>
            </>
          )}
        </div>
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
      <Separator className="mb-8 mt-2" />
      <div className="text-end mb-4">
        <CreateJobDialog getOrgJobs={getOrgJobs} />
      </div>
      <DataTable columns={job_columns} data={jobs} />
    </div>
  );
};

export default OrgPage;
