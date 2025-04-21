
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface ManualEntryFormProps {
  form: UseFormReturn<any>;
  isLoading: boolean;
  onSubmit: (values: any) => void;
}

export const ManualEntryForm = ({ form, isLoading, onSubmit }: ManualEntryFormProps) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <h4 className="font-medium text-sm">Key Metrics</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="payableDays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payable Days</FormLabel>
                  <FormControl>
                    <Input placeholder="0" type="number" min="0" {...field} />
                  </FormControl>
                  <FormDescription>Average days to pay vendors</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="receivableDays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Receivable Days</FormLabel>
                  <FormControl>
                    <Input placeholder="0" type="number" min="0" {...field} />
                  </FormControl>
                  <FormDescription>Average days to collect payments</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="biWeeklyPayroll"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bi-Weekly Payroll ($)</FormLabel>
                  <FormControl>
                    <Input placeholder="0.00" type="number" min="0" step="0.01" {...field} />
                  </FormControl>
                  <FormDescription>Average bi-weekly payroll expense</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-sm">Averages</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="monthlyPayables"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Payables ($)</FormLabel>
                  <FormControl>
                    <Input placeholder="0.00" type="number" min="0" step="0.01" {...field} />
                  </FormControl>
                  <FormDescription>Average monthly payables</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="monthlyReceivables"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Receivables ($)</FormLabel>
                  <FormControl>
                    <Input placeholder="0.00" type="number" min="0" step="0.01" {...field} />
                  </FormControl>
                  <FormDescription>Average monthly receivables</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Notes</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Any additional information about your financial situation..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Processing..." : "Generate Business Analysis"}
          {!isLoading && <FileText className="ml-2 h-4 w-4" />}
        </Button>
      </form>
    </Form>
  );
};
