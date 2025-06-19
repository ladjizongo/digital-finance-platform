
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Transaction } from "@/types/dashboardTypes";

interface TransactionDisputeDialogProps {
  transaction: Transaction | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TransactionDisputeDialog = ({ transaction, open, onOpenChange }: TransactionDisputeDialogProps) => {
  const { toast } = useToast();
  const [disputeReason, setDisputeReason] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");

  if (!transaction) return null;

  const handleDispute = () => {
    if (!disputeReason) {
      toast({
        title: "Error",
        description: "Please select a dispute reason.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Dispute Submitted",
      description: `Dispute for $${Math.abs(transaction.amount).toLocaleString()} has been submitted successfully.`,
    });
    
    setDisputeReason("");
    setAdditionalDetails("");
    onOpenChange(false);
  };

  // Mock location data - in real app this would come from transaction data
  const transactionLocation = "Online Purchase - Amazon.com";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Dispute Transaction
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Transaction Details */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Transaction:</span>
              <span className="text-sm">{transaction.description}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Amount:</span>
              <span className="text-sm font-semibold">${Math.abs(transaction.amount).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Date:</span>
              <span className="text-sm">{transaction.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Location:</span>
              <span className="text-sm">{transactionLocation}</span>
            </div>
          </div>

          {/* Dispute Form */}
          <div>
            <Label htmlFor="dispute-reason">Reason for Dispute</Label>
            <Select onValueChange={setDisputeReason}>
              <SelectTrigger>
                <SelectValue placeholder="Select dispute reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unauthorized">Unauthorized Transaction</SelectItem>
                <SelectItem value="duplicate">Duplicate Charge</SelectItem>
                <SelectItem value="incorrect_amount">Incorrect Amount</SelectItem>
                <SelectItem value="cancelled_service">Cancelled Service</SelectItem>
                <SelectItem value="not_received">Product/Service Not Received</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="dispute-details">Additional Details</Label>
            <Textarea
              id="dispute-details"
              placeholder="Provide additional details about the dispute..."
              rows={3}
              value={additionalDetails}
              onChange={(e) => setAdditionalDetails(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleDispute} className="flex-1">
              Submit Dispute
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDisputeDialog;
