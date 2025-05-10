import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import RecurringOptions from "./RecurringOptions";

interface Account {
  id: string;
  name: string;
  number: string;
  balance: number;
}

interface Contact {
  id: string;
  name: string;
  email: string;
}

interface EmailTransferFormProps {
  accounts: Account[];
  contacts: Contact[];
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onAmountChange?: (amount: number) => void;
}

const EmailTransferForm = ({ accounts, contacts, isSubmitting, onSubmit, onAmountChange }: EmailTransferFormProps) => {
  const [isRecurring, setIsRecurring] = useState(false);
  const [frequency, setFrequency] = useState("monthly");
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (onAmountChange && !isNaN(value)) {
      onAmountChange(value);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Money Transfer</CardTitle>
        <CardDescription>
          Send money directly to someone's email address
        </CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="emailFromAccount">From Account</Label>
            <Select defaultValue="1">
              <SelectTrigger id="emailFromAccount">
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map(account => (
                  <SelectItem key={account.id} value={account.id}>
                    {account.name} ({account.number}) - ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient</Label>
            <Select>
              <SelectTrigger id="recipient">
                <SelectValue placeholder="Select a recipient or add new" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">+ Add New Recipient</SelectItem>
                {contacts.map(contact => (
                  <SelectItem key={contact.id} value={contact.id}>
                    {contact.name} - {contact.email}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="recipientName">Recipient Name</Label>
              <Input id="recipientName" placeholder="Full name of recipient" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="recipientEmail">Recipient Email</Label>
              <Input id="recipientEmail" type="email" placeholder="email@example.com" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="emailAmount">Amount</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <Input 
                id="emailAmount" 
                type="number" 
                min="0.01" 
                step="0.01" 
                placeholder="0.00" 
                className="pl-7"
                onChange={handleAmountChange}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="securityQuestion">Security Question</Label>
            <Input id="securityQuestion" placeholder="Question to verify recipient's identity" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="securityAnswer">Security Answer</Label>
            <Input id="securityAnswer" placeholder="Answer to security question" />
            <p className="text-sm text-gray-500">The recipient will need this answer to claim the funds.</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="emailMessage">Message (Optional)</Label>
            <Textarea id="emailMessage" placeholder="Add a personal message for the recipient" />
          </div>
          
          <RecurringOptions
            onRecurringChange={setIsRecurring}
            onFrequencyChange={setFrequency}
          />
          
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox id="saveRecipient" />
            <Label htmlFor="saveRecipient" className="text-sm font-normal">Save this recipient for future transfers</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox id="notifyRecipient" defaultChecked />
            <Label htmlFor="notifyRecipient" className="text-sm font-normal">Send email notification to recipient</Label>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="expiryDate">Expiry Date</Label>
            <Input 
              id="expiryDate" 
              type="date" 
              defaultValue={new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0]} 
            />
            <p className="text-sm text-gray-500">The transfer will expire if not claimed by this date.</p>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
            {isSubmitting ? "Processing..." : `Send ${isRecurring ? "Recurring " : ""}Email Transfer`}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default EmailTransferForm;
