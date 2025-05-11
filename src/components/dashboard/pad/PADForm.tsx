
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PADFormValues, padFormSchema } from "./padFormSchema";
import { Account } from "@/types/dashboardTypes";

interface PADFormProps {
  account: Account;
  onSubmit: (values: PADFormValues) => void;
}

export function PADForm({ account, onSubmit }: PADFormProps) {
  const form = useForm<PADFormValues>({
    resolver: zodResolver(padFormSchema),
    defaultValues: {
      companyName: "",
      agreementType: "payment",
      frequency: "monthly",
      startDate: new Date().toISOString().split('T')[0],
      maxAmount: "100.00",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 py-2">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="accountDetails" className="text-right">Account</Label>
            <div className="col-span-3">
              <div className="font-medium">{account.name}</div>
              <div className="text-sm text-muted-foreground">Account {account.accountNumber}</div>
            </div>
          </div>
          
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel className="text-right">Company Name</FormLabel>
                <div className="col-span-3">
                  <FormControl>
                    <Input placeholder="Enter company or payee name" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="agreementType"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel className="text-right">Agreement Type</FormLabel>
                <div className="col-span-3">
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select agreement type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="payment">Preauthorized Payment</SelectItem>
                      <SelectItem value="deposit">Direct Deposit</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose whether you're setting up payments to a company or deposits from a company
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="frequency"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel className="text-right">Frequency</FormLabel>
                <div className="col-span-3">
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="biweekly">Bi-Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="annually">Annually</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel className="text-right">Start Date</FormLabel>
                <div className="col-span-3">
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="maxAmount"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel className="text-right">Maximum Amount</FormLabel>
                <div className="col-span-3">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">$</span>
                    </div>
                    <FormControl>
                      <Input className="pl-7" placeholder="0.00" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>
        
        {/* The DialogFooter with buttons will be added in the main dialog component */}
      </form>
    </Form>
  );
}
