
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FinancialFormValues } from "@/schemas/financialFormSchema";
import { FinancialMetrics, YearlyMetrics } from "@/types/financial";
import { toast } from "sonner";

export const useFinancialMetrics = () => {
  const queryClient = useQueryClient();

  const { data: metrics, isLoading } = useQuery({
    queryKey: ['financialMetrics'],
    queryFn: async () => {
      const storedData = localStorage.getItem('financialMetrics');
      return storedData ? JSON.parse(storedData) : null;
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const { mutate: processFinancials, isPending: isProcessing } = useMutation({
    mutationFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      return {
        monthlyAverageBalance: 12580.75,
        cashFlow: [
          { month: "Jan", income: 24000, expenses: 18000, balance: 6000, accountId: "1" },
          { month: "Feb", income: 22000, expenses: 17500, balance: 4500, accountId: "1" },
          { month: "Mar", income: 26000, expenses: 19000, balance: 7000, accountId: "1" },
          { month: "Apr", income: 23000, expenses: 21000, balance: 2000, accountId: "1" },
          { month: "May", income: 28000, expenses: 20000, balance: 8000, accountId: "1" },
          { month: "Jun", income: 29000, expenses: 22000, balance: 7000, accountId: "1" },
          { month: "Jan", income: 12000, expenses: 8000, balance: 4000, accountId: "2" },
          { month: "Feb", income: 13000, expenses: 9500, balance: 3500, accountId: "2" },
          { month: "Mar", income: 15000, expenses: 10000, balance: 5000, accountId: "2" },
          { month: "Apr", income: 14000, expenses: 11000, balance: 3000, accountId: "2" },
          { month: "May", income: 16000, expenses: 12000, balance: 4000, accountId: "2" },
          { month: "Jun", income: 17000, expenses: 12500, balance: 4500, accountId: "2" },
        ],
        yearlyData: [
          {
            year: "2023",
            payableDays: 32,
            receivableDays: 45,
            biWeeklyPayroll: 8500,
            monthlyPayroll: 8500 * 2.17,
            monthlyPayables: 45000,
            monthlyReceivables: 52000,
            assets: {
              currentAssets: 45000,
              longTermAssets: 230000,
              totalAssets: 275000,
            },
            liabilities: {
              currentLiabilities: 35000,
              longTermLiabilities: 150000,
              totalLiabilities: 185000,
            },
            equity: 90000,
            income: {
              revenue: 320000,
              expenses: 270000,
              netIncome: 50000,
            },
          },
          {
            year: "2024",
            payableDays: 28,
            receivableDays: 42,
            biWeeklyPayroll: 9200,
            monthlyPayroll: 9200 * 2.17,
            monthlyPayables: 48000,
            monthlyReceivables: 55000,
            assets: {
              currentAssets: 58000,
              longTermAssets: 245000,
              totalAssets: 303000,
            },
            liabilities: {
              currentLiabilities: 38000,
              longTermLiabilities: 140000,
              totalLiabilities: 178000,
            },
            equity: 125000,
            income: {
              revenue: 380000,
              expenses: 295000,
              netIncome: 85000,
            },
          }
        ],
        selectedYear: "2024"
      } as FinancialMetrics;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['financialMetrics'], data);
      localStorage.setItem('financialMetrics', JSON.stringify(data));
    },
  });

  const resetMetrics = () => {
    queryClient.setQueryData(['financialMetrics'], null);
    localStorage.removeItem('financialMetrics');
    toast("Reset successful", { description: "Financial data has been reset" });
  };

  const handleYearChange = (year: string) => {
    if (metrics) {
      const updatedMetrics = {
        ...metrics,
        selectedYear: year
      };
      queryClient.setQueryData(['financialMetrics'], updatedMetrics);
      localStorage.setItem('financialMetrics', JSON.stringify(updatedMetrics));
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
    localStorage.setItem('financialMetrics', JSON.stringify(newData));
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
