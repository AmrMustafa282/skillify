"use client"
import { DataTable } from "@/components/ui/data-table";
// import { server } from "@/lib/api";
import { columns } from "@/app/(protected)/dashboard/(personal)/_components/assignment-columns";
import useAssessments from "@/app/(protected)/dashboard/(personal)/_hooks/use-assessment";


export default function AssessmentPages() {
  const { assessments: data } = useAssessments();
  // console.log(data);
  return (
    <div>
      <div className="flex w-full justify-between items-center mb-12">
        <h1 className="text-3xl font-bold">Assessments ({data.length})</h1>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
