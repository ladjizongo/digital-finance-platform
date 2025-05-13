
import { useState, useEffect } from "react";
import { ArrowUpDown } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fxRates } from "@/components/forex/fxData";

interface Account {
  id: string;
  name: string;
  number: string;
  balance: number;
}

interface FXTabContentProps {
  accounts: Account[];
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onAmountChange?: (amount: number) => void;
  selectedFromAccount?: string;
  selectedToAccount?: string;
  onFromAccountChange?: (accountId: string) => void;
  onToAccountChange?: (accountId: string) => void;
}

const FXTabContent = ({ 
  accounts, 
  isSubmitting, 
  onSubmit, 
  onAmountChange,
  selectedFromAccount,
  selectedToAccount,
  onFromAccountChange,
  onToAccountChange
}: FXTabContentProps) => {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState("1000");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [rate, setRate] = useState(0);
  const [fromAccount, setFromAccount] = useState(selectedFromAccount || accounts[0]?.id || "");
  
  useEffect(() => {
    if (selectedFromAccount) {
      setFromAccount(selectedFromAccount);
    }
  }, [selectedFromAccount]);
  
  const currencies = ["USD", "EUR", "GBP", "CAD", "AUD", "JPY", "CHF", "CNY"];
  
  // Calculate conversion whenever currency or amount changes
  useEffect(() => {
    const fromRate = fxRates[fromCurrency] || 1;
    const toRate = fxRates[toCurrency] || 1;
    const calculatedRate = toRate / fromRate;
    
    setRate(calculatedRate);
    setConvertedAmount(parseFloat(amount) * calculatedRate);
    
    // Update parent component with amount for approval workflows
    if (onAmountChange) {
      onAmountChange(parseFloat(amount));
    }
  }, [fromCurrency, toCurrency, amount, onAmountChange]);
  
  const handleSwapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  const handleFromAccountChange = (value: string) => {
    setFromAccount(value);
    if (onFromAccountChange) {
      onFromAccountChange(value);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Foreign Exchange</CardTitle>
        <CardDescription>
          Convert between currencies using real-time exchange rates
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleFormSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fxFromAccount">From Account</Label>
            <Select 
              defaultValue={accounts[0]?.id} 
              value={fromAccount} 
              onValueChange={handleFromAccountChange}
            >
              <SelectTrigger id="fxFromAccount">
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map(account => (
                  <SelectItem key={account.id} value={account.id}>
                    {account.name} ({account.number}) - ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fromAmount">From</Label>
              <div className="flex space-x-2">
                <div className="w-2/3">
                  <div className="relative">
                    <Input
                      id="fromAmount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full"
                      placeholder="0.00"
                      min="0"
                    />
                  </div>
                </div>
                <div className="w-1/3">
                  <Select value={fromCurrency} onValueChange={setFromCurrency}>
                    <SelectTrigger>
                      <SelectValue placeholder="Currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency} value={currency}>
                          {currency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="toAmount">To</Label>
              <div className="flex space-x-2">
                <div className="w-2/3">
                  <Input
                    id="toAmount"
                    value={convertedAmount.toFixed(2)}
                    readOnly
                    className="w-full bg-gray-50"
                  />
                </div>
                <div className="w-1/3">
                  <Select value={toCurrency} onValueChange={setToCurrency}>
                    <SelectTrigger>
                      <SelectValue placeholder="Currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency} value={currency}>
                          {currency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button 
              type="button" 
              variant="outline" 
              size="icon"
              onClick={handleSwapCurrencies}
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            <p>Exchange Rate: 1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}</p>
            <p className="text-xs mt-1">Rates updated: {new Date().toLocaleString()}</p>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : `Exchange ${fromCurrency} to ${toCurrency}`}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default FXTabContent;
