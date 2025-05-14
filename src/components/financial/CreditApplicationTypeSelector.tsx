
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface CreditApplicationTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function CreditApplicationTypeSelector({ value, onChange }: CreditApplicationTypeSelectorProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-700">Select Application Type</h3>
      <RadioGroup 
        value={value} 
        onValueChange={onChange}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-gray-50">
          <RadioGroupItem value="overdraft" id="overdraft" />
          <Label htmlFor="overdraft" className="cursor-pointer">Overdraft</Label>
        </div>
        <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-gray-50">
          <RadioGroupItem value="lineOfCredit" id="lineOfCredit" />
          <Label htmlFor="lineOfCredit" className="cursor-pointer">Line of Credit</Label>
        </div>
        <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-gray-50">
          <RadioGroupItem value="termLoan" id="termLoan" />
          <Label htmlFor="termLoan" className="cursor-pointer">Term Loan</Label>
        </div>
        <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-gray-50">
          <RadioGroupItem value="equipmentPurchase" id="equipmentPurchase" />
          <Label htmlFor="equipmentPurchase" className="cursor-pointer">Equipment Purchase</Label>
        </div>
        <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-gray-50">
          <RadioGroupItem value="csbfl" id="csbfl" />
          <Label htmlFor="csbfl" className="cursor-pointer">Canadian Small Business Financing Loan (CSBFL)</Label>
        </div>
      </RadioGroup>
    </div>
  );
}
