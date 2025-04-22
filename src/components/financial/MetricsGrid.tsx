
import { MetricCard } from "./MetricCard";
import { YearlyMetrics } from "@/types/financial";
import { AlertCircle } from "lucide-react";

interface MetricsGridProps {
  data: YearlyMetrics;
}

export const MetricsGrid = ({ data }: MetricsGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
      <MetricCard
        title="Payable Days"
        value={data.payableDays}
        unit="days"
        warningThreshold={30}
        warningMessage="Above recommended 30 days"
        successMessage="Within healthy range"
        isCircleDisplay
        compareValue={data.receivableDays}
      />
      <MetricCard
        title="Receivable Days"
        value={data.receivableDays}
        unit="days"
        warningThreshold={45}
        warningMessage={
          <div className="flex items-center justify-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <span>Receivables are greater than payables</span>
          </div>
        }
        successMessage="Healthy cash flow"
        isCircleDisplay
        compareValue={data.payableDays}
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

