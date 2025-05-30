
import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import DocumentTypeCard from "./creditDocuments/DocumentTypeCard";
import DocumentUploadForm from "./creditDocuments/DocumentUploadForm"; 
import SelectedFilesList from "./creditDocuments/SelectedFilesList";
import { DocumentParser } from "./DocumentParser";
import { useFinancialMetrics } from "@/hooks/useFinancialMetrics";
import { 
  getRequiredDocuments, 
  getDocumentTypeOptions, 
  getTitleByType 
} from "./creditDocuments/documentUtils";

interface CreditDocumentUploadProps {
  applicationType?: string;
}

const CreditDocumentUpload = ({ applicationType = "overdraft" }: CreditDocumentUploadProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [parsedDocuments, setParsedDocuments] = useState<any[]>([]);
  
  const { processFinancials, handleManualSubmit } = useFinancialMetrics();
  
  const handleFileChange = (files: FileList) => {
    const newFiles = Array.from(files);
    setSelectedFiles(prev => [...prev, ...newFiles]);
  };
  
  const handleDocumentParse = (data: any, fileName: string) => {
    setParsedDocuments(prev => [...prev, { ...data, fileName }]);
    console.log("Document parsed for credit application:", data);
  };
  
  const handleUpload = () => {
    if (selectedFiles.length === 0) {
      toast.error("Please select files to upload");
      return;
    }
    
    setIsUploading(true);
    
    // Process financial data from parsed documents
    if (parsedDocuments.length > 0) {
      // Aggregate data from all parsed documents
      const aggregatedData = parsedDocuments.reduce((acc, doc) => {
        return {
          revenue: acc.revenue + (doc.revenue || 0),
          expenses: acc.expenses + (doc.expenses || 0),
          totalAssets: acc.totalAssets + (doc.totalAssets || 0),
          totalLiabilities: acc.totalLiabilities + (doc.totalLiabilities || 0),
          netIncome: acc.netIncome + (doc.netIncome || 0),
        };
      }, {
        revenue: 0,
        expenses: 0,
        totalAssets: 0,
        totalLiabilities: 0,
        netIncome: 0,
      });

      // Create financial form data structure
      const financialFormData = {
        year: "2024",
        payableDays: 28,
        receivableDays: 42,
        biWeeklyPayroll: 9200,
        monthlyPayables: 48000,
        monthlyReceivables: 55000,
        currentAssets: Math.floor(aggregatedData.totalAssets * 0.6), // Estimate 60% current assets
        longTermAssets: Math.floor(aggregatedData.totalAssets * 0.4),
        currentLiabilities: Math.floor(aggregatedData.totalLiabilities * 0.7), // Estimate 70% current liabilities
        longTermLiabilities: Math.floor(aggregatedData.totalLiabilities * 0.3),
        revenue: aggregatedData.revenue,
        expenses: aggregatedData.expenses,
      };

      // Submit to financial metrics system
      handleManualSubmit(financialFormData);
      
      toast.success("Documents uploaded and financial data processed", {
        description: `${selectedFiles.length} documents analyzed and integrated into business health metrics`
      });
    } else {
      toast.success("Documents uploaded successfully", {
        description: `${selectedFiles.length} documents have been uploaded for your ${getTitleByType(applicationType)}`
      });
    }
    
    setSelectedFiles([]);
    setParsedDocuments([]);
    setIsUploading(false);
  };
  
  const handleRemoveFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setParsedDocuments(prev => prev.filter((_, i) => i !== index));
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="mb-4">
            <CardTitle className="text-lg">{getTitleByType(applicationType)} Documents</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Upload financial documents to complete your application and analyze business health
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {getRequiredDocuments(applicationType).map((doc, index) => (
                <DocumentTypeCard key={index} documentName={doc} />
              ))}
            </div>
            
            <DocumentUploadForm 
              documentOptions={getDocumentTypeOptions(applicationType)}
              onFilesSelected={handleFileChange}
              onUpload={handleUpload}
              isUploading={isUploading}
              hasSelectedFiles={selectedFiles.length > 0}
            />
            
            <SelectedFilesList 
              files={selectedFiles}
              onRemoveFile={handleRemoveFile}
            />
            
            {/* Document Analysis Section */}
            {selectedFiles.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Document Analysis</h3>
                {selectedFiles.map((file, index) => (
                  <DocumentParser
                    key={index}
                    file={file}
                    onParseComplete={(data) => handleDocumentParse(data, file.name)}
                  />
                ))}
              </div>
            )}
            
            {/* Parsed Data Summary */}
            {parsedDocuments.length > 0 && (
              <Card className="mt-4">
                <CardContent className="pt-4">
                  <h4 className="font-semibold mb-3">Extracted Financial Data Summary</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {(() => {
                      const totals = parsedDocuments.reduce((acc, doc) => ({
                        revenue: acc.revenue + (doc.revenue || 0),
                        expenses: acc.expenses + (doc.expenses || 0),
                        totalAssets: acc.totalAssets + (doc.totalAssets || 0),
                        totalLiabilities: acc.totalLiabilities + (doc.totalLiabilities || 0),
                      }), { revenue: 0, expenses: 0, totalAssets: 0, totalLiabilities: 0 });
                      
                      return Object.entries(totals).map(([key, value]) => (
                        <div key={key} className="p-3 bg-blue-50 rounded-lg">
                          <div className="text-sm font-medium text-blue-800 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                          <div className="text-lg font-bold text-blue-900">
                            ${value.toLocaleString()}
                          </div>
                        </div>
                      ));
                    })()}
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">
                    This data will be automatically integrated into your business health analysis
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreditDocumentUpload;
