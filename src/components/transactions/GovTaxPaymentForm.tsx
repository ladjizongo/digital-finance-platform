
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Receipt } from "lucide-react";

interface GovTaxPaymentFormProps {
  accounts: Array<{
    id: string;
    name: string;
    number: string;
    balance: number;
  }>;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onAmountChange?: (amount: number) => void;
  selectedFromAccount?: string;
  onFromAccountChange?: (accountId: string) => void;
}

const GovTaxPaymentForm = ({ 
  accounts, 
  isSubmitting, 
  onSubmit, 
  onAmountChange,
  selectedFromAccount,
  onFromAccountChange
}: GovTaxPaymentFormProps) => {
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (onAmountChange && !isNaN(value)) {
      onAmountChange(value);
    }
  };

  const handleAccountChange = (value: string) => {
    if (onFromAccountChange) {
      onFromAccountChange(value);
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sourceAccount">From Account</Label>
            <Select 
              name="sourceAccount" 
              defaultValue={accounts[0]?.id}
              value={selectedFromAccount || accounts[0]?.id}
              onValueChange={handleAccountChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    {account.name} ({account.number}) - ${account.balance.toLocaleString()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="taxType">Tax Type</Label>
            <Select name="taxType" defaultValue="income">
              <SelectTrigger>
                <SelectValue placeholder="Select tax type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">Income Tax</SelectItem>
                <SelectItem value="property">Property Tax</SelectItem>
                <SelectItem value="sales">Sales Tax</SelectItem>
                <SelectItem value="payroll">Payroll Tax</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              min="0"
              placeholder="Enter amount"
              onChange={handleAmountChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reference">Reference Number</Label>
            <Input
              id="reference"
              name="reference"
              type="text"
              placeholder="Enter tax reference number"
              required
            />
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : "Pay Tax"}
        </Button>
      </form>
    </Card>
  );
};

export default GovTaxPaymentForm;
