
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileUp } from "lucide-react";
import { UploadSection } from "@/components/financial/UploadSection";
import { toast } from "sonner";
import { useFinancialMetrics } from "@/hooks/useFinancialMetrics";
import AnalysisResultsTabs from "@/components/financial/AnalysisResultsTabs";

const ExternalDataSourcesTab = () => {
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
    </div>
  );
};

export default ExternalDataSourcesTab;
