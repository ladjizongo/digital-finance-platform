
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountsTab from "@/components/dashboard/tabs/AccountsTab";
import CreditCardsTab from "@/components/dashboard/tabs/CreditCardsTab";
import LoansTab from "@/components/dashboard/tabs/LoansTab";
import BusinessHealthTab from "@/components/dashboard/tabs/BusinessHealthTab";
import ExternalAccountTab from "@/components/dashboard/tabs/ExternalAccountTab";
import ApprovalTab from "@/components/dashboard/tabs/ApprovalTab";
import ReportsTab from "@/components/dashboard/tabs/ReportsTab";
import ExternalDataSourcesTab from "@/components/dashboard/tabs/ExternalDataSourcesTab";
import type { FinancialData } from "@/types/dashboardTypes";

interface DashboardTabsProps {
  financialData: FinancialData;
}

const DashboardTabs = ({ financialData }: DashboardTabsProps) => {
  const [activeTab, setActiveTab] = useState("accounts");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="mb-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-4xl mb-4 grid-cols-8">
          <TabsTrigger value="accounts" className="px-2 text-sm">Accounts</TabsTrigger>
          <TabsTrigger value="creditCards" className="px-2 text-sm">Credit Cards</TabsTrigger>
          <TabsTrigger value="loans" className="px-2 text-sm">Loans</TabsTrigger>
          <TabsTrigger value="approvals" className="px-2 text-sm">Approvals</TabsTrigger>
          <TabsTrigger value="reports" className="px-2 text-sm">Reports</TabsTrigger>
          <TabsTrigger value="businessHealth" className="px-2 text-sm">Business Health</TabsTrigger>
          <TabsTrigger value="externalData" className="px-2 text-sm">External Data</TabsTrigger>
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
        
        <TabsContent value="reports">
          <ReportsTab />
        </TabsContent>
        
        <TabsContent value="businessHealth">
          <BusinessHealthTab />
        </TabsContent>

        <TabsContent value="externalData">
          <ExternalDataSourcesTab />
        </TabsContent>

        <TabsContent value="externalAccount">
          <ExternalAccountTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardTabs;
