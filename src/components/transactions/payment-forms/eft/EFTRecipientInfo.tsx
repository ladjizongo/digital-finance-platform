
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const EFTRecipientInfo = () => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="recipientName">Recipient Name</Label>
        <Input id="recipientName" placeholder="Full name of recipient" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="transitNumber">Transit Number</Label>
          <Input 
            id="transitNumber" 
            placeholder="5-digit transit number" 
            maxLength={5}
            pattern="[0-9]{5}"
            title="Please enter a 5-digit transit number"
          />
          <p className="text-xs text-muted-foreground">5 digits required</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="bankId">Bank ID</Label>
          <Input 
            id="bankId" 
            placeholder="3-digit bank ID" 
            maxLength={3}
            pattern="[0-9]{3}"
            title="Please enter a 3-digit bank ID"
          />
          <p className="text-xs text-muted-foreground">3 digits required</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="bankAccountNumber">Account Number</Label>
          <Input 
            id="bankAccountNumber" 
            placeholder="Account number" 
            maxLength={11}
            pattern="[0-9]{1,11}"
            title="Please enter up to 11 digits"
          />
          <p className="text-xs text-muted-foreground">Maximum 11 digits</p>
        </div>
      </div>
    </>
  );
};
