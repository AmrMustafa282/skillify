"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useParams } from "next/navigation";
import { API_URL } from "@/config";

const createJobSchema = z.object({
  title: z.string().nonempty({ message: "Please enter a title" }),
  description: z.string().nonempty({ message: "Please enter a description" }),
});

type CreateJobFormValues = z.infer<typeof createJobSchema>;

export function CreateJobDialog({ setJobs }: { setJobs: any }) {
  const params = useParams();
  const [open, setOpen] = useState(false);

  const form = useForm<CreateJobFormValues>({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  async function onSubmit(data: CreateJobFormValues) {
    try {
      const res = await axios.post(
        `${API_URL}/organizations/${params.org_id}/jobs`,
        {
          title: data.title,
          description: data.description,
          organizationId: params.org_id,
        },
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success("Job created successfully");
        form.reset();
        setJobs((prev: any) => [...prev, res.data.data]);
      } else {
        toast.error(res.data.error);
      }
      setOpen(false);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create New</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Job</DialogTitle>
          <DialogDescription>Create a new job on this organization.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-x-4">
                  <FormLabel className="text-right">Title</FormLabel>
                  <FormControl className="col-span-3">
                    <Input placeholder="Front-End.." {...field} />
                  </FormControl>
                  <FormMessage className="col-span-3 col-start-2" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-x-4">
                  <FormLabel className="text-right">Description</FormLabel>
                  <FormControl className="col-span-3">
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage className="col-span-3 col-start-2" />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant={"outline"} onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
