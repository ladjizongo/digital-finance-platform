
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const WireAmountAndPurpose = () => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="wireAmount">Amount</Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500">$</span>
          </div>
          <Input id="wireAmount" type="number" min="0.01" step="0.01" placeholder="0.00" className="pl-7" />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="wireDescription">Purpose of Payment</Label>
        <Textarea id="wireDescription" placeholder="Describe the purpose of this wire transfer" />
      </div>
    </>
  );
};
