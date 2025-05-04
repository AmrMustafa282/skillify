import { API_URL } from "@/config";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const baseSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const userSchema = baseSchema;

export function useSignupForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    try {
      const req = await axios.post(`${API_URL}/auth/register`, values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (req.data.data.success) {
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
      router.replace(`/signup?error=${message.split(" ").join("+")}`);
    }
  };

  return { form, onSubmit };
}
