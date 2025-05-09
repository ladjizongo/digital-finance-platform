
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
  return (
    <div className="space-y-2">
      <Label htmlFor="wireFromAccount">From Account</Label>
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
