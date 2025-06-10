import { Button } from "@/components/ui/button";
import { columns } from "./_components/assessments-columns";
import { DataTable } from "@/components/ui/data-table";
import { server } from "@/lib/api";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { Assessment } from "@/types";
import { API_URL } from "@/config";

interface getAssessmentsProps {
  params: {
    job_id: string;
    org_id: string;
  };
}

export default async function AssessmentsPage({ params }: getAssessmentsProps) {
  
  async function getAssessments() {
    const res = await server.get(`${API_URL}/tests`);
    return res.data.data.filter((item: any) => item.jobId === params.job_id) as Assessment[];
  }
  const data = await getAssessments();

  return (
    <div>
      <div className="flex w-full justify-between items-center mb-12">
        <h1 className="text-3xl font-bold">Assessments ({data.length})</h1>
        <Link href="assessments/create">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Assessment
          </Button>
        </Link>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
