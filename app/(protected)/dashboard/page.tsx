import { columns } from "./_components/assignment-columns";
import { DataTable } from "@/components/ui/data-table";
import { server } from "@/lib/api";
import { TestAssignment } from "@/types";
import { API_URL } from "@/config";

async function getOrgs() {
  const res = await server.get(`${API_URL}/users/me/test-assignments`);
  return res.data.data.content as TestAssignment[];
}

export default async function AssessmentsPage() {
  const data = await getOrgs();

  return (
    <div>
      <div className="flex w-full justify-between items-center mb-12">
        <h1 className="text-3xl font-bold">Assessments ({data.length})</h1>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
