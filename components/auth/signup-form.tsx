"use client";

import { AuthForm } from "@/components/auth/_components/auth-form";
import { useSignupForm } from "@/components/auth/useSignupForm";
import { cn } from "@/lib/utils";
import type React from "react"; // Added import for React

export function SignupForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const { onSubmit, form } = useSignupForm();
  const fields = [
    {
      name: "username",
      label: "Username",
      placeholder: "John Doe",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "m@example.com",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
    },
  ];
  return (
    <AuthForm
      type="signup"
      className={cn("flex flex-col gap-6", className)}
      form={form}
      onSubmit={onSubmit}
      fields={fields}
      status="idle"
      {...props}
    />
  );
}
