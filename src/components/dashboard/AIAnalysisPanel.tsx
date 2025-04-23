
import { useState } from "react";
import { ChartBarBig, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AIAnalysisPanelProps {
  activeTab: string;
  financialData: any;
}

function analyzeAccounts(data: any) {
  const total = data.accounts.reduce((sum: number, acc: any) => sum + acc.balance, 0);
  const largest = data.accounts.reduce((a: any, b: any) => (a.balance > b.balance ? a : b));
  return `Your total account balance is $${total.toLocaleString()}. Your largest account is "${largest.name}" with $${largest.balance.toLocaleString()}.`;
}

function analyzeCreditCards(data: any) {
  const highUtil = data.creditCards.filter((c: any) => c.balance / c.creditLimit > 0.3);
  return `You have ${highUtil.length} card(s) with balances above 30% utilization. Keep utilization low to maintain good credit health.`;
}

function analyzeLoans(data: any) {
  const maxLoan = data.loans.reduce((a: any, b: any) => (a.balance > b.balance ? a : b));
  return `Your largest outstanding loan is "${maxLoan.name}" with $${maxLoan.balance.toLocaleString()} remaining.`;
}

function analyzeBusinessHealth() {
  return "For best business health, monitor your cash flow and ensure your revenue exceeds monthly payables.";
}

export function AIAnalysisPanel({ activeTab, financialData }: AIAnalysisPanelProps) {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateAnalysis = () => {
    setLoading(true);
    setTimeout(() => {
      let result = "";
      if (activeTab === "accounts") result = analyzeAccounts(financialData);
      else if (activeTab === "creditCards") result = analyzeCreditCards(financialData);
      else if (activeTab === "loans") result = analyzeLoans(financialData);
      else if (activeTab === "businessHealth") result = analyzeBusinessHealth();
      else result = "AI can help analyze your data when you view the right section!";
      setAnalysis(result);
      setLoading(false);
    }, 700);
  };

  return (
    <div className="bg-white border border-gray-200 shadow rounded-lg px-5 py-4 mt-4 mb-2 flex items-start gap-3">
      <div className="flex items-center gap-2">
        <Brain className="h-6 w-6 text-indigo-600" />
        <div>
          <div className="font-semibold text-indigo-900 mb-2">AI Data Analysis</div>
          <Button onClick={generateAnalysis} variant="outline" size="sm" disabled={loading}>
            <ChartBarBig className="mr-1 h-4 w-4" />
            Analyze My Data
          </Button>
          {analysis && (
            <div className="mt-2 text-gray-700 text-sm">{analysis}</div>
          )}
          {loading && (
            <div className="mt-2 text-gray-400 text-xs animate-pulse">Analyzing data...</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AIAnalysisPanel;
