import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FinancialFormValues } from "@/schemas/financialFormSchema";
import { FinancialMetrics, YearlyMetrics } from "@/types/financial";
import { toast } from "sonner";
import { encryptData, decryptData, isSessionValid } from "@/utils/security";

// Enhanced scoring logic using financial ratios
export const calculateFinancialScore = (metrics: FinancialMetrics) => {
  if (!metrics || !metrics.yearlyData || metrics.yearlyData.length === 0) return 50;

  const currentYear = metrics.selectedYear || metrics.yearlyData[0]?.year;
  const currentYearData = metrics.yearlyData.find(d => d.year === currentYear);
  
  if (!currentYearData) return 50;

  let score = 70; // Base score

  // Current Ratio (Current Assets / Current Liabilities)
  const currentRatio = currentYearData.assets.currentAssets / currentYearData.liabilities.currentLiabilities;
  if (currentRatio >= 2.0) score += 15;
  else if (currentRatio >= 1.5) score += 10;
  else if (currentRatio >= 1.0) score += 5;
  else score -= 10;

  // Debt to Equity Ratio
  const debtToEquity = currentYearData.liabilities.totalLiabilities / currentYearData.equity;
  if (debtToEquity <= 0.3) score += 10;
  else if (debtToEquity <= 0.6) score += 5;
  else if (debtToEquity > 1.0) score -= 10;

  // Profit Margin
  const profitMargin = currentYearData.income.netIncome / currentYearData.income.revenue;
  if (profitMargin >= 0.15) score += 10;
  else if (profitMargin >= 0.05) score += 5;
  else if (profitMargin < 0) score -= 15;

  // Cash flow trend
  if (metrics.cashFlow && metrics.cashFlow.length >= 3) {
    const recent = metrics.cashFlow.slice(-3);
    const avgBalance = recent.reduce((sum, f) => sum + f.balance, 0) / recent.length;
    score += Math.max(-10, Math.min(10, avgBalance / 2000));
  }

  return Math.round(Math.max(30, Math.min(95, score)));
};

