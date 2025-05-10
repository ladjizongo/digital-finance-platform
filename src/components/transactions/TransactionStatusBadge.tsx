
import React from "react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertCircle, Send, RotateCw } from "lucide-react";
import { TransactionStatus } from "@/types/dashboardTypes";

interface TransactionStatusBadgeProps {
  status: TransactionStatus;
}

const TransactionStatusBadge = ({ status }: TransactionStatusBadgeProps) => {
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
    case 'approved':
      return (
        <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200 flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          Approved
        </Badge>
      );
    default:
      return <Badge>{status}</Badge>;
  }
};

export default TransactionStatusBadge;
