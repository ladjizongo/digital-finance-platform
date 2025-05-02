
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart } from "lucide-react";
import { toast } from "sonner";
import { UploadSection } from "./financial/UploadSection";
import { YearSelector } from "./financial/YearSelector";
import { MetricsGrid } from "./financial/MetricsGrid";
import { CashFlowTable } from "./financial/CashFlowTable";
import { useFinancialMetrics } from "@/hooks/useFinancialMetrics";
import { BusinessHealthScore } from "./financial/BusinessHealthScore";

const FinancialHealthCard = () => {
  const [file, setFile] = useState<File | null>(null);
  const [activeAccount, setActiveAccount] = useState("1");
  
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
    } else {
      toast.error("Please select a file to upload");
    }
  };

  const handleReset = () => {
    resetMetrics();
  };
  
  const getCurrentYearData = () => {
    if (!metrics || !metrics.yearlyData) return null;
    const selectedYear = metrics.selectedYear || metrics.yearlyData[0]?.year;
    return metrics.yearlyData.find(data => data.year === selectedYear) || metrics.yearlyData[0];
  };
  
  const currentYearData = getCurrentYearData();

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Business Health</CardTitle>
        <BarChart className="h-5 w-5 text-indigo-600" />
      </CardHeader>
      <CardContent>
        {!metrics ? (
          <div className="space-y-4">
            <CardDescription>
              Analyze your business health by uploading financial statements
            </CardDescription>
            
            <UploadSection 
              file={file}
              setFile={setFile}
              isLoading={isProcessing}
              onUpload={handleUpload}
            />
          </div>
        ) : (
          <div className="space-y-6">
            <BusinessHealthScore metrics={metrics} />

            <div className="space-y-4">
              <YearSelector
                yearlyData={metrics.yearlyData}
                selectedYear={metrics.selectedYear}
                onYearChange={handleYearChange}
              />
              
              {currentYearData && (
                <MetricsGrid data={currentYearData} />
              )}

              {metrics && (
                <div className="space-y-4">
                  <CashFlowTable data={metrics.cashFlow} accountId={activeAccount} />
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2">
        {metrics && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleReset}
          >
            Reset
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default FinancialHealthCard;