export const useFinancialMetrics = () => {
  const queryClient = useQueryClient();

  const { data: metrics, isLoading } = useQuery({
    queryKey: ['financialMetrics'],
    queryFn: async () => {
      if (!isSessionValid()) return null;
      try {
        const storedData = sessionStorage.getItem('financialMetrics');
        if (storedData) {
          const decryptedData = decryptData(storedData);
          return JSON.parse(decryptedData);
        }
      } catch (error) {
        // Data corruption or invalid session
      }
      return null;
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const { mutate: processFinancials, isPending: isProcessing } = useMutation({
    mutationFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Using your example values
      const exampleData: FinancialMetrics = {
        monthlyAverageBalance: 12580.75,
        cashFlow: [
          { month: "Jan", income: 24000, expenses: 18000, balance: 6000, accountId: "1" },
          { month: "Feb", income: 22000, expenses: 17500, balance: 4500, accountId: "1" },
          { month: "Mar", income: 26000, expenses: 19000, balance: 7000, accountId: "1" },
          { month: "Apr", income: 23000, expenses: 21000, balance: 2000, accountId: "1" },
          { month: "May", income: 28000, expenses: 20000, balance: 8000, accountId: "1" },
          { month: "Jun", income: 29000, expenses: 22000, balance: 7000, accountId: "1" },
        ],
        yearlyData: [
          {
            year: "2024",
            payableDays: 28,
            receivableDays: 42,
            biWeeklyPayroll: 9200,
            monthlyPayroll: 9200 * 2.17,
            monthlyPayables: 48000,
            monthlyReceivables: 55000,
            assets: {
              currentAssets: 800000, // Your example value
              longTermAssets: 245000,
              totalAssets: 1045000,
            },
            liabilities: {
              currentLiabilities: 400000, // Your example value
              longTermLiabilities: 140000,
              totalLiabilities: 540000,
            },
            equity: 505000, // Calculated: total assets - total liabilities
            income: {
              revenue: 380000,
              expenses: 295000,
              netIncome: 85000,
            },
          }
        ],
        selectedYear: "2024"
      };
      
      return exampleData;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['financialMetrics'], data);
      if (isSessionValid()) {
        try {
          const encryptedData = encryptData(JSON.stringify(data));
          sessionStorage.setItem('financialMetrics', encryptedData);
        } catch (error) {
          // Storage failed, continue without persisting
        }
      }
    },
  });

  const resetMetrics = () => {
    queryClient.setQueryData(['financialMetrics'], null);
    sessionStorage.removeItem('financialMetrics');
    toast("Reset successful", { description: "Financial data has been reset" });
  };

  const handleYearChange = (year: string) => {
    if (metrics) {
      const updatedMetrics = {
        ...metrics,
        selectedYear: year
      };
      queryClient.setQueryData(['financialMetrics'], updatedMetrics);
      if (isSessionValid()) {
        try {
          const encryptedData = encryptData(JSON.stringify(updatedMetrics));
          sessionStorage.setItem('financialMetrics', encryptedData);
        } catch (error) {
          // Storage failed
        }
      }
    }
  };

  const handleManualSubmit = (values: FinancialFormValues) => {
    const totalAssets = values.currentAssets + values.longTermAssets;
    const totalLiabilities = values.currentLiabilities + values.longTermLiabilities;
    const calculatedEquity = totalAssets - totalLiabilities;
    const netIncome = values.revenue - values.expenses;
    
    let newData: FinancialMetrics;
    
    if (metrics) {
      const existingYearIndex = metrics.yearlyData.findIndex(
        data => data.year === values.year
      );
      
      const newYearlyData = [...metrics.yearlyData];
      const newYearData: YearlyMetrics = {
        year: values.year,
        payableDays: values.payableDays,
        receivableDays: values.receivableDays,
        biWeeklyPayroll: values.biWeeklyPayroll,
        monthlyPayroll: values.biWeeklyPayroll * 2.17,
        monthlyPayables: values.monthlyPayables,
        monthlyReceivables: values.monthlyReceivables,
        assets: {
          currentAssets: values.currentAssets,
          longTermAssets: values.longTermAssets,
          totalAssets,
        },
        liabilities: {
          currentLiabilities: values.currentLiabilities,
          longTermLiabilities: values.longTermLiabilities,
          totalLiabilities,
        },
        equity: calculatedEquity,
        income: {
          revenue: values.revenue,
          expenses: values.expenses,
          netIncome,
        },
      };
      
      if (existingYearIndex >= 0) {
        newYearlyData[existingYearIndex] = newYearData;
      } else {
        newYearlyData.push(newYearData);
      }
      
      newData = {
        ...metrics,
        yearlyData: newYearlyData,
        selectedYear: values.year,
        cashFlow: metrics.cashFlow
      };
    } else {
      newData = {
        monthlyAverageBalance: values.revenue / 12,
        cashFlow: [
          { month: "Jan", income: values.revenue / 6, expenses: values.expenses / 6, balance: (values.revenue - values.expenses) / 6, accountId: "1" },
          { month: "Feb", income: values.revenue / 6, expenses: values.expenses / 6, balance: (values.revenue - values.expenses) / 6, accountId: "1" },
          { month: "Mar", income: values.revenue / 6, expenses: values.expenses / 6, balance: (values.revenue - values.expenses) / 6, accountId: "1" },
          { month: "Apr", income: values.revenue / 6, expenses: values.expenses / 6, balance: (values.revenue - values.expenses) / 6, accountId: "1" },
          { month: "May", income: values.revenue / 6, expenses: values.expenses / 6, balance: (values.revenue - values.expenses) / 6, accountId: "1" },
          { month: "Jun", income: values.revenue / 6, expenses: values.expenses / 6, balance: (values.revenue - values.expenses) / 6, accountId: "1" },
        ],
        yearlyData: [
          {
            year: values.year,
            payableDays: values.payableDays,
            receivableDays: values.receivableDays,
            biWeeklyPayroll: values.biWeeklyPayroll,
            monthlyPayroll: values.biWeeklyPayroll * 2.17,
            monthlyPayables: values.monthlyPayables,
            monthlyReceivables: values.monthlyReceivables,
            assets: {
              currentAssets: values.currentAssets,
              longTermAssets: values.longTermAssets,
              totalAssets,
            },
            liabilities: {
              currentLiabilities: values.currentLiabilities,
              longTermLiabilities: values.longTermLiabilities,
              totalLiabilities,
            },
            equity: calculatedEquity,
            income: {
              revenue: values.revenue,
              expenses: values.expenses,
              netIncome,
            },
          }
        ],
        selectedYear: values.year,
      };
    }
    
    queryClient.setQueryData(['financialMetrics'], newData);
    if (isSessionValid()) {
      const encryptedData = encryptData(JSON.stringify(newData));
      sessionStorage.setItem('financialMetrics', encryptedData);
    }
  };

  return {
    metrics,
    isLoading,
    isProcessing,
    processFinancials,
    handleYearChange,
    handleManualSubmit,
    resetMetrics
  };
};
