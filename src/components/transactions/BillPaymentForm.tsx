
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import RecurringOptions from "./RecurringOptions";

interface Account {
  id: string;
  name: string;
  number: string;
  balance: number;
}

interface Payee {
  id: string;
  name: string;
  accountNumber: string;
}

interface BillPaymentFormProps {
  accounts: Account[];
  savedPayees: Payee[];
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

const BillPaymentForm = ({ accounts, savedPayees, isSubmitting, onSubmit }: BillPaymentFormProps) => {
  const [isRecurring, setIsRecurring] = useState(false);
  const [frequency, setFrequency] = useState("monthly");
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bill Payment</CardTitle>
        <CardDescription>
          Pay your bills from your accounts
        </CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="billFromAccount">From Account</Label>
            <Select defaultValue="1">
              <SelectTrigger id="billFromAccount">
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map(account => (
                  <SelectItem key={account.id} value={account.id}>
                    {account.name} ({account.number}) - ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="billPayee">Payee / Biller</Label>
            <Select>
              <SelectTrigger id="billPayee">
                <SelectValue placeholder="Select a payee or add new" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">+ Add New Payee</SelectItem>
                {savedPayees.map(payee => (
                  <SelectItem key={payee.id} value={payee.id}>
                    {payee.name} - Acct: {payee.accountNumber}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="billAmount">Amount</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <Input id="billAmount" type="number" min="0.01" step="0.01" placeholder="0.00" className="pl-7" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="billPayDate">Payment Date</Label>
            <Input id="billPayDate" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="billMemo">Memo / Account Number (Optional)</Label>
            <Input id="billMemo" placeholder="Add account number or reference number" />
          </div>
          
          <RecurringOptions
            onRecurringChange={setIsRecurring}
            onFrequencyChange={setFrequency}
          />
          
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox id="eStatement" />
            <Label htmlFor="eStatement" className="text-sm font-normal">Receive e-bill statement for this payee</Label>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
            {isSubmitting ? "Processing..." : `Schedule ${isRecurring ? "Recurring " : ""}Payment`}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default BillPaymentForm;
