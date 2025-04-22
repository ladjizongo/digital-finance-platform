
import * as z from "zod";

export const financialFormSchema = z.object({
  // Year
  year: z.string().min(4, { message: "Please select a year" }),
  
  // Assets
  currentAssets: z.coerce.number().min(0, { message: "Current assets must be 0 or greater" }),
  longTermAssets: z.coerce.number().min(0, { message: "Long-term assets must be 0 or greater" }),
  
  // Liabilities
  currentLiabilities: z.coerce.number().min(0, { message: "Current liabilities must be 0 or greater" }),
  longTermLiabilities: z.coerce.number().min(0, { message: "Long-term liabilities must be 0 or greater" }),
  
  // Income Statement
  revenue: z.coerce.number().min(0, { message: "Revenue must be 0 or greater" }),
  expenses: z.coerce.number().min(0, { message: "Expenses must be 0 or greater" }),
  
  // Metrics
  payableDays: z.coerce.number().min(0, { message: "Payable days must be 0 or greater" }),
  receivableDays: z.coerce.number().min(0, { message: "Receivable days must be 0 or greater" }),
  biWeeklyPayroll: z.coerce.number().min(0, { message: "Bi-weekly payroll must be 0 or greater" }),
  monthlyPayables: z.coerce.number().min(0, { message: "Monthly payables must be 0 or greater" }),
  monthlyReceivables: z.coerce.number().min(0, { message: "Monthly receivables must be 0 or greater" }),
  
  // Optional notes
  notes: z.string().optional(),
});

export type FinancialFormValues = z.infer<typeof financialFormSchema>;

