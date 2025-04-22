import { DollarSign, CreditCard, Banknote } from "lucide-react";
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
    minimumPayment: number;
    transactions: Array<{
      date: string;
      description: string;
      amount: number;
    }>;
  }[];
  loans: {
    id: string;
    name: string;
    balance: number;
    limit: number;
    availableCredit: number;
    interestRate: number;
    monthlyPayment: number;
    nextPaymentDate: string;
    statementDate: string;
    minimumPayment: number;
    transactions: Array<{
      date: string;
      description: string;
      amount: number;
    }>;
  }[];
}

interface AccountOverviewCardsProps {
  financialData: FinancialData;
}

const AccountOverviewCards = ({ financialData }: AccountOverviewCardsProps) => {
  const primaryCreditCard = financialData.creditCards[0];
  const primaryLoan = financialData.loans?.[0] ?? {
    balance: 0,
    limit: 0,
    availableCredit: 0,
    monthlyPayment: 0,
    nextPaymentDate: 'N/A',
    statementDate: 'N/A',
    minimumPayment: 0,
    interestRate: 0
  };
  
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
          <CardTitle className="text-sm font-medium">Personal Loan</CardTitle>
          <Banknote className="h-4 w-4 text-indigo-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${primaryLoan.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Current balance
          </p>
          <div className="flex justify-between mt-4">
            <span className="text-sm">Available Credit:</span>
            <span className="text-sm font-medium">${primaryLoan.availableCredit.toLocaleString('en-US')}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-sm">Credit Limit:</span>
            <span className="text-sm font-medium">${primaryLoan.limit.toLocaleString('en-US')}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-sm">Interest Rate:</span>
            <span className="text-sm font-medium">{primaryLoan.interestRate}%</span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-sm">Monthly Payment:</span>
            <span className="text-sm font-medium">${primaryLoan.monthlyPayment.toLocaleString('en-US')}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-sm">Next Payment:</span>
            <span className="text-sm font-medium">{primaryLoan.nextPaymentDate}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-sm">Statement Date:</span>
            <span className="text-sm font-medium">{primaryLoan.statementDate}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-sm">Minimum Payment:</span>
            <span className="text-sm font-medium">${primaryLoan.minimumPayment.toLocaleString('en-US')}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountOverviewCards;
