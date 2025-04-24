
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface PaymentData {
  name: string;
  transitNumber: string;
  accountNumber: string;
  institutionNumber: string;
  amount: number;
}

const PaymentConfirmation = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const paymentData = location.state?.paymentData as PaymentData[];

  if (!paymentData) {
    return (
      <div className="container mx-auto py-6 px-4">
        <Card>
          <CardContent className="pt-6">
            <p>No payment information found. Please upload a payment file first.</p>
            <Button
              className="mt-4"
              onClick={() => navigate('/transactions')}
            >
              Return to Transactions
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simulate payment submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Payment submitted successfully",
        description: "Your payment file has been processed",
      });
      
      navigate('/transactions');
    } catch (error) {
      toast({
        title: "Payment failed",
        description: "There was an error processing your payment",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Payment Confirmation</CardTitle>
          <CardDescription>Review payment information before submitting</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {paymentData.map((payment, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Name</p>
                    <p className="text-base">{payment.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Transit Number</p>
                    <p className="text-base">{payment.transitNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Account Number</p>
                    <p className="text-base">{payment.accountNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Institution Number</p>
                    <p className="text-base">{payment.institutionNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Amount</p>
                    <p className="text-base">${payment.amount.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={() => navigate('/transactions')}
            >
              Back
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Submit Payment"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentConfirmation;
