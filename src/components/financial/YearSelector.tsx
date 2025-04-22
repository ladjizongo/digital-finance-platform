
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { YearlyMetrics } from "@/types/financial";

interface YearSelectorProps {
  yearlyData: YearlyMetrics[];
  selectedYear?: string;
  onYearChange: (year: string) => void;
}

export const YearSelector = ({ yearlyData, selectedYear, onYearChange }: YearSelectorProps) => {
  if (yearlyData.length <= 1) return null;
  
  return (
    <div className="flex justify-end">
      <Select 
        value={selectedYear} 
        onValueChange={onYearChange}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Select year" />
        </SelectTrigger>
        <SelectContent>
          {yearlyData.map(data => (
            <SelectItem key={data.year} value={data.year}>
              {data.year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

