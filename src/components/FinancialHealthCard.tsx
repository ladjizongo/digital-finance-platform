
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UploadSection } from "./financial/UploadSection";
import { YearSelector } from "./financial/YearSelector";
import { MetricsGrid } from "./financial/MetricsGrid";
import { CashFlowTable } from "./financial/CashFlowTable";
import { useFinancialMetrics } from "@/hooks/useFinancialMetrics";
import { BusinessHealthScore } from "./financial/BusinessHealthScore";
import { CashFlowForecast } from "./financial/CashFlowForecast";

const FinancialHealthCard = () => {
  const [file, setFile] = useState<File | null>(null);
  const [activeAccount, setActiveAccount] = useState("1");
  const [activeTab, setActiveTab] = useState("current");
  
  const {
    metrics,
    isLoading,
    isProcessing,
    processFinancials,
    handleYearChange,
  } = useFinancialMetrics();

  const handleUpload = () => {
    if (file) {
      processFinancials();
    } else {
      toast.error("Please select a file to upload");
    }
  };

  const handleReset = () => {
    localStorage.removeItem('financialMetrics');
    window.location.reload();
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
            {/* Business health score section */}
            <BusinessHealthScore metrics={metrics} />

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="current">Current Metrics</TabsTrigger>
                <TabsTrigger value="forecast">Cash Flow Forecast</TabsTrigger>
              </TabsList>
              
              <TabsContent value="current" className="space-y-4">
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
              </TabsContent>
              
              <TabsContent value="forecast">
                <CashFlowForecast metrics={metrics} />
              </TabsContent>
            </Tabs>
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
