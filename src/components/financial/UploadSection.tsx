
import { FileUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface UploadSectionProps {
  file: File | null;
  setFile: (file: File | null) => void;
  isLoading: boolean;
  onUpload: () => void;
}

export const UploadSection = ({ file, setFile, isLoading, onUpload }: UploadSectionProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <label htmlFor="financial-upload" className="text-sm font-medium">
            Upload financial statements (PDF, CSV, XLSX)
          </label>
          <input
            id="financial-upload"
            type="file"
            className="text-sm file:mr-4 file:rounded-md file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-indigo-700"
            onChange={handleFileChange}
            accept=".csv,.xlsx,.xls,.pdf"
          />
        </div>
        <Button 
          onClick={onUpload} 
          disabled={!file || isLoading}
        >
          {isLoading ? "Processing..." : "Analyze"}
          {!isLoading && <FileUp className="ml-2 h-4 w-4" />}
        </Button>
      </div>
      {file && (
        <p className="text-sm text-muted-foreground">
          Selected file: {file.name}
        </p>
      )}
      <div className="text-sm text-muted-foreground mt-2">
        <p>Supported statement types:</p>
        <ul className="list-disc pl-5 mt-1">
          <li>Balance Sheet</li>
          <li>Income Statement</li>
          <li>Cash Flow Statement</li>
          <li>Accounts Payable Aging</li>
          <li>Accounts Receivable Aging</li>
          <li>Payroll Reports</li>
        </ul>
      </div>
    </div>
  );
};
