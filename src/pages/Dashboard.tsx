
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import AccountsTab from "@/components/dashboard/tabs/AccountsTab";
import CreditCardsTab from "@/components/dashboard/tabs/CreditCardsTab";
import LoansTab from "@/components/dashboard/tabs/LoansTab";
import BusinessHealthTab from "@/components/dashboard/tabs/BusinessHealthTab";
import ExternalAccountTab from "@/components/dashboard/tabs/ExternalAccountTab";
import ApprovalTab from "@/components/dashboard/tabs/ApprovalTab";
import type { FinancialData } from "@/types/dashboardTypes";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("accounts");
  
  const financialData: FinancialData = {
    totalBalance: 24850.75,
    accounts: [
      { id: "1", name: "Checking Account", balance: 3250.75, accountNumber: "****1234" },
      { id: "2", name: "Savings Account", balance: 15600.00, accountNumber: "****5678" },
      { id: "3", name: "Investment Account", balance: 6000.00, accountNumber: "****9012" },
      { id: "4", name: "Retirement Account", balance: 42500.00, accountNumber: "****3456" },
    ],
    creditCards: [
      {
        id: "cc1",
        name: "Premium Rewards Card",
        number: "**** **** **** 4567",
        balance: 2500.30,
        creditLimit: 10000.00,
        availableCredit: 7499.70,
        purchaseRate: 19.99,
        cashAdvanceRate: 22.99,
        dueDate: "May 15, 2025",
        statementDate: "Apr 30, 2025",
        minimumPayment: 125.00,
        transactions: [
          { date: "Apr 20, 2025", description: "Restaurant", amount: -125.30 },
          { date: "Apr 18, 2025", description: "Gas Station", amount: -45.00 },
          { date: "Apr 15, 2025", description: "Online Shopping", amount: -230.00 },
        ]
      },
      {
        id: "cc2",
        name: "Cash Back Card",
        number: "**** **** **** 7890",
        balance: 1750.50,
        creditLimit: 8000.00,
        availableCredit: 6249.50,
        purchaseRate: 18.99,
        cashAdvanceRate: 21.99,
        dueDate: "May 20, 2025",
        statementDate: "Apr 30, 2025",
        minimumPayment: 87.50,
        transactions: [
          { date: "Apr 19, 2025", description: "Grocery Store", amount: -180.50 },
          { date: "Apr 17, 2025", description: "Pharmacy", amount: -65.00 },
          { date: "Apr 14, 2025", description: "Electronics", amount: -505.00 },
        ]
      },
      {
        id: "cc3",
        name: "Travel Miles Card",
        number: "**** **** **** 2345",
        balance: 3200.80,
        creditLimit: 15000.00,
        availableCredit: 11799.20,
        purchaseRate: 20.99,
        cashAdvanceRate: 23.99,
        dueDate: "May 18, 2025",
        statementDate: "Apr 30, 2025",
        minimumPayment: 160.04,
        transactions: [
          { date: "Apr 21, 2025", description: "Airline Tickets", amount: -850.80 },
          { date: "Apr 16, 2025", description: "Hotel", amount: -450.00 },
          { date: "Apr 13, 2025", description: "Car Rental", amount: -200.00 },
        ]
      }
    ],
    loans: [
      {
        id: "loan1",
        name: "Business Line of Credit",
        balance: 75000.00,
        limit: 100000.00,
        availableCredit: 25000.00,
        interestRate: 8.99,
        monthlyPayment: 2291.67,
        nextPaymentDate: "May 1, 2025",
        statementDate: "Apr 30, 2025",
        minimumPayment: 2291.67,
        transactions: [
          { date: "Apr 20, 2025", description: "Equipment Purchase", amount: -25000.00 },
          { date: "Apr 15, 2025", description: "Loan Payment", amount: -2291.67 },
          { date: "Mar 15, 2025", description: "Loan Payment", amount: -2291.67 },
        ]
      },
      {
        id: "loan2",
        name: "Equipment Financing",
        balance: 45000.00,
        limit: 50000.00,
        availableCredit: 5000.00,
        interestRate: 7.50,
        monthlyPayment: 1458.33,
        nextPaymentDate: "May 5, 2025",
        statementDate: "Apr 30, 2025",
        minimumPayment: 1458.33,
        term: 60,
        remainingTerm: 58,
        transactions: [
          { date: "Apr 18, 2025", description: "Manufacturing Equipment", amount: -15000.00 },
          { date: "Apr 15, 2025", description: "Loan Payment", amount: -1458.33 },
          { date: "Mar 15, 2025", description: "Loan Payment", amount: -1458.33 },
        ]
      },
      {
        id: "loan3",
        name: "Overdraft",
        balance: 30000.00,
        limit: 35000.00,
        availableCredit: 5000.00,
        interestRate: 9.99,
        monthlyPayment: 1041.67,
        nextPaymentDate: "May 10, 2025",
        statementDate: "Apr 30, 2025",
        minimumPayment: 1041.67,
        transactions: [
          { date: "Apr 17, 2025", description: "Inventory Purchase", amount: -10000.00 },
          { date: "Apr 15, 2025", description: "Loan Payment", amount: -1041.67 },
          { date: "Mar 15, 2025", description: "Loan Payment", amount: -1041.67 },
        ]
      }
    ],
    recentTransactions: [
      { id: 1, date: "Apr 15, 2025", description: "Grocery Store", amount: -120.53, account: "1" },
      { id: 2, date: "Apr 14, 2025", description: "Salary Deposit", amount: 2800.00, account: "1" },
      { id: 3, date: "Apr 10, 2025", description: "Electric Bill", amount: -95.40, account: "1" },
      { id: 4, date: "Apr 8, 2025", description: "Interest Earned", amount: 12.50, account: "2" },
      { id: 5, date: "Apr 5, 2025", description: "Transfer to Savings", amount: -500.00, account: "1" },
      { id: 6, date: "Apr 5, 2025", description: "Transfer from Checking", amount: 500.00, account: "2" },
    ]
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-4xl mb-4 grid-cols-6">
              <TabsTrigger value="accounts" className="px-2 text-sm">Accounts</TabsTrigger>
              <TabsTrigger value="creditCards" className="px-2 text-sm">Credit Cards</TabsTrigger>
              <TabsTrigger value="loans" className="px-2 text-sm">Loans</TabsTrigger>
              <TabsTrigger value="approvals" className="px-2 text-sm">Approvals</TabsTrigger>
              <TabsTrigger value="businessHealth" className="px-2 text-sm">Business Health</TabsTrigger>
              <TabsTrigger value="externalAccount" className="px-2 text-sm">External Account</TabsTrigger>
            </TabsList>
            
            <TabsContent value="accounts">
              <AccountsTab 
                financialData={financialData}
                onTabChange={handleTabChange} 
              />
            </TabsContent>

            <TabsContent value="creditCards">
              <CreditCardsTab financialData={financialData} />
            </TabsContent>
            
            <TabsContent value="loans">
              <LoansTab financialData={financialData} />
            </TabsContent>
            
            <TabsContent value="approvals">
              <ApprovalTab />
            </TabsContent>
            
            <TabsContent value="businessHealth">
              <BusinessHealthTab />
            </TabsContent>

            <TabsContent value="externalAccount">
              <ExternalAccountTab />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
