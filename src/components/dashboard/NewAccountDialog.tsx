
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface NewAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { name: string; accountNumber: string; balance: number; currency?: string }) => void;
}

const NewAccountDialog = ({ open, onOpenChange, onSubmit }: NewAccountDialogProps) => {
  const [name, setName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [balance, setBalance] = useState("");
  const [currency, setCurrency] = useState("CAD");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !accountNumber.trim() || isNaN(Number(balance))) {
      setError("All fields are required and balance must be a number.");
      return;
    }
    onSubmit({
      name: name.trim(),
      accountNumber: accountNumber.trim(),
      balance: Number(balance),
      currency: currency.trim(),
    });
    setName("");
    setAccountNumber("");
    setBalance("");
    setCurrency("CAD");
    setError("");
  };

  const handleClose = () => {
    setName("");
    setAccountNumber("");
    setBalance("");
    setCurrency("CAD");
    setError("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Bank Account</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            placeholder="Account Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            maxLength={30}
          />
          <Input
            placeholder="Account Number"
            value={accountNumber}
            onChange={e => setAccountNumber(e.target.value)}
            required
            maxLength={20}
          />
          <Input
            placeholder="Opening Balance"
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
          {error && (
            <div className="text-red-500 text-xs">{error}</div>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">Create Account</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewAccountDialog;
