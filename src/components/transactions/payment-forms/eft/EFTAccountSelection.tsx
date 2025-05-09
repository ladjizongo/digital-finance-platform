
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Account {
  id: string;
  name: string;
  number: string;
  balance: number;
}

interface EFTAccountSelectionProps {
  accounts: Account[];
}

export const EFTAccountSelection = ({ accounts }: EFTAccountSelectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">From Account</CardTitle>
        <CardDescription>
          Choose the account to transfer funds from
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fromAccount">Select Account</Label>
          <Select defaultValue={accounts[0]?.id}>
            <SelectTrigger id="fromAccount">
              <SelectValue placeholder="Select an account" />
            </SelectTrigger>
            <SelectContent>
              {accounts.map((account) => (
                <SelectItem key={account.id} value={account.id}>
                  <span className="font-medium">{account.name}</span> (
                  {account.number}) - ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
