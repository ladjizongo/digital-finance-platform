
import { MetricCardProps } from "@/types/financial";

export const MetricCard = ({ 
  title, 
  value, 
  unit = "", 
  description, 
  warningThreshold,
  warningMessage,
  successMessage
}: MetricCardProps) => {
  const isWarning = warningThreshold !== undefined && value > warningThreshold;

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
        <div className={`mt-1 text-xs ${isWarning ? 'text-amber-600' : 'text-green-600'}`}>
          {isWarning ? warningMessage : successMessage}
        </div>
      )}
    </div>
  );
};
