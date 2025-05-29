
import { useEffect, useMemo, useState } from "react";
import { Gauge, TrendingUp, TrendingDown, Award } from "lucide-react";
import { FinancialMetrics } from "@/types/financial";
import { calculateFinancialScore } from "@/hooks/useFinancialMetrics";
import { FinancialRecommendations } from "./FinancialRecommendations";

interface BusinessHealthScoreProps {
  metrics: FinancialMetrics;
}

const getWeekNumber = (date = new Date()) => {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = Math.floor((date.getTime() - startOfYear.getTime()) / 86400000);
  return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
};

const getScoreEmoji = (score: number) => {
  if (score >= 85) return { icon: <Award className="h-6 w-6 text-green-600 inline" />, label: "Excellent" };
  if (score >= 70) return { icon: <TrendingUp className="h-6 w-6 text-green-500 inline" />, label: "Good" };
  if (score >= 55) return { icon: <Gauge className="h-6 w-6 text-yellow-500 inline" />, label: "OK" };
  return { icon: <TrendingDown className="h-6 w-6 text-red-600 inline" />, label: "Needs Attention" };
};

function getDetailedExplanation(metrics: FinancialMetrics) {
  if (!metrics || !metrics.yearlyData || metrics.yearlyData.length === 0) {
    return "Awaiting financial data for comprehensive analysis.";
  }

  const currentYear = metrics.selectedYear || metrics.yearlyData[0]?.year;
  const currentYearData = metrics.yearlyData.find(d => d.year === currentYear);
  
  if (!currentYearData) return "No data available for selected year.";

  const currentRatio = currentYearData.assets.currentAssets / currentYearData.liabilities.currentLiabilities;
  const debtToEquity = currentYearData.liabilities.totalLiabilities / currentYearData.equity;
  const profitMargin = (currentYearData.income.netIncome / currentYearData.income.revenue) * 100;

  let explanation = `Current ratio: ${currentRatio.toFixed(2)} (${currentRatio >= 2 ? 'Excellent' : currentRatio >= 1.5 ? 'Good' : currentRatio >= 1 ? 'Acceptable' : 'Poor'} liquidity). `;
  explanation += `Debt-to-equity: ${debtToEquity.toFixed(2)} (${debtToEquity <= 0.3 ? 'Low' : debtToEquity <= 0.6 ? 'Moderate' : 'High'} leverage). `;
  explanation += `Profit margin: ${profitMargin.toFixed(1)}% (${profitMargin >= 15 ? 'Excellent' : profitMargin >= 5 ? 'Good' : profitMargin > 0 ? 'Acceptable' : 'Loss'} profitability).`;

  return explanation;
}

export const BusinessHealthScore = ({ metrics }: BusinessHealthScoreProps) => {
  const [lastScore, setLastScore] = useState<number | null>(null);
  const [isNewWeek, setIsNewWeek] = useState<boolean>(false);

  const score = useMemo(() => calculateFinancialScore(metrics), [metrics]);
  const currentWeek = getWeekNumber();
  
  useEffect(() => {
    const prev = localStorage.getItem("businessHealthScore_lastWeek");
    if (prev) setLastScore(Number(prev));
    localStorage.setItem("businessHealthScore_lastWeek", String(score));
    
    const prevSavedWeek = localStorage.getItem("businessHealthScore_lastWeek_num");
    if (!prevSavedWeek || Number(prevSavedWeek) !== currentWeek) {
      setIsNewWeek(true);
      localStorage.setItem("businessHealthScore_lastWeek_num", String(currentWeek));
    }
  }, [score, currentWeek]);

  const { icon, label } = getScoreEmoji(score);
  const explanation = getDetailedExplanation(metrics);

  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-card px-5 py-4 flex flex-col sm:flex-row items-center gap-5 animate-fade-in">
        <div className="flex flex-col items-center justify-center p-3">
          <span className="text-4xl font-bold mb-2">{score}</span>
          <div className="flex items-center gap-2">
            {icon}
            <span className="text-md font-medium text-muted-foreground">{label}</span>
          </div>
        </div>
        <div className="text-sm text-gray-700 flex-1">
          {explanation}
        </div>
        {isNewWeek && (
          <div className="mt-2 text-xs text-indigo-600">Score updated for this week</div>
        )}
      </div>
      
      <FinancialRecommendations metrics={metrics} />
    </div>
  );
};
