"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/Loader";
import Header from "@/components/Header";

export default function MePage({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") return <Loader />;
  if (!session) return null;


  return (
   <main className="flex flex-col  h-screen">
     <Header />
     <div className="flex-grow container mx-auto">{children}</div>
   </main>
  );
}
