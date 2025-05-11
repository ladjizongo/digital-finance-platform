
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import type { Account } from "@/types/dashboardTypes";

interface PADDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  account: Account;
}

const padFormSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  agreementType: z.enum(["payment", "deposit"]),
  frequency: z.enum(["weekly", "biweekly", "monthly", "quarterly", "annually"]),
  startDate: z.string().min(1, "Start date is required"),
  maxAmount: z.string().min(1, "Maximum amount is required")
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
      message: "Must be a valid positive amount",
    }),
});

type PADFormValues = z.infer<typeof padFormSchema>;

const PADDialog = ({ open, onOpenChange, account }: PADDialogProps) => {
  const { toast } = useToast();
  
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

  const onSubmit = (values: PADFormValues) => {
    console.log("PAD agreement values:", values);
    
    toast({
      title: "PAD Agreement Created",
      description: `${values.agreementType === "payment" ? "Preauthorized Payment" : "Direct Deposit"} agreement with ${values.companyName} has been set up for account ${account.accountNumber}.`,
    });
    
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create PAD Agreement</DialogTitle>
          <DialogDescription>
            Set up a Pre-Authorized Debit (PAD) agreement for payments or deposits.
          </DialogDescription>
        </DialogHeader>
        
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
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Create PAD Agreement</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PADDialog;
