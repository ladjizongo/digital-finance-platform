
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface WireDetailsFormProps {
  formData: {
    recipientName: string;
    recipientBank: string;
    swiftCode: string;
    accountNumber: string;
    recipientAddress: string;
  };
  onChange: (field: string, value: string) => void;
}

export const WireDetailsForm = ({ formData, onChange }: WireDetailsFormProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="wireRecipientBank">Recipient Bank Name</Label>
        <Input 
          id="wireRecipientBank" 
          placeholder="Bank name"
          value={formData.recipientBank}
          onChange={(e) => onChange("recipientBank", e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="wireSwiftCode">SWIFT/BIC Code</Label>
          <Input 
            id="wireSwiftCode" 
            placeholder="Enter SWIFT/BIC code"
            value={formData.swiftCode}
            onChange={(e) => onChange("swiftCode", e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="wireAccountNumber">Account Number / IBAN</Label>
          <Input 
            id="wireAccountNumber" 
            placeholder="Account number or IBAN"
            value={formData.accountNumber}
            onChange={(e) => onChange("accountNumber", e.target.value)}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="wireRecipientName">Recipient Name</Label>
        <Input 
          id="wireRecipientName" 
          placeholder="Full name of recipient"
          value={formData.recipientName}
          onChange={(e) => onChange("recipientName", e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="wireRecipientAddress">Recipient Address</Label>
        <Textarea 
          id="wireRecipientAddress" 
          placeholder="Enter full address"
          value={formData.recipientAddress}
          onChange={(e) => onChange("recipientAddress", e.target.value)}
        />
      </div>
    </>
  );
};
