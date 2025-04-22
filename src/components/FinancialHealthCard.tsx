
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadSection } from "./financial/UploadSection";
import { ManualEntryForm } from "./financial/ManualEntryForm";
import { CashFlowTable } from "./financial/CashFlowTable";
import { YearSelector } from "./financial/YearSelector";
import { MetricsGrid } from "./financial/MetricsGrid";
import { useFinancialMetrics } from "@/hooks/useFinancialMetrics";
import { financialFormSchema, type FinancialFormValues } from "@/schemas/financialFormSchema";

const FinancialHealthCard = () => {
  const [file, setFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<"upload" | "manual">("upload");
  const [activeAccount, setActiveAccount] = useState("1");
  
  const {
    metrics,
    isLoading,
    isProcessing,
    processFinancials,
    handleYearChange,
    handleManualSubmit
  } = useFinancialMetrics();

  const form = useForm<FinancialFormValues>({
    resolver: zodResolver(financialFormSchema),
    defaultValues: {
      year: new Date().getFullYear().toString(),
      currentAssets: 0,
      longTermAssets: 0,
      currentLiabilities: 0,
      longTermLiabilities: 0,
      revenue: 0,
      expenses: 0,
      payableDays: 0,
      receivableDays: 0,
      biWeeklyPayroll: 0,
      notes: "",
      monthlyPayables: 0,
      monthlyReceivables: 0,
    },
  });

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
              Analyze your business health by uploading statements or entering data manually
            </CardDescription>
            
            <Tabs defaultValue="upload" value={activeTab} onValueChange={(value) => setActiveTab(value as "upload" | "manual")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upload">Upload Statements</TabsTrigger>
                <TabsTrigger value="manual">Enter Manually</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upload" className="space-y-4 mt-4">
                <UploadSection 
                  file={file}
                  setFile={setFile}
                  isLoading={isProcessing}
                  onUpload={handleUpload}
                />
              </TabsContent>
              
              <TabsContent value="manual" className="space-y-4 mt-4">
                <ManualEntryForm form={form} isLoading={isProcessing} onSubmit={handleManualSubmit} />
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="space-y-6">
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

