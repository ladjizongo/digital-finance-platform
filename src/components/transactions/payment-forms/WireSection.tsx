import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import RecurringOptions from "../RecurringOptions";
import { WireTemplateDialog } from "./WireTemplateDialog";
import { WireAccountSelection } from "./wire/WireAccountSelection";
import { WireTransferType } from "./wire/WireTransferType";
import { WireFileUpload } from "./wire/WireFileUpload";
import { WireDetailsForm } from "./wire/WireDetailsForm";
import { WireAmountAndPurpose } from "./wire/WireAmountAndPurpose";

interface Account {
  id: string;
  name: string;
  number: string;
  balance: number;
}

interface WireSectionProps {
  accounts: Account[];
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onAmountChange?: (amount: number) => void;
  selectedFromAccount?: string;
  onFromAccountChange?: (accountId: string) => void;
}

export const WireSection = ({ 
  accounts, 
  isSubmitting, 
  onSubmit, 
  onAmountChange,
  selectedFromAccount,
  onFromAccountChange 
}: WireSectionProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    recipientName: "",
    recipientBank: "",
    swiftCode: "",
    accountNumber: "",
    recipientAddress: "",
    transferType: "domestic"
  });
  const [wireFile, setWireFile] = useState<File | null>(null);
  const [isRecurring, setIsRecurring] = useState(false);
  const [frequency, setFrequency] = useState("monthly");

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveTemplate = (template: any) => {
    const templates = JSON.parse(localStorage.getItem("wireTemplates") || "[]");
    const newTemplate = {
      ...template,
      id: Date.now().toString()
    };
    
    localStorage.setItem("wireTemplates", JSON.stringify([...templates, newTemplate]));
    
    toast({
      title: "Template Saved",
      description: "Your wire transfer template has been saved successfully."
    });
  };

  const handleFileSelected = (file: File) => {
    setWireFile(file);
    console.log("Wire file selected:", file.name);
    
    if (file.name.endsWith('.xml')) {
      toast({
        title: "XML File Selected",
        description: "XML file will be processed for wire transfer details"
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Wire Transfer</CardTitle>
        <CardDescription>
          Send funds via wire transfer internationally or for high-value domestic transfers
        </CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4">
          <WireAccountSelection 
            accounts={accounts} 
            selectedAccount={selectedFromAccount}
            onAccountChange={onFromAccountChange}
          />
          
          <WireTransferType 
            value={formData.transferType} 
            onChange={(value) => handleInputChange("transferType", value)} 
          />
          
          <WireFileUpload onFileSelected={handleFileSelected} />
          
          <div className="space-y-2 mt-4 pt-4 border-t">
            <h3 className="text-lg font-medium">Or Enter Wire Details Manually</h3>
          </div>
          
          <WireDetailsForm 
            formData={formData} 
            onChange={handleInputChange} 
          />
          
          <WireAmountAndPurpose onAmountChange={onAmountChange} />
          
          <RecurringOptions
            onRecurringChange={setIsRecurring}
            onFrequencyChange={setFrequency}
          />
        </CardContent>
        
        <CardFooter className="flex gap-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : `Send ${isRecurring ? "Recurring " : ""}Wire Transfer`}
          </Button>
          
          <WireTemplateDialog
            currentData={formData}
            onSaveTemplate={handleSaveTemplate}
          />
        </CardFooter>
      </form>
    </Card>
  );
};
