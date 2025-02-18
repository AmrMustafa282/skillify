"use client";

import { AuthButtons } from "@/components/auth/AuthButtons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Role } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react"; // Added import for React
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const baseSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum([Role.ROLE_USER, Role.ROLE_ADMIN]),
});

const userSchema = baseSchema;
// todo: Check if it should be removed
const recruiterSchema = baseSchema.extend({
  company: z.string().min(2, "Company name must be at least 2 characters"),
});

export function SignupForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const [role, setRole] = useState<Role>(Role.ROLE_USER);

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: Role.ROLE_USER,
    },
  });

  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    try {
      const req = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register`, values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (req.status === 200) {
        toast.success("Signup successful");
        setTimeout(() => {
          router.replace("/login");
        }, 2000);
      }
    } catch (err) {
      let message = "Signup failed";
      console.error(err);
      if (err instanceof AxiosError) {
        message += `: ${err.response?.data.error}`;
      }
      toast.error(message);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardTitle className="text-xl text-center pt-4 mx-auto">
          <Link href="/" className="flex items-center justify-center gap-2 self-center font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            <p className="font-bold text-lg">Skillify.io</p>
          </Link>
        </CardTitle>

        <CardHeader className="text-center">
          <CardDescription>Signup to our platform and get started</CardDescription>
        </CardHeader>
        <SignUpContent role={role} form={form} onSubmit={onSubmit} />
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and{" "}
        <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}

function SignUpContent({
  role,
  form,
  onSubmit,
}: {
  role: Role;
  form: ReturnType<typeof useForm<z.infer<typeof userSchema>>>;
  onSubmit: (values: z.infer<typeof userSchema>) => Promise<void>;
}) {
  return (
    <CardContent className="p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <AuthButtons />
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Fill up your data
            </span>
          </div>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="m@example.com" {...field} />
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
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="hidden" {...field} value={role} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Sign up
            </Button>
          </div>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline underline-offset-4">
              Sign in
            </Link>
          </div>
        </form>
      </Form>
    </CardContent>
  );
}
