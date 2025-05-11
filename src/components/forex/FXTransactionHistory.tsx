
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { recentTransactions } from "./fxData";

const FXTransactionHistory = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent FX Transactions</CardTitle>
        <CardDescription>Your most recent currency exchanges</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="border-b pb-4 last:border-0 last:pb-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-medium">
                    {transaction.fromCurrency} → {transaction.toCurrency}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {transaction.date}
                  </div>
                </div>
                <Badge variant={transaction.status === "completed" ? "default" : "outline"}>
                  {transaction.status}
                </Badge>
              </div>
              <div className="flex justify-between text-sm">
                <div>
                  <span className="text-muted-foreground">From: </span>
                  <span className="font-medium">{transaction.fromAmount.toLocaleString()} {transaction.fromCurrency}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">To: </span>
                  <span className="font-medium">{transaction.toAmount.toLocaleString()} {transaction.toCurrency}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Rate: </span>
                  <span className="font-medium">{transaction.rate.toFixed(4)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FXTransactionHistory;
