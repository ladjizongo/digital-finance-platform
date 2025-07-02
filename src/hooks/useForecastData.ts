
import { useState, useEffect } from 'react';
import { format, addDays, addMonths, differenceInDays, parseISO } from 'date-fns';
import { FinancialMetrics, FinancialEvent, DailyCashFlow, ForecastData, CashFlowProjection } from '@/types/financial';

export const useForecastData = (metrics: FinancialMetrics) => {
  const [forecastData, setForecastData] = useState<ForecastData>({
    dailyCashFlow: [],
    events: [],
    warningDates: [],
    projection: {
      currentCash: 0,
      expectedCashIn: 0,
      expectedCashOut: 0,
      adtProjectionIn: 0,
      adtProjectionOut: 0,
      projectedBalance: 0,
      recommendations: []
    }
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!metrics) {
      setIsLoading(false);
      return;
    }

    const generateForecastData = () => {
      setIsLoading(true);

      // Get current financial data
      const currentYear = metrics.selectedYear || metrics.yearlyData[0]?.year;
      const currentYearData = metrics.yearlyData.find(d => d.year === currentYear);
      
      if (!currentYearData) {
        setIsLoading(false);
        return;
      }

      // === IMPLEMENTING PYTHON ALGORITHM ===
      
      // Current cash on hand
      const latestCashFlow = metrics.cashFlow.length > 0 
        ? metrics.cashFlow[metrics.cashFlow.length - 1] 
        : null;
      const currentCash = latestCashFlow ? latestCashFlow.balance : metrics.monthlyAverageBalance;
      
      const today = new Date();
      const forecastDays = 7; // 7-day forecast as per Python algorithm
      const endDate = addDays(today, forecastDays);
      
      // Generate receivables, payables, and payouts based on financial data
      const receivables: [number, string][] = [];
      const payables: [number, string][] = [];
      const payouts: [number, string][] = [];
      
      // Generate receivables (invoices) - spread monthly receivables over the week
      const monthlyReceivables = currentYearData.monthlyReceivables;
      const weeklyReceivables = monthlyReceivables / 4; // Approximate weekly amount
      for (let i = 1; i <= 3; i++) {
        const amount = weeklyReceivables / 3;
        const date = format(addDays(today, i * 2), 'yyyy-MM-dd');
        receivables.push([amount, date]);
      }
      
      // Generate payables (bills) - spread monthly payables over the week
      const monthlyPayables = currentYearData.monthlyPayables;
      const weeklyPayables = monthlyPayables / 4;
      for (let i = 1; i <= 3; i++) {
        const amount = weeklyPayables / 3;
        const date = format(addDays(today, i * 2 + 1), 'yyyy-MM-dd');
        payables.push([amount, date]);
      }
      
      // Generate payouts (e.g., from Shopify/Amazon) - assume some e-commerce revenue
      const ecommerceRevenue = currentYearData.income.revenue * 0.2; // 20% from e-commerce
      const weeklyPayouts = ecommerceRevenue / 52;
      payouts.push([weeklyPayouts * 0.6, format(addDays(today, 2), 'yyyy-MM-dd')]);
      payouts.push([weeklyPayouts * 0.4, format(addDays(today, 6), 'yyyy-MM-dd')]);
      
      // Historical daily inflow/outflow - simulate from monthly data
      const dailyInflowAvg = monthlyReceivables / 30;
      const dailyOutflowAvg = monthlyPayables / 30;
      
      // Generate 30-day history simulation
      const dailyInflows = Array.from({ length: 30 }, () => 
        dailyInflowAvg * (0.8 + Math.random() * 0.4) // ±20% variance
      );
      const dailyOutflows = Array.from({ length: 30 }, () => 
        dailyOutflowAvg * (0.8 + Math.random() * 0.4) // ±20% variance
      );
      
      // === CALCULATIONS (from Python algorithm) ===
      
      // Helper function to sum within range
      const sumWithinRange = (data: [number, string][], cutoffDate: Date) => {
        return data.reduce((sum, [amount, dateStr]) => {
          const itemDate = new Date(dateStr);
          return itemDate <= cutoffDate ? sum + amount : sum;
        }, 0);
      };
      
      // Sums from documents
      const expectedCashIn = sumWithinRange(receivables, endDate) + sumWithinRange(payouts, endDate);
      const expectedCashOut = sumWithinRange(payables, endDate);
      
      // ADT projections
      const avgInflow = dailyInflows.reduce((a, b) => a + b, 0) / dailyInflows.length;
      const avgOutflow = dailyOutflows.reduce((a, b) => a + b, 0) / dailyOutflows.length;
      
      const adtProjectionIn = avgInflow * forecastDays;
      const adtProjectionOut = avgOutflow * forecastDays;
      
      // Projected balance
      const projectedBalance = currentCash + expectedCashIn + adtProjectionIn - expectedCashOut - adtProjectionOut;
      
      // === RECOMMENDATIONS (from Python algorithm) ===
      const recommendations: string[] = [];
      
      if (projectedBalance < 0) {
        recommendations.push("You may not have enough cash to cover payables and daily expenses in the next 7 days.");
        if (expectedCashIn > 0) {
          recommendations.push("Reach out to clients with upcoming invoices to accelerate collections.");
        }
        recommendations.push("Consider securing short-term financing or delaying non-essential payables.");
      } else if (projectedBalance < avgOutflow * 3) {
        recommendations.push("Your projected buffer is low. Monitor collections and hold off on large expenses.");
      } else {
        recommendations.push("Your short-term cash flow looks stable. Continue normal operations.");
      }
      
      // Create projection object
      const projection: CashFlowProjection = {
        currentCash,
        expectedCashIn,
        expectedCashOut,
        adtProjectionIn,
        adtProjectionOut,
        projectedBalance,
        recommendations
      };
      
      // Generate events for calendar display
      const events: FinancialEvent[] = [
        ...receivables.map(([amount, date]) => ({
          date,
          title: `Invoice Payment`,
          type: 'invoice' as const,
          amount,
          recurring: false
        })),
        ...payables.map(([amount, date]) => ({
          date,
          title: `Bill Payment`,
          type: 'other' as const,
          amount: -amount,
          recurring: false
        })),
        ...payouts.map(([amount, date]) => ({
          date,
          title: `E-commerce Payout`,
          type: 'other' as const,
          amount,
          recurring: false
        }))
      ];
      
      // Generate daily cash flow data
      let runningBalance = currentCash;
      const dailyCashFlow: DailyCashFlow[] = [];
      const warningDates: string[] = [];
      const safeThreshold = avgOutflow * 3; // 3 days of expenses as buffer
      
      for (let i = 0; i <= forecastDays; i++) {
        const currentDate = addDays(today, i);
        const dateString = format(currentDate, 'yyyy-MM-dd');
        
        // Find events for this day
        const dayEvents = events.filter(event => event.date === dateString);
        
        // Add average daily flows
        const dayIncome = dayEvents
          .filter(event => event.amount > 0)
          .reduce((sum, event) => sum + event.amount, 0) + (i > 0 ? avgInflow : 0);
        
        const dayExpenses = Math.abs(
          dayEvents
            .filter(event => event.amount < 0)
            .reduce((sum, event) => sum + event.amount, 0)
        ) + (i > 0 ? avgOutflow : 0);
        
        // Update running balance
        if (i > 0) {
          runningBalance += dayIncome - dayExpenses;
        }
        
        // Check if balance is below safe threshold
        if (runningBalance < safeThreshold) {
          warningDates.push(dateString);
        }
        
        dailyCashFlow.push({
          date: dateString,
          projectedBalance: runningBalance,
          safeThreshold,
          income: dayIncome,
          expenses: dayExpenses,
          netFlow: dayIncome - dayExpenses,
          events: dayEvents
        });
      }
      
      setForecastData({
        dailyCashFlow,
        events,
        warningDates,
        projection
      });
      
      setIsLoading(false);
    };

    generateForecastData();
  }, [metrics]);

  const cashFlowOnDate = (date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd');
    return forecastData.dailyCashFlow.find(
      item => item.date === dateString
    ) || null;
  };

  const financialEvents = forecastData.events;
  const { warningDates } = forecastData;

  return {
    forecastData,
    warningDates,
    financialEvents,
    cashFlowOnDate,
    isLoading
  };
};
