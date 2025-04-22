
import { useState, useEffect } from 'react';
import { format, addDays, addMonths, differenceInDays, parseISO } from 'date-fns';
import { FinancialMetrics, FinancialEvent, DailyCashFlow, ForecastData } from '@/types/financial';

export const useForecastData = (metrics: FinancialMetrics) => {
  const [forecastData, setForecastData] = useState<ForecastData>({
    dailyCashFlow: [],
    events: [],
    warningDates: []
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

      // Starting balance (use the latest cash flow entry's balance as starting point)
      const latestCashFlow = metrics.cashFlow.length > 0 
        ? metrics.cashFlow[metrics.cashFlow.length - 1] 
        : null;
      
      const startingBalance = latestCashFlow ? latestCashFlow.balance : metrics.monthlyAverageBalance;
      
      // For demo purposes, we'll generate recurring events based on the metrics
      const today = new Date();
      const events: FinancialEvent[] = [];
      
      // Generate 3 months of forecasted data
      const forecastDays = 90;
      const dailyCashFlow: DailyCashFlow[] = [];
      const safeThreshold = startingBalance * 0.3; // Safe threshold is 30% of the starting balance
      
      // Generate recurring payroll events (bi-weekly)
      const payrollAmount = currentYearData.biWeeklyPayroll;
      let nextPayrollDate = addDays(today, 7 - today.getDay()); // Next Friday
      
      while (differenceInDays(nextPayrollDate, today) <= forecastDays) {
        events.push({
          date: format(nextPayrollDate, 'yyyy-MM-dd'),
          title: 'Payroll',
          type: 'payroll',
          amount: -payrollAmount,
          recurring: true,
          recurrencePattern: 'biweekly'
        });
        nextPayrollDate = addDays(nextPayrollDate, 14); // Bi-weekly
      }
      
      // Generate monthly rent event
      const rentAmount = currentYearData.monthlyPayables * 0.3; // Assume rent is 30% of monthly payables
      const nextRentDate = new Date(today.getFullYear(), today.getMonth() + 1, 1); // First of next month
      
      if (differenceInDays(nextRentDate, today) <= forecastDays) {
        events.push({
          date: format(nextRentDate, 'yyyy-MM-dd'),
          title: 'Office Rent',
          type: 'rent',
          amount: -rentAmount,
          recurring: true,
          recurrencePattern: 'monthly'
        });
      }
      
      // Generate expected invoice payments (accounts receivable)
      // Split monthly receivables into a few invoices
      const monthlyReceivables = currentYearData.monthlyReceivables;
      const numInvoices = 4; // Assume 4 invoices per month
      const invoiceAmount = monthlyReceivables / numInvoices;
      
      for (let i = 0; i < numInvoices; i++) {
        // Space out invoices through the month
        const daysToAdd = 7 + (i * 7);
        const invoiceDate = addDays(today, daysToAdd);
        
        if (differenceInDays(invoiceDate, today) <= forecastDays) {
          events.push({
            date: format(invoiceDate, 'yyyy-MM-dd'),
            title: `Invoice #${2025000 + i}`,
            type: 'invoice',
            amount: invoiceAmount,
            recurring: false
          });
        }
      }
      
      // Generate quarterly tax payment
      const taxAmount = currentYearData.income.revenue * 0.05; // Assume 5% tax rate
      const nextTaxDate = new Date(
        today.getFullYear(), 
        Math.floor(today.getMonth() / 3) * 3 + 3, 
        15
      ); // 15th of next quarter month
      
      if (differenceInDays(nextTaxDate, today) <= forecastDays) {
        events.push({
          date: format(nextTaxDate, 'yyyy-MM-dd'),
          title: 'Quarterly Tax Payment',
          type: 'tax',
          amount: -taxAmount,
          recurring: true,
          recurrencePattern: 'quarterly'
        });
      }
      
      // Generate daily cash flow data
      let runningBalance = startingBalance;
      const warningDates: string[] = [];
      
      for (let i = 0; i <= forecastDays; i++) {
        const currentDate = addDays(today, i);
        const dateString = format(currentDate, 'yyyy-MM-dd');
        
        // Find events for this day
        const dayEvents = events.filter(event => event.date === dateString);
        
        // Calculate day's income and expenses
        const dayIncome = dayEvents
          .filter(event => event.amount > 0)
          .reduce((sum, event) => sum + event.amount, 0);
        
        const dayExpenses = Math.abs(
          dayEvents
            .filter(event => event.amount < 0)
            .reduce((sum, event) => sum + event.amount, 0)
        );
        
        // Update running balance
        runningBalance += dayIncome - dayExpenses;
        
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
        warningDates
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
