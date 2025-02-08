"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import useAuthenticate from "../hooks/useAuthenticate";
import { Skeleton } from "@/components/ui/skeleton";

export default function Header() {
 const { session, status, signOut } = useAuthenticate();
 const router = useRouter();

 return (
  <header className="bg-white py-4">
   <nav className="flex justify-between items-center container mx-auto">
    {status === "loading" ? (
     <Skeleton className="w-32 h-6 rounded-md" />
    ) : (
     <div>Welcome, {session?.user?.name || "Guest"}</div>
    )}
    {status === "loading" ? (
     <div className="flex gap-1">
      <Skeleton className="w-20 h-10 rounded-md" />
      <Skeleton className="w-20 h-10 rounded-md" />
     </div>
    ) : session?.user ? (
     <Button onClick={() => signOut()}>Logout</Button>
    ) : (
     <div className="flex gap-1">
      <Button variant="ghost" size="lg" onClick={() => router.push("/signup")}>
       SignUp
      </Button>
      <Button size="lg" onClick={() => router.push("/login")}>
       Login
      </Button>
     </div>
    )}
   </nav>
  </header>
 );
}
