
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import FXHeader from "@/components/forex/FXHeader";
import FXConverter from "@/components/forex/FXConverter";
import FXRecentRates from "@/components/forex/FXRecentRates";
import FXTransactionHistory from "@/components/forex/FXTransactionHistory";

const ForeignExchange = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleExchangeSubmit = (fromCurrency: string, toCurrency: string, amount: number) => {
    setIsSubmitting(true);
    
    // Simulate processing time
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Exchange Initiated",
        description: `Your exchange of ${amount} ${fromCurrency} to ${toCurrency} has been submitted successfully.`,
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <FXHeader />
      
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-8">
        <FXConverter 
          isSubmitting={isSubmitting} 
          onSubmit={handleExchangeSubmit} 
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FXRecentRates />
          <FXTransactionHistory />
        </div>
      </main>
    </div>
  );
};

export default ForeignExchange;
