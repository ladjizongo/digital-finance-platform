
import { AlertCircle, Users, Check, Shield } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { getApprovalLevel } from "@/utils/approvalLevels";

interface ApprovalRequirementProps {
  amount: number;
  transactionType?: string;
}

export const ApprovalRequirement = ({ amount, transactionType }: ApprovalRequirementProps) => {
  const approvalLevel = getApprovalLevel(amount);
  const approversRequired = approvalLevel.requiredApprovers;
  const requiresRSA = (transactionType === "eft" || transactionType === "wire") && amount >= 10000;
  
  if (approversRequired === 0 && !requiresRSA) {
    return (
      <Alert variant="default" className="bg-green-50 border-green-200 mt-4">
        <Check className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          No approval required. Transaction will process immediately.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert variant="default" className="bg-amber-50 border-amber-200 mt-4">
      <AlertCircle className="h-4 w-4 text-amber-600" />
      <AlertDescription className="text-amber-800">
        <div className="flex items-center justify-between">
          <span>
            This transaction requires {approversRequired} approval{approversRequired > 1 ? 's' : ''}.
          </span>
          <div className="flex gap-2">
            <Badge variant="outline" className="border-amber-500 text-amber-700">
              {approvalLevel.name} Level
            </Badge>
            {requiresRSA && (
              <Badge variant="outline" className="border-red-500 text-red-700">
                <Shield className="h-3 w-3 mr-1" />
                RSA Required
              </Badge>
            )}
          </div>
        </div>
        <p className="mt-1 text-sm">{approvalLevel.description}</p>
        {requiresRSA && (
          <p className="mt-1 text-sm font-medium text-red-700">
            RSA token verification required for {transactionType?.toUpperCase()} transactions ≥ $10,000
          </p>
        )}
      </AlertDescription>
    </Alert>
  );
};
