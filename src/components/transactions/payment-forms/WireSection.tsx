
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { WireTemplateDialog } from "./WireTemplateDialog";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import FileUploadComponent from "../FileUploadComponent";
import RecurringOptions from "../RecurringOptions";

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
}

export const WireSection = ({ accounts, isSubmitting, onSubmit }: WireSectionProps) => {
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
      // In a real app, you might want to parse the XML file here
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
          <div className="space-y-2">
            <Label htmlFor="wireFromAccount">From Account</Label>
            <Select defaultValue="1">
              <SelectTrigger id="wireFromAccount">
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
            <Label htmlFor="wireTransferType">Transfer Type</Label>
            <Select 
              defaultValue="domestic"
              onValueChange={(value) => handleInputChange("transferType", value)}
            >
              <SelectTrigger id="wireTransferType">
                <SelectValue placeholder="Select transfer type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="domestic">Domestic Wire</SelectItem>
                <SelectItem value="international">International Wire</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <FileUploadComponent
            allowedFileTypes={['.xml', '.txt', '.csv']}
            onFileSelected={handleFileSelected}
            uploadTitle="Upload Wire Transfer File"
            uploadDescription="Upload a wire transfer file in XML, TXT, or CSV format"
          />
          
          <div className="space-y-2 mt-4 pt-4 border-t">
            <h3 className="text-lg font-medium">Or Enter Wire Details Manually</h3>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="wireRecipientBank">Recipient Bank Name</Label>
            <Input 
              id="wireRecipientBank" 
              placeholder="Bank name"
              value={formData.recipientBank}
              onChange={(e) => handleInputChange("recipientBank", e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="wireSwiftCode">SWIFT/BIC Code</Label>
              <Input 
                id="wireSwiftCode" 
                placeholder="Enter SWIFT/BIC code"
                value={formData.swiftCode}
                onChange={(e) => handleInputChange("swiftCode", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="wireAccountNumber">Account Number / IBAN</Label>
              <Input 
                id="wireAccountNumber" 
                placeholder="Account number or IBAN"
                value={formData.accountNumber}
                onChange={(e) => handleInputChange("accountNumber", e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="wireRecipientName">Recipient Name</Label>
            <Input 
              id="wireRecipientName" 
              placeholder="Full name of recipient"
              value={formData.recipientName}
              onChange={(e) => handleInputChange("recipientName", e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="wireRecipientAddress">Recipient Address</Label>
            <Textarea 
              id="wireRecipientAddress" 
              placeholder="Enter full address"
              value={formData.recipientAddress}
              onChange={(e) => handleInputChange("recipientAddress", e.target.value)}
            />
          </div>
          
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
