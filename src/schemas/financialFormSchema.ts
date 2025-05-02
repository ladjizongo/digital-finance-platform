
import * as z from "zod";

export const financialFormSchema = z.object({
  // Year range (e.g., "2024-2025")
  year: z.string().min(9, { message: "Please select a valid year range" }),
  
  // Assets
  currentAssets: z.coerce
    .number({ invalid_type_error: "Current assets must be a number" })
    .nonnegative({ message: "Current assets must be 0 or greater" })
    .safe({ message: "Value is too large" }),
  
  longTermAssets: z.coerce
    .number({ invalid_type_error: "Long-term assets must be a number" })
    .nonnegative({ message: "Long-term assets must be 0 or greater" })
    .safe({ message: "Value is too large" }),
  
  // Liabilities
  currentLiabilities: z.coerce
    .number({ invalid_type_error: "Current liabilities must be a number" })
    .nonnegative({ message: "Current liabilities must be 0 or greater" })
    .safe({ message: "Value is too large" }),
  
  longTermLiabilities: z.coerce
    .number({ invalid_type_error: "Long-term liabilities must be a number" })
    .nonnegative({ message: "Long-term liabilities must be 0 or greater" })
    .safe({ message: "Value is too large" }),
  
  // Income Statement
  revenue: z.coerce
    .number({ invalid_type_error: "Revenue must be a number" })
    .nonnegative({ message: "Revenue must be 0 or greater" })
    .safe({ message: "Value is too large" }),
  
  expenses: z.coerce
    .number({ invalid_type_error: "Expenses must be a number" })
    .nonnegative({ message: "Expenses must be 0 or greater" })
    .safe({ message: "Value is too large" }),
  
  // Metrics
  payableDays: z.coerce
    .number({ invalid_type_error: "Payable days must be a number" })
    .nonnegative({ message: "Payable days must be 0 or greater" })
    .int({ message: "Payable days must be a whole number" })
    .lte(365, { message: "Payable days cannot exceed 365" }),
  
  receivableDays: z.coerce
    .number({ invalid_type_error: "Receivable days must be a number" })
    .nonnegative({ message: "Receivable days must be 0 or greater" })
    .int({ message: "Receivable days must be a whole number" })
    .lte(365, { message: "Receivable days cannot exceed 365" }),
  
  biWeeklyPayroll: z.coerce
    .number({ invalid_type_error: "Bi-weekly payroll must be a number" })
    .nonnegative({ message: "Bi-weekly payroll must be 0 or greater" })
    .safe({ message: "Value is too large" }),
  
  monthlyPayables: z.coerce
    .number({ invalid_type_error: "Monthly payables must be a number" })
    .nonnegative({ message: "Monthly payables must be 0 or greater" })
    .safe({ message: "Value is too large" }),
  
  monthlyReceivables: z.coerce
    .number({ invalid_type_error: "Monthly receivables must be a number" })
    .nonnegative({ message: "Monthly receivables must be 0 or greater" })
    .safe({ message: "Value is too large" }),
  
  // Optional notes with sanitization
  notes: z.string()
    .trim()
    .transform(val => val.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')) // Remove script tags
    .optional(),
});

export type FinancialFormValues = z.infer<typeof financialFormSchema>;
