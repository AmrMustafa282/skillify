"use client"
import { useParams } from "next/navigation";

const OrgPage = () => {
  const params = useParams();
  return (<div>{params.org_id}</div>);
}

export default OrgPage;
