"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const CreateOrg = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orgs`, values, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success("Organization created successfully.");
        form.reset();
        setTimeout(() => {
          router.push("/dashboard/organization");
        }, 1000);
      }
    } catch (error: any) {
      toast.error("An unexpected error occurred.");
      toast.error(error.message);
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g My Organization" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="btn-primary">
            Create
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateOrg;
