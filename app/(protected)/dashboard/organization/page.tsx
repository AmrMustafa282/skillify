import { Button } from "@/components/ui/button";
import { columns } from "./_components/members-columns";
import { DataTable } from "@/components/ui/data-table";
import { server } from "@/lib/api";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Org } from "@/types";
import { API_URL } from "@/config";

async function getOrgs() {
  const res = await server.get(`${API_URL}/organizations/user/current`);
  return res.data.data as Org[];
}

export default async function OrgsPage() {
  const data = await getOrgs();

  return (
    <div>
      <div className="flex w-full justify-between items-center mb-12">
        <h1 className="text-3xl font-bold">Organizations ({data.length})</h1>
        <Link href="/dashboard/organization/create" className="text-blue-500 underline">
          <Button className="font-bold">
            <Plus className="h-4 w-4" />
            Create organization
          </Button>
        </Link>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
