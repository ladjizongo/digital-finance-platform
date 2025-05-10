
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AmountInputWithApproval } from "@/components/transactions/AmountInputWithApproval";

export const WireAmountAndPurpose = () => {
  const [amount, setAmount] = useState(0);
  
  return (
    <>
      <AmountInputWithApproval 
        id="wireAmount"
        label="Amount"
        placeholder="0.00"
        onChange={setAmount}
      />
      
      <div className="space-y-2">
        <Label htmlFor="wireDescription">Purpose of Payment</Label>
        <Textarea id="wireDescription" placeholder="Describe the purpose of this wire transfer" />
      </div>
    </>
  );
};
