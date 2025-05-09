
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface EFTTransactionTypeProps {
  value: string;
  onChange: (value: string) => void;
}

export const EFTTransactionType = ({ value, onChange }: EFTTransactionTypeProps) => {
  return (
    <div className="space-y-2">
      <Label>Transaction Type</Label>
      <RadioGroup 
        defaultValue="debit" 
        className="flex space-x-4"
        value={value}
        onValueChange={onChange}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="debit" id="debit" />
          <Label htmlFor="debit" className="cursor-pointer">Debit (withdraw money)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="credit" id="credit" />
          <Label htmlFor="credit" className="cursor-pointer">Credit (deposit money)</Label>
        </div>
      </RadioGroup>
    </div>
  );
};
