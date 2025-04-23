
import { Lightbulb } from "lucide-react";

interface AITipsPanelProps {
  activeTab: string;
}

const tipsMap: Record<string, string[]> = {
  accounts: [
    "Review your recent transactions weekly to track spending trends.",
    "Keep minimum balances to avoid bank fees where possible.",
    "Set up automatic transfers to save regularly."
  ],
  creditCards: [
    "Pay credit cards before the due date to avoid interest.",
    "Monitor your credit utilization, keep it under 30% of your limit.",
    "Review statements for any suspicious transactions each month."
  ],
  loans: [
    "Making extra loan payments can save you money in interest.",
    "Check if your loan has any prepayment penalties before paying off early.",
    "Track your payment schedule to avoid late fees."
  ],
  businessHealth: [
    "Maintain positive cash flow for business resilience.",
    "Use forecasting to anticipate cash shortfalls and surpluses.",
    "Monitor receivable and payable days monthly."
  ],
  externalAccount: [
    "Connect all your external accounts for unified insights.",
    "Regularly sync account data for up-to-date analysis."
  ]
};

export function AITipsPanel({ activeTab }: AITipsPanelProps) {
  const tips = tipsMap[activeTab] || [
    "Explore your financial dashboard to discover more tips!"
  ];

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-gray-50 p-4 rounded-lg border border-indigo-100 shadow-md flex items-start gap-3 mt-4">
      <Lightbulb className="h-6 w-6 text-indigo-500 mt-1 shrink-0" />
      <div>
        <div className="font-semibold text-indigo-700 mb-1">AI Tips</div>
        <ul className="list-disc pl-4 text-sm space-y-1">
          {tips.map((tip, i) => (
            <li key={i} className="text-gray-700">{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AITipsPanel;
