
import { FileUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";

interface UploadSectionProps {
  file: File | null;
  setFile: (file: File | null) => void;
  isLoading: boolean;
  onUpload: () => void;
}

export const UploadSection = ({ file, setFile, isLoading, onUpload }: UploadSectionProps) => {
  const [error, setError] = useState<string | null>(null);
  
  const validateFile = (file: File): boolean => {
    // Check file size (max 10MB)
    const maxSizeInBytes = 10 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      setError(`File is too large. Maximum size is 10MB.`);
      return false;
    }
    
    // Check file type
    const allowedTypes = [
      'application/pdf', 
      'text/csv', 
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 
      'application/vnd.ms-excel'
    ];
    const fileType = file.type;
    
    if (!allowedTypes.includes(fileType)) {
      setError(`Invalid file type. Only PDF, CSV, and Excel files are allowed.`);
      return false;
    }
    
    // File passed validation
    setError(null);
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
      } else {
        // Reset file input
        e.target.value = '';
        setFile(null);
      }
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
          {error && (
            <p className="text-sm text-red-500 mt-1">{error}</p>
          )}
        </div>
        <Button 
          onClick={onUpload} 
          disabled={!file || isLoading || !!error}
        >
          {isLoading ? "Processing..." : "Analyze"}
          {!isLoading && <FileUp className="ml-2 h-4 w-4" />}
        </Button>
      </div>
      {file && !error && (
        <p className="text-sm text-muted-foreground">
          Selected file: {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
        </p>
      )}
      <div className="text-sm text-muted-foreground mt-2">
        <p>Supported statement types:</p>
        <ul className="list-disc pl-5 mt-1">
          <li>Accounts Payable Aging</li>
          <li>Accounts Receivable Aging</li>
          <li>Payroll Reports</li>
          <li>Business Plan</li>
        </ul>
      </div>
    </div>
  );
};
