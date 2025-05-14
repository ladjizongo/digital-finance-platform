
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { FileSpreadsheet, FileText, Sparkles } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface CreditDocumentUploadProps {
  applicationType?: string;
}

const CreditDocumentUpload = ({ applicationType = "overdraft" }: CreditDocumentUploadProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  
  const getRequiredDocuments = () => {
    const common = [
      "Business Plan",
      "Financial Statements (Last 2 years)",
      "Business Banking Statements (Last 6 months)"
    ];
    
    switch (applicationType) {
      case "overdraft":
        return [...common, "Overdraft Agreement Form"];
      case "lineOfCredit":
        return [...common, "Cash Flow Projections", "Accounts Receivable Aging Report"];
      case "termLoan":
        return [...common, "Asset List", "Existing Loan Statements", "Purchase Agreements"];
      case "csbfl":
        return [
          ...common, 
          "CSBFL Application Form", 
          "Purchase Invoices or Estimates",
          "Proof of Canadian Citizenship or Permanent Residency",
          "Business Registration Documents"
        ];
      default:
        return common;
    }
  };
  
  const getTitleByType = () => {
    switch (applicationType) {
      case "overdraft": return "Overdraft Application";
      case "lineOfCredit": return "Line of Credit Application";
      case "termLoan": return "Term Loan Application";
      case "csbfl": return "CSBFL Application";
      default: return "Credit Application";
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...newFiles]);
    }
  };
  
  const handleUpload = () => {
    if (selectedFiles.length === 0) {
      toast.error("Please select files to upload");
      return;
    }
    
    setIsUploading(true);
    
    // Simulate upload
    setTimeout(() => {
      toast.success("Documents uploaded successfully", {
        description: `${selectedFiles.length} documents have been uploaded for your ${getTitleByType()}`
      });
      setSelectedFiles([]);
      setIsUploading(false);
    }, 2000);
  };
  
  const handleRemoveFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="mb-4">
            <CardTitle className="text-lg">{getTitleByType()} Documents</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Upload the following documents to complete your application
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {getRequiredDocuments().map((doc, index) => (
                <div key={index} className="border rounded-md p-4 bg-gray-50">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-4 w-4 text-indigo-600" />
                    <span className="text-sm font-medium">{doc}</span>
                  </div>
                  <p className="text-xs text-gray-500">Required</p>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col gap-4 mt-6">
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="text-sm file:mr-4 file:rounded-md file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-indigo-700"
                />
                <Button 
                  onClick={handleUpload} 
                  disabled={selectedFiles.length === 0 || isUploading}
                >
                  {isUploading ? "Uploading..." : "Upload"}
                </Button>
              </div>
              
              {selectedFiles.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Selected Files ({selectedFiles.length})</h4>
                  <div className="space-y-2">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                        <div className="flex items-center gap-2">
                          <FileSpreadsheet className="h-4 w-4 text-gray-600" />
                          <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                          <span className="text-xs text-gray-500">
                            ({(file.size / 1024).toFixed(0)} KB)
                          </span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleRemoveFile(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-indigo-600" />
            <CardTitle className="text-lg">AI-Powered Application Support</CardTitle>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-3">
                Our AI can analyze your financial documents and provide insights to strengthen your {getTitleByType().toLowerCase()}.
              </p>
              <Button variant="outline" className="w-full">Analyze My Documents</Button>
            </div>
            
            <div className="relative overflow-hidden rounded-md border">
              <AspectRatio ratio={16/9}>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white p-6">
                  <div className="text-center">
                    <h3 className="font-semibold mb-2">Pro Tip</h3>
                    <p className="text-sm">
                      {applicationType === "csbfl" 
                        ? "CSBFL loans offer favorable terms for small businesses with government backing."
                        : applicationType === "termLoan"
                        ? "Term loans are best for specific large purchases with fixed repayment schedules."
                        : applicationType === "lineOfCredit"
                        ? "Lines of credit provide flexible access to funds, only paying interest on what you use."
                        : "Overdraft protection ensures you can cover expenses even when cash flow is tight."}
                    </p>
                  </div>
                </div>
              </AspectRatio>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreditDocumentUpload;
