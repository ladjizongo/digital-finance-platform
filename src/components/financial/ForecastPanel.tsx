
import { Card, CardContent } from "@/components/ui/card";

const ForecastPanel = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Financial Forecast</h3>
      <p className="text-muted-foreground">
        Based on your financial statements, we predict the following trends for the next quarter:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">+4.2%</div>
            <p className="text-sm text-muted-foreground">
              Projected Revenue Growth
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-amber-600">-1.8%</div>
            <p className="text-sm text-muted-foreground">
              Projected Expense Change
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForecastPanel;
