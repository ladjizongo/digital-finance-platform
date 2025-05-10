
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import RecurringOptions from "../RecurringOptions";
import { EFTAccountSelection } from "./eft/EFTAccountSelection";
import { EFTTransactionType } from "./eft/EFTTransactionType";
import { EFTAmountInput } from "./eft/EFTAmountInput";
import { EFTRecipientInfo } from "./eft/EFTRecipientInfo";
import { EFTFileUpload } from "./eft/EFTFileUpload";
import { EFTTemplateActions } from "./eft/EFTTemplateActions";

interface Account {
  id: string;
  name: string;
  number: string;
  balance: number;
}

interface EFTSectionProps {
  accounts: Account[];
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onAmountChange?: (amount: number) => void;
}

export const EFTSection = ({ 
  accounts, 
  isSubmitting, 
  onSubmit,
  onAmountChange
}: EFTSectionProps) => {
  const { toast } = useToast();
  const [transactionType, setTransactionType] = useState("debit");
  const [eftFile, setEftFile] = useState<File | null>(null);
  const [isRecurring, setIsRecurring] = useState(false);
  const [frequency, setFrequency] = useState("monthly");

  const handleFileSelected = (file: File) => {
    setEftFile(file);
    console.log("EFT file selected:", file.name);
    // In a real app, you might want to parse the file here
  };
  
  const handleAmountChange = (amount: number) => {
    if (onAmountChange) {
      onAmountChange(amount);
    }
  };
  
  return (
    <form onSubmit={onSubmit}>
      <div className="space-y-8">
        <EFTAccountSelection accounts={accounts} />
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Transfer Details</CardTitle>
            <CardDescription>
              Enter the amount and transaction type
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <EFTTransactionType 
              value={transactionType}
              onChange={setTransactionType}
            />

            <EFTAmountInput onAmountChange={handleAmountChange} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Recipient Information</CardTitle>
            <CardDescription>
              Enter the bank and recipient details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <EFTRecipientInfo />
            
            <RecurringOptions
              onRecurringChange={setIsRecurring}
              onFrequencyChange={setFrequency}
            />
          </CardContent>
          
          <CardContent>
            <EFTFileUpload onFileSelected={handleFileSelected} />
          </CardContent>
        </Card>
        
        <div className="flex items-center justify-between py-4">
          <EFTTemplateActions />
          
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : `Send ${isRecurring ? "Recurring " : ""}EFT ${transactionType === 'credit' ? 'Credit' : 'Debit'}`}
          </Button>
        </div>
      </div>
    </form>
  );
};
