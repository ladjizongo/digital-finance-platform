
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountOverviewCards from "@/components/dashboard/AccountOverviewCards";
import AccountDetails from "@/components/dashboard/AccountDetails";
import { DownloadStatements } from "@/components/dashboard/DownloadStatements";
import type { FinancialData } from "@/types/dashboardTypes";

interface AccountsTabProps {
  financialData: FinancialData;
  onTabChange: (tab: string) => void;
}

const AccountsTab = ({ financialData, onTabChange }: AccountsTabProps) => {
  const [activeAccount, setActiveAccount] = useState("1");
  
  // Calculate average balance across all accounts
  const averageBalance = financialData.accounts.length 
    ? financialData.accounts.reduce((sum, account) => sum + account.balance, 0) / financialData.accounts.length 
    : 0;

  return (
    <>
      <div className="mb-4 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Total Balance</h2>
          <span className="text-lg">${financialData.totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
        </div>
        <div className="mt-2 text-sm text-muted-foreground flex justify-between">
          <span>Across {financialData.accounts.length} accounts</span>
          <span>Average Balance: ${averageBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
        </div>
      </div>

      <AccountOverviewCards 
        financialData={financialData} 
        onTabChange={onTabChange}
      />
      
      <DownloadStatements
        accounts={financialData.accounts}
        creditCards={financialData.creditCards}
        loans={financialData.loans}
      />
      
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
    </>
  );
};

export default AccountsTab;
