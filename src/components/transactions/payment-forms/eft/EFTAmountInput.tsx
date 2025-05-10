
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EFTAmountInputProps {
  onAmountChange?: (amount: number) => void;
}

export const EFTAmountInput = ({ onAmountChange }: EFTAmountInputProps) => {
  const [amount, setAmount] = useState<string>("0.00");
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    
    const numericValue = parseFloat(value);
    if (onAmountChange && !isNaN(numericValue)) {
      onAmountChange(numericValue);
    }
  };
  
  return (
    <div className="space-y-2">
      <Label htmlFor="amount">Amount</Label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500">$</span>
        </div>
        <Input
          id="amount"
          value={amount}
          onChange={handleAmountChange}
          placeholder="0.00"
          className="pl-6"
          type="number"
          step="0.01"
          min="0"
        />
      </div>
    </div>
  );
};
