import { API_URL } from "@/config";
import { TestAssignment } from "@/types";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function useAssessments() {
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
      if (session?.user?.email) {
        try {
          const res = await axios.get(`${API_URL}/test-assignments/candidate/${session.user.email}`, {
            withCredentials: true,
          });
          if (res.data.success) {
            const assignments = res.data.data;
            const enrichedAssessments = await Promise.all(
              assignments.map(async (assignment: TestAssignment) => {
                const test = await getTest(assignment.testId);
                const job = test ? await getJob(test.jobId) : null;

                return { assignment, test, job };
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
