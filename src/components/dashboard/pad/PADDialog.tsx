
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { PADForm } from "./PADForm";
import { PADFormValues } from "./padFormSchema";
import type { Account } from "@/types/dashboardTypes";

interface PADDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  account: Account;
}

const PADDialog = ({ open, onOpenChange, account }: PADDialogProps) => {
  const { toast } = useToast();
  
  const handleSubmit = (values: PADFormValues) => {
    // PAD agreement submitted - in production, this would be sent to secure backend
    
    toast({
      title: "PAD Agreement Created",
      description: `${values.agreementType === "payment" ? "Preauthorized Payment" : "Direct Deposit"} agreement with ${values.companyName} has been set up for account ${account.accountNumber}.`,
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create PAD Agreement</DialogTitle>
          <DialogDescription>
            Set up a Pre-Authorized Debit (PAD) agreement for payments or deposits.
          </DialogDescription>
        </DialogHeader>
        
        <PADForm 
          account={account} 
          onSubmit={handleSubmit} 
        />
        
        <DialogFooter>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button type="submit" form="pad-form">Create PAD Agreement</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PADDialog;
