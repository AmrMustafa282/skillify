"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Role } from "@/types";
import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
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
import { useState } from "react";
import type React from "react"; // Added import for React

const baseSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum([Role.ROLE_CANDIDATE, Role.ROLE_RECRUITER]),
});

const candidateSchema = baseSchema;

const recruiterSchema = baseSchema.extend({
  company: z.string().min(2, "Company name must be at least 2 characters"),
});

export function SignupForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const [role, setRole] = useState<Role>(Role.ROLE_CANDIDATE);

  const form = useForm<z.infer<typeof recruiterSchema>>({
    resolver: zodResolver(role === Role.ROLE_CANDIDATE ? candidateSchema : recruiterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: Role.ROLE_CANDIDATE,
      company: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof recruiterSchema>) => {
    try {
      const req = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register`, values);
      if (req.status === 200) {
        toast.success("Signup successful");
        setTimeout(() => {
          router.replace("/login");
        }, 2000);
      }
    } catch (err) {
      toast.error("Signup failed");
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
        <Tabs value={role} onValueChange={(value) => setRole(value as Role)} className="p-2">
          <TabsList className="flex items-center gap-2 justify-center transition-all  m-4">
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
              As a recruiter
            </TabsTrigger>
          </TabsList>
          <TabsContent value={Role.ROLE_CANDIDATE}>
            <SignUpContent role={Role.ROLE_CANDIDATE} form={form} onSubmit={onSubmit} />
          </TabsContent>
          <TabsContent value={Role.ROLE_RECRUITER}>
            <SignUpContent role={Role.ROLE_RECRUITER} form={form} onSubmit={onSubmit} />
          </TabsContent>
        </Tabs>
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
  form: ReturnType<typeof useForm<z.infer<typeof recruiterSchema>>>;
  onSubmit: (values: z.infer<typeof recruiterSchema>) => Promise<void>;
}) {
  return (
    <CardContent className="p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            {role === Role.ROLE_RECRUITER && (
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="Company name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
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
