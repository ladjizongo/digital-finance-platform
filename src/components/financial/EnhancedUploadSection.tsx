
import { FileUp, FileText, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { DocumentParser } from "./DocumentParser";

interface EnhancedUploadSectionProps {
  file: File | null;
  setFile: (file: File | null) => void;
  isLoading: boolean;
  onUpload: () => void;
  onParseComplete?: (data: any) => void;
}

export const EnhancedUploadSection = ({ 
  file, 
  setFile, 
  isLoading, 
  onUpload,
  onParseComplete 
}: EnhancedUploadSectionProps) => {
  const [error, setError] = useState<string | null>(null);
  const [showParser, setShowParser] = useState(false);
  
  const validateFile = (file: File): boolean => {
    // Check file size (max 25MB for documents)
    const maxSizeInBytes = 25 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      setError(`File is too large. Maximum size is 25MB.`);
      return false;
    }
    
    // Enhanced file type validation
    const allowedTypes = [
      'application/pdf', 
      'text/csv', 
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 
      'application/vnd.ms-excel',
      'text/plain',
      'application/json'
    ];
    const fileType = file.type;
    
    if (!allowedTypes.includes(fileType)) {
      setError(`Invalid file type. Only PDF, CSV, Excel, TXT, and JSON files are allowed.`);
      return false;
    }
    
    setError(null);
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
        setShowParser(true);
        toast.success(`${selectedFile.name} selected for analysis`);
      } else {
        e.target.value = '';
        setFile(null);
        setShowParser(false);
      }
    }
  };

  const handleParseComplete = (data: any) => {
    if (onParseComplete) {
      onParseComplete(data);
    }
    toast.success("Document analysis complete! Data extracted successfully.");
  };

  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith('.pdf')) return <FileText className="h-4 w-4" />;
    if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls') || fileName.endsWith('.csv')) {
      return <FileSpreadsheet className="h-4 w-4" />;
    }
    return <FileUp className="h-4 w-4" />;
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <label htmlFor="financial-upload" className="text-sm font-medium">
            Upload Financial Documents (PDF, CSV, Excel, TXT, JSON)
          </label>
          <input
            id="financial-upload"
            type="file"
            className="text-sm file:mr-4 file:rounded-md file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-indigo-700"
            onChange={handleFileChange}
            accept=".csv,.xlsx,.xls,.pdf,.txt,.json"
          />
          {error && (
            <p className="text-sm text-red-500 mt-1">{error}</p>
          )}
        </div>
        <Button 
          onClick={onUpload} 
          disabled={!file || isLoading || !!error || !showParser}
        >
          {isLoading ? "Processing..." : "Analyze & Upload"}
          {!isLoading && <FileUp className="ml-2 h-4 w-4" />}
        </Button>
      </div>
      
      {file && !error && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {getFileIcon(file.name)}
          <span>
            Selected file: {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
          </span>
        </div>
      )}

      {file && showParser && !error && (
        <DocumentParser 
          file={file} 
          onParseComplete={handleParseComplete}
        />
      )}
      
      <div className="text-sm text-muted-foreground mt-2">
        <p>Enhanced document analysis supports:</p>
        <ul className="list-disc pl-5 mt-1">
          <li>Income Statements & P&L Reports</li>
          <li>Balance Sheets</li>
          <li>Cash Flow Statements</li>
          <li>Accounts Payable/Receivable Aging</li>
          <li>Payroll Reports</li>
          <li>Business Plans & Financial Projections</li>
        </ul>
      </div>
    </div>
  );
};
