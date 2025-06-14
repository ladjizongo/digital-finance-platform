
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface NewAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const accountTypes = [
  { value: "checking", label: "Checking" },
  { value: "savings", label: "Savings" },
  { value: "investment", label: "Investment" },
];

const NewAccountDialog = ({ open, onOpenChange }: NewAccountDialogProps) => {
  const [accountType, setAccountType] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!accountType) {
      setError("Please select an account type.");
      return;
    }
    setError("");
    setSubmitted(true);
    toast.success("Your request to open a bank account has been submitted!");
    setAccountType("");
    setTimeout(() => {
      setSubmitted(false);
      onOpenChange(false);
    }, 1500);
  };

  const handleClose = () => {
    setAccountType("");
    setError("");
    setSubmitted(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Request to Open Bank Account</DialogTitle>
        </DialogHeader>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <Label className="mb-1 block">Account Type</Label>
              <Select value={accountType} onValueChange={setAccountType} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select type..." />
                </SelectTrigger>
                <SelectContent>
                  {accountTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {error && (
              <div className="text-red-500 text-xs">{error}</div>
            )}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit">Submit Request</Button>
            </DialogFooter>
          </form>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="text-lg font-medium text-green-700">
              Your request to open a {accountTypes.find(t => t.value === accountType)?.label ?? ""} account has been submitted!
            </div>
            <div className="text-gray-500">
              Our team will review your request and contact you soon.
            </div>
            <Button onClick={handleClose} className="mt-3">
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NewAccountDialog;

