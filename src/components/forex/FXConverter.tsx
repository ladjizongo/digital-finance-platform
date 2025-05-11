
import { useState, useEffect } from "react";
import { ArrowUpDown } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fxRates } from "./fxData";

interface FXConverterProps {
  isSubmitting: boolean;
  onSubmit: (fromCurrency: string, toCurrency: string, amount: number) => void;
}

const FXConverter = ({ isSubmitting, onSubmit }: FXConverterProps) => {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState("1000");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [rate, setRate] = useState(0);
  
  const currencies = ["USD", "EUR", "GBP", "CAD", "AUD", "JPY", "CHF", "CNY"];
  
  // Calculate conversion whenever currency or amount changes
  useEffect(() => {
    const fromRate = fxRates[fromCurrency] || 1;
    const toRate = fxRates[toCurrency] || 1;
    const calculatedRate = toRate / fromRate;
    
    setRate(calculatedRate);
    setConvertedAmount(parseFloat(amount) * calculatedRate);
  }, [fromCurrency, toCurrency, amount]);
  
  const handleSwapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(fromCurrency, toCurrency, parseFloat(amount));
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Currency Converter</CardTitle>
        <CardDescription>
          Convert between currencies using real-time exchange rates
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
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

export default FXConverter;
