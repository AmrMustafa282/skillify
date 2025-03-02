"use client";
import { AuthForm } from "@/components/auth/_components/auth-form";
import { useLoginForm } from "@/components/auth/useLoginForm";
import type React from "react";
import Loader from "../ui/Loader";

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const { status, onSubmit, form } = useLoginForm();

  if (status === "loading") return <Loader />;
  const fields = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "example@example.com",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
    },
  ];
  return (
    <AuthForm
      type="login"
      fields={fields}
      className={className}
      form={form}
      onSubmit={onSubmit}
      status="idle"
      {...props}
    />
  );
}
