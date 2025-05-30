
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Shield, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";

interface RSATokenVerificationProps {
  onVerified: () => void;
  onCancel: () => void;
  transactionType: string;
  amount: number;
}

export const RSATokenVerification = ({ 
  onVerified, 
  onCancel, 
  transactionType, 
  amount 
}: RSATokenVerificationProps) => {
  const [token, setToken] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const handleVerify = async () => {
    setError("");
    
    if (token.length !== 6) {
      setError("RSA token must be 6 digits");
      return;
    }

    setIsVerifying(true);

    // Simulate RSA token verification
    setTimeout(() => {
      // In a real implementation, you would verify against an RSA server
      if (token === "123456") {
        toast({
          title: "RSA Verification Successful",
          description: "RSA token verified. Transaction approved.",
        });
        onVerified();
      } else {
        setError("Invalid RSA token code. Please check your RSA device and try again.");
        setToken("");
      }
      setIsVerifying(false);
    }, 2000);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Shield className="h-5 w-5 text-amber-600" />
          RSA Token Verification
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert className="bg-amber-50 border-amber-200">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            This {transactionType} transaction for ${amount.toLocaleString()} requires RSA token verification.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="rsa-token">RSA Token</Label>
            <InputOTP 
              maxLength={6} 
              value={token} 
              onChange={setToken}
              disabled={isVerifying}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={onCancel}
            disabled={isVerifying}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleVerify}
            disabled={token.length !== 6 || isVerifying}
            className="flex-1"
          >
            {isVerifying ? "Verifying..." : "Verify & Approve"}
          </Button>
        </div>

        <div className="text-xs text-gray-500 text-center">
          <p>Enter the current 6-digit code from your RSA security token.</p>
          <p>Codes refresh every 60 seconds.</p>
        </div>
      </CardContent>
    </Card>
  );
};
