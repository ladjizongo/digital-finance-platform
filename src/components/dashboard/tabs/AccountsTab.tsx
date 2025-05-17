
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountOverviewCards from "@/components/dashboard/AccountOverviewCards";
import AccountDetails from "@/components/dashboard/AccountDetails";
import { DownloadStatements } from "@/components/dashboard/DownloadStatements";
import type { FinancialData, Account } from "@/types/dashboardTypes";

interface AccountsTabProps {
  financialData: FinancialData;
  onTabChange: (tab: string) => void;
}

const AccountsTab = ({ financialData, onTabChange }: AccountsTabProps) => {
  const [activeAccount, setActiveAccount] = useState("1");
  const [accounts, setAccounts] = useState<Account[]>(financialData.accounts);

  const handleRenameAccount = (accountId: string, newName: string) => {
    setAccounts(prevAccounts => 
      prevAccounts.map(account => 
        account.id === accountId ? { ...account, name: newName } : account
      )
    );
  };

  return (
    <>
      <AccountOverviewCards 
        financialData={{
          ...financialData,
          accounts
        }} 
        onTabChange={onTabChange}
      />
      
      <DownloadStatements
        accounts={accounts}
        creditCards={financialData.creditCards}
        loans={financialData.loans}
      />
      
      <Tabs defaultValue={activeAccount} value={activeAccount} onValueChange={setActiveAccount} className="w-full">
        <TabsList className="grid grid-cols-5 w-full max-w-md mb-4">
          {accounts.map(account => (
            <TabsTrigger key={account.id} value={account.id}>
              Account {account.id}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {accounts.map(account => (
          <TabsContent key={account.id} value={account.id} className="space-y-4">
            <AccountDetails
              account={account}
              transactions={financialData.recentTransactions}
              onRenameAccount={handleRenameAccount}
            />
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
};

export default AccountsTab;
