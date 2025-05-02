
export interface Account {
  id: string;
  name: string;
  balance: number;
  accountNumber: string;
}

export interface Transaction {
  id?: number;
  date: string;
  description: string;
  amount: number;
  account?: string;
}

export interface CreditCard {
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
  transactions: Transaction[];
}

export interface Loan {
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
  term?: number;
  remainingTerm?: number;
  transactions: Transaction[];
}

export interface FinancialData {
  totalBalance: number;
  accounts: Account[];
  creditCards: CreditCard[];
  loans: Loan[];
  recentTransactions: Transaction[];
}
