
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface WireDetailsFormProps {
  formData: {
    recipientName: string;
    recipientBank: string;
    swiftCode: string;
    accountNumber: string;
    recipientAddress: string;
    recipientCity: string;
    recipientCountry: string;
    recipientPostalCode: string;
    bankAddress: string;
    bankCity: string;
    bankCountry: string;
    bankPostalCode: string;
    purposeCode: string;
    remittanceInfo: string;
    chargeBearer: string;
    intermediaryBank: string;
    intermediarySwift: string;
  };
  onChange: (field: string, value: string) => void;
}

const purposeCodes = [
  { value: "SUPP", label: "SUPP - Supplier Payment" },
  { value: "SALA", label: "SALA - Salary Payment" },
  { value: "TRAD", label: "TRAD - Trade Settlement" },
  { value: "TREA", label: "TREA - Treasury Payment" },
  { value: "LOAN", label: "LOAN - Loan Payment" },
  { value: "INTC", label: "INTC - Interest Payment" },
  { value: "DIVI", label: "DIVI - Dividend Payment" },
  { value: "OTHR", label: "OTHR - Other" },
];

const chargeBearerOptions = [
  { value: "SHA", label: "SHA - Shared" },
  { value: "OUR", label: "OUR - Sender Pays All" },
  { value: "BEN", label: "BEN - Beneficiary Pays All" },
];

export const WireDetailsForm = ({ formData, onChange }: WireDetailsFormProps) => {
  return (
    <div className="space-y-6">
      {/* Beneficiary (Recipient) Information */}
      <div className="border rounded-lg p-4 space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Beneficiary Information</h3>
        
        <div className="space-y-2">
          <Label htmlFor="wireRecipientName">Beneficiary Name *</Label>
          <Input 
            id="wireRecipientName" 
            placeholder="Full legal name of beneficiary"
            value={formData.recipientName}
            onChange={(e) => onChange("recipientName", e.target.value)}
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="wireAccountNumber">Beneficiary Account (IBAN/Account Number) *</Label>
            <Input 
              id="wireAccountNumber" 
              placeholder="IBAN or account number"
              value={formData.accountNumber}
              onChange={(e) => onChange("accountNumber", e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="wireRecipientAddress">Beneficiary Street Address *</Label>
            <Input 
              id="wireRecipientAddress" 
              placeholder="Street address"
              value={formData.recipientAddress}
              onChange={(e) => onChange("recipientAddress", e.target.value)}
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="wireRecipientCity">Beneficiary City *</Label>
            <Input 
              id="wireRecipientCity" 
              placeholder="City"
              value={formData.recipientCity}
              onChange={(e) => onChange("recipientCity", e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="wireRecipientPostalCode">Postal Code</Label>
            <Input 
              id="wireRecipientPostalCode" 
              placeholder="Postal/ZIP code"
              value={formData.recipientPostalCode}
              onChange={(e) => onChange("recipientPostalCode", e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="wireRecipientCountry">Beneficiary Country *</Label>
            <Input 
              id="wireRecipientCountry" 
              placeholder="Country (2-letter code)"
              value={formData.recipientCountry}
              onChange={(e) => onChange("recipientCountry", e.target.value)}
              maxLength={2}
              required
            />
          </div>
        </div>
      </div>

      {/* Beneficiary Bank Information */}
      <div className="border rounded-lg p-4 space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Beneficiary Bank Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="wireRecipientBank">Bank Name *</Label>
            <Input 
              id="wireRecipientBank" 
              placeholder="Full bank name"
              value={formData.recipientBank}
              onChange={(e) => onChange("recipientBank", e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="wireSwiftCode">SWIFT/BIC Code *</Label>
            <Input 
              id="wireSwiftCode" 
              placeholder="8 or 11 character SWIFT code"
              value={formData.swiftCode}
              onChange={(e) => onChange("swiftCode", e.target.value)}
              maxLength={11}
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="wireBankAddress">Bank Street Address</Label>
            <Input 
              id="wireBankAddress" 
              placeholder="Bank street address"
              value={formData.bankAddress}
              onChange={(e) => onChange("bankAddress", e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="wireBankCity">Bank City</Label>
            <Input 
              id="wireBankCity" 
              placeholder="Bank city"
              value={formData.bankCity}
              onChange={(e) => onChange("bankCity", e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="wireBankPostalCode">Bank Postal Code</Label>
            <Input 
              id="wireBankPostalCode" 
              placeholder="Bank postal/ZIP code"
              value={formData.bankPostalCode}
              onChange={(e) => onChange("bankPostalCode", e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="wireBankCountry">Bank Country</Label>
            <Input 
              id="wireBankCountry" 
              placeholder="Country (2-letter code)"
              value={formData.bankCountry}
              onChange={(e) => onChange("bankCountry", e.target.value)}
              maxLength={2}
            />
          </div>
        </div>
      </div>

      {/* Intermediary Bank (Optional) */}
      <div className="border rounded-lg p-4 space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Intermediary Bank (Optional)</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="wireIntermediaryBank">Intermediary Bank Name</Label>
            <Input 
              id="wireIntermediaryBank" 
              placeholder="Intermediary bank name (if required)"
              value={formData.intermediaryBank}
              onChange={(e) => onChange("intermediaryBank", e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="wireIntermediarySwift">Intermediary SWIFT Code</Label>
            <Input 
              id="wireIntermediarySwift" 
              placeholder="Intermediary SWIFT/BIC code"
              value={formData.intermediarySwift}
              onChange={(e) => onChange("intermediarySwift", e.target.value)}
              maxLength={11}
            />
          </div>
        </div>
      </div>

      {/* Payment Details */}
      <div className="border rounded-lg p-4 space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Payment Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="wirePurposeCode">Purpose Code *</Label>
            <Select 
              value={formData.purposeCode}
              onValueChange={(value) => onChange("purposeCode", value)}
            >
              <SelectTrigger id="wirePurposeCode">
                <SelectValue placeholder="Select purpose code" />
              </SelectTrigger>
              <SelectContent>
                {purposeCodes.map(code => (
                  <SelectItem key={code.value} value={code.value}>
                    {code.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="wireChargeBearer">Charge Bearer *</Label>
            <Select 
              value={formData.chargeBearer}
              onValueChange={(value) => onChange("chargeBearer", value)}
            >
              <SelectTrigger id="wireChargeBearer">
                <SelectValue placeholder="Who pays the fees?" />
              </SelectTrigger>
              <SelectContent>
                {chargeBearerOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="wireRemittanceInfo">Remittance Information *</Label>
          <Textarea 
            id="wireRemittanceInfo" 
            placeholder="Purpose of payment / invoice reference / structured remittance information"
            value={formData.remittanceInfo}
            onChange={(e) => onChange("remittanceInfo", e.target.value)}
            maxLength={140}
            required
          />
          <p className="text-xs text-gray-500">
            Maximum 140 characters. Include invoice numbers, contract references, or payment purpose.
          </p>
        </div>
      </div>
    </div>
  );
};
