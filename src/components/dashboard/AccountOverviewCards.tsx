
import { DollarSign, CreditCard, Banknote } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
}

const AccountOverviewCards = ({ financialData }: AccountOverviewCardsProps) => {
  // Calculate total balance from accounts only
  const totalAccountsBalance = financialData.accounts.reduce(
    (sum, account) => sum + account.balance, 
    0
  );
  
  // Calculate total balance for all credit cards
  const totalCreditCardBalance = financialData.creditCards.reduce(
    (sum, card) => sum + card.balance,
    0
  );
  
  // Calculate total credit limit for all credit cards
  const totalCreditLimit = financialData.creditCards.reduce(
    (sum, card) => sum + card.creditLimit,
    0
  );

  // Calculate total available credit for credit cards
  const totalCreditCardAvailableCredit = financialData.creditCards.reduce(
    (sum, card) => sum + card.availableCredit,
    0
  );
  
  // Calculate totals for all business loans
  const totalLoanBalance = financialData.loans.reduce((sum, loan) => sum + loan.balance, 0);
  const totalLoanLimit = financialData.loans.reduce((sum, loan) => sum + loan.limit, 0);
  const totalLoanAvailableCredit = financialData.loans.reduce((sum, loan) => sum + loan.availableCredit, 0);
  const totalMonthlyPayment = financialData.loans.reduce((sum, loan) => sum + loan.monthlyPayment, 0);
  const totalMinimumPayment = financialData.loans.reduce((sum, loan) => sum + loan.minimumPayment, 0);
  
  // Calculate weighted average interest rate
  const weightedInterestRate = financialData.loans.reduce((sum, loan) => 
    sum + (loan.interestRate * (loan.balance / totalLoanBalance)), 0);

  // Get the earliest next payment date
  const nextPaymentDate = financialData.loans
    .map(loan => new Date(loan.nextPaymentDate))
    .sort((a, b) => a.getTime() - b.getTime())[0]
    .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
          <DollarSign className="h-4 w-4 text-indigo-600" />
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
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Credit Cards</CardTitle>
          <CreditCard className="h-4 w-4 text-indigo-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${totalCreditCardBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Total balance across {financialData.creditCards.length} credit cards
          </p>
          <div className="flex justify-between mt-4">
            <span className="text-sm">Available Credit:</span>
            <span className="text-sm font-medium">${totalCreditCardAvailableCredit.toLocaleString('en-US')}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-sm">Total Credit Limit:</span>
            <span className="text-sm font-medium">${totalCreditLimit.toLocaleString('en-US')}</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Business Loans</CardTitle>
          <Banknote className="h-4 w-4 text-indigo-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${totalLoanBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Total balance across {financialData.loans.length} business loans
          </p>
          <div className="flex justify-between mt-4">
            <span className="text-sm">Available Credit:</span>
            <span className="text-sm font-medium">${totalLoanAvailableCredit.toLocaleString('en-US')}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-sm">Total Credit Limit:</span>
            <span className="text-sm font-medium">${totalLoanLimit.toLocaleString('en-US')}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-sm">Avg. Interest Rate:</span>
            <span className="text-sm font-medium">{weightedInterestRate.toFixed(2)}%</span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-sm">Total Monthly Payment:</span>
            <span className="text-sm font-medium">${totalMonthlyPayment.toLocaleString('en-US')}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-sm">Next Payment:</span>
            <span className="text-sm font-medium">{nextPaymentDate}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-sm">Total Minimum Payment:</span>
            <span className="text-sm font-medium">${totalMinimumPayment.toLocaleString('en-US')}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountOverviewCards;

