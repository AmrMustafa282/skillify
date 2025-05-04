"use client";

import { AnimatedAlert } from "@/components/animated-alert";
import { AuthButtons } from "@/components/auth/_components/AuthButtons";
import { FormFields } from "@/components/auth/_components/FormFields";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import Loader from "@/components/ui/Loader";
import { cn } from "@/lib/utils";
import type { FieldValue } from "@/types";
import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface AuthFormProps {
  type: "login" | "signup";
  className?: string;
  form: any;
  onSubmit: any;
  fields: Array<FieldValue>;
  status?: "loading" | "error" | "idle";
}

export function AuthForm({
  type,
  className,
  form,
  onSubmit,
  fields,
  status,
  ...props
}: AuthFormProps) {
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const error = searchParams.get("error");
  const errorMessages: Record<string, string> = {
    GoogleOAuthFailed: "Login with Google account failed.",
    GitHubOAuthFailed: "Login with GitHub account failed.",
    CredentialsSignin: "Incorrect email or password.",
    AccessDenied: "Access denied. Please check your permissions.",
    OAuthServerError: "A server error occurred during sign in. Please try again later.",
  };

  useEffect(() => {
    setErrorMessage(error ? errorMessages[error] || error : null);
  }, [searchParams]);

  if (status === "loading") return <Loader />;
  const isLogin = type === "login";
  const description = isLogin
    ? "Login with your Github or Google account"
    : "Signup to our platform and get started";

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="relative overflow-hidden">
        <CardTitle className="text-xl text-center pt-4 mx-auto">
          <Link href="/" className="flex items-center justify-center gap-2 self-center font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            <p className="font-bold text-lg">Skillify.io</p>
          </Link>
        </CardTitle>
        <CardHeader className="text-center">
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <AnimatedAlert message={errorMessage} variant="destructive" dismissible />
          <AuthButtons />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormFields fields={fields} form={form} />
              <Button type="submit" className="w-full">
                {isLogin ? "Login" : "Signup"}
              </Button>
              {!isLogin && (
                <div className="text-center text-sm">
                  Already have account?{" "}
                  <Link href="/login" className="underline underline-offset-4">
                    Sign in
                  </Link>
                </div>
              )}
              {isLogin && (
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup" className="underline underline-offset-4">
                    Sign up
                  </Link>
                </div>
              )}
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
