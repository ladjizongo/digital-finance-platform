
import FinancialHealthCard from "@/components/FinancialHealthCard";
import { BusinessCreditScore } from "@/components/financial/BusinessCreditScore";
import { BusinessHealthHeader } from "@/components/financial/BusinessHealthHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { FileUp } from "lucide-react";
import { EnhancedUploadSection } from "@/components/financial/EnhancedUploadSection";
import { toast } from "sonner";
import { useFinancialMetrics } from "@/hooks/useFinancialMetrics";
import AnalysisResultsTabs from "@/components/financial/AnalysisResultsTabs";

const BusinessHealthTab = () => {
  const [activeSubTab, setActiveSubTab] = useState<string>("overview");
  const [file, setFile] = useState<File | null>(null);
  const [parsedDocumentData, setParsedDocumentData] = useState<any>(null);
  
  const {
    metrics,
    isLoading,
    isProcessing,
    processFinancials,
    handleYearChange,
    resetMetrics,
  } = useFinancialMetrics();

  const handleUpload = () => {
    if (file && parsedDocumentData) {
      processFinancials();
      toast.success("Financial document processed and analyzed successfully");
    } else if (file && !parsedDocumentData) {
      toast.error("Please analyze the document first before uploading");
    } else {
      toast.error("Please select a file to upload");
    }
  };

  const handleParseComplete = (data: any) => {
    setParsedDocumentData(data);
    console.log("Document parsed:", data);
  };

  return (
    <div className="space-y-8">
      <BusinessHealthHeader />
      
      <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="w-full">
        <TabsList className="w-full max-w-md mb-4">
          <TabsTrigger value="overview">Business Overview</TabsTrigger>
          <TabsTrigger value="externalData">Document Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BusinessCreditScore />
            <FinancialHealthCard />
          </div>
        </TabsContent>
        
        <TabsContent value="externalData" className="space-y-6">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-indigo-800">Enhanced Document Analysis</CardTitle>
              <CardDescription>
                Upload and analyze financial statements with advanced document parsing and AI-powered insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EnhancedUploadSection 
                file={file}
                setFile={setFile}
                isLoading={isProcessing}
                onUpload={handleUpload}
                onParseComplete={handleParseComplete}
              />
            </CardContent>
          </Card>

          {parsedDocumentData && (
            <Card>
              <CardHeader>
                <CardTitle>Extracted Financial Data</CardTitle>
                <CardDescription>
                  Key metrics extracted from {file?.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(parsedDocumentData).map(([key, value]) => {
                    if (typeof value === 'number' && key !== 'confidence') {
                      return (
                        <div key={key} className="p-4 border rounded-lg">
                          <div className="text-sm font-medium text-muted-foreground capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                          <div className="text-2xl font-bold">
                            ${value.toLocaleString()}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {metrics && (
            <AnalysisResultsTabs metrics={metrics} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BusinessHealthTab;
