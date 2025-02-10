"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import useAuthenticate from "../hooks/useAuthenticate";
import { Skeleton } from "@/components/ui/skeleton";
import { ModeToggle } from "./ui/toggle-theme";

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
            <Skeleton className="w-52  h-10 rounded-md" />
          </div>
        ) : session?.user ? (
          <>
            <div className="flex items-center gap-2">
              <ModeToggle />
              <Button onClick={() => signOut()}>Logout</Button>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-1">
            <ModeToggle />
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
