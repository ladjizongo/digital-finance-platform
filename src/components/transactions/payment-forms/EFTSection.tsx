
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface Account {
  id: string;
  name: string;
  number: string;
  balance: number;
}

interface EFTSectionProps {
  accounts: Account[];
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export const EFTSection = ({ accounts, isSubmitting, onSubmit }: EFTSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Electronic Funds Transfer (EFT/ACH)</CardTitle>
        <CardDescription>
          Send money electronically within the US banking system
        </CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="eftFromAccount">From Account</Label>
            <Select defaultValue="1">
              <SelectTrigger id="eftFromAccount">
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
            <Label htmlFor="recipientName">Recipient Name</Label>
            <Input id="recipientName" placeholder="Full name of recipient" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="bankRoutingNumber">ACH Routing Number</Label>
              <Input id="bankRoutingNumber" placeholder="9-digit routing number" maxLength={9} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bankAccountNumber">Account Number</Label>
              <Input id="bankAccountNumber" placeholder="Account number" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="accountType">Account Type</Label>
            <Select defaultValue="checking">
              <SelectTrigger id="accountType">
                <SelectValue placeholder="Select account type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="checking">Checking</SelectItem>
                <SelectItem value="savings">Savings</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="eftAmount">Amount</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <Input id="eftAmount" type="number" min="0.01" step="0.01" placeholder="0.00" className="pl-7" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="eftMemo">Memo (Optional)</Label>
            <Input id="eftMemo" placeholder="Add a memo for this transaction" />
          </div>
        </CardContent>
        
        <CardFooter>
          <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
            {isSubmitting ? "Processing..." : "Send EFT/ACH Transfer"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
