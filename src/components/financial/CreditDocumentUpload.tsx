
import { useState, useEffect } from "react";
import { FileUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  year: string;
  documentType: string;
}

const DOCUMENT_TYPES = {
  FINANCIAL_STATEMENT: "Financial Statement",
  PERSONAL_NOTICE_OF_ASSESSMENT: "Personal Notice of Assessment"
};

// Updated to show consecutive years in format YYYY-YYYY for Financial Statement
const YEAR_RANGES = ["2024-2025", "2023-2024", "2022-2023"];

// Years in YYYY format for Personal Notice of Assessment
const ASSESSMENT_YEARS = ["2024", "2023", "2022"];

const CreditDocumentUpload = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");

  useEffect(() => {
    const savedFiles = localStorage.getItem('uploadedCreditDocs');
    if (savedFiles) {
      setFiles(JSON.parse(savedFiles));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('uploadedCreditDocs', JSON.stringify(files));
  }, [files]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length || !selectedDocType || !selectedYear) {
      toast.error("Please select document type and year before uploading");
      return;
    }
    
    setIsUploading(true);
    const newFiles: UploadedFile[] = [];
    
    for (const file of Array.from(event.target.files)) {
      const fileId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      newFiles.push({
        id: fileId,
        name: file.name,
        type: file.type,
        year: selectedYear,
        documentType: selectedDocType
      });
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setFiles(prev => [...prev, ...newFiles]);
    setIsUploading(false);
    toast.success("Documents uploaded successfully");
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => {
      const updatedFiles = prev.filter(file => file.id !== fileId);
      localStorage.setItem('uploadedCreditDocs', JSON.stringify(updatedFiles));
      return updatedFiles;
    });
    toast.success("Document removed");
  };

  const isDocumentUploaded = (docType: string, year: string) => {
    return files.some(file => file.documentType === docType && file.year === year);
  };

  const isSubmitReady = () => {
    // For Financial Statements, we need at least one for any YEAR_RANGES
    const hasFinancialStatement = YEAR_RANGES.some(year => 
      files.some(file => file.documentType === DOCUMENT_TYPES.FINANCIAL_STATEMENT && file.year === year)
    );
    
    // For Personal Notice of Assessment, we need at least one for any ASSESSMENT_YEARS
    const hasNoticeOfAssessment = ASSESSMENT_YEARS.some(year => 
      files.some(file => file.documentType === DOCUMENT_TYPES.PERSONAL_NOTICE_OF_ASSESSMENT && file.year === year)
    );
    
    return hasFinancialStatement && hasNoticeOfAssessment;
  };

  const handleSubmit = () => {
    if (!isSubmitReady()) {
      toast.error("Please upload at least one document for each type before submitting");
      return;
    }

    toast.success("Documents submitted successfully!");
    
    setFiles([]);
    localStorage.removeItem('uploadedCreditDocs');
  };

  const getYearOptions = () => {
    if (selectedDocType === DOCUMENT_TYPES.PERSONAL_NOTICE_OF_ASSESSMENT) {
      return ASSESSMENT_YEARS;
    }
    return YEAR_RANGES;
  };

  const getYearLabel = () => {
    if (selectedDocType === DOCUMENT_TYPES.PERSONAL_NOTICE_OF_ASSESSMENT) {
      return "Select Year";
    }
    return "Select Year Range";
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Credit Application Documents</CardTitle>
        <CardDescription>
          Upload your financial documents and tax assessments
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6">
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-700">Required Documents:</h4>
            <div className="grid gap-4 md:grid-cols-2">
              {/* Financial Statement Section */}
              <div className="space-y-2">
                <div className="font-medium text-sm text-gray-700">{DOCUMENT_TYPES.FINANCIAL_STATEMENT}</div>
                <div className="grid gap-2">
                  {YEAR_RANGES.map((year) => {
                    const isUploaded = isDocumentUploaded(DOCUMENT_TYPES.FINANCIAL_STATEMENT, year);
                    return (
                      <div key={`FINANCIAL_STATEMENT-${year}`} className="flex items-center space-x-2">
                        <Checkbox
                          id={`FINANCIAL_STATEMENT-${year}`}
                          checked={isUploaded}
                          disabled={true}
                        />
                        <label
                          htmlFor={`FINANCIAL_STATEMENT-${year}`}
                          className="text-sm text-gray-600"
                        >
                          {year}
                          {isUploaded && " ✓"}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Personal Notice of Assessment Section */}
              <div className="space-y-2">
                <div className="font-medium text-sm text-gray-700">{DOCUMENT_TYPES.PERSONAL_NOTICE_OF_ASSESSMENT}</div>
                <div className="grid gap-2">
                  {ASSESSMENT_YEARS.map((year) => {
                    const isUploaded = isDocumentUploaded(DOCUMENT_TYPES.PERSONAL_NOTICE_OF_ASSESSMENT, year);
                    return (
                      <div key={`PERSONAL_NOTICE_OF_ASSESSMENT-${year}`} className="flex items-center space-x-2">
                        <Checkbox
                          id={`PERSONAL_NOTICE_OF_ASSESSMENT-${year}`}
                          checked={isUploaded}
                          disabled={true}
                        />
                        <label
                          htmlFor={`PERSONAL_NOTICE_OF_ASSESSMENT-${year}`}
                          className="text-sm text-gray-600"
                        >
                          {year}
                          {isUploaded && " ✓"}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Upload Document
              </label>
              <div className="grid gap-4 md:grid-cols-3">
                <select
                  className="rounded-md border border-gray-300 px-3 py-2 text-sm"
                  value={selectedDocType}
                  onChange={(e) => {
                    setSelectedDocType(e.target.value);
                    setSelectedYear("");
                  }}
                >
                  <option value="">Select Document Type</option>
                  {Object.values(DOCUMENT_TYPES).map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <select
                  className="rounded-md border border-gray-300 px-3 py-2 text-sm"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  <option value="">{getYearLabel()}</option>
                  {getYearOptions().map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <div className="flex items-center gap-4">
                  <input
                    id="documentUpload"
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.xls,.xlsx"
                    onChange={handleFileUpload}
                    className="text-sm file:mr-4 file:rounded-md file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-indigo-700"
                    disabled={isUploading || !selectedDocType || !selectedYear}
                  />
                  {isUploading && (
                    <div className="text-sm text-gray-500">Uploading...</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {files.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700">Uploaded Documents:</h4>
              <div className="border rounded-lg divide-y">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-3 hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-3">
                      <FileUp className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">{file.name}</p>
                        <p className="text-xs text-gray-500">
                          {file.documentType} - {file.year}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(file.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end pt-4">
            <Button
              onClick={handleSubmit}
              disabled={!files.length || !isSubmitReady()}
              className="w-full sm:w-auto"
            >
              Submit Documents
              <FileUp className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreditDocumentUpload;
