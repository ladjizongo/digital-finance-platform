
import { DollarSign, CreditCard, Home } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FinancialData {
  totalBalance: number;
  creditCard: {
    balance: number;
    availableCredit: number;
    dueDate: string;
  };
  mortgage: {
    balance: number;
    monthlyPayment: number;
    nextPaymentDate: string;
  };
}

interface AccountOverviewCardsProps {
  financialData: FinancialData;
}

const AccountOverviewCards = ({ financialData }: AccountOverviewCardsProps) => {
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
            ${financialData.creditCard.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Current balance (Due: {financialData.creditCard.dueDate})
          </p>
          <div className="flex justify-between mt-4">
            <span className="text-sm">Available Credit:</span>
            <span className="text-sm font-medium">${financialData.creditCard.availableCredit.toLocaleString('en-US')}</span>
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
