"use client";
import ConfirmAction from "@/components/ui/confirm-action";
import axios from "axios";
import { Settings } from "lucide-react";
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
import { InviteUserDialog } from "./_components/invite-user";
import { Input } from "@/components/ui/input";
import {  Org } from "@/types";

const OrgPage = () => {
  const params = useParams();
  const router = useRouter();
  const [org, setOrg] = useState<Org | null>(null);
  const [editedOrg, setEditedOrg] = useState<Org | null>(null);
  const [onEdit, setOnEdit] = useState(false);
  const [orgName, setOrgName] = useState("");

  const handleEdit = () => {
    setEditedOrg({ ...org! });
    setOnEdit(true);
  };

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

  useEffect(() => {
    const getOrg = async () => {
      try {
        const res = await axios(`${process.env.NEXT_PUBLIC_API_URL}/orgs/${params.org_id}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setOrg(res.data.data);
          setOrgName(res.data.data.name);
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
        <div className="flex items-start gap-4">
          {onEdit ? (
            <>
              <Input value={orgName} onChange={(e) => setOrgName(e.target.value)} />
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold"> {org.name}</h1>
            </>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="focus">
            <Settings className="h-6 w-6" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
            {/* <DropdownMenuItem className="text-red-500"> */}
            <ConfirmAction action="Delete" onAction={deleteOrg}></ConfirmAction>
            {/* </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex justify-between mb-12">
        <h1 className="text-1xl font-semibold ">Organization's Members</h1>
        <InviteUserDialog />
      </div>
      <DataTable columns={columns} data={org.members} />
    </div>
  );
};

export default OrgPage;
