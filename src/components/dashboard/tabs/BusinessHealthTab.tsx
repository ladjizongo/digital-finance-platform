import FinancialHealthCard from "@/components/FinancialHealthCard";
import { BusinessCreditScore } from "@/components/financial/BusinessCreditScore";
import { BusinessHealthHeader } from "@/components/financial/BusinessHealthHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { FileUp } from "lucide-react";
import { EnhancedUploadSection } from "@/components/financial/EnhancedUploadSection";
import { FinancialAnalysisActions } from "@/components/financial/FinancialAnalysisActions";
import { toast } from "sonner";
import { useFinancialMetrics } from "@/hooks/useFinancialMetrics";
import AnalysisResultsTabs from "@/components/financial/AnalysisResultsTabs";
import { BusinessHealthScore } from "@/components/financial/BusinessHealthScore";
import AccountingSummary from "../AccountingSummary";
import { DocumentAnalysisSection } from "@/components/financial/DocumentAnalysisSection";
import { CreditAndHealthScoreGroup } from "@/components/financial/CreditAndHealthScoreGroup";
import { FinancialSummaryCards } from "@/components/financial/FinancialSummaryCards";
import FinancialMockApiPanel from "@/components/financial/FinancialMockApiPanel";

const BusinessHealthTab = () => {
  const [activeSubTab, setActiveSubTab] = useState<string>("overview");
  const [file, setFile] = useState<File | null>(null);
  const [parsedDocumentData, setParsedDocumentData] = useState<any>(null);
  const [showUploadSection, setShowUploadSection] = useState(false);
  
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

  const handleUploadClick = () => {
    setShowUploadSection(true);
  };

  const getFinancialSummary = () => {
    if (!metrics || !metrics.yearlyData || metrics.yearlyData.length === 0) {
      return null;
    }

    const currentYear = metrics.selectedYear || metrics.yearlyData[0]?.year;
    const currentYearData = metrics.yearlyData.find(d => d.year === currentYear);
    
    if (!currentYearData) return null;

    const currentRatio = currentYearData.assets.currentAssets / currentYearData.liabilities.currentLiabilities;
    const debtToEquity = currentYearData.liabilities.totalLiabilities / currentYearData.equity;
    const profitMargin = (currentYearData.income.netIncome / currentYearData.income.revenue) * 100;
    const grossMargin = ((currentYearData.income.revenue - currentYearData.income.expenses) / currentYearData.income.revenue) * 100;

    return {
      currentRatio,
      debtToEquity,
      profitMargin,
      grossMargin,
      revenue: currentYearData.income.revenue,
      netIncome: currentYearData.income.netIncome,
      totalAssets: currentYearData.assets.totalAssets,
      totalLiabilities: currentYearData.liabilities.totalLiabilities,
    };
  };

  const financialSummary = getFinancialSummary();

  return (
    <div className="space-y-8">
      <BusinessHealthHeader />

      {/* Add Financial Snapshot panel here */}
      <FinancialMockApiPanel />

      {/* Accounting Summary section */}
      <AccountingSummary />

      <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="w-full">
        <TabsList className="w-full max-w-lg mb-4">
          <TabsTrigger value="overview">Business Overview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          {/* Financial Analysis Actions */}
          <FinancialAnalysisActions 
            metrics={metrics}
            parsedDocumentData={parsedDocumentData}
            onUploadClick={handleUploadClick}
          />

          {/* Document Analysis Section - Show when upload button is clicked */}
          {showUploadSection && (
            <DocumentAnalysisSection
              file={file}
              setFile={setFile}
              isProcessing={isProcessing}
              onUpload={handleUpload}
              onParseComplete={handleParseComplete}
            />
          )}

          {/* Credit Score and Business Score on Same Line */}
          <CreditAndHealthScoreGroup metrics={metrics} />

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

          {/* Comprehensive Financial Information */}
          {financialSummary && (
            <FinancialSummaryCards financialSummary={financialSummary} />
          )}

          {/* Analysis Results */}
          {metrics && (
            <AnalysisResultsTabs metrics={metrics} />
          )}

          {/* Original Financial Health Card for Upload */}
          {!metrics && !showUploadSection && (
            <FinancialHealthCard />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BusinessHealthTab;
