
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DocumentParserProps {
  file: File;
  onParseComplete: (data: any) => void;
}

export const DocumentParser = ({ file, onParseComplete }: DocumentParserProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [extractedData, setExtractedData] = useState<any>(null);
  const [confidence, setConfidence] = useState(0);

  const analyzeDocument = async () => {
    setIsAnalyzing(true);
    
    // Simulate document analysis with AI/OCR
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock extracted financial data with CAC information
    const mockData = {
      revenue: Math.floor(Math.random() * 500000) + 200000,
      expenses: Math.floor(Math.random() * 300000) + 150000,
      totalAssets: Math.floor(Math.random() * 800000) + 400000,
      totalLiabilities: Math.floor(Math.random() * 400000) + 200000,
      netIncome: Math.floor(Math.random() * 100000) + 50000,
      // CAC-related data
      salesMarketingCosts: Math.floor(Math.random() * 50000) + 10000,
      newCustomersAcquired: Math.floor(Math.random() * 200) + 50,
      confidence: Math.floor(Math.random() * 30) + 70
    };
    
    // Calculate CAC if we have the necessary data
    if (mockData.salesMarketingCosts && mockData.newCustomersAcquired > 0) {
      mockData.cac = mockData.salesMarketingCosts / mockData.newCustomersAcquired;
    }
    
    setExtractedData(mockData);
    setConfidence(mockData.confidence);
    setAnalysisComplete(true);
    setIsAnalyzing(false);
    
    onParseComplete(mockData);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "bg-green-100 text-green-800";
    if (confidence >= 60) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  useEffect(() => {
    if (file && !analysisComplete) {
      analyzeDocument();
    }
  }, [file, analysisComplete]);

  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <FileText className="h-4 w-4" />
          {file.name}
          {analysisComplete && <CheckCircle className="h-4 w-4 text-green-600" />}
          {isAnalyzing && <Loader2 className="h-4 w-4 animate-spin text-blue-600" />}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isAnalyzing && (
          <div className="flex items-center gap-2 text-sm text-blue-600">
            <Loader2 className="h-4 w-4 animate-spin" />
            Analyzing document and extracting financial data...
          </div>
        )}
        
        {analysisComplete && extractedData && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge className={getConfidenceColor(confidence)}>
                {confidence}% Confidence
              </Badge>
              <span className="text-sm text-gray-600">Analysis Complete</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div><span className="font-medium">Revenue:</span> {formatCurrency(extractedData.revenue)}</div>
              <div><span className="font-medium">Expenses:</span> {formatCurrency(extractedData.expenses)}</div>
              <div><span className="font-medium">Assets:</span> {formatCurrency(extractedData.totalAssets)}</div>
              <div><span className="font-medium">Liabilities:</span> {formatCurrency(extractedData.totalLiabilities)}</div>
              {extractedData.salesMarketingCosts && (
                <div><span className="font-medium">Sales & Marketing:</span> {formatCurrency(extractedData.salesMarketingCosts)}</div>
              )}
              {extractedData.newCustomersAcquired && (
                <div><span className="font-medium">New Customers:</span> {extractedData.newCustomersAcquired}</div>
              )}
              {extractedData.cac && (
                <div><span className="font-medium">CAC:</span> {formatCurrency(extractedData.cac)}</div>
              )}
            </div>
          </div>
        )}
        
        {!isAnalyzing && !analysisComplete && (
          <Button onClick={analyzeDocument} size="sm" className="w-full">
            Analyze Document
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
