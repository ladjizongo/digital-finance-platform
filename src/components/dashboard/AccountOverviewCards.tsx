
import { DollarSign, CreditCard, Banknote, Percent } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface FinancialData {
  totalBalance: number;
  accounts: {
    id: string;
    name: string;
    balance: number;
    accountNumber: string;
  }[];
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
  onTabChange?: (tab: string) => void;
}

const AccountOverviewCards = ({ financialData, onTabChange }: AccountOverviewCardsProps) => {
  const totalAccountsBalance = financialData.accounts.reduce(
    (sum, account) => sum + account.balance, 
    0
  );
  
  const totalCreditCardBalance = financialData.creditCards.reduce(
    (sum, card) => sum + card.balance,
    0
  );
  
  const totalCreditLimit = financialData.creditCards.reduce(
    (sum, card) => sum + card.creditLimit,
    0
  );

  const totalCreditCardAvailableCredit = financialData.creditCards.reduce(
    (sum, card) => sum + card.availableCredit,
    0
  );

  const weightedCreditCardRate = financialData.creditCards.reduce(
    (sum, card) => sum + (card.purchaseRate * (card.balance / totalCreditCardBalance)),
    0
  );

  const totalCreditCardMinPayment = financialData.creditCards.reduce(
    (sum, card) => sum + card.minimumPayment,
    0
  );
  
  // Calculate overall credit utilization
  const overallCreditUtilization = Math.round((totalCreditCardBalance / totalCreditLimit) * 100);
  
  const totalLoanBalance = financialData.loans.reduce((sum, loan) => sum + loan.balance, 0);
  const totalLoanLimit = financialData.loans.reduce((sum, loan) => sum + loan.limit, 0);
  const totalLoanAvailableCredit = financialData.loans.reduce((sum, loan) => sum + loan.availableCredit, 0);
  const totalMonthlyPayment = financialData.loans.reduce((sum, loan) => sum + loan.monthlyPayment, 0);
  const totalMinimumPayment = financialData.loans.reduce((sum, loan) => sum + loan.minimumPayment, 0);
  
  const weightedInterestRate = financialData.loans.reduce((sum, loan) => 
    sum + (loan.interestRate * (loan.balance / totalLoanBalance)), 0);

  const nextPaymentDate = financialData.loans
    .map(loan => new Date(loan.nextPaymentDate))
    .sort((a, b) => a.getTime() - b.getTime())[0]
    .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  
  const handleCardClick = (tab: string) => {
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
      <Card 
        className="cursor-pointer transition-all hover:shadow-md"
        onClick={() => handleCardClick('accounts')}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
          <DollarSign className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${totalAccountsBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Total balance across all accounts
          </p>
        </CardContent>
      </Card>
      
      <Card 
        className="cursor-pointer transition-all hover:shadow-md"
        onClick={() => handleCardClick('creditCards')}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Credit Cards</CardTitle>
          <CreditCard className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${totalCreditCardBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Total balance across {financialData.creditCards.length} credit cards
          </p>
          
          <div className="mt-4 space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="flex items-center">
                <Percent className="h-3 w-3 mr-1" />
                Credit Utilization
              </span>
              <span className={cn(
                "font-medium",
                overallCreditUtilization > 75 ? "text-red-600" : 
                overallCreditUtilization > 50 ? "text-amber-600" : "text-green-600"
              )}>
                {overallCreditUtilization}%
              </span>
            </div>
            <Progress 
              value={overallCreditUtilization} 
              className={cn(
                "h-1.5",
                overallCreditUtilization > 75 ? "bg-red-200" : 
                overallCreditUtilization > 50 ? "bg-amber-200" : "bg-green-200"
              )}
              indicatorClassName={cn(
                overallCreditUtilization > 75 ? "bg-red-600" : 
                overallCreditUtilization > 50 ? "bg-amber-600" : "bg-green-600"
              )}
            />
          </div>
          
          <div className="flex justify-between mt-4">
            <span className="text-sm text-muted-foreground">Available Credit:</span>
            <span className="text-sm font-medium">${totalCreditCardAvailableCredit.toLocaleString('en-US')}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-sm text-muted-foreground">Total Credit Limit:</span>
            <span className="text-sm font-medium">${totalCreditLimit.toLocaleString('en-US')}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-sm text-muted-foreground">Avg. Interest Rate:</span>
            <span className="text-sm font-medium">{weightedCreditCardRate.toFixed(2)}%</span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-sm text-muted-foreground">Total Minimum Payment:</span>
            <span className="text-sm font-medium">${totalCreditCardMinPayment.toLocaleString('en-US')}</span>
          </div>
        </CardContent>
      </Card>
      
      <Card 
        className="cursor-pointer transition-all hover:shadow-md"
        onClick={() => handleCardClick('loans')}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Business Loans</CardTitle>
          <Banknote className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${totalLoanBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Total balance across {financialData.loans.length} business loans
          </p>
          <div className="flex justify-between mt-4">
            <span className="text-sm text-muted-foreground">Available Credit:</span>
            <span className="text-sm font-medium">${totalLoanAvailableCredit.toLocaleString('en-US')}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-sm text-muted-foreground">Total Credit Limit:</span>
            <span className="text-sm font-medium">${totalLoanLimit.toLocaleString('en-US')}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-sm text-muted-foreground">Avg. Interest Rate:</span>
            <span className="text-sm font-medium">{weightedInterestRate.toFixed(2)}%</span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-sm text-muted-foreground">Total Monthly Payment:</span>
            <span className="text-sm font-medium">${totalMonthlyPayment.toLocaleString('en-US')}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-sm text-muted-foreground">Next Payment:</span>
            <span className="text-sm font-medium">{nextPaymentDate}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-sm text-muted-foreground">Total Minimum Payment:</span>
            <span className="text-sm font-medium">${totalMinimumPayment.toLocaleString('en-US')}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountOverviewCards;
