
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface Account {
  id: string;
  name: string;
  number: string;
  balance: number;
}

interface WireAccountSelectionProps {
  accounts: Account[];
}

export const WireAccountSelection = ({ accounts }: WireAccountSelectionProps) => {
  // Calculate average balance across all accounts
  const averageBalance = accounts.length 
    ? accounts.reduce((sum, account) => sum + account.balance, 0) / accounts.length 
    : 0;
    
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label htmlFor="wireFromAccount">From Account</Label>
        <span className="text-sm text-muted-foreground">
          Average Balance: ${averageBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </span>
      </div>
      <Select defaultValue="1">
        <SelectTrigger id="wireFromAccount">
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
  );
};
