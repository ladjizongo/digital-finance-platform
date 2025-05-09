
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import RecurringOptions from "./RecurringOptions";

interface Account {
  id: string;
  name: string;
  number: string;
  balance: number;
}

interface TransferFormProps {
  accounts: Account[];
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

const TransferForm = ({ accounts, isSubmitting, onSubmit }: TransferFormProps) => {
  const [isRecurring, setIsRecurring] = useState(false);
  const [frequency, setFrequency] = useState("monthly");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transfer Between Accounts</CardTitle>
        <CardDescription>
          Move money between your accounts instantly
        </CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fromAccount">From Account</Label>
              <Select defaultValue="1">
                <SelectTrigger id="fromAccount">
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
              <Label htmlFor="toAccount">To Account</Label>
              <Select defaultValue="2">
                <SelectTrigger id="toAccount">
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map(account => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.name} ({account.number})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="transferAmount">Amount</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <Input id="transferAmount" type="number" min="0.01" step="0.01" placeholder="0.00" className="pl-7" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="transferDate">Date</Label>
            <Input id="transferDate" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="transferMemo">Memo (Optional)</Label>
            <Input id="transferMemo" placeholder="Add a memo for this transfer" />
          </div>
          
          <RecurringOptions
            onRecurringChange={setIsRecurring}
            onFrequencyChange={setFrequency}
          />
        </CardContent>
        
        <CardFooter>
          <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
            {isSubmitting ? "Processing..." : `Submit ${isRecurring ? "Recurring " : ""}Transfer`}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default TransferForm;
