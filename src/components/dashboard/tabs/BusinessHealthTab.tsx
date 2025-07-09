
import { BusinessCreditScore } from "@/components/financial/BusinessCreditScore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useState } from "react";
import { useFinancialMetrics } from "@/hooks/useFinancialMetrics";
import { BusinessHealthScore } from "@/components/financial/BusinessHealthScore";
import FinancialMockApiPanel from "@/components/financial/FinancialMockApiPanel";
import { CashFlowForecast } from "@/components/financial/CashFlowForecast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UploadSection } from "@/components/financial/UploadSection";
import { toast } from "sonner";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Calendar, 
  AlertTriangle,
  CheckCircle,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Clock,
  CreditCard
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const BusinessHealthTab = () => {
  const { 
    metrics, 
    isProcessing, 
    processFinancials 
  } = useFinancialMetrics();
  const [activeSection, setActiveSection] = useState("overview");
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = () => {
    if (file) {
      processFinancials();
      toast.success("Processing financial statements...");
    } else {
      toast.error("Please select a file to upload");
    }
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
      receivableDays: currentYearData.receivableDays,
      payableDays: currentYearData.payableDays,
      monthlyReceivables: currentYearData.monthlyReceivables,
      monthlyPayables: currentYearData.monthlyPayables,
      revenue: currentYearData.income.revenue,
      netIncome: currentYearData.income.netIncome,
      totalAssets: currentYearData.assets.totalAssets,
    };
  };

  const financialSummary = getFinancialSummary();

  const getHealthStatus = () => {
    if (!financialSummary) return { status: "unknown", color: "gray" };
    
    const healthScore = (
      (financialSummary.currentRatio > 1.5 ? 25 : 0) +
      (financialSummary.profitMargin > 10 ? 25 : 0) +
      (financialSummary.debtToEquity < 2 ? 25 : 0) +
      (financialSummary.receivableDays < 45 ? 25 : 0)
    );

    if (healthScore >= 75) return { status: "excellent", color: "green" };
    if (healthScore >= 50) return { status: "good", color: "blue" };
    if (healthScore >= 25) return { status: "fair", color: "yellow" };
    return { status: "needs attention", color: "red" };
  };

  const healthStatus = getHealthStatus();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section with Health Overview */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950 p-8 border border-blue-200 dark:border-blue-800">
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-primary/10">
                  <Activity className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    Business Financial Health
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Real-time insights into your business performance
                  </p>
                </div>
              </div>
              
              {financialSummary && (
                <div className="flex items-center gap-4">
                  <Badge 
                    variant={healthStatus.color === "green" ? "default" : "secondary"}
                    className={`px-4 py-2 text-sm font-medium capitalize ${
                      healthStatus.color === "green" ? "bg-green-100 text-green-800 hover:bg-green-200" :
                      healthStatus.color === "blue" ? "bg-blue-100 text-blue-800 hover:bg-blue-200" :
                      healthStatus.color === "yellow" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200" :
                      "bg-red-100 text-red-800 hover:bg-red-200"
                    }`}
                  >
                    {healthStatus.color === "green" && <CheckCircle className="h-4 w-4 mr-2" />}
                    {healthStatus.color === "red" && <AlertTriangle className="h-4 w-4 mr-2" />}
                    Financial Health: {healthStatus.status}
                  </Badge>
                  <div className="text-sm text-muted-foreground">
                    Last updated: {new Date().toLocaleDateString()}
                  </div>
                </div>
              )}
            </div>

            {financialSummary && (
              <div className="grid grid-cols-2 gap-4 lg:gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">
                    {formatCurrency(financialSummary.revenue)}
                  </div>
                  <div className="text-sm text-muted-foreground">Annual Revenue</div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold ${
                    financialSummary.netIncome > 0 ? "text-green-600" : "text-red-600"
                  }`}>
                    {formatCurrency(financialSummary.netIncome)}
                  </div>
                  <div className="text-sm text-muted-foreground">Net Income</div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/10 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-secondary/10 to-transparent rounded-full translate-y-24 -translate-x-24"></div>
      </div>

        {/* Navigation Tabs */}
        <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:w-fit lg:grid-cols-2 mb-8">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="metrics" className="flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              Cash Flow
            </TabsTrigger>
          </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-8">
          {!metrics ? (
            <div className="space-y-8">
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    Get Started with Financial Analysis
                  </CardTitle>
                  <CardDescription>
                    Upload your financial statements to unlock comprehensive business health insights, forecasting, and recommendations.
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
            </div>
          ) : (
            <>
              {/* Key Performance Indicators */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="hover-scale transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Current Ratio</p>
                        <p className="text-2xl font-bold text-blue-600">
                          {financialSummary?.currentRatio.toFixed(2)}
                        </p>
                      </div>
                      <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                        <TrendingUp className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <div className="mt-2">
                      <Badge variant={financialSummary?.currentRatio > 1.5 ? "default" : "secondary"}>
                        {financialSummary?.currentRatio > 1.5 ? "Healthy" : "Monitor"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover-scale transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Profit Margin</p>
                        <p className="text-2xl font-bold text-green-600">
                          {financialSummary?.profitMargin.toFixed(1)}%
                        </p>
                      </div>
                      <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                        <DollarSign className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                    <div className="mt-2">
                      <Badge variant={financialSummary?.profitMargin > 10 ? "default" : "secondary"}>
                        {financialSummary?.profitMargin > 10 ? "Strong" : "Improve"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover-scale transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Collection Days</p>
                        <p className="text-2xl font-bold text-orange-600">
                          {financialSummary?.receivableDays}
                        </p>
                      </div>
                      <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-full">
                        <Clock className="h-6 w-6 text-orange-600" />
                      </div>
                    </div>
                    <div className="mt-2">
                      <Badge variant={financialSummary?.receivableDays < 45 ? "default" : "secondary"}>
                        {financialSummary?.receivableDays < 45 ? "Good" : "Slow"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover-scale transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Debt-to-Equity</p>
                        <p className="text-2xl font-bold text-purple-600">
                          {financialSummary?.debtToEquity.toFixed(2)}
                        </p>
                      </div>
                      <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                        <CreditCard className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                    <div className="mt-2">
                      <Badge variant={financialSummary?.debtToEquity < 2 ? "default" : "secondary"}>
                        {financialSummary?.debtToEquity < 2 ? "Conservative" : "High"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Health Scores Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="relative overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-primary" />
                      Business Health Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BusinessHealthScore metrics={metrics} />
                  </CardContent>
                </Card>

                <BusinessCreditScore />
              </div>

              {/* Cash Flow Forecast Section */}
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    Cash Flow Forecast
                  </CardTitle>
                  <CardDescription>
                    7-day cash flow projection based on current financial position
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CashFlowForecast metrics={metrics} />
                </CardContent>
              </Card>

              {/* Financial Analysis Section */}
              {financialSummary && (
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-purple-600" />
                      Financial Analysis
                    </CardTitle>
                    <CardDescription>
                      Detailed analysis of receivables and payables management
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Receivables Analysis */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-green-600" />
                            Receivables Management
                          </CardTitle>
                          <CardDescription>
                            Track and optimize your collection efficiency
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex justify-between items-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Average Collection Days</p>
                              <p className="text-2xl font-bold text-green-600">
                                {financialSummary.receivableDays} days
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">Monthly Receivables</p>
                              <p className="text-lg font-semibold text-green-600">
                                {formatCurrency(financialSummary.monthlyReceivables)}
                              </p>
                            </div>
                          </div>
                          
                          {financialSummary.receivableDays > 45 && (
                            <Alert>
                              <AlertTriangle className="h-4 w-4" />
                              <AlertDescription>
                                Collection period is longer than optimal. Consider implementing stricter payment terms.
                              </AlertDescription>
                            </Alert>
                          )}
                        </CardContent>
                      </Card>

                      {/* Payables Analysis */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <TrendingDown className="h-5 w-5 text-red-600" />
                            Payables Management
                          </CardTitle>
                          <CardDescription>
                            Optimize cash flow through strategic payment timing
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex justify-between items-center p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Average Payment Days</p>
                              <p className="text-2xl font-bold text-red-600">
                                {financialSummary.payableDays} days
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">Monthly Payables</p>
                              <p className="text-lg font-semibold text-red-600">
                                {formatCurrency(financialSummary.monthlyPayables)}
                              </p>
                            </div>
                          </div>
                          
                          <Alert>
                            <CheckCircle className="h-4 w-4" />
                            <AlertDescription>
                              Taking {financialSummary.payableDays} days to pay helps maintain healthy cash flow.
                            </AlertDescription>
                          </Alert>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </TabsContent>

        {/* Cash Flow Tab - Only showing warning */}
        <TabsContent value="metrics" className="space-y-6">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                Cash Flow Monitoring
              </CardTitle>
              <CardDescription>
                Real-time cash flow warnings and alerts based on your financial data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FinancialMockApiPanel />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BusinessHealthTab;
