import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarDays, TrendingDown, Circle, CircleAlert, Link, Store, CreditCard, FileInvoice } from "lucide-react";
import { cn } from "@/lib/utils";
import { FinancialEvent, FinancialMetrics } from "@/types/financial";
import { useForecastData } from "@/hooks/useForecastData";
import { toast } from "sonner";

interface CashFlowForecastProps {
  metrics: FinancialMetrics;
}

export const CashFlowForecast = ({ metrics }: CashFlowForecastProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { 
    forecastData, 
    warningDates, 
    financialEvents,
    cashFlowOnDate,
    isLoading
  } = useForecastData(metrics);
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const getDateClassName = (date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd');
    
    if (warningDates.includes(dateString)) {
      return "bg-red-100 text-red-700";
    }
    
    const hasEvent = financialEvents.some(event => format(new Date(event.date), 'yyyy-MM-dd') === dateString);
    if (hasEvent) {
      return "bg-blue-100 text-blue-700";
    }
    
    return "";
  };

  const eventsOnSelectedDate = date 
    ? financialEvents.filter(event => 
        format(new Date(event.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
      )
    : [];

  const selectedDateCashFlow = date ? cashFlowOnDate(date) : null;

  const handleConnectService = (service: string) => {
    toast.success(`Integration with ${service} initiated. This is a demo feature.`);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle className="text-xl">Cash Flow Forecast</CardTitle>
          <CardDescription>Forecast for the next 90 days</CardDescription>
        </div>
        <CalendarDays className="h-5 w-5 text-indigo-600" />
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className={cn("p-3 pointer-events-auto border rounded-md")}
              classNames={{
                day_selected: "bg-primary",
                day: cn(""), // Fix: Use a string instead of a function
              }}
              components={{
                DayContent: (props) => {
                  const dateString = format(props.date, 'yyyy-MM-dd');
                  const isWarning = warningDates.includes(dateString);
                  const hasEvent = financialEvents.some(event => 
                    format(new Date(event.date), 'yyyy-MM-dd') === dateString
                  );
                  
                  return (
                    <div className={cn(
                      "relative flex h-9 w-9 items-center justify-center p-0",
                      getDateClassName(props.date) // Add the class directly here instead
                    )}>
                      {props.date.getDate()}
                      {isWarning && (
                        <div className="absolute bottom-0 right-0">
                          <CircleAlert className="h-3 w-3 text-red-600" />
                        </div>
                      )}
                      {!isWarning && hasEvent && (
                        <div className="absolute bottom-0 right-0">
                          <Circle className="h-3 w-3 text-blue-600" />
                        </div>
                      )}
                    </div>
                  );
                }
              }}
            />
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1 text-xs">
                <Circle className="h-3 w-3 text-blue-600" />
                <span>Financial Event</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <CircleAlert className="h-3 w-3 text-red-600" />
                <span>Cash Flow Warning</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            {date && (
              <>
                <h3 className="text-lg font-medium">
                  {format(date, 'MMMM d, yyyy')}
                </h3>
                
                {selectedDateCashFlow && (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Projected Balance:</span>
                      <span className={cn(
                        "font-medium",
                        selectedDateCashFlow.projectedBalance < selectedDateCashFlow.safeThreshold 
                          ? "text-red-600" 
                          : "text-gray-900"
                      )}>
                        {formatCurrency(selectedDateCashFlow.projectedBalance)}
                        {selectedDateCashFlow.projectedBalance < selectedDateCashFlow.safeThreshold && (
                          <span className="ml-2 text-xs text-red-600">
                            Below safe threshold ({formatCurrency(selectedDateCashFlow.safeThreshold)})
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Income:</span>
                      <span className="font-medium text-green-600">
                        +{formatCurrency(selectedDateCashFlow.income)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Expenses:</span>
                      <span className="font-medium text-red-600">
                        -{formatCurrency(selectedDateCashFlow.expenses)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Net:</span>
                      <span className={cn(
                        "font-medium",
                        selectedDateCashFlow.netFlow >= 0 ? "text-green-600" : "text-red-600"
                      )}>
                        {selectedDateCashFlow.netFlow >= 0 ? "+" : ""}
                        {formatCurrency(selectedDateCashFlow.netFlow)}
                      </span>
                    </div>
                  </div>
                )}
                
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Financial Events</h4>
                  {eventsOnSelectedDate.length > 0 ? (
                    <ul className="space-y-2">
                      {eventsOnSelectedDate.map((event, index) => (
                        <li key={index} className="text-sm border-l-2 border-blue-500 pl-2">
                          <div className="font-medium">{event.title}</div>
                          <div className="text-xs text-gray-600">{event.type}</div>
                          <div className={cn(
                            "font-medium",
                            event.amount >= 0 ? "text-green-600" : "text-red-600"
                          )}>
                            {event.amount >= 0 ? "+" : ""}
                            {formatCurrency(event.amount)}
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">No financial events on this date</p>
                  )}
                </div>
              </>
            )}
            
            {warningDates.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium flex items-center gap-1 text-red-600">
                  <TrendingDown className="h-4 w-4" /> Cash Flow Warnings
                </h4>
                <ul className="mt-2 space-y-2">
                  {warningDates.slice(0, 3).map((dateString, index) => (
                    <li key={index} className="text-sm flex justify-between">
                      <span>{format(new Date(dateString), 'MMM d, yyyy')}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 px-2"
                        onClick={() => setDate(new Date(dateString))}
                      >
                        View
                      </Button>
                    </li>
                  ))}
                  {warningDates.length > 3 && (
                    <li className="text-sm text-gray-500">
                      +{warningDates.length - 3} more warnings
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 rounded-lg border bg-gradient-to-r from-blue-50 to-indigo-50 p-6 shadow-md space-y-4">
          <h3 className="text-xl font-semibold mb-2 text-indigo-700">Data Integrations</h3>
          <p className="text-sm text-gray-700">
            Sync your financial data automatically for more accurate forecasting by connecting to your business tools.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-white p-4 rounded-lg border border-indigo-100 shadow-sm hover:shadow-md transition-all">
              <Store className="h-6 w-6 text-indigo-600 mb-2" />
              <h4 className="font-medium mb-1">Point-of-Sale Systems</h4>
              <p className="text-xs text-gray-600 mb-3">Import daily sales and inventory data from your POS system.</p>
              <Button 
                variant="outline" 
                className="w-full border-indigo-200 hover:bg-indigo-50"
                onClick={() => handleConnectService('POS')}
              >
                Connect POS
              </Button>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-indigo-100 shadow-sm hover:shadow-md transition-all">
              <CreditCard className="h-6 w-6 text-indigo-600 mb-2" />
              <h4 className="font-medium mb-1">E-Commerce Platforms</h4>
              <p className="text-xs text-gray-600 mb-3">Sync online store transactions and customer data automatically.</p>
              <Button 
                variant="outline" 
                className="w-full border-indigo-200 hover:bg-indigo-50"
                onClick={() => handleConnectService('E-Commerce')}
              >
                Connect E-Commerce
              </Button>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-indigo-100 shadow-sm hover:shadow-md transition-all">
              <FileInvoice className="h-6 w-6 text-indigo-600 mb-2" />
              <h4 className="font-medium mb-1">Invoicing Software</h4>
              <p className="text-xs text-gray-600 mb-3">Track pending payments and invoice status from your billing system.</p>
              <Button 
                variant="outline" 
                className="w-full border-indigo-200 hover:bg-indigo-50"
                onClick={() => handleConnectService('Invoicing')}
              >
                Connect Invoicing
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-4 pt-2 border-t border-indigo-100">
            <p className="text-xs text-gray-500">
              Demo feature. Connect Supabase to enable real integrations with your business tools.
            </p>
            <Button variant="link" size="sm" className="text-indigo-600 p-0 h-auto" onClick={() => toast.info("API documentation would appear here in a production environment.")}>
              <Link className="h-4 w-4 mr-1" />
              API Docs
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
