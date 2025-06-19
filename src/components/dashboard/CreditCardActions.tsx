
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Ban } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { CreditCard as CreditCardType } from "@/types/dashboardTypes";

interface CreditCardActionsProps {
  creditCard: CreditCardType;
}

const CreditCardActions = ({ creditCard }: CreditCardActionsProps) => {
  const { toast } = useToast();
  const [isBlocked, setIsBlocked] = useState(false);

  const handleBlockCard = () => {
    setIsBlocked(!isBlocked);
    toast({
      title: isBlocked ? "Card Unblocked" : "Card Blocked",
      description: isBlocked 
        ? `${creditCard.name} has been unblocked successfully.`
        : `${creditCard.name} has been blocked for security.`,
    });
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
    </div>
  );
};

export default CreditCardActions;
