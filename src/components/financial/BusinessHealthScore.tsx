
import { useEffect, useMemo, useState } from "react";
import { Gauge, TrendingUp, TrendingDown, Award } from "lucide-react";
import { FinancialMetrics, CashFlowEntry } from "@/types/financial";

interface BusinessHealthScoreProps {
  metrics: FinancialMetrics;
}

const getWeekNumber = (date = new Date()) => {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  // Number of days till today, inclusive
  const pastDaysOfYear = Math.floor((date.getTime() - startOfYear.getTime()) / 86400000);
  // ISO week date
  return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
};

function calcTrend(cashFlowArr: CashFlowEntry[]) {
  // Calculate average income/expenses for last 3 months vs previous 3 months
  // If not enough data, just use whatever's there
  if (cashFlowArr.length < 6) return { deltaIncome: 0, deltaExpenses: 0 };

  const prev = cashFlowArr.slice(0, 3);
  const recent = cashFlowArr.slice(-3);

  const avg = (arr: CashFlowEntry[], key: "income" | "expenses") =>
    arr.reduce((sum, f) => sum + f[key], 0) / arr.length;

  const recentIncome = avg(recent, "income");
  const prevIncome = avg(prev, "income");
  const deltaIncome = ((recentIncome - prevIncome) / (prevIncome || 1)) * 100;

  const recentExpenses = avg(recent, "expenses");
  const prevExpenses = avg(prev, "expenses");
  const deltaExpenses = ((recentExpenses - prevExpenses) / (prevExpenses || 1)) * 100;

  return { deltaIncome, deltaExpenses };
}

function calcScore(metrics: FinancialMetrics) {
  if (!metrics || !metrics.cashFlow || metrics.cashFlow.length === 0) return 50;

  const { deltaIncome, deltaExpenses } = calcTrend(metrics.cashFlow);

  // Score out of 100. Start at 70, add positivity for rising income, penalize rising expenses more.
  let score = 70;
  score += Math.max(-10, Math.min(10, deltaIncome / 5));       // up to ±10 for income
  score -= Math.max(-15, Math.min(15, deltaExpenses / 4));     // up to ±15 for expenses

  // Adjust by net cash in last month (more is better)
  const lastMonth = metrics.cashFlow[metrics.cashFlow.length - 1];
  if (lastMonth) {
    score += Math.max(-10, Math.min(10, lastMonth.balance / 2000));
  }

  // Clamp [30, 95]
  return Math.round(Math.max(30, Math.min(95, score)));
}

const getScoreEmoji = (score: number) => {
  if (score >= 85) return { icon: <Award className="h-6 w-6 text-green-600 inline" />, label: "Excellent" };
  if (score >= 70) return { icon: <TrendingUp className="h-6 w-6 text-green-500 inline" />, label: "Good" };
  if (score >= 55) return { icon: <Gauge className="h-6 w-6 text-yellow-500 inline" />, label: "OK" };
  return { icon: <TrendingDown className="h-6 w-6 text-red-600 inline" />, label: "Needs Attention" };
};

function getShortExplanation(score: number, prev: number, metrics: FinancialMetrics) {
  if (!metrics || !metrics.cashFlow || metrics.cashFlow.length < 6) return "Awaiting more data for trend analysis.";
  const { deltaIncome, deltaExpenses } = calcTrend(metrics.cashFlow);
  let changeDesc = "";
  if (score === prev) {
    changeDesc = "Score is steady.";
  } else if (score > prev) {
    changeDesc = "Improved due to ";
    changeDesc += deltaIncome > 0 ? "higher income" : "";
    if (deltaExpenses < 0) changeDesc += (deltaIncome > 0 ? " and " : "") + "lower expenses";
    else if (deltaIncome <= 0) changeDesc += "reduced expenses";
  } else {
    changeDesc = "Dropped due to ";
    changeDesc += deltaExpenses > 0 ? "higher expenses" : "";
    if (deltaIncome < 0) changeDesc += (deltaExpenses > 0 ? " and " : "") + "lower income";
    else if (deltaExpenses <= 0) changeDesc += "lower performance";
  }
  // Add more context if major move
  if (Math.abs(score - prev) >= 7) {
    changeDesc += ". Significant change.";
  }
  return changeDesc;
}

export const BusinessHealthScore = ({ metrics }: BusinessHealthScoreProps) => {
  const [lastScore, setLastScore] = useState<number | null>(null);
  const [isNewWeek, setIsNewWeek] = useState<boolean>(false);

  const score = useMemo(() => calcScore(metrics), [metrics]);
  // Get week number for keying scores by week
  const currentWeek = getWeekNumber();
  useEffect(() => {
    // Load previous score from localStorage
    const prev = localStorage.getItem("businessHealthScore_lastWeek");
    if (prev) setLastScore(Number(prev));
    // Save this week's score for next week
    localStorage.setItem("businessHealthScore_lastWeek", String(score));
    // Detect if new week
    const prevSavedWeek = localStorage.getItem("businessHealthScore_lastWeek_num");
    if (!prevSavedWeek || Number(prevSavedWeek) !== currentWeek) {
      setIsNewWeek(true);
      localStorage.setItem("businessHealthScore_lastWeek_num", String(currentWeek));
    }
  }, [score, currentWeek]);

  const { icon, label } = getScoreEmoji(score);

  // Use prev week's score if available, else compare to current for neutral
  const explanation = getShortExplanation(score, lastScore ?? score, metrics);

  return (
    <div className="rounded-lg border bg-card px-5 py-4 mb-6 flex flex-col sm:flex-row items-center gap-5 animate-fade-in">
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
  );
};
