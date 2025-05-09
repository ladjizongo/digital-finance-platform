
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface WireTransferTypeProps {
  value: string;
  onChange: (value: string) => void;
}

export const WireTransferType = ({ value, onChange }: WireTransferTypeProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="wireTransferType">Transfer Type</Label>
      <Select 
        defaultValue={value}
        onValueChange={onChange}
      >
        <SelectTrigger id="wireTransferType">
          <SelectValue placeholder="Select transfer type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="domestic">Domestic Wire</SelectItem>
          <SelectItem value="international">International Wire</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
