"use client";
import { useEffect, useState } from "react";
import useUserStore from "../zustand/userStore";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function Header() {
 const [isMounted, setIsMounted] = useState(false);
 const { user, clearUser } = useUserStore();
 const router = useRouter();
 useEffect(() => {
  setIsMounted(true);
 }, [user]);

 if (!isMounted) {
  return null;
 }
 return (
  <header className="bg-white py-4 ">
   <nav className="flex justify-between items-center container mx-auto ">
    <div>Welcome, {user ? user.name : "Guest"}</div>

    {user ? (
     <Button onClick={clearUser}>Logout</Button>
    ) : (
     <div className="flex gap-1">
      <Button variant={"ghost"}  size={"lg"} onClick={() => router.push("/signup")}>
       SignUp
      </Button>
      <Button size={"lg"}  onClick={() => router.push("/login")}>Login</Button>
     </div>
    )}
   </nav>
  </header>
 );
}
