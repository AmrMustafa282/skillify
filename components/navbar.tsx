"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { ModeToggle } from "./ui/toggle-theme";
import Cookies from "js-cookie";

import { signOut, useSession } from "next-auth/react";
import { NavUser } from "./nav-user";
import UserButton from "./auth/_components/user-button";

export default function Navbar() {
  const { status, data: session } = useSession();

  const handleSignout = () => {
    signOut();
    Cookies.remove("JWT");
    Cookies.remove("JWT_REFRESH");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
      <div className=" w-full">
        <div className="container flex h-14 max-w-screen-2xl items-cente ">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">SkIllIfy.io</span>
          </Link>
          <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
            <Link href="/dashboard" className="transition-colors hover:text-primary">
              Dashboard
            </Link>
            <Link href="/solutions" className="transition-colors hover:text-primary">
              Solutions
            </Link>
            <Link href="/industries" className="transition-colors hover:text-primary">
              Industries
            </Link>
            <Link href="/about" className="transition-colors hover:text-primary">
              About Us
            </Link>
          </nav>
          <div className="flex items-center space-x-2">
            <ModeToggle />
            <Link href="https://github.com/amrmustafa282" target="_blank" rel="noreferrer">
              <Button variant="ghost" size="icon">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            {status === "unauthenticated" && (
              <>
                <Link href="/signup" className="transition-colors hover:text-primary">
                  <Button variant="ghost" size="sm">
                    SignUp
                  </Button>
                </Link>
                <Link href="/login" className="transition-colors hover:text-primary">
                  <Button size="sm">Login</Button>
                </Link>
              </>
            )}
            {status === "authenticated" && <UserButton user={session.user} />}
          </div>
        </div>
      </div>
    </header>
  );
}
