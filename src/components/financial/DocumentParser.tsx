
import { useState } from "react";
import { FileText, AlertCircle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

interface ParsedData {
  revenue?: number;
  expenses?: number;
  netIncome?: number;
  cashFlow?: number;
  totalAssets?: number;
  totalLiabilities?: number;
  documentType?: string;
  confidence?: number;
}

interface DocumentParserProps {
  file: File;
  onParseComplete: (data: ParsedData) => void;
}

export const DocumentParser = ({ file, onParseComplete }: DocumentParserProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [parsedData, setParsedData] = useState<ParsedData | null>(null);

  const simulateDocumentParsing = async () => {
    setIsProcessing(true);
    setError(null);
    
    // Simulate parsing progress
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    try {
      // Simulate document analysis based on file type
      const fileType = file.name.toLowerCase();
      let mockData: ParsedData;

      if (fileType.includes('income') || fileType.includes('profit')) {
        mockData = {
          revenue: 485000,
          expenses: 320000,
          netIncome: 165000,
          documentType: "Income Statement",
          confidence: 92
        };
      } else if (fileType.includes('balance')) {
        mockData = {
          totalAssets: 850000,
          totalLiabilities: 320000,
          documentType: "Balance Sheet",
          confidence: 88
        };
      } else if (fileType.includes('cash')) {
        mockData = {
          cashFlow: 125000,
          documentType: "Cash Flow Statement",
          confidence: 85
        };
      } else {
        // General financial document
        mockData = {
          revenue: 425000,
          expenses: 285000,
          netIncome: 140000,
          cashFlow: 98000,
          totalAssets: 720000,
          totalLiabilities: 280000,
          documentType: "Financial Statement",
          confidence: 78
        };
      }

      setParsedData(mockData);
      onParseComplete(mockData);
    } catch (err) {
      setError("Failed to parse document. Please ensure it's a valid financial document.");
    } finally {
      setIsProcessing(false);
    }
  };

  const extractTextFromPDF = async (file: File): Promise<string> => {
    // In a real implementation, you would use a PDF parsing library like pdf-parse
    // For now, we'll simulate the extraction
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Mock extracted text from PDF containing financial data...");
      }, 1000);
    });
  };

  const parseExcelData = async (file: File): Promise<any[]> => {
    // In a real implementation, you would use a library like xlsx
    // For now, we'll simulate the parsing
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { account: "Revenue", amount: 485000 },
          { account: "Expenses", amount: 320000 },
          { account: "Net Income", amount: 165000 }
        ]);
      }, 1000);
    });
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Document Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Processing: {file.name}</span>
          <span className="text-sm text-muted-foreground">
            {(file.size / (1024 * 1024)).toFixed(2)} MB
          </span>
        </div>

        {isProcessing && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Analyzing document...</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {parsedData && !isProcessing && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Document parsed successfully! Document type: {parsedData.documentType} 
              (Confidence: {parsedData.confidence}%)
            </AlertDescription>
          </Alert>
        )}

        {!isProcessing && !parsedData && !error && (
          <button
            onClick={simulateDocumentParsing}
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Analyze Document
          </button>
        )}

        {parsedData && (
          <div className="grid grid-cols-2 gap-4 mt-4">
            {parsedData.revenue && (
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="text-sm font-medium text-green-800">Revenue</div>
                <div className="text-lg font-bold text-green-900">
                  ${parsedData.revenue.toLocaleString()}
                </div>
              </div>
            )}
            {parsedData.expenses && (
              <div className="p-3 bg-red-50 rounded-lg">
                <div className="text-sm font-medium text-red-800">Expenses</div>
                <div className="text-lg font-bold text-red-900">
                  ${parsedData.expenses.toLocaleString()}
                </div>
              </div>
            )}
            {parsedData.netIncome && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-sm font-medium text-blue-800">Net Income</div>
                <div className="text-lg font-bold text-blue-900">
                  ${parsedData.netIncome.toLocaleString()}
                </div>
              </div>
            )}
            {parsedData.cashFlow && (
              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="text-sm font-medium text-purple-800">Cash Flow</div>
                <div className="text-lg font-bold text-purple-900">
                  ${parsedData.cashFlow.toLocaleString()}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
