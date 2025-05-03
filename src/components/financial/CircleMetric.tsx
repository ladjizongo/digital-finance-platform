
import { cn } from "@/lib/utils";

interface CircleMetricProps {
  value: number;
  title: string;
  warningThreshold?: number;
  compareValue?: number;
  customValueClass?: string;
}

export const CircleMetric = ({ 
  value, 
  title, 
  warningThreshold,
  compareValue,
  customValueClass
}: CircleMetricProps) => {
  // For receivable days, check if greater than payable days
  const isReceivableDays = title === "Receivable Days";
  const isGreaterThanPayableDays = isReceivableDays && compareValue !== undefined && value > compareValue;
  
  // Calculate the difference for risk levels
  const daysDifference = isReceivableDays && compareValue ? value - compareValue : 0;
  const isHighRisk = isReceivableDays && isGreaterThanPayableDays;
  const isMediumRisk = isReceivableDays && daysDifference >= 1 && daysDifference <= 10;
  
  // For payable days, check against its own thresholds
  const isPayableDays = title === "Payable Days";
  const isWarning = 
    (isPayableDays && compareValue !== undefined && value > compareValue) || 
    (isPayableDays && warningThreshold !== undefined && value > warningThreshold);
  
  // Calculate circle color based on value
  const getCircleColorClasses = () => {
    if (customValueClass?.includes('text-red-600') || isHighRisk) {
      return "border-red-500 bg-red-50";
    } else if (customValueClass?.includes('text-amber-600') || isMediumRisk) {
      return "border-amber-500 bg-amber-50";
    } else {
      return "border-green-500 bg-green-50";
    }
  };
  
  // Get the text color class for the value
  const getValueColorClass = () => {
    if (isReceivableDays) {
      if (isHighRisk) return "text-red-600";
      if (isMediumRisk) return "text-amber-600";
      return "text-green-600";
    }
    return customValueClass;
  };
  
  return (
    <div className="flex flex-col items-center gap-2">
      <div 
        className={cn(
          "w-24 h-24 rounded-full flex items-center justify-center border-4",
          getCircleColorClasses(),
          "transition-colors duration-200"
        )}
      >
        <span className={cn("text-2xl font-bold", getValueColorClass())}>
          {value}
        </span>
      </div>
      <span className="text-sm font-medium text-muted-foreground">{title}</span>
    </div>
  );
};
