"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { AuthSignInButton } from "@/components/ui/AuthSignInButton";
import { AuthSignupButton } from "@/components/ui/AuthSignupButton";
import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";
import Loader from "../ui/Loader";
import toast from "react-hot-toast";
import { useEffect } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const {  status } = useSession();
  useEffect(() => {
   if (status === "authenticated") {
    router.replace("/");
   }
  }, [status, router]);

  if (status === "loading") return <Loader />;

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string | null;
    const password = formData.get("password") as string | null;

    if (!username || !password) {
      return toast.error("Please fill in all fields.");
    }
    try {
      signIn("credentials", { username, password });
    } catch (error) {
      console.error("Login failed", error);
      toast.error("Login failed");
    }
  };
  return (
   <div className={cn("flex flex-col gap-6", className)} {...props}>
    <Card>
     <CardHeader className="text-center">
      <CardTitle className="text-xl text-center pt-4 mx-auto ">
       <Link
        href="/"
        className="flex items-center  justify-center gap-2 self-center font-medium"
       >
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
         <GalleryVerticalEnd className="size-4" />
        </div>
        <p className="font-bold text-lg">Skillify.io</p>
       </Link>
      </CardTitle>
      <CardDescription>
       Login with your Github or Google account
      </CardDescription>
     </CardHeader>
     <CardContent>
      <form onSubmit={handleLogin}>
       <div className="grid gap-6">
        <div className="flex flex-col gap-4">
         <AuthSignInButton provider={"github"}>
          <svg
           xmlns="http://www.w3.org/2000/svg"
           width="24"
           height="24"
           viewBox="0 0 24 24"
           fill="none"
           stroke="currentColor"
           strokeWidth="2"
           strokeLinecap="round"
           strokeLinejoin="round"
           className="lucide lucide-github"
          >
           <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
           <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>
          Login with Github
         </AuthSignInButton>
         <AuthSignInButton provider="google">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
           <path
            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
            fill="currentColor"
           />
          </svg>
          Login with Google
         </AuthSignInButton>
        </div>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
         <span className="relative z-10 bg-background px-2 text-muted-foreground">
          Or continue with
         </span>
        </div>
        <div className="grid gap-6">
         <div className="grid gap-2">
          <Label htmlFor="email">Username</Label>
          <Input
           id="username"
           type="text"
           name="username"
           required
          />
         </div>
         <div className="grid gap-2">
          <div className="flex items-center">
           <Label htmlFor="password">Password</Label>
           <a
            href="#"
            className="ml-auto text-sm underline-offset-4 hover:underline"
           >
            Forgot your password?
           </a>
          </div>
          <Input id="password" type="password" name="password" required />
         </div>
         <Button type="submit" className="w-full">
          Login
         </Button>
        </div>
        <div className="text-center text-sm">
         Don&apos;t have an account?{" "}
         <Link href="/signup" className="underline underline-offset-4">
          Sign up
         </Link>
        </div>
       </div>
      </form>
     </CardContent>
    </Card>
    <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
     By clicking continue, you agree to our <a href="#">Terms of Service</a> and{" "}
     <a href="#">Privacy Policy</a>.
    </div>
   </div>
  );
}
