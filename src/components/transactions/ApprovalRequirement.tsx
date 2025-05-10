
import { AlertCircle, Users, Check } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { getApprovalLevel } from "@/utils/approvalLevels";

interface ApprovalRequirementProps {
  amount: number;
}

export const ApprovalRequirement = ({ amount }: ApprovalRequirementProps) => {
  const approvalLevel = getApprovalLevel(amount);
  const approversRequired = approvalLevel.requiredApprovers;
  
  if (approversRequired === 0) {
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
          <Badge variant="outline" className="border-amber-500 text-amber-700">
            {approvalLevel.name} Level
          </Badge>
        </div>
        <p className="mt-1 text-sm">{approvalLevel.description}</p>
      </AlertDescription>
    </Alert>
  );
};
