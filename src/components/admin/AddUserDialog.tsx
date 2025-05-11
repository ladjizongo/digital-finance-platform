
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Role, User, UserPermissions, ApprovalLimits } from "./types";
import { useToast } from "@/hooks/use-toast";

interface AddUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddUser: (user: Omit<User, "id">) => void;
}

const AddUserDialog = ({ 
  open, 
  onOpenChange,
  onAddUser
}: AddUserDialogProps) => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("User");
  const [showLimits, setShowLimits] = useState(false);
  const [approvalLimits, setApprovalLimits] = useState<ApprovalLimits>({
    eft: 5000,
    wire: 0,
    transfer: 5000,
    emailTransfer: 2500
  });
  
  // Default permissions based on role
  const getDefaultPermissions = (role: Role): UserPermissions => {
    switch (role) {
      case "Admin":
        return {
          eft: true,
          wire: true,
          transfer: true,
          reporting: true,
          audit: true,
          emailTransfer: true,
          approvals: true
        };
      case "Manager":
        return {
          eft: true,
          wire: true,
          transfer: true,
          reporting: true,
          audit: false,
          emailTransfer: true,
          approvals: true
        };
      case "User":
      default:
        return {
          eft: false,
          wire: false,
          transfer: true,
          reporting: false,
          audit: false,
          emailTransfer: true,
          approvals: false
        };
    }
  };

  // Default approval limits based on role
  const getDefaultApprovalLimits = (role: Role) => {
    switch (role) {
      case "Admin":
        return {
          eft: 100000,
          wire: 250000,
          transfer: 200000,
          emailTransfer: 50000
        };
      case "Manager":
        return {
          eft: 25000,
          wire: 50000,
          transfer: 50000,
          emailTransfer: 10000
        };
      case "User":
      default:
        return {
          eft: 5000,
          wire: 0,
          transfer: 5000,
          emailTransfer: 2500
        };
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setRole("User");
    setShowLimits(false);
    setApprovalLimits(getDefaultApprovalLimits("User"));
  };

  const handleRoleChange = (selectedRole: Role) => {
    setRole(selectedRole);
    setApprovalLimits(getDefaultApprovalLimits(selectedRole));
  };

  const handleLimitChange = (type: keyof ApprovalLimits, value: string) => {
    const numValue = Number(value) || 0;
    setApprovalLimits(prev => ({
      ...prev,
      [type]: numValue
    }));
  };

  const handleAddUser = () => {
    // Validate form
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Name is required",
        variant: "destructive"
      });
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      toast({
        title: "Error",
        description: "Valid email is required",
        variant: "destructive"
      });
      return;
    }

    // Create new user with current date and default permissions
    const newUser: Omit<User, "id"> = {
      name: name.trim(),
      email: email.trim(),
      role: role,
      lastActive: new Date().toISOString().split("T")[0] + " " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " " + (new Date().getHours() < 12 ? "AM" : "PM"),
      permissions: getDefaultPermissions(role),
      approvalLimits: approvalLimits
    };

    onAddUser(newUser);
    resetForm();
    onOpenChange(false);
    
    toast({
      title: "User added",
      description: `${name} has been added successfully.`
    });
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) {
        resetForm();
      }
      onOpenChange(isOpen);
    }}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
              placeholder="Enter user's full name"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="col-span-3"
              placeholder="Enter user's email address"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">Role</Label>
            <Select value={role} onValueChange={(value: Role) => handleRoleChange(value)}>
              <SelectTrigger className="col-span-3" id="role">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="User">User</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={() => setShowLimits(!showLimits)}
              className="text-xs"
            >
              {showLimits ? "Hide Approval Limits" : "Show Approval Limits"}
            </Button>
            <span className="text-xs text-muted-foreground">
              {!showLimits && "Default limits will be set based on role"}
            </span>
          </div>
          
          {showLimits && (
            <div className="border rounded-md p-4 space-y-3 mt-2">
              <h4 className="text-sm font-medium mb-2">Transaction Approval Limits</h4>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="eft-limit" className="text-right text-xs">EFT Limit</Label>
                <Input
                  id="eft-limit"
                  type="number"
                  min="0"
                  step="100"
                  value={approvalLimits.eft}
                  onChange={(e) => handleLimitChange('eft', e.target.value)}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="wire-limit" className="text-right text-xs">Wire Limit</Label>
                <Input
                  id="wire-limit"
                  type="number"
                  min="0"
                  step="100"
                  value={approvalLimits.wire}
                  onChange={(e) => handleLimitChange('wire', e.target.value)}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="transfer-limit" className="text-right text-xs">Transfer Limit</Label>
                <Input
                  id="transfer-limit"
                  type="number"
                  min="0"
                  step="100"
                  value={approvalLimits.transfer}
                  onChange={(e) => handleLimitChange('transfer', e.target.value)}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email-limit" className="text-right text-xs">Email Transfer</Label>
                <Input
                  id="email-limit"
                  type="number"
                  min="0"
                  step="100"
                  value={approvalLimits.emailTransfer}
                  onChange={(e) => handleLimitChange('emailTransfer', e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleAddUser}>Add User</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;
