
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertCircle, Send, RotateCw } from "lucide-react";
import { Transaction, TransactionStatus } from "@/types/dashboardTypes";
import { format } from "date-fns";

interface TransactionDetailModalProps {
  transaction: Transaction | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TransactionDetailModal = ({
  transaction,
  open,
  onOpenChange,
}: TransactionDetailModalProps) => {
  if (!transaction) return null;

  // Format currency values
  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString()}`;
  };

  // Get status badge based on transaction status
  const getStatusBadge = (status: TransactionStatus) => {
    switch (status) {
      case 'received':
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Received
          </Badge>
        );
      case 'pending_approval':
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Awaiting Approval
          </Badge>
        );
      case 'processing':
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 flex items-center gap-1">
            <RotateCw className="h-3 w-3" />
            Processing
          </Badge>
        );
      case 'with_bank':
        return (
          <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 flex items-center gap-1">
            <Send className="h-3 w-3" />
            With Bank
          </Badge>
        );
      case 'completed':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Completed
          </Badge>
        );
      case 'failed':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            Failed
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "MMM d, yyyy");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Transaction Details</DialogTitle>
          <DialogDescription>
            Detailed information about transaction #{transaction.trackingId}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-gray-500">Basic Information</h4>
            
            <div className="grid grid-cols-3 gap-2">
              <div className="text-sm font-medium">Description:</div>
              <div className="text-sm col-span-2">{transaction.description}</div>
              
              <div className="text-sm font-medium">Amount:</div>
              <div className="text-sm col-span-2 font-semibold">{formatCurrency(transaction.amount)}</div>
              
              <div className="text-sm font-medium">Date:</div>
              <div className="text-sm col-span-2">{formatDate(transaction.date)}</div>
              
              <div className="text-sm font-medium">Type:</div>
              <div className="text-sm col-span-2">
                <Badge variant="secondary" className="capitalize">
                  {transaction.type?.replace('_', ' ')}
                </Badge>
              </div>
              
              <div className="text-sm font-medium">Reference:</div>
              <div className="text-sm col-span-2 font-mono">{transaction.reference}</div>
              
              <div className="text-sm font-medium">Recipient:</div>
              <div className="text-sm col-span-2">{transaction.recipient}</div>
              
              <div className="text-sm font-medium">Tracking ID:</div>
              <div className="text-sm col-span-2 font-mono">{transaction.trackingId}</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-gray-500">Status Information</h4>
            
            <div className="grid grid-cols-3 gap-2">
              <div className="text-sm font-medium">Current Status:</div>
              <div className="text-sm col-span-2">{getStatusBadge(transaction.status!)}</div>
              
              <div className="text-sm font-medium">Location:</div>
              <div className="text-sm col-span-2">{transaction.currentLocation || "N/A"}</div>
              
              <div className="text-sm font-medium">Created By:</div>
              <div className="text-sm col-span-2">{transaction.createdBy || "N/A"}</div>
              
              <div className="text-sm font-medium">Submitted By:</div>
              <div className="text-sm col-span-2">{transaction.submittedBy || "N/A"}</div>
              
              <div className="text-sm font-medium">Approved By:</div>
              <div className="text-sm col-span-2">
                {transaction.approvedBy?.length 
                  ? transaction.approvedBy.join(", ") 
                  : "Pending approval"}
              </div>
            </div>
          </div>
        </div>

        {transaction.statusHistory && transaction.statusHistory.length > 0 && (
          <div className="mt-4 border-t pt-4">
            <h4 className="font-medium mb-2">Transaction History</h4>
            <div className="space-y-2">
              {transaction.statusHistory.map((history, index) => (
                <div key={index} className="text-sm bg-gray-50 p-2 rounded flex items-center justify-between">
                  <div>
                    <span className="font-medium mr-2">{history.status}</span>
                    <span className="text-gray-500">{history.actor && `by ${history.actor}`}</span>
                    {history.notes && <p className="text-gray-600 mt-1">{history.notes}</p>}
                  </div>
                  <div className="text-gray-400">{formatDate(history.date)}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDetailModal;
