import { MetricCard } from "./MetricCard";
import { YearlyMetrics } from "@/types/financial";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricsGridProps {
  data: YearlyMetrics;
}

export const MetricsGrid = ({ data }: MetricsGridProps) => {
  const getPayableDaysColorClass = (days: number) => {
    if (days >= 30) return "text-red-600";
    if (days >= 20 && days <= 29) return "text-amber-600";
    return "text-green-600";
  };

  const getReceivableDaysRiskMessage = (receivableDays: number, payableDays: number) => {
    if (receivableDays > payableDays) {
      return (
        <div className="flex items-center justify-center gap-2 text-red-600">
          <AlertCircle className="h-5 w-5" />
          <span>High risk of cash flow issues (receivables &gt; payables)</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-center gap-2 text-green-600">
          <span>Healthy cash flow</span>
        </div>
      );
    }
  };

  const getReceivableDaysColorClass = (receivableDays: number, payableDays: number) => {
    if (receivableDays > payableDays) return "text-red-600";
    return "text-green-600";
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
      <MetricCard
        title="Payable Days"
        value={data.payableDays}
        unit="days"
        warningThreshold={20}
        warningMessage={
          <div className={cn(
            "flex items-center justify-center gap-2",
            getPayableDaysColorClass(data.payableDays)
          )}>
            <AlertCircle className="h-5 w-5" />
            <span>
              {data.payableDays >= 30 
                ? "High risk (30+ days)" 
                : data.payableDays >= 20 
                  ? "Medium risk (20-29 days)" 
                  : "Healthy range"}
            </span>
          </div>
        }
        successMessage="Within healthy range"
        isCircleDisplay
        compareValue={data.receivableDays}
        customValueClass={getPayableDaysColorClass(data.payableDays)}
      />
      <MetricCard
        title="Receivable Days"
        value={data.receivableDays}
        unit="days"
        warningThreshold={45}
        warningMessage={getReceivableDaysRiskMessage(data.receivableDays, data.payableDays)}
        successMessage="Healthy cash flow"
        isCircleDisplay
        compareValue={data.payableDays}
        customValueClass={getReceivableDaysColorClass(data.receivableDays, data.payableDays)}
      />
      <MetricCard
        title="Monthly Average Payables"
        value={data.monthlyPayables}
        description="Monthly average payables amount"
      />
      <MetricCard
        title="Monthly Average Receivables"
        value={data.monthlyReceivables}
        description="Monthly average receivables amount"
      />
      <MetricCard
        title="Monthly Payroll Average"
        value={data.monthlyPayroll}
        description="Based on bi-weekly payroll"
      />
    </div>
  );
};
