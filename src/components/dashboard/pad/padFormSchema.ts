
import * as z from "zod";

export const padFormSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  agreementType: z.enum(["payment", "deposit"]),
  frequency: z.enum(["weekly", "biweekly", "monthly", "quarterly", "annually"]),
  startDate: z.string().min(1, "Start date is required"),
  maxAmount: z.string().min(1, "Maximum amount is required")
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
      message: "Must be a valid positive amount",
    }),
});

export type PADFormValues = z.infer<typeof padFormSchema>;
