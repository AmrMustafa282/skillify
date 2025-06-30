"use client";
import ConfirmAction from "@/components/ui/confirm-action";
import axios from "axios";
import { Edit, Save, Settings, Trash2, X } from "lucide-react";
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
import { Org } from "@/types";
import { API_URL } from "@/config";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

const OrgPage = () => {
  const params = useParams();
  const router = useRouter();
  const [org, setOrg] = useState<Org | null>(null);
  const [editedOrg, setEditedOrg] = useState<Org | null>(null);
  const [onEdit, setOnEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orgName, setOrgName] = useState("");

  const { data: session } = useSession()
  console.log(session)
  const fetchOrg = async () => {
    try {
      const res = await axios(`${API_URL}/organizations/${params.org_id}`, {
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

  useEffect(() => {
    fetchOrg();
  }, [params.org_id]);

  const handleEdit = () => {
    setEditedOrg({ ...org! });
    setOnEdit(true);
  };

  const handleCancel = () => {
    setOnEdit(false);
    setEditedOrg(null);
  };
  const updateOrg = async (name: string) => {
    if (!editedOrg) return;
    setIsLoading(true);
    try {
      const res = await axios.patch(
        `${API_URL}/organizations/${params.org_id}`,
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
        setOnEdit(false);
      } else {
        toast.error(res.data.error || "Failed to update or");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteOrg = async () => {
    try {
      const res = await axios.delete(`${API_URL}/organizations/${params.org_id}`, {
        withCredentials: true,
      });
      if (res.data.success) toast.success("Organization deleted successfully");
      router.push("/dashboard/organization");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

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
            <DropdownMenuItem onClick={handleEdit} className="cursor-pointer">
              <Edit className="" /> Edit
            </DropdownMenuItem>
            <ConfirmAction action="Delete" Icon={Trash2} onAction={deleteOrg}></ConfirmAction>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex justify-between mb-12">
        <h1 className="text-1xl font-semibold ">Organization's Members</h1>
        <InviteUserDialog onSuccess={fetchOrg} />
      </div>
      <DataTable columns={columns} data={org.members} />
      {onEdit && (
        <div className="w-full flex justify-end flex-grow items-end  gap-4 mt-12">
          <Button variant="outline" className="w-full" onClick={handleCancel} disabled={isLoading}>
            <X className="h-4 w-4 mr-1" /> Cancel
          </Button>
          <Button className="w-full" onClick={() => updateOrg(orgName)} disabled={isLoading}>
            <Save className="h-4 w-4 mr-1" /> Save
          </Button>
        </div>
      )}
    </div>
  );
};

export default OrgPage;
