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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const roles = [
  { id: "ROLE_ORG_ADMIN", name: "Admin" },
  { id: "ROLE_ORG_HR", name: "HR" },
  { id: "ROLE_ORG_INTERVIEWER", name: "Viewer" },
];

const inviteUserSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  role: z.string({
    required_error: "Please select a role",
  }),
});

type InviteUserFormValues = z.infer<typeof inviteUserSchema>;

export function InviteUserDialog() {
  const params = useParams();
  const [open, setOpen] = useState(false);
  const form = useForm<InviteUserFormValues>({
    resolver: zodResolver(inviteUserSchema),
    defaultValues: {
      email: "",
      role: "",
    },
  });

  async function onSubmit(data: InviteUserFormValues) {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/orgs/${params.org_id}/members`,
        {
          userEmail: data.email,
          roleName: data.role,
        },
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success("User invited");
        form.reset();
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
        <Button variant="outline">Invite User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite User</DialogTitle>
          <DialogDescription>
            Invite a new user to your organization. They will receive an email invitation.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-x-4">
                  <FormLabel className="text-right">Email</FormLabel>
                  <FormControl className="col-span-3">
                    <Input placeholder="email@example.com" {...field} />
                  </FormControl>
                  <FormMessage className="col-span-3 col-start-2" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-x-4">
                  <FormLabel className="text-right">Role</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl className="col-span-3">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.id} value={role.id}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="col-span-3 col-start-2" />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant={"outline"} onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Send Invitation</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
