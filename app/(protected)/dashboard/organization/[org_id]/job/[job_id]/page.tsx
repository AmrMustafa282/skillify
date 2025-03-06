"use client";
import { useParams } from "next/navigation";

const JobPage = () => {
  const params = useParams();
  return (
    <div>
      org_id:{params.org_id} , job_id: {params.job_id}
    </div>
  );
};

export default JobPage;
