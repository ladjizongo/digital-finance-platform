
import { DollarSign, CreditCard, Home } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FinancialData {
  totalBalance: number;
  creditCards: {
    id: string;
    name: string;
    number: string;
    balance: number;
    creditLimit: number;
    availableCredit: number;
    purchaseRate: number;
    cashAdvanceRate: number;
    dueDate: string;
    statementDate: string;
    transactions: Array<{
      date: string;
      description: string;
      amount: number;
    }>;
  }[];
  mortgage: {
    balance: number;
    monthlyPayment: number;
    nextPaymentDate: string;
    interestRate: string;
  };
}

interface AccountOverviewCardsProps {
  financialData: FinancialData;
}

const AccountOverviewCards = ({ financialData }: AccountOverviewCardsProps) => {
  const primaryCreditCard = financialData.creditCards[0];
  
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
          <DollarSign className="h-4 w-4 text-indigo-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${financialData.totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Across all accounts
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Credit Card</CardTitle>
          <CreditCard className="h-4 w-4 text-indigo-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${primaryCreditCard.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Current balance (Due: {primaryCreditCard.dueDate})
          </p>
          <div className="flex justify-between mt-4">
            <span className="text-sm">Available Credit:</span>
            <span className="text-sm font-medium">${primaryCreditCard.availableCredit.toLocaleString('en-US')}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-sm">Statement Date:</span>
            <span className="text-sm font-medium">{primaryCreditCard.statementDate}</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Mortgage</CardTitle>
          <Home className="h-4 w-4 text-indigo-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${financialData.mortgage.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Current balance
          </p>
          <div className="flex justify-between mt-4">
            <span className="text-sm">Monthly Payment:</span>
            <span className="text-sm font-medium">${financialData.mortgage.monthlyPayment.toLocaleString('en-US')}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-sm">Next Payment:</span>
            <span className="text-sm font-medium">{financialData.mortgage.nextPaymentDate}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountOverviewCards;
