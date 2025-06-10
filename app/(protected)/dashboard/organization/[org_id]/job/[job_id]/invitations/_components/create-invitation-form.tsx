"use client";

import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useParams, useRouter } from "next/navigation";
import { DatePicker } from "@/components/ui/date-picker";
import axios from "axios";
import { API_URL } from "@/config";
import toast from "react-hot-toast";
import { assessmentSchema } from "./invitation-schema";
import { Save, X } from "lucide-react";
import type { AssessmentProps } from "@/types";

const CreateInvitationForm = ({
  onShow = false,
  handleCancel,
  assessment,
}: {
  onShow?: boolean;
  handleCancel?: () => void;
  assessment?: AssessmentProps;
}) => {
  const { job_id } = useParams();
  const router = useRouter();

  const parseISODate = (dateString: string | undefined): Date | undefined => {
    if (!dateString) return undefined;
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? undefined : date;
  };

  const form = useForm<z.infer<typeof assessmentSchema>>({
    resolver: zodResolver(assessmentSchema),
    defaultValues: {
      name: assessment?.name || "",
      description: assessment?.description || "",
      timeLimit: assessment?.timeLimit || 0,
      jobId: job_id as string,
      startDate: undefined,
      endDate: undefined,
    },
  });

  useEffect(() => {
    if (assessment) {
      const startDate = parseISODate(assessment.startTime);
      const endDate = parseISODate(assessment.endTime);

      form.setValue("startDate", startDate!);
      form.setValue("endDate", endDate!);
    }
  }, [assessment, form]);

  async function onSubmit(values: z.infer<typeof assessmentSchema>) {
    if (!values.startDate || !values.endDate) {
      toast.error("Start date and end date are required");
      return;
    }

    const formattedValues = {
      ...values,
      startTime: formatDateWithTime(values.startDate, "09:00:00Z"),
      endTime: formatDateWithTime(values.endDate, "18:00:00Z"),
    };

    try {
      const endpoint = assessment ? `${API_URL}/tests/${assessment.id}` : `${API_URL}/tests`;

      const method = assessment ? axios.patch : axios.post;

      const res = await method(endpoint, formattedValues, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(
          assessment ? "Invitation updated successfully" : "Invitation created successfully"
        );
      }

      const assessmentId = assessment ? assessment.id : res.data.data.id;
      if (!assessment) router.push(`${assessmentId}/add-questions`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  }

  function formatDateWithTime(date: Date, timeString: string): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}T${timeString}`;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Invitation Name</FormLabel>
              <FormControl>
                <Input {...field} disabled={onShow} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Invitation Description</FormLabel>
              <FormControl>
                <Input {...field} disabled={onShow} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="timeLimit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Invitation Time Limit (in minutes)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  disabled={onShow}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col md:flex-row md:items-center gap-8">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <DatePicker date={field.value} setDate={field.onChange} disabled={onShow} />
                </FormControl>
                <FormDescription>
                  The date when the assessment will become available.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <DatePicker date={field.value} setDate={field.onChange} disabled={onShow} />
                </FormControl>
                <FormDescription>
                  The date when the assessment will no longer be available.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {!onShow && (
          <div className="w-full flex justify-end flex-grow items-end gap-4 mt-12">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleCancel}
              disabled={form.formState.isSubmitting}
            >
              <X className="h-4 w-4 mr-1" /> Cancel
            </Button>
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              <Save className="h-4 w-4 mr-1" /> Save
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};

export default CreateInvitationForm;
