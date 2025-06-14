
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface FinancialSummary {
  currentRatio: number;
  debtToEquity: number;
  profitMargin: number;
  grossMargin: number;
  revenue: number;
  netIncome: number;
  totalAssets: number;
  totalLiabilities: number;
}

export function FinancialSummaryCards({ financialSummary }: { financialSummary: FinancialSummary }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Key Financial Ratios */}
      <Card>
        <CardHeader>
          <CardTitle>Key Financial Ratios</CardTitle>
          <CardDescription>
            Critical metrics for business health assessment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Current Ratio</span>
              <span className={`font-bold ${
                financialSummary.currentRatio >= 2 ? 'text-green-600' : 
                financialSummary.currentRatio >= 1 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {financialSummary.currentRatio.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Debt-to-Equity</span>
              <span className={`font-bold ${
                financialSummary.debtToEquity <= 0.3 ? 'text-green-600' : 
                financialSummary.debtToEquity <= 0.6 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {financialSummary.debtToEquity.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Profit Margin</span>
              <span className={`font-bold ${
                financialSummary.profitMargin >= 15 ? 'text-green-600' : 
                financialSummary.profitMargin >= 5 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {financialSummary.profitMargin.toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Gross Margin</span>
              <span className={`font-bold ${
                financialSummary.grossMargin >= 20 ? 'text-green-600' : 
                financialSummary.grossMargin >= 10 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {financialSummary.grossMargin.toFixed(1)}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Summary</CardTitle>
          <CardDescription>
            Core financial metrics from latest data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Annual Revenue</span>
              <span className="font-bold text-blue-600">
                ${financialSummary.revenue.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Net Income</span>
              <span className={`font-bold ${
                financialSummary.netIncome >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                ${financialSummary.netIncome.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Total Assets</span>
              <span className="font-bold text-indigo-600">
                ${financialSummary.totalAssets.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Total Liabilities</span>
              <span className="font-bold text-orange-600">
                ${financialSummary.totalLiabilities.toLocaleString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
