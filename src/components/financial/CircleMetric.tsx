
import { cn } from "@/lib/utils";

interface CircleMetricProps {
  value: number;
  title: string;
  warningThreshold?: number;
  compareValue?: number;
}

export const CircleMetric = ({ 
  value, 
  title, 
  warningThreshold,
  compareValue 
}: CircleMetricProps) => {
  const isWarning = compareValue !== undefined && value > compareValue;
  
  return (
    <div className="flex flex-col items-center gap-2">
      <div 
        className={cn(
          "w-24 h-24 rounded-full flex items-center justify-center border-4",
          isWarning ? "border-red-500 bg-red-50" : "border-green-500 bg-green-50",
          "transition-colors duration-200"
        )}
      >
        <span className="text-2xl font-bold">
          {value}
        </span>
      </div>
      <span className="text-sm font-medium text-muted-foreground">{title}</span>
    </div>
  );
};
