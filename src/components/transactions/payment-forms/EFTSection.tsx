import { ArrowDown, ArrowUp, FileText, FilePlus } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

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

export const EFTSection = ({ accounts, isSubmitting, onSubmit }: EFTSectionProps) => {
  const { toast } = useToast();
  const [transactionType, setTransactionType] = useState<"debit" | "credit">("debit");
  const [templateName, setTemplateName] = useState("");
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  
  const handleSaveTemplate = () => {
    if (!templateName.trim()) {
      toast({
        title: "Template name required",
        description: "Please enter a name for your template",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Template saved",
      description: "Your payment template has been saved successfully",
    });
    setShowTemplateDialog(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Electronic Funds Transfer (EFT/ACH)</span>
          <div className="flex gap-2">
            <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <FilePlus className="h-4 w-4 mr-2" />
                  Save as Template
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Save as Payment Template</DialogTitle>
                  <DialogDescription>
                    Create a reusable template for future payments
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <Label htmlFor="templateName">Template Name</Label>
                  <Input
                    id="templateName"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    placeholder="Enter template name"
                  />
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowTemplateDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveTemplate}>
                    Save Template
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Load Template
            </Button>
          </div>
        </CardTitle>
        <CardDescription>
          Send money electronically within the US banking system
        </CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Transaction Type</Label>
            <ToggleGroup
              type="single"
              value={transactionType}
              onValueChange={(value: "debit" | "credit") => setTransactionType(value)}
              className="justify-start"
            >
              <ToggleGroupItem value="debit" className="flex items-center gap-1">
                <ArrowDown className="h-4 w-4" />
                Debit
              </ToggleGroupItem>
              <ToggleGroupItem value="credit" className="flex items-center gap-1">
                <ArrowUp className="h-4 w-4" />
                Credit
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="eftFromAccount">From Account</Label>
            <Select defaultValue="1">
              <SelectTrigger id="eftFromAccount">
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
          
          <div className="space-y-2">
            <Label htmlFor="accountType">Account Type</Label>
            <Select defaultValue="checking">
              <SelectTrigger id="accountType">
                <SelectValue placeholder="Select account type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="checking">Checking</SelectItem>
                <SelectItem value="savings">Savings</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="eftAmount">Amount</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <Input id="eftAmount" type="number" min="0.01" step="0.01" placeholder="0.00" className="pl-7" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="eftMemo">Memo (Optional)</Label>
            <Input id="eftMemo" placeholder="Add a memo for this transaction" />
          </div>
        </CardContent>
        
        <CardFooter>
          <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
            {isSubmitting ? "Processing..." : `Send ${transactionType === "debit" ? "Debit" : "Credit"} Transfer`}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
