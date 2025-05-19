
import { Card, CardContent } from "@/components/ui/card";

interface FinancialMetricsPanelProps {
  yearlyData: any[] | null;
}

const FinancialMetricsPanel = ({ yearlyData }: FinancialMetricsPanelProps) => {
  if (!yearlyData || yearlyData.length === 0) {
    return <p>No financial metrics available</p>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Key Financial Metrics</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(yearlyData[0]).map(([key, value]) => {
          if (key !== 'year' && typeof value === 'number') {
            return (
              <Card key={key}>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">
                    {typeof value === 'number' ? value.toFixed(2) : value}
                  </div>
                  <p className="text-sm text-muted-foreground capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                </CardContent>
              </Card>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default FinancialMetricsPanel;
