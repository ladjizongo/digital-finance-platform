
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApprovalRequirement } from "./ApprovalRequirement";

interface AmountInputWithApprovalProps {
  id?: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  onChange?: (value: number) => void;
}

export const AmountInputWithApproval = ({ 
  id = "amount", 
  label = "Amount", 
  placeholder = "0.00",
  defaultValue = "",
  onChange
}: AmountInputWithApprovalProps) => {
  const [amount, setAmount] = useState<number>(parseFloat(defaultValue) || 0);
  const [showApproval, setShowApproval] = useState(false);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    const validAmount = isNaN(value) ? 0 : value;
    setAmount(validAmount);
    
    if (onChange) {
      onChange(validAmount);
    }
  };

  const handleBlur = () => {
    setShowApproval(true);
  };

  const handleFocus = () => {
    setShowApproval(false);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500">$</span>
        </div>
        <Input
          id={id}
          type="number"
          min="0"
          step="0.01"
          placeholder={placeholder}
          className="pl-7"
          defaultValue={defaultValue}
          onChange={handleAmountChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
      </div>
      
      {showApproval && amount > 0 && (
        <ApprovalRequirement amount={amount} />
      )}
    </div>
  );
};
