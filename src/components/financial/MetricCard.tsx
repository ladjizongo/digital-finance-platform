
import { MetricCardProps } from "@/types/financial";
import { CircleMetric } from "./CircleMetric";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export const MetricCard = ({ 
  title, 
  value, 
  unit = "", 
  description,
  warningThreshold,
  warningMessage,
  successMessage,
  isCircleDisplay = false,
  compareValue,
  showUtilization = false,
  utilizationValue,
  utilizationLabel,
  customValueClass
}: MetricCardProps) => {
  const isWarning = warningThreshold !== undefined && value > warningThreshold;

  if (isCircleDisplay) {
    return (
      <div className="rounded-lg border p-3">
        <CircleMetric
          value={value}
          title={title}
          warningThreshold={warningThreshold}
          compareValue={compareValue}
          customValueClass={customValueClass}
        />
        {(warningMessage || successMessage) && (
          <div className={`mt-3 text-xs text-center ${isWarning ? '' : 'text-green-600'}`}>
            {isWarning ? warningMessage : successMessage}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-lg border p-3">
      <div className="text-sm font-medium text-muted-foreground">{title}</div>
      <div className="mt-1 flex items-baseline">
        <div className={cn("text-2xl font-semibold", customValueClass)}>{value}</div>
        {unit && <div className="ml-1 text-xs text-muted-foreground">{unit}</div>}
      </div>
      {description && (
        <div className="mt-1 text-xs text-muted-foreground">{description}</div>
      )}
      {showUtilization && utilizationValue !== undefined && (
        <div className="mt-3 space-y-1">
          <div className="flex justify-between items-center text-xs">
            <span>{utilizationLabel || "Utilization"}</span>
            <span className={cn(
              "font-medium",
              utilizationValue > 75 ? "text-red-600" : 
              utilizationValue > 50 ? "text-amber-600" : "text-green-600"
            )}>
              {utilizationValue}%
            </span>
          </div>
          <Progress 
            value={utilizationValue} 
            className={cn(
              "h-1.5",
              utilizationValue > 75 ? "bg-red-200" : 
              utilizationValue > 50 ? "bg-amber-200" : "bg-green-200"
            )}
            indicatorClassName={cn(
              utilizationValue > 75 ? "bg-red-600" : 
              utilizationValue > 50 ? "bg-amber-600" : "bg-green-600"
            )}
          />
        </div>
      )}
      {(warningMessage || successMessage) && !showUtilization && (
        <div className={`mt-1 text-xs ${isWarning ? '' : 'text-green-600'}`}>
          {isWarning ? warningMessage : successMessage}
        </div>
      )}
    </div>
  );
};
