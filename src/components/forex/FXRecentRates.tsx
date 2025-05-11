
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { recentRates } from "./fxData";

const FXRecentRates = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Exchange Rates</CardTitle>
        <CardDescription>USD as base currency</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {recentRates.map((rate) => (
            <div key={rate.currency} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
              <div className="flex items-center">
                <div className="font-medium">{rate.currency}</div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="font-medium">{rate.rate.toFixed(4)}</div>
                <Badge variant={rate.change >= 0 ? "default" : "destructive"} className="text-xs">
                  {rate.change >= 0 ? '+' : ''}{rate.change.toFixed(4)}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FXRecentRates;
