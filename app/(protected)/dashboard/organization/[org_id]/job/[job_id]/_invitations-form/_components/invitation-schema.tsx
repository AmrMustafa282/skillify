import { z } from "zod";

export const assessmentSchema = z
  .object({
    name: z.string().min(1, { message: "Assessment name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    timeLimit: z
      .number({ invalid_type_error: "Time limit must be a number" })
      .min(1, { message: "Time limit is required" }),
    jobId: z.string().min(1, { message: "Job ID is required" }),
    startDate: z.date({ required_error: "Start date is required" }),
    endDate: z.date({ required_error: "End date is required" }),
  })
  .refine((data) => data.endDate >= data.startDate, {
    path: ["endDate"],
    message: "End date must be after start date",
  });
