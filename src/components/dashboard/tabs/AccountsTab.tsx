
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountOverviewCards from "@/components/dashboard/AccountOverviewCards";
import AccountDetails from "@/components/dashboard/AccountDetails";
import { DownloadStatements } from "@/components/dashboard/DownloadStatements";
import { Pencil, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { FinancialData, Account } from "@/types/dashboardTypes";
import NewAccountDialog from "../NewAccountDialog";

interface AccountsTabProps {
  financialData: FinancialData;
  onTabChange: (tab: string) => void;
}

const AccountsTab = ({ financialData, onTabChange }: AccountsTabProps) => {
  const [activeAccount, setActiveAccount] = useState("1");
  const [accounts, setAccounts] = useState<Account[]>(financialData.accounts);
  const [editingTabId, setEditingTabId] = useState<string | null>(null);
  const [editingTabName, setEditingTabName] = useState("");
  const [showNewAccountDialog, setShowNewAccountDialog] = useState(false);

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
      <NewAccountDialog
        open={showNewAccountDialog}
        onOpenChange={setShowNewAccountDialog}
      />

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
        <div className="flex items-center w-full max-w-4xl mb-4 gap-2">
          <TabsList className="grid grid-cols-5 w-full">
            {accounts.map(account => (
              <TabsTrigger key={account.id} value={account.id} className="relative group">
                {editingTabId === account.id ? (
                  <div className="flex items-center space-x-1" onClick={(e) => e.stopPropagation()}>
                    <Input
                      className="h-6 py-0 px-1 w-28"
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
                  <div className="flex items-center space-x-1 px-1 w-full justify-center">
                    <span className="truncate max-w-[100px]">{account.name}</span>
                    <button 
                      className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                      onClick={(e) => startTabEdit(account, e)}
                    >
                      <Pencil className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          {/* Icon-only button for "Request to Open Bank Account" as a Plus (+) */}
          <Button 
            variant="ghost"
            size="icon"
            className="ml-1 border border-gray-200 hover:bg-indigo-50 transition-colors text-indigo-600"
            title="Request to Open Bank Account"
            aria-label="Request to Open Bank Account"
            onClick={() => setShowNewAccountDialog(true)}
            type="button"
          >
            <Plus size={20} />
            <span className="sr-only">Request to Open Bank Account</span>
          </Button>
        </div>
        
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

