"use client";
import { useEffect, useState } from "react";
import useUserStore from "@/zustand/userStore";
import { useRouter } from "next/navigation";
import useCheckUserExpiration from "@/hooks/useCheckUserExpiration";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
 const router = useRouter();
 const { user } = useUserStore();
 const [isMounted, setIsMounted] = useState(false);
 console.log(user);
 useCheckUserExpiration();
 // Ensure we only access persisted state after mount
 useEffect(() => {
  setIsMounted(true);
 }, []);

 useEffect(() => {
  if (isMounted && !user) {
   router.push("/login");
  }
 }, [isMounted, user, router]);

 if (!isMounted) return null; // Prevent hydration mismatch

 return <>{children}</>;
};

export default ProtectedLayout;
