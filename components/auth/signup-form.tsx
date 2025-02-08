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
import axios from "axios";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Role } from "@/types";
import { GalleryVerticalEnd} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
export function SignupForm({
 className,
 ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();


 const handleSignup = async (formData: FormData) => {
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  const role = formData.get("role");
  try {
   const req = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
    username,
    email,
    password,
    role,
   });
    if (req.status === 200) toast.success("Signup successful");
    setTimeout(() => {
      router.replace("/login");
      }, 2000);
  } catch (err) {
    toast.error("Signup failed");
  }
 };
 return (
  <div className={cn("flex flex-col gap-6", className)} {...props}>
   <Card>
    <CardTitle className="text-xl text-center pt-4 mx-auto " >
     <Link href="/" className="flex items-center  justify-center gap-2 self-center font-medium">
      <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
       <GalleryVerticalEnd className="size-4" />
      </div>
      <p className="font-bold text-lg">Skillify.io</p>
     </Link>
    </CardTitle>

    <CardHeader className="text-center">
     <CardDescription>Signup to our platform and get started</CardDescription>
    </CardHeader>
    <Tabs defaultValue={Role.ROLE_CANDIDATE} className="p-2">
     <TabsList className="flex items-center gap-2   justify-center transition-all ">
      <TabsTrigger
       className="data-[state='active']:bg-primary data-[state='active']:text-primary-foreground w-full"
       value={Role.ROLE_CANDIDATE}
      >
       As a candidate
      </TabsTrigger>
      <TabsTrigger
       className="data-[state='active']:bg-primary data-[state='active']:text-primary-foreground w-full"
       value={Role.ROLE_RECRUITER}
      >
       As a recruter
      </TabsTrigger>
     </TabsList>
     <TabsContent value={Role.ROLE_CANDIDATE}>
      <SignUpContent role={Role.ROLE_CANDIDATE} handleSignup={handleSignup} />
     </TabsContent>
     <TabsContent value={Role.ROLE_RECRUITER}>
      <SignUpContent role={Role.ROLE_RECRUITER} handleSignup={handleSignup} />
     </TabsContent>
    </Tabs>
   </Card>
   <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
    By clicking continue, you agree to our <a href="#">Terms of Service</a> and{" "}
    <a href="#">Privacy Policy</a>.
   </div>
  </div>
 );
}

function SignUpContent({
 role,
 handleSignup,
}: {
 role: Role;
 handleSignup: (formData: FormData) => void;
}) {
 return (
  <CardContent className="p-4">
   <form action={handleSignup}>
    <div className="grid gap-6">
     <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
      <span className="relative z-10 bg-background px-2 text-muted-foreground">
       Or continue with
      </span>
     </div>
     <div className="grid gap-6">
      <div className="grid gap-2">
       <Label htmlFor="username">Username</Label>
       <Input
        id="username"
        type="text"
        name="username"
        placeholder="John Doe"
        required
       />
      </div>
      <div className="grid gap-2">
       <Label htmlFor="email">Email</Label>
       <Input
        id="email"
        type="email"
        name="email"
        placeholder="m@example.com"
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
       {role === Role.ROLE_RECRUITER && (
        <>
         <Label htmlFor="compan">Company</Label>
         <Input
          id="company"
          type="text"
          name="company"
          placeholder="company"
          required
         />
        </>
       )}
      </div>
      <Input type="hidden" name="role" value={role} />

      <Button type="submit" className="w-full">
       signup
      </Button>
     </div>
     <div className="text-center text-sm">
      Alread have an account?{" "}
      <Link href="/login" className="underline underline-offset-4">
       Sign in
      </Link>
     </div>
    </div>
   </form>
  </CardContent>
 );
}
