import useAuthenticate from "@/hooks/useAuthenticate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export function useLoginForm() {
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
      // todo: sign in with a provider
      const result = await signIn("google", { callbackUrl: "/dashboard" });
      console.log(result);
      // todo: add login with database

      toast.success("Login successful!");
      router.push("/");
    } catch (error) {
      console.error("Login failed", error);
      toast.error("An unexpected error occurred.");
    }
  }

  return { form, status, onSubmit };
}
