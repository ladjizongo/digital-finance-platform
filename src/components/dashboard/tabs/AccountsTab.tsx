
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountOverviewCards from "@/components/dashboard/AccountOverviewCards";
import AccountDetails from "@/components/dashboard/AccountDetails";
import { DownloadStatements } from "@/components/dashboard/DownloadStatements";
import { Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { FinancialData, Account } from "@/types/dashboardTypes";

interface AccountsTabProps {
  financialData: FinancialData;
  onTabChange: (tab: string) => void;
}

const AccountsTab = ({ financialData, onTabChange }: AccountsTabProps) => {
  const [activeAccount, setActiveAccount] = useState("1");
  const [accounts, setAccounts] = useState<Account[]>(financialData.accounts);
  const [editingTabId, setEditingTabId] = useState<string | null>(null);
  const [editingTabName, setEditingTabName] = useState("");

  const handleRenameAccount = (accountId: string, newName: string) => {
    setAccounts(prevAccounts => 
      prevAccounts.map(account => 
        account.id === accountId ? { ...account, name: newName } : account
      )
    );
  };

  const startTabEdit = (account: Account, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingTabId(account.id);
    setEditingTabName(account.name);
  };

  const saveTabEdit = () => {
    if (editingTabId && editingTabName.trim() !== "") {
      handleRenameAccount(editingTabId, editingTabName);
      toast.success("Account renamed successfully");
      setEditingTabId(null);
    } else if (editingTabName.trim() === "") {
      toast.error("Account name cannot be empty");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      saveTabEdit();
    } else if (e.key === "Escape") {
      setEditingTabId(null);
    }
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
            <TabsTrigger key={account.id} value={account.id} className="relative group">
              {editingTabId === account.id ? (
                <div className="flex items-center space-x-1" onClick={(e) => e.stopPropagation()}>
                  <Input
                    className="h-6 py-0 px-1 w-24"
                    value={editingTabName}
                    onChange={(e) => setEditingTabName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                  />
                  <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex space-x-1">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-5 w-5 p-0" 
                      onClick={saveTabEdit}
                    >
                      ✓
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-5 w-5 p-0" 
                      onClick={() => setEditingTabId(null)}
                    >
                      ✕
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-1">
                  <span className="truncate">{account.name}</span>
                  <button 
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => startTabEdit(account, e)}
                  >
                    <Pencil className="h-3 w-3" />
                  </button>
                </div>
              )}
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
