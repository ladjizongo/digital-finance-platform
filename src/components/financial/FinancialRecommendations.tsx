
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";
import { FinancialMetrics } from "@/types/financial";

interface FinancialRecommendationsProps {
  metrics: FinancialMetrics;
}

export const generateRecommendations = (metrics: FinancialMetrics): string[] => {
  const recommendations: string[] = [];
  
  if (!metrics || !metrics.yearlyData || metrics.yearlyData.length === 0) {
    return ["Upload financial data to receive personalized recommendations."];
  }

  const currentYear = metrics.selectedYear || metrics.yearlyData[0]?.year;
  const currentYearData = metrics.yearlyData.find(d => d.year === currentYear);
  
  if (!currentYearData) return [];

  const { income, assets, liabilities } = currentYearData;
  const operatingExpenses = income.expenses;
  const revenue = income.revenue;
  const netIncome = income.netIncome;
  const totalAssets = assets.totalAssets;
  const totalLiabilities = liabilities.totalLiabilities;

  // Operating expense ratio check
  if (operatingExpenses > 0.5 * revenue) {
    recommendations.push("Consider reviewing operational costs for efficiency.");
  }

  // Net profit margin check
  if (netIncome < 0.1 * revenue) {
    recommendations.push("Net profit margin is low. Consider improving pricing or reducing overhead.");
  }

  // Debt to asset ratio check
  if (totalLiabilities > 0.7 * totalAssets) {
    recommendations.push("Debt levels are high; consider refinancing or reducing liabilities.");
  }

  // Additional recommendations based on current ratio
  const currentRatio = assets.currentAssets / liabilities.currentLiabilities;
  if (currentRatio < 1.0) {
    recommendations.push("Current ratio is below 1.0, indicating potential liquidity issues. Consider improving cash flow or reducing short-term debt.");
  }

  // Cash flow recommendations
  if (metrics.cashFlow && metrics.cashFlow.length > 0) {
    const avgBalance = metrics.cashFlow.reduce((sum, entry) => sum + entry.balance, 0) / metrics.cashFlow.length;
    if (avgBalance < 0) {
      recommendations.push("Average cash flow is negative. Focus on increasing revenue or reducing expenses.");
    }
  }

  if (recommendations.length === 0) {
    recommendations.push("Your financial metrics look healthy! Continue monitoring key ratios and maintain good financial practices.");
  }

  return recommendations;
};

export const FinancialRecommendations = ({ metrics }: FinancialRecommendationsProps) => {
  const recommendations = generateRecommendations(metrics);

  const getRecommendationIcon = (recommendation: string) => {
    if (recommendation.includes("healthy") || recommendation.includes("good")) {
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    }
    if (recommendation.includes("consider") || recommendation.includes("focus")) {
      return <TrendingUp className="h-5 w-5 text-blue-600" />;
    }
    return <AlertTriangle className="h-5 w-5 text-orange-600" />;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Financial Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recommendations.map((recommendation, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              {getRecommendationIcon(recommendation)}
              <p className="text-sm text-gray-700 leading-relaxed">
                {recommendation}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
