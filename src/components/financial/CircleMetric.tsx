
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
  const isWarning = compareValue !== undefined && value > compareValue;
  
  // Calculate circle color based on value
  const getCircleColorClasses = () => {
    if (customValueClass?.includes('text-red-600')) {
      return "border-red-500 bg-red-50";
    } else if (customValueClass?.includes('text-amber-600')) {
      return "border-amber-500 bg-amber-50";
    } else {
      return "border-green-500 bg-green-50";
    }
  };
  
  return (
    <div className="flex flex-col items-center gap-2">
      <div 
        className={cn(
          "w-24 h-24 rounded-full flex items-center justify-center border-4",
          customValueClass ? getCircleColorClasses() : (isWarning ? "border-red-500 bg-red-50" : "border-green-500 bg-green-50"),
          "transition-colors duration-200"
        )}
      >
        <span className={cn("text-2xl font-bold", customValueClass)}>
          {value}
        </span>
      </div>
      <span className="text-sm font-medium text-muted-foreground">{title}</span>
    </div>
  );
};
