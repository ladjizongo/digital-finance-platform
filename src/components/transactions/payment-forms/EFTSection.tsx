import { ArrowDown, ArrowUp, FileText, FilePlus, CreditCard } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import FileUploadComponent from "../FileUploadComponent";

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
}

export const EFTSection = ({ 
  accounts, 
  isSubmitting, 
  onSubmit 
}: EFTSectionProps) => {
  const { toast } = useToast();
  const [openTemplateDialog, setOpenTemplateDialog] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [transactionType, setTransactionType] = useState("debit");
  const [eftFile, setEftFile] = useState<File | null>(null);

  const saveTemplate = () => {
    if (!templateName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a template name",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Template saved",
      description: "Your payment template has been saved successfully",
    });
    
    setOpenTemplateDialog(false);
  };

  const handleFileSelected = (file: File) => {
    setEftFile(file);
    console.log("EFT file selected:", file.name);
    // In a real app, you might want to parse the file here
  };
  
  return (
    <form onSubmit={onSubmit}>
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">From Account</CardTitle>
            <CardDescription>
              Choose the account to transfer funds from
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fromAccount">Select Account</Label>
              <Select defaultValue={accounts[0]?.id}>
                <SelectTrigger id="fromAccount">
                  <SelectValue placeholder="Select an account" />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      <span className="font-medium">{account.name}</span> (
                      {account.number}) - ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Transfer Details</CardTitle>
            <CardDescription>
              Enter the amount and transaction type
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Transaction Type</Label>
              <RadioGroup 
                defaultValue="debit" 
                className="flex space-x-4"
                value={transactionType}
                onValueChange={setTransactionType}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="debit" id="debit" />
                  <Label htmlFor="debit" className="cursor-pointer">Debit (withdraw money)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="credit" id="credit" />
                  <Label htmlFor="credit" className="cursor-pointer">Credit (deposit money)</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <Input
                  id="amount"
                  placeholder="0.00"
                  className="pl-6"
                  type="number"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>
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
          </CardContent>
          
          <CardContent>
            <FileUploadComponent
              allowedFileTypes={['.txt']}
              onFileSelected={handleFileSelected}
              uploadTitle="Upload EFT File"
              uploadDescription="Upload a payment file (CPA 1464 and CPA 005 formats)"
            />
          </CardContent>
        </Card>
        
        <div className="flex items-center justify-between py-4">
          <div className="flex gap-2">
            <Dialog open={openTemplateDialog} onOpenChange={setOpenTemplateDialog}>
              <DialogTrigger asChild>
                <Button type="button" variant="outline" size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  Save as Template
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Save Payment Template</DialogTitle>
                  <DialogDescription>
                    Create a template to reuse this payment in the future.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="templateName">Template Name</Label>
                    <Input 
                      id="templateName" 
                      value={templateName} 
                      onChange={(e) => setTemplateName(e.target.value)} 
                      placeholder="e.g. Monthly Rent Payment"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setOpenTemplateDialog(false)}>Cancel</Button>
                  <Button type="button" onClick={saveTemplate}>Save Template</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Button type="button" variant="outline" size="sm">
              <FilePlus className="mr-2 h-4 w-4" />
              Use Template
            </Button>
          </div>
          
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : `Send EFT ${transactionType === 'credit' ? 'Credit' : 'Debit'}`}
          </Button>
        </div>
      </div>
    </form>
  );
};
