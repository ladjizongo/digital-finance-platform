export interface YearlyMetrics {
  year: string;
  payableDays: number;
  receivableDays: number;
  biWeeklyPayroll: number;
  monthlyPayroll: number;
  monthlyPayables: number;
  monthlyReceivables: number;
  assets: {
    currentAssets: number;
    longTermAssets: number;
    totalAssets: number;
  };
  liabilities: {
    currentLiabilities: number;
    longTermLiabilities: number;
    totalLiabilities: number;
  };
  equity: number;
  income: {
    revenue: number;
    expenses: number;
    netIncome: number;
  };
}

export interface CashFlowEntry {
  month: string;
  income: number;
  expenses: number;
  balance: number;
  accountId: string;
}

export interface FinancialMetrics {
  monthlyAverageBalance: number;
  cashFlow: CashFlowEntry[];
  yearlyData: YearlyMetrics[];
  selectedYear?: string;
}

export interface MetricCardProps {
  title: string;
  value: number;
  unit?: string;
  description?: string;
  warningThreshold?: number;
  warningMessage?: string;
  successMessage?: string;
  isCircleDisplay?: boolean;
  compareValue?: number;
}
