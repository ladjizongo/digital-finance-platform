
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  BarChart3, 
  AlertTriangle, 
  MessageCircle, 
  Building2, 
  TrendingUp,
  Upload
} from "lucide-react";
import { FinancialMetrics } from "@/types/financial";
import { toast } from "sonner";

interface FinancialAnalysisActionsProps {
  metrics: FinancialMetrics | null;
  parsedDocumentData: any;
  onUploadClick: () => void;
}

interface AnalysisResult {
  type: string;
  title: string;
  content: string;
  score?: number;
  recommendations?: string[];
}

export const FinancialAnalysisActions = ({ 
  metrics, 
  parsedDocumentData, 
  onUploadClick 
}: FinancialAnalysisActionsProps) => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const runAnalysis = async (type: string) => {
    setIsAnalyzing(true);
    
    // Simulate analysis processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    let result: AnalysisResult;
    
    switch (type) {
      case 'health':
        result = generateHealthAnalysis();
        break;
      case 'risks':
        result = generateRiskAnalysis();
        break;
      case 'recommendations':
        result = generateRecommendations();
        break;
      case 'eligibility':
        result = generateLoanEligibility();
        break;
      case 'trends':
        result = generateTrendAnalysis();
        break;
      default:
        result = { type, title: 'Analysis Complete', content: 'Analysis completed successfully.' };
    }
    
    setAnalysisResult(result);
    setIsAnalyzing(false);
    toast.success(`${result.title} completed`);
  };

  const generateHealthAnalysis = (): AnalysisResult => {
    if (!metrics) {
      return {
        type: 'health',
        title: 'Financial Health Check',
        content: 'Upload financial statements to get a comprehensive health analysis.',
        score: 0
      };
    }

    const currentYear = metrics.selectedYear || metrics.yearlyData[0]?.year;
    const currentYearData = metrics.yearlyData.find(d => d.year === currentYear);
    
    if (!currentYearData) {
      return {
        type: 'health',
        title: 'Financial Health Check',
        content: 'No financial data available for analysis.',
        score: 0
      };
    }

    const currentRatio = currentYearData.assets.currentAssets / currentYearData.liabilities.currentLiabilities;
    const profitMargin = (currentYearData.income.netIncome / currentYearData.income.revenue) * 100;
    
    let score = 75;
    if (currentRatio >= 2) score += 10;
    if (profitMargin >= 10) score += 10;
    
    return {
      type: 'health',
      title: 'Financial Health Score',
      content: `Your business shows ${score >= 80 ? 'strong' : score >= 60 ? 'moderate' : 'weak'} financial health. Current ratio: ${currentRatio.toFixed(2)}, Profit margin: ${profitMargin.toFixed(1)}%. ${score >= 80 ? 'Your business is financially stable with good liquidity.' : 'Consider improving cash flow and profitability.'}`,
      score
    };
  };

  const generateRiskAnalysis = (): AnalysisResult => {
    if (!metrics) {
      return {
        type: 'risks',
        title: 'Risk Assessment',
        content: 'Upload financial data to identify potential risk factors.'
      };
    }

    const risks = [];
    const currentYear = metrics.selectedYear || metrics.yearlyData[0]?.year;
    const currentYearData = metrics.yearlyData.find(d => d.year === currentYear);
    
    if (currentYearData) {
      const currentRatio = currentYearData.assets.currentAssets / currentYearData.liabilities.currentLiabilities;
      const debtToEquity = currentYearData.liabilities.totalLiabilities / currentYearData.equity;
      
      if (currentRatio < 1.0) risks.push('Low liquidity - current ratio below 1.0');
      if (debtToEquity > 1.0) risks.push('High debt levels - debt-to-equity above 1.0');
      if (currentYearData.income.netIncome < 0) risks.push('Negative net income');
    }

    return {
      type: 'risks',
      title: 'Financial Risk Flags',
      content: risks.length > 0 
        ? `Found ${risks.length} potential risk factor(s): ${risks.join(', ')}`
        : 'No major financial risk flags detected. Your business shows good financial stability.'
    };
  };

  const generateRecommendations = (): AnalysisResult => {
    const recommendations = [
      'Monitor cash flow monthly to ensure adequate working capital',
      'Consider reducing operational expenses to improve profit margins',
      'Build emergency reserves equal to 3-6 months of operating expenses'
    ];

    if (metrics) {
      const currentYear = metrics.selectedYear || metrics.yearlyData[0]?.year;
      const currentYearData = metrics.yearlyData.find(d => d.year === currentYear);
      
      if (currentYearData) {
        const currentRatio = currentYearData.assets.currentAssets / currentYearData.liabilities.currentLiabilities;
        if (currentRatio < 1.5) {
          recommendations.unshift('Improve working capital by reducing current liabilities or increasing current assets');
        }
      }
    }

    return {
      type: 'recommendations',
      title: 'Personalized Recommendations',
      content: 'Based on your financial profile, here are key actions to strengthen your business:',
      recommendations
    };
  };

  const generateLoanEligibility = (): AnalysisResult => {
    if (!metrics) {
      return {
        type: 'eligibility',
        title: 'Loan Eligibility Assessment',
        content: 'Upload financial statements to assess your loan eligibility and get personalized loan options.'
      };
    }

    const currentYear = metrics.selectedYear || metrics.yearlyData[0]?.year;
    const currentYearData = metrics.yearlyData.find(d => d.year === currentYear);
    
    if (!currentYearData) {
      return {
        type: 'eligibility',
        title: 'Loan Eligibility Assessment',
        content: 'Financial data required for loan eligibility analysis.'
      };
    }

    const annualRevenue = currentYearData.income.revenue;
    const maxLoanAmount = Math.floor(annualRevenue * 0.3);
    
    return {
      type: 'eligibility',
      title: 'Loan Eligibility Results',
      content: `Based on your annual revenue of $${annualRevenue.toLocaleString()}, you may be eligible for a business loan up to $${maxLoanAmount.toLocaleString()}. Recommended term: 3-5 years with monthly payments starting around $${Math.floor(maxLoanAmount / 48).toLocaleString()}.`
    };
  };

  const generateTrendAnalysis = (): AnalysisResult => {
    if (!metrics || !metrics.cashFlow) {
      return {
        type: 'trends',
        title: 'Trend Analysis',
        content: 'Upload historical financial data to analyze revenue, profit, and cash flow trends.'
      };
    }

    const avgBalance = metrics.cashFlow.reduce((sum, entry) => sum + entry.balance, 0) / metrics.cashFlow.length;
    const trend = avgBalance > 0 ? 'positive' : 'negative';
    
    return {
      type: 'trends',
      title: 'Financial Trend Analysis',
      content: `Your business shows a ${trend} cash flow trend with an average monthly balance of $${avgBalance.toLocaleString()}. ${trend === 'positive' ? 'This indicates healthy cash management.' : 'Consider improving cash flow management.'}`
    };
  };

  const actionCards = [
    {
      id: 'upload',
      title: 'Upload Financial Statements',
      description: 'Upload your latest financial statements. We\'ll automatically extract key metrics like revenue, expenses, cash flow, and debt levels.',
      icon: Upload,
      color: 'bg-blue-50 border-blue-200',
      iconColor: 'text-blue-600',
      action: onUploadClick
    },
    {
      id: 'health',
      title: 'Financial Health Check',
      description: 'Want to know how healthy your business finances are? Tap below to run a full financial health check.',
      icon: BarChart3,
      color: 'bg-green-50 border-green-200',
      iconColor: 'text-green-600',
      action: () => runAnalysis('health'),
      disabled: !metrics && !parsedDocumentData
    },
    {
      id: 'risks',
      title: 'Risk Flags & Alerts',
      description: 'We noticed a few areas that may need attention. Tap to review any financial red flags before applying for a loan.',
      icon: AlertTriangle,
      color: 'bg-red-50 border-red-200',
      iconColor: 'text-red-600',
      action: () => runAnalysis('risks'),
      disabled: !metrics && !parsedDocumentData
    },
    {
      id: 'recommendations',
      title: 'Get Recommendations',
      description: 'Looking to strengthen your business finances? Get 3 personalized recommendations based on your financials.',
      icon: MessageCircle,
      color: 'bg-purple-50 border-purple-200',
      iconColor: 'text-purple-600',
      action: () => runAnalysis('recommendations'),
      disabled: !metrics && !parsedDocumentData
    },
    {
      id: 'eligibility',
      title: 'Check Loan Eligibility',
      description: 'Thinking of applying for a loan? Let us check your eligibility and show you the best options based on your financials.',
      icon: Building2,
      color: 'bg-orange-50 border-orange-200',
      iconColor: 'text-orange-600',
      action: () => runAnalysis('eligibility'),
      disabled: !metrics && !parsedDocumentData
    },
    {
      id: 'trends',
      title: 'Trend Analysis',
      description: 'See how your revenue, profit, and cash flow have changed over time. Understand your business trends at a glance.',
      icon: TrendingUp,
      color: 'bg-indigo-50 border-indigo-200',
      iconColor: 'text-indigo-600',
      action: () => runAnalysis('trends'),
      disabled: !metrics && !parsedDocumentData
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Financial Analysis Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {actionCards.map((card) => (
              <Card 
                key={card.id} 
                className={`${card.color} border ${card.disabled ? 'opacity-50' : 'hover:shadow-md cursor-pointer'} transition-all`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <card.icon className={`h-6 w-6 ${card.iconColor} mt-1 flex-shrink-0`} />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{card.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{card.description}</p>
                      <Button 
                        size="sm" 
                        onClick={card.action}
                        disabled={card.disabled || isAnalyzing}
                        className="w-full"
                      >
                        {isAnalyzing ? 'Analyzing...' : 'Run Analysis'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {analysisResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {analysisResult.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analysisResult.score && (
                <div className="flex items-center gap-4">
                  <div className="text-3xl font-bold text-indigo-600">
                    {analysisResult.score}
                  </div>
                  <div className="text-sm text-gray-600">
                    Financial Health Score
                  </div>
                </div>
              )}
              
              <p className="text-gray-700">{analysisResult.content}</p>
              
              {analysisResult.recommendations && (
                <div>
                  <h4 className="font-semibold mb-2">Recommendations:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {analysisResult.recommendations.map((rec, index) => (
                      <li key={index} className="text-sm text-gray-600">{rec}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
