
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
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
  const [name, setName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [balance, setBalance] = useState("");
  const [currency, setCurrency] = useState("CAD");
  const [accountType, setAccountType] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !accountNumber.trim() || isNaN(Number(balance)) || !accountType) {
      setError("All fields are required, balance must be a number, and account type must be selected.");
      return;
    }
    setError("");
    setSubmitted(true);
    toast.success("Your request to open a bank account has been submitted!");
    // Don’t actually create the account here.
    setName("");
    setAccountNumber("");
    setBalance("");
    setCurrency("CAD");
    setAccountType("");
    setTimeout(() => { // Automatically close modal after 1.5 seconds
      setSubmitted(false);
      onOpenChange(false);
    }, 1500);
  };

  const handleClose = () => {
    setName("");
    setAccountNumber("");
    setBalance("");
    setCurrency("CAD");
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
            <Input
              placeholder="Account Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              maxLength={30}
            />
            <Input
              placeholder="Desired Account Number"
              value={accountNumber}
              onChange={e => setAccountNumber(e.target.value)}
              required
              maxLength={20}
            />
            <Input
              placeholder="Initial Deposit"
              type="number"
              inputMode="decimal"
              value={balance}
              onChange={e => setBalance(e.target.value)}
              required
            />
            <Input
              placeholder="Currency (e.g., CAD, USD, EUR)"
              value={currency}
              onChange={e => setCurrency(e.target.value)}
              maxLength={4}
            />
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
