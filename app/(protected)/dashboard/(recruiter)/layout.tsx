"use client";
import Loader from "@/components/ui/Loader";
import { Role } from "@/types";
import { useSession } from "next-auth/react";
import { notFound, useRouter } from "next/navigation";
import { useEffect } from "react";

const RecruiterLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") return <Loader />;
  if (!session) return null;

  //@ts-expect-error
  const role = session?.user?.role;

  if (role !== Role.ROLE_RECRUITER) return notFound();

  return <div>{children}</div>;
};

export default RecruiterLayout;
