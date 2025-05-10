
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AmountInputWithApproval } from "@/components/transactions/AmountInputWithApproval";

interface WireAmountAndPurposeProps {
  onAmountChange?: (amount: number) => void;
}

export const WireAmountAndPurpose = ({ onAmountChange }: WireAmountAndPurposeProps) => {
  const [amount, setAmount] = useState(0);
  
  const handleAmountChange = (value: number) => {
    setAmount(value);
    if (onAmountChange) {
      onAmountChange(value);
    }
  };
  
  return (
    <>
      <AmountInputWithApproval 
        id="wireAmount"
        label="Amount"
        placeholder="0.00"
        onChange={handleAmountChange}
      />
      
      <div className="space-y-2">
        <Label htmlFor="wireDescription">Purpose of Payment</Label>
        <Textarea id="wireDescription" placeholder="Describe the purpose of this wire transfer" />
      </div>
    </>
  );
};
