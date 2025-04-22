
import { MetricCardProps } from "@/types/financial";
import { CircleMetric } from "./CircleMetric";

export const MetricCard = ({ 
  title, 
  value, 
  unit = "", 
  description,
  warningThreshold,
  warningMessage,
  successMessage,
  isCircleDisplay = false,
  compareValue
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
        />
        {(warningMessage || successMessage) && (
          <div className={`mt-3 text-xs text-center ${isWarning ? 'text-red-600' : 'text-green-600'}`}>
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
        <div className="text-2xl font-semibold">{value}</div>
        {unit && <div className="ml-1 text-xs text-muted-foreground">{unit}</div>}
      </div>
      {description && (
        <div className="mt-1 text-xs text-muted-foreground">{description}</div>
      )}
      {(warningMessage || successMessage) && (
        <div className={`mt-1 text-xs ${isWarning ? 'text-red-600' : 'text-green-600'}`}>
          {isWarning ? warningMessage : successMessage}
        </div>
      )}
    </div>
  );
};

