"use client"
import { DataTable } from "@/components/ui/data-table";
// import { server } from "@/lib/api";
import { TestAssignment } from "@/types";
import { API_URL } from "@/config";
import { columns } from "@/app/(protected)/dashboard/(personal)/_components/assessment-columns";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

function useAssessments() {
  const { data: session } = useSession();
  const [assessments, setAssessments] = useState<
    { assignment: TestAssignment; test: any; job: any }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTest = async (testId: string): Promise<any> => {
      try {
        const res = await axios(`${process.env.NEXT_PUBLIC_API_URL}/tests/${testId}`, {
          withCredentials: true,
        });
        return res.data.data;
      } catch (e) {
        console.error(e);
        return null;
      }
    };

    const getJob = async (jobId: string): Promise<any> => {
      try {
        const res = await axios(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${jobId}`, {
          withCredentials: true,
        });
        return res.data.data;
      } catch (e) {
        console.error(e);
        return null;
      }
    };

    async function fetchAssessments() {
      if (session?.user?.id) {
        try {
          const res = await axios.get(`${API_URL}/test-assignments/candidate/${session.user.id}`, {
            withCredentials: true,
          });
          if (res.data.success) {
            const assignments = res.data.data;
            const enrichedAssessments = await Promise.all(
              assignments.map(async (assignment: TestAssignment) => {
                // const test = await getTest(assignment.testId);
                // const job = test ? await getJob(test.jobId) : null;
                
                return { assignment, test:null, job:null };
              })
            );
            setAssessments(enrichedAssessments);
          }
        } catch (error) {
          console.error("Failed to fetch assessments:", error);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchAssessments();
  }, [session]);

  return { assessments, loading };
}

export default function AssessmentPages() {
  const { assessments: data } = useAssessments();
  console.log(data);
  return (
    <div>
      <div className="flex w-full justify-between items-center mb-12">
        <h1 className="text-3xl font-bold">Assessments ({data.length})</h1>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
