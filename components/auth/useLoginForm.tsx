import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export function useLoginForm() {
  const router = useRouter();
  const { status } = useSession();
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (result?.error) {
        console.error("Login failed:", result.error);
        router.replace("/login?error=Invalid+email+or+password.");
      } else {
        const session: any = await getSession();
        if (session) {
        }
      }
    } catch (error) {
      console.error("Login failed", error);
      toast.error("An unexpected error occurred.");
    }
  }

  return { form, status, onSubmit };
}
