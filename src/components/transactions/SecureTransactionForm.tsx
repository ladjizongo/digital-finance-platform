import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { validateFinancialAmount, validateAccountNumber, sanitizeInput } from '@/utils/security';

interface SecureTransactionFormProps {
  onSubmit: (data: TransactionData) => void;
  transactionType: string;
}

interface TransactionData {
  amount: string;
  fromAccount: string;
  toAccount: string;
  purpose: string;
}

export const SecureTransactionForm = ({ onSubmit, transactionType }: SecureTransactionFormProps) => {
  const [formData, setFormData] = useState<TransactionData>({
    amount: '',
    fromAccount: '',
    toAccount: '',
    purpose: ''
  });
  const [errors, setErrors] = useState<Partial<TransactionData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const validateForm = (): boolean => {
    const newErrors: Partial<TransactionData> = {};

    // Validate amount
    const amountValidation = validateFinancialAmount(formData.amount);
    if (!amountValidation.isValid) {
      newErrors.amount = amountValidation.error;
    }

    // Validate from account
    const fromAccountValidation = validateAccountNumber(formData.fromAccount);
    if (!fromAccountValidation.isValid) {
      newErrors.fromAccount = fromAccountValidation.error;
    }

    // Validate to account
    const toAccountValidation = validateAccountNumber(formData.toAccount);
    if (!toAccountValidation.isValid) {
      newErrors.toAccount = toAccountValidation.error;
    }

    // Validate purpose (basic sanitization)
    const sanitizedPurpose = sanitizeInput(formData.purpose);
    if (sanitizedPurpose.length < 3) {
      newErrors.purpose = 'Purpose must be at least 3 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof TransactionData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = sanitizeInput(e.target.value);
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please correct the errors below.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Sanitize all data before submission
      const sanitizedData: TransactionData = {
        amount: sanitizeInput(formData.amount),
        fromAccount: sanitizeInput(formData.fromAccount),
        toAccount: sanitizeInput(formData.toAccount),
        purpose: sanitizeInput(formData.purpose)
      };

      await onSubmit(sanitizedData);
      
      toast({
        title: "Transaction Submitted",
        description: `Your ${transactionType} has been securely processed.`,
      });
      
      // Reset form
      setFormData({
        amount: '',
        fromAccount: '',
        toAccount: '',
        purpose: ''
      });
    } catch (error) {
      toast({
        title: "Transaction Failed",
        description: "An error occurred while processing your transaction.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-green-600" />
          Secure {transactionType} Form
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Alert className="mb-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            All transaction data is validated and sanitized for security.
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount ($)</Label>
            <Input
              id="amount"
              type="text"
              placeholder="0.00"
              value={formData.amount}
              onChange={handleInputChange('amount')}
              className={errors.amount ? "border-red-500" : ""}
            />
            {errors.amount && (
              <p className="text-red-500 text-sm">{errors.amount}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="fromAccount">From Account</Label>
            <Input
              id="fromAccount"
              type="text"
              placeholder="Account number"
              value={formData.fromAccount}
              onChange={handleInputChange('fromAccount')}
              className={errors.fromAccount ? "border-red-500" : ""}
            />
            {errors.fromAccount && (
              <p className="text-red-500 text-sm">{errors.fromAccount}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="toAccount">To Account</Label>
            <Input
              id="toAccount"
              type="text"
              placeholder="Recipient account number"
              value={formData.toAccount}
              onChange={handleInputChange('toAccount')}
              className={errors.toAccount ? "border-red-500" : ""}
            />
            {errors.toAccount && (
              <p className="text-red-500 text-sm">{errors.toAccount}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="purpose">Purpose</Label>
            <Input
              id="purpose"
              type="text"
              placeholder="Transaction purpose"
              value={formData.purpose}
              onChange={handleInputChange('purpose')}
              className={errors.purpose ? "border-red-500" : ""}
            />
            {errors.purpose && (
              <p className="text-red-500 text-sm">{errors.purpose}</p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : `Submit ${transactionType}`}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SecureTransactionForm;