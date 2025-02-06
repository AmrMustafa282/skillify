"use client";
import { useEffect } from "react";
import useUserStore from "../zustand/userStore";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import useAuthenticate from "../hooks/useAuthenticate";

export default function Header() {
  const { session, status, isSessionExpired, signOut } = useAuthenticate();
  const { user, clearUser } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (isSessionExpired) {
      clearUser();
    }
  }, [isSessionExpired, clearUser]);

  if (status === "loading") {
    return null;
  }

  return (
    <header className="bg-white py-4">
      <nav className="flex justify-between items-center container mx-auto">
        <div>Welcome, {session?.user?.name || "Guest"}</div>

        {session?.user ? (
          <Button onClick={() => signOut()}>Logout</Button>
        ) : (
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="lg"
              onClick={() => router.push("/signup")}
            >
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
