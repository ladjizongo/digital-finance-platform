
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
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-indigo-800">Document Analysis</CardTitle>
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
          )}

          {/* Credit Score and Business Score on Same Line */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BusinessCreditScore />
            {metrics ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Business Health Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <BusinessHealthScore metrics={metrics} />
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Business Health Score</CardTitle>
                  <CardDescription>
                    Upload financial documents to calculate your business health score
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-32 text-muted-foreground">
                    <FileUp className="h-8 w-8 mr-2" />
                    <span>Awaiting financial data</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Key Financial Ratios */}
              <Card>
                <CardHeader>
                  <CardTitle>Key Financial Ratios</CardTitle>
                  <CardDescription>
                    Critical metrics for business health assessment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Current Ratio</span>
                      <span className={`font-bold ${
                        financialSummary.currentRatio >= 2 ? 'text-green-600' : 
                        financialSummary.currentRatio >= 1 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {financialSummary.currentRatio.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Debt-to-Equity</span>
                      <span className={`font-bold ${
                        financialSummary.debtToEquity <= 0.3 ? 'text-green-600' : 
                        financialSummary.debtToEquity <= 0.6 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {financialSummary.debtToEquity.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Profit Margin</span>
                      <span className={`font-bold ${
                        financialSummary.profitMargin >= 15 ? 'text-green-600' : 
                        financialSummary.profitMargin >= 5 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {financialSummary.profitMargin.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Gross Margin</span>
                      <span className={`font-bold ${
                        financialSummary.grossMargin >= 20 ? 'text-green-600' : 
                        financialSummary.grossMargin >= 10 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {financialSummary.grossMargin.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Financial Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Financial Summary</CardTitle>
                  <CardDescription>
                    Core financial metrics from latest data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Annual Revenue</span>
                      <span className="font-bold text-blue-600">
                        ${financialSummary.revenue.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Net Income</span>
                      <span className={`font-bold ${
                        financialSummary.netIncome >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        ${financialSummary.netIncome.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Total Assets</span>
                      <span className="font-bold text-indigo-600">
                        ${financialSummary.totalAssets.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Total Liabilities</span>
                      <span className="font-bold text-orange-600">
                        ${financialSummary.totalLiabilities.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
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
