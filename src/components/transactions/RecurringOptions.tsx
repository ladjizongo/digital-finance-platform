
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { CalendarClock } from "lucide-react";

interface RecurringOptionsProps {
  onRecurringChange?: (isRecurring: boolean) => void;
  onFrequencyChange?: (frequency: string) => void;
}

const RecurringOptions = ({ 
  onRecurringChange,
  onFrequencyChange 
}: RecurringOptionsProps) => {
  const [isRecurring, setIsRecurring] = useState(false);
  const [frequency, setFrequency] = useState("monthly");

  const handleRecurringChange = (checked: boolean) => {
    setIsRecurring(checked);
    if (onRecurringChange) onRecurringChange(checked);
  };

  const handleFrequencyChange = (value: string) => {
    setFrequency(value);
    if (onFrequencyChange) onFrequencyChange(value);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="makeRecurring" 
          checked={isRecurring}
          onCheckedChange={handleRecurringChange}
        />
        <Label htmlFor="makeRecurring" className="text-sm font-normal">
          Make this a recurring transaction
        </Label>
      </div>
      
      {isRecurring && (
        <div className="pl-6 space-y-4 border-l-2 border-gray-100">
          <div className="space-y-2">
            <Label htmlFor="frequency">Frequency</Label>
            <Select 
              value={frequency} 
              onValueChange={handleFrequencyChange}
            >
              <SelectTrigger id="frequency" className="w-full">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="biweekly">Bi-Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="endDate">End Date (Optional)</Label>
            <div className="relative">
              <Input 
                id="endDate" 
                type="date" 
                min={new Date().toISOString().split('T')[0]} 
              />
              <CalendarClock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            <p className="text-xs text-gray-500">Leave blank for no end date</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecurringOptions;
