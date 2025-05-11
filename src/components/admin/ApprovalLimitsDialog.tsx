
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, ApprovalLimits } from "./types";
import { formatCurrency } from "../transactions/transactionUtils";

interface ApprovalLimitsDialogProps {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (userId: string, limits: ApprovalLimits) => void;
}

const ApprovalLimitsDialog = ({ 
  user, 
  open, 
  onOpenChange,
  onSave
}: ApprovalLimitsDialogProps) => {
  const [limits, setLimits] = useState<ApprovalLimits>(
    user.approvalLimits || {
      eft: 5000,
      wire: 10000,
      transfer: 10000,
      emailTransfer: 3000
    }
  );

  const handleLimitChange = (type: keyof ApprovalLimits, value: string) => {
    const numValue = Number(value) || 0;
    setLimits(prev => ({
      ...prev,
      [type]: numValue
    }));
  };

  const handleSave = () => {
    onSave(user.id, limits);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Transaction Approval Limits for {user.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="eft-limit">EFT Limit:</Label>
            <Input
              id="eft-limit"
              type="number"
              min="0"
              step="100"
              value={limits.eft}
              onChange={(e) => handleLimitChange('eft', e.target.value)}
              disabled={!user.permissions.eft}
              placeholder={user.permissions.eft ? "Enter limit" : "No permission"}
            />
            {user.permissions.eft && <div className="col-span-2 text-xs text-muted-foreground">
              User can approve EFT transactions up to {formatCurrency(limits.eft)}
            </div>}
          </div>
          
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="wire-limit">Wire Transfer Limit:</Label>
            <Input
              id="wire-limit"
              type="number"
              min="0"
              step="100"
              value={limits.wire}
              onChange={(e) => handleLimitChange('wire', e.target.value)}
              disabled={!user.permissions.wire}
              placeholder={user.permissions.wire ? "Enter limit" : "No permission"}
            />
            {user.permissions.wire && <div className="col-span-2 text-xs text-muted-foreground">
              User can approve Wire transfers up to {formatCurrency(limits.wire)}
            </div>}
          </div>
          
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="transfer-limit">Internal Transfer Limit:</Label>
            <Input
              id="transfer-limit"
              type="number"
              min="0"
              step="100"
              value={limits.transfer}
              onChange={(e) => handleLimitChange('transfer', e.target.value)}
              disabled={!user.permissions.transfer}
              placeholder={user.permissions.transfer ? "Enter limit" : "No permission"}
            />
            {user.permissions.transfer && <div className="col-span-2 text-xs text-muted-foreground">
              User can approve Internal transfers up to {formatCurrency(limits.transfer)}
            </div>}
          </div>
          
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="email-transfer-limit">Email Transfer Limit:</Label>
            <Input
              id="email-transfer-limit"
              type="number"
              min="0"
              step="100"
              value={limits.emailTransfer}
              onChange={(e) => handleLimitChange('emailTransfer', e.target.value)}
              disabled={!user.permissions.emailTransfer}
              placeholder={user.permissions.emailTransfer ? "Enter limit" : "No permission"}
            />
            {user.permissions.emailTransfer && <div className="col-span-2 text-xs text-muted-foreground">
              User can approve Email transfers up to {formatCurrency(limits.emailTransfer)}
            </div>}
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save Limits</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApprovalLimitsDialog;
