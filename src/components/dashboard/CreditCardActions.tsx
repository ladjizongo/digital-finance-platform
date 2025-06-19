
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, Shield, DollarSign, Ban } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { CreditCard as CreditCardType } from "@/types/dashboardTypes";

interface CreditCardActionsProps {
  creditCard: CreditCardType;
}

const CreditCardActions = ({ creditCard }: CreditCardActionsProps) => {
  const { toast } = useToast();
  const [isBlocked, setIsBlocked] = useState(false);
  const [disputeAmount, setDisputeAmount] = useState("");
  const [disputeReason, setDisputeReason] = useState("");
  const [splitUsers, setSplitUsers] = useState([{ name: "", email: "", amount: "" }]);

  const handleBlockCard = () => {
    setIsBlocked(!isBlocked);
    toast({
      title: isBlocked ? "Card Unblocked" : "Card Blocked",
      description: isBlocked 
        ? `${creditCard.name} has been unblocked successfully.`
        : `${creditCard.name} has been blocked for security.`,
    });
  };

  const handleDispute = () => {
    if (!disputeAmount || !disputeReason) {
      toast({
        title: "Error",
        description: "Please fill in all dispute fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Dispute Submitted",
      description: `Dispute for $${disputeAmount} has been submitted successfully.`,
    });
    setDisputeAmount("");
    setDisputeReason("");
  };

  const handleSplit = () => {
    const validUsers = splitUsers.filter(user => user.name && user.email && user.amount);
    if (validUsers.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one valid user to split with.",
        variant: "destructive",
      });
      return;
    }

    const totalSplit = validUsers.reduce((sum, user) => sum + parseFloat(user.amount || "0"), 0);
    
    toast({
      title: "Split Request Sent",
      description: `Split request for $${totalSplit.toFixed(2)} sent to ${validUsers.length} user(s).`,
    });
    setSplitUsers([{ name: "", email: "", amount: "" }]);
  };

  const addSplitUser = () => {
    setSplitUsers([...splitUsers, { name: "", email: "", amount: "" }]);
  };

  const updateSplitUser = (index: number, field: string, value: string) => {
    const updated = splitUsers.map((user, i) => 
      i === index ? { ...user, [field]: value } : user
    );
    setSplitUsers(updated);
  };

  const removeSplitUser = (index: number) => {
    setSplitUsers(splitUsers.filter((_, i) => i !== index));
  };

  return (
    <div className="flex gap-2 flex-wrap">
      {/* Block/Unblock Card */}
      <Button
        variant={isBlocked ? "destructive" : "outline"}
        size="sm"
        onClick={handleBlockCard}
        className="flex items-center gap-2"
      >
        <Ban className="h-4 w-4" />
        {isBlocked ? "Unblock Card" : "Block Card"}
      </Button>

      {/* Dispute Charge */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Dispute Charge
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dispute Charge</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="dispute-amount">Amount to Dispute ($)</Label>
              <Input
                id="dispute-amount"
                type="number"
                placeholder="0.00"
                value={disputeAmount}
                onChange={(e) => setDisputeAmount(e.target.value)}
              />
            </div>
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
              />
            </div>
            <Button onClick={handleDispute} className="w-full">
              Submit Dispute
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Split Amount */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Split Amount
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Split Credit Card Amount</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground">
              Current Balance: ${creditCard.balance.toLocaleString()}
            </div>
            
            {splitUsers.map((user, index) => (
              <Card key={index}>
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor={`name-${index}`}>Name</Label>
                      <Input
                        id={`name-${index}`}
                        placeholder="User name"
                        value={user.name}
                        onChange={(e) => updateSplitUser(index, "name", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`email-${index}`}>Email</Label>
                      <Input
                        id={`email-${index}`}
                        type="email"
                        placeholder="user@example.com"
                        value={user.email}
                        onChange={(e) => updateSplitUser(index, "email", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`amount-${index}`}>Amount ($)</Label>
                      <div className="flex gap-2">
                        <Input
                          id={`amount-${index}`}
                          type="number"
                          placeholder="0.00"
                          value={user.amount}
                          onChange={(e) => updateSplitUser(index, "amount", e.target.value)}
                        />
                        {splitUsers.length > 1 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeSplitUser(index)}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={addSplitUser}>
                Add Another User
              </Button>
              <Button onClick={handleSplit} className="ml-auto">
                Send Split Requests
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreditCardActions;
