
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface Recipient {
  id: string;
  name: string;
  transitNumber: string;
  bankId: string;
  accountNumber: string;
  amount: string;
}

export const EFTRecipientInfo = () => {
  const [recipients, setRecipients] = useState<Recipient[]>([
    { id: "1", name: "", transitNumber: "", bankId: "", accountNumber: "", amount: "0.00" }
  ]);

  const addRecipient = () => {
    const newRecipient: Recipient = {
      id: Date.now().toString(),
      name: "",
      transitNumber: "",
      bankId: "",
      accountNumber: "",
      amount: "0.00"
    };
    setRecipients([...recipients, newRecipient]);
  };

  const removeRecipient = (id: string) => {
    if (recipients.length > 1) {
      setRecipients(recipients.filter(recipient => recipient.id !== id));
    }
  };

  const updateRecipient = (id: string, field: keyof Recipient, value: string) => {
    setRecipients(recipients.map(recipient => 
      recipient.id === id ? { ...recipient, [field]: value } : recipient
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Label className="text-base font-medium">Recipients</Label>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={addRecipient}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Recipient
        </Button>
      </div>

      {recipients.map((recipient, index) => (
        <div key={recipient.id} className="border rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              Recipient {index + 1}
            </span>
            {recipients.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeRecipient(recipient.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`recipientName-${recipient.id}`}>Recipient Name</Label>
              <Input 
                id={`recipientName-${recipient.id}`}
                placeholder="Full name of recipient"
                value={recipient.name}
                onChange={(e) => updateRecipient(recipient.id, "name", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`transitNumber-${recipient.id}`}>Transit Number</Label>
              <Input 
                id={`transitNumber-${recipient.id}`}
                placeholder="5-digit transit number" 
                maxLength={5}
                pattern="[0-9]{5}"
                title="Please enter a 5-digit transit number"
                value={recipient.transitNumber}
                onChange={(e) => updateRecipient(recipient.id, "transitNumber", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">5 digits required</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`bankId-${recipient.id}`}>Bank ID</Label>
              <Input 
                id={`bankId-${recipient.id}`}
                placeholder="3-digit bank ID" 
                maxLength={3}
                pattern="[0-9]{3}"
                title="Please enter a 3-digit bank ID"
                value={recipient.bankId}
                onChange={(e) => updateRecipient(recipient.id, "bankId", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">3 digits required</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`bankAccountNumber-${recipient.id}`}>Account Number</Label>
              <Input 
                id={`bankAccountNumber-${recipient.id}`}
                placeholder="Account number" 
                maxLength={11}
                pattern="[0-9]{1,11}"
                title="Please enter up to 11 digits"
                value={recipient.accountNumber}
                onChange={(e) => updateRecipient(recipient.id, "accountNumber", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Maximum 11 digits</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`amount-${recipient.id}`}>Amount</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <Input
                  id={`amount-${recipient.id}`}
                  value={recipient.amount}
                  onChange={(e) => updateRecipient(recipient.id, "amount", e.target.value)}
                  placeholder="0.00"
                  className="pl-6"
                  type="number"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
