import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import AccountOverviewCards from "@/components/dashboard/AccountOverviewCards";
import AccountDetails from "@/components/dashboard/AccountDetails";
import FinancialHealthCard from "@/components/FinancialHealthCard";
import CreditDocumentUpload from "@/components/financial/CreditDocumentUpload";

const Dashboard = () => {
  const [activeAccount, setActiveAccount] = useState("1");
  const [activeTab, setActiveTab] = useState("accounts");
  
  const financialData = {
    totalBalance: 24850.75,
    accounts: [
      { id: "1", name: "Checking Account", balance: 3250.75, accountNumber: "****1234" },
      { id: "2", name: "Savings Account", balance: 15600.00, accountNumber: "****5678" },
      { id: "3", name: "Investment Account", balance: 6000.00, accountNumber: "****9012" },
      { id: "4", name: "Retirement Account", balance: 42500.00, accountNumber: "****3456" },
    ],
    creditCard: {
      balance: 1250.30,
      availableCredit: 8749.70,
      dueDate: "May 15, 2025",
      lastStatement: "April 1, 2025",
    },
    mortgage: {
      balance: 285000.00,
      monthlyPayment: 1450.00,
      nextPaymentDate: "May 1, 2025",
      interestRate: "3.25%",
    },
    recentTransactions: [
      { id: 1, date: "Apr 15, 2025", description: "Grocery Store", amount: -120.53, account: "1" },
      { id: 2, date: "Apr 14, 2025", description: "Salary Deposit", amount: 2800.00, account: "1" },
      { id: 3, date: "Apr 10, 2025", description: "Electric Bill", amount: -95.40, account: "1" },
      { id: 4, date: "Apr 8, 2025", description: "Interest Earned", amount: 12.50, account: "2" },
      { id: 5, date: "Apr 5, 2025", description: "Transfer to Savings", amount: -500.00, account: "1" },
      { id: 6, date: "Apr 5, 2025", description: "Transfer from Checking", amount: 500.00, account: "2" },
    ]
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 w-full max-w-md mb-4">
              <TabsTrigger value="accounts">Accounts</TabsTrigger>
              <TabsTrigger value="businessHealth">Business Health</TabsTrigger>
            </TabsList>
            
            <TabsContent value="accounts" className="space-y-4">
              <AccountOverviewCards financialData={financialData} />
              
              <Tabs defaultValue={activeAccount} value={activeAccount} onValueChange={setActiveAccount} className="w-full">
                <TabsList className="grid grid-cols-4 w-full max-w-md mb-4">
                  {financialData.accounts.map(account => (
                    <TabsTrigger key={account.id} value={account.id}>
                      Account {account.id}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {financialData.accounts.map(account => (
                  <TabsContent key={account.id} value={account.id} className="space-y-4">
                    <AccountDetails
                      account={account}
                      transactions={financialData.recentTransactions}
                    />
                  </TabsContent>
                ))}
              </Tabs>

              <div className="mt-8">
                <CreditDocumentUpload />
              </div>
            </TabsContent>
            
            <TabsContent value="businessHealth" className="space-y-4">
              <FinancialHealthCard />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
