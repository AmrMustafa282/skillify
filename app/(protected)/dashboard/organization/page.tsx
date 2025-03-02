import { Button } from "@/components/ui/button";
import { Org, columns } from "./columns";
import { DataTable } from "./data-table";
import { call } from "@/lib/api";
import Link from "next/link";
import { Plus } from "lucide-react";

async function getOrgs() {
  const res = await call.get(`${process.env.NEXT_PUBLIC_API_URL}/orgs/user/current`, {});
  return res.data.data as Org[];
}

export default async function OrgsPage() {
  const data = await getOrgs();

  return (
      <div className="container mx-auto py-10">
        <div className="flex w-full justify-between items-center mb-12">
          <h1 className="text-3xl font-bold">Organizations ({data.length})</h1>
          <Link href="/dashboard/organization/create" className="text-blue-500 underline">
          <Button className="font-bold">
            <Plus className="h-4 w-4"/>
            Create organization</Button>
          </Link>
        </div>
        <DataTable columns={columns} data={data} />
      </div>
  );
}
