
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
  warningMessage?: React.ReactNode;
  successMessage?: string;
  isCircleDisplay?: boolean;
  compareValue?: number;
  showUtilization?: boolean;
  utilizationValue?: number;
  utilizationLabel?: string;
}

export interface FinancialEvent {
  date: string;
  title: string;
  type: 'payroll' | 'rent' | 'invoice' | 'tax' | 'other';
  amount: number;
  recurring?: boolean;
  recurrencePattern?: 'weekly' | 'biweekly' | 'monthly' | 'quarterly' | 'yearly';
}

export interface DailyCashFlow {
  date: string;
  projectedBalance: number;
  safeThreshold: number;
  income: number;
  expenses: number;
  netFlow: number;
  events: FinancialEvent[];
}

export interface ForecastData {
  dailyCashFlow: DailyCashFlow[];
  events: FinancialEvent[];
  warningDates: string[];
}
