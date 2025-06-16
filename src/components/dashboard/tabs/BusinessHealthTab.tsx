
import { BusinessCreditScore } from "@/components/financial/BusinessCreditScore";
import { BusinessHealthHeader } from "@/components/financial/BusinessHealthHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useState } from "react";
import { useFinancialMetrics } from "@/hooks/useFinancialMetrics";
import { BusinessHealthScore } from "@/components/financial/BusinessHealthScore";
import FinancialMockApiPanel from "@/components/financial/FinancialMockApiPanel";

const BusinessHealthTab = () => {
  const { metrics } = useFinancialMetrics();

  const getFinancialSummary = () => {
    if (!metrics || !metrics.yearlyData || metrics.yearlyData.length === 0) {
      return null;
    }

    const currentYear = metrics.selectedYear || metrics.yearlyData[0]?.year;
    const currentYearData = metrics.yearlyData.find(d => d.year === currentYear);
    
    if (!currentYearData) return null;

    const currentRatio = currentYearData.assets.currentAssets / currentYearData.liabilities.currentLiabilities;
    const debtToEquity = currentYearData.liabilities.totalLiabilities / currentYearData.equity;
    const profitMargin = (currentYearData.income.netIncome / currentYearData.income.revenue) * 100;
    const grossMargin = ((currentYearData.income.revenue - currentYearData.income.expenses) / currentYearData.income.revenue) * 100;

    return {
      currentRatio,
      debtToEquity,
      profitMargin,
      grossMargin,
      receivableDays: currentYearData.receivableDays,
      payableDays: currentYearData.payableDays,
      monthlyReceivables: currentYearData.monthlyReceivables,
      monthlyPayables: currentYearData.monthlyPayables,
    };
  };

  const financialSummary = getFinancialSummary();

  return (
    <div className="space-y-8">
      <BusinessHealthHeader />

      {/* Financial Snapshot panel */}
      <FinancialMockApiPanel />

      {/* Credit Score and Business Health Score */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BusinessCreditScore />
        {metrics ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Business Health Score</CardTitle>
            </CardHeader>
            <CardContent>
              <BusinessHealthScore metrics={metrics} />
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Business Health Score</CardTitle>
              <CardDescription>
                No financial data available for health score calculation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-32 text-muted-foreground">
                <span>Financial metrics needed</span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Key Financial Ratios */}
      {financialSummary && (
        <Card>
          <CardHeader>
            <CardTitle>Key Financial Ratios</CardTitle>
            <CardDescription>
              Critical metrics for business health assessment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {financialSummary.currentRatio.toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground">Current Ratio</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {financialSummary.debtToEquity.toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground">Debt-to-Equity</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {financialSummary.profitMargin.toFixed(1)}%
                </div>
                <div className="text-sm text-muted-foreground">Profit Margin</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {financialSummary.grossMargin.toFixed(1)}%
                </div>
                <div className="text-sm text-muted-foreground">Gross Margin</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Receivables and Payables Days */}
      {financialSummary && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Receivables Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Average Collection Days</span>
                  <span className="text-2xl font-bold text-blue-600">
                    {financialSummary.receivableDays} days
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Monthly Receivables</span>
                  <span className="text-lg font-semibold text-green-600">
                    ${financialSummary.monthlyReceivables.toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payables Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Average Payment Days</span>
                  <span className="text-2xl font-bold text-orange-600">
                    {financialSummary.payableDays} days
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Monthly Payables</span>
                  <span className="text-lg font-semibold text-red-600">
                    ${financialSummary.monthlyPayables.toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default BusinessHealthTab;
