"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { AuthSignInButton } from "@/components/ui/AuthSignInButton";
import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type React from "react";
import Loader from "../ui/Loader";
import { AuthButtons } from "@/components/auth/AuthButtons";
import useAuthenticate from "@/hooks/useAuthenticate";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const { signIn, status } = useAuthenticate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status, router]);

  if (status === "loading") return <Loader />;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // const result = await signIn("credentials", {
      //   redirect: false,
      //   email: values.email,
      //   password: values.password,
      // });

      // if (result?.error) {
      //   toast.error("Invalid email or password.");
      //   return;
      // }
      const result = await signIn("google", { callbackUrl: "/dashboard" });
      console.log(result);
      toast.success("Login successful!");
      router.push("/");
    } catch (error) {
      console.error("Login failed", error);
      toast.error("An unexpected error occurred.");
    }
  }

  return (
    <div className={cn("flex flex-col gap-6 ", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl text-center pt-4 mx-auto ">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 self-center font-medium"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <GalleryVerticalEnd className="size-4" />
              </div>
              <p className="font-bold text-lg">Skillify.io</p>
            </Link>
          </CardTitle>
          <CardDescription>Login with your Github or Google account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <AuthButtons />
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="example@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="text-sm text-right">
                  <a href="#" className="text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a>
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
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and{" "}
        <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
