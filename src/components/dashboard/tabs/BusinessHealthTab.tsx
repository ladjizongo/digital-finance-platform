
import FinancialHealthCard from "@/components/FinancialHealthCard";
import { BusinessCreditScore } from "@/components/financial/BusinessCreditScore";
import { BusinessHealthHeader } from "@/components/financial/BusinessHealthHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { FileUp } from "lucide-react";
import { UploadSection } from "@/components/financial/UploadSection";
import { toast } from "sonner";
import { useFinancialMetrics } from "@/hooks/useFinancialMetrics";
import AnalysisResultsTabs from "@/components/financial/AnalysisResultsTabs";

const BusinessHealthTab = () => {
  const [activeSubTab, setActiveSubTab] = useState<string>("overview");
  const [file, setFile] = useState<File | null>(null);
  
  const {
    metrics,
    isLoading,
    isProcessing,
    processFinancials,
    handleYearChange,
    resetMetrics,
  } = useFinancialMetrics();

  const handleUpload = () => {
    if (file) {
      processFinancials();
      toast.success("Financial statement processed successfully");
    } else {
      toast.error("Please select a file to upload");
    }
  };

  return (
    <div className="space-y-8">
      <BusinessHealthHeader />
      
      <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="w-full">
        <TabsList className="w-full max-w-md mb-4">
          <TabsTrigger value="overview">Business Overview</TabsTrigger>
          <TabsTrigger value="externalData">External Data Sources</TabsTrigger>
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
              <CardTitle className="text-2xl font-bold text-indigo-800">External Data Sources</CardTitle>
              <CardDescription>
                Upload and analyze financial statements from external sources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UploadSection 
                file={file}
                setFile={setFile}
                isLoading={isProcessing}
                onUpload={handleUpload}
              />
            </CardContent>
          </Card>

          {metrics && (
            <AnalysisResultsTabs metrics={metrics} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BusinessHealthTab;
