
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";
import { CashFlowProjection } from "@/types/financial";

interface ForecastPanelProps {
  projection: CashFlowProjection;
}

const ForecastPanel = ({ projection }: ForecastPanelProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const isPositiveFlow = projection.projectedBalance > projection.currentCash;
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">7-Day Cash Flow Forecast</h3>
        <p className="text-muted-foreground">
          Based on your current cash position, expected receivables, payables, and average daily transactions:
        </p>
      </div>

      {/* Main Projection Card */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {isPositiveFlow ? (
              <TrendingUp className="h-5 w-5 text-green-600" />
            ) : (
              <TrendingDown className="h-5 w-5 text-red-600" />
            )}
            Projected Cash Balance (7 Days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-3xl font-bold mb-2 ${
            projection.projectedBalance >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {formatCurrency(projection.projectedBalance)}
          </div>
          <div className="text-sm text-muted-foreground">
            Starting from {formatCurrency(projection.currentCash)} current cash
          </div>
        </CardContent>
      </Card>

      {/* Breakdown Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(projection.expectedCashIn)}
            </div>
            <p className="text-sm text-muted-foreground">
              Expected Cash In
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(projection.expectedCashOut)}
            </div>
            <p className="text-sm text-muted-foreground">
              Expected Cash Out
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(projection.adtProjectionIn)}
            </div>
            <p className="text-sm text-muted-foreground">
              ADT Projected Inflows
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-orange-600">
              {formatCurrency(projection.adtProjectionOut)}
            </div>
            <p className="text-sm text-muted-foreground">
              ADT Projected Outflows
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <div className="space-y-3">
        <h4 className="text-md font-medium flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          Recommendations
        </h4>
        {projection.recommendations.map((rec, index) => (
          <Alert key={index} className={
            projection.projectedBalance < 0 ? "border-red-200 bg-red-50" : 
            projection.projectedBalance < projection.currentCash * 0.5 ? "border-amber-200 bg-amber-50" :
            "border-green-200 bg-green-50"
          }>
            <AlertDescription>{rec}</AlertDescription>
          </Alert>
        ))}
      </div>
    </div>
  );
};

export default ForecastPanel;
