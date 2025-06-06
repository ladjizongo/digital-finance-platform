
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  Building2, 
  Lightbulb, 
  AlertTriangle,
  MessageSquare
} from "lucide-react";

interface ChatbotSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
  isCompact?: boolean;
}

const ChatbotSuggestions = ({ onSuggestionClick, isCompact = false }: ChatbotSuggestionsProps) => {
  const suggestions = [
    {
      id: 'health-check',
      title: 'Run a Health Check',
      icon: BarChart3,
      prompt: 'Run a financial health check on my business',
      description: 'Analyze your financial health',
      color: 'text-green-600'
    },
    {
      id: 'loan-eligibility',
      title: 'Check Loan Eligibility',
      icon: Building2,
      prompt: 'Check my loan eligibility and show me options',
      description: 'See what loans you qualify for',
      color: 'text-blue-600'
    },
    {
      id: 'financial-advice',
      title: 'Get Financial Advice',
      icon: Lightbulb,
      prompt: 'Give me personalized financial recommendations',
      description: 'Get personalized recommendations',
      color: 'text-orange-600'
    },
    {
      id: 'risk-alerts',
      title: 'Review Risk Alerts',
      icon: AlertTriangle,
      prompt: 'Show me any financial risk flags or alerts',
      description: 'Identify potential risks',
      color: 'text-red-600'
    }
  ];

  if (isCompact) {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
          <MessageSquare className="h-4 w-4" />
          Quick Actions
        </div>
        <div className="grid grid-cols-2 gap-2">
          {suggestions.map((suggestion) => (
            <Button
              key={suggestion.id}
              variant="outline"
              size="sm"
              onClick={() => onSuggestionClick(suggestion.prompt)}
              className="h-auto p-3 flex flex-col items-center gap-2 text-center"
            >
              <suggestion.icon className={`h-4 w-4 ${suggestion.color}`} />
              <span className="text-xs leading-tight">{suggestion.title}</span>
            </Button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg text-indigo-800">
          <MessageSquare className="h-5 w-5" />
          Hi! Want help with your financials today?
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {suggestions.map((suggestion) => (
            <Button
              key={suggestion.id}
              variant="outline"
              onClick={() => onSuggestionClick(suggestion.prompt)}
              className="h-auto p-4 flex items-start gap-3 text-left bg-white hover:bg-blue-50 border-blue-200"
            >
              <suggestion.icon className={`h-5 w-5 ${suggestion.color} mt-0.5 flex-shrink-0`} />
              <div>
                <div className="font-medium text-gray-900">{suggestion.title}</div>
                <div className="text-sm text-gray-600 mt-1">{suggestion.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatbotSuggestions;
