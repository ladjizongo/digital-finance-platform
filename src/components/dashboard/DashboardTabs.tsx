
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, CreditCard, Building2, Heart, CheckCircle, FileText } from "lucide-react";
import AccountsTab from "./tabs/AccountsTab";
import CreditCardsTab from "./tabs/CreditCardsTab";
import LoansTab from "./tabs/LoansTab";
import BusinessHealthTab from "./tabs/BusinessHealthTab";
import ApprovalTab from "./tabs/ApprovalTab";
import ReportsTab from "./tabs/ReportsTab";

interface DashboardTabsProps {
  financialData: any;
  onTabChange: (tab: string) => void;
}

const DashboardTabs = ({ financialData, onTabChange }: DashboardTabsProps) => {
  return (
    <Tabs defaultValue="accounts" className="w-full">
      <TabsList className="grid w-full grid-cols-6">
        <TabsTrigger value="accounts" className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          Accounts
        </TabsTrigger>
        <TabsTrigger value="creditCards" className="flex items-center gap-2">
          <CreditCard className="h-4 w-4" />
          Credit Cards
        </TabsTrigger>
        <TabsTrigger value="loans" className="flex items-center gap-2">
          <Building2 className="h-4 w-4" />
          Loans
        </TabsTrigger>
        <TabsTrigger value="businessHealth" className="flex items-center gap-2">
          <Heart className="h-4 w-4" />
          Business Health
        </TabsTrigger>
        <TabsTrigger value="approvals" className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          Approvals
        </TabsTrigger>
        <TabsTrigger value="reports" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Reports
        </TabsTrigger>
      </TabsList>

      <TabsContent value="accounts">
        <AccountsTab financialData={financialData} onTabChange={onTabChange} />
      </TabsContent>
      <TabsContent value="creditCards">
        <CreditCardsTab financialData={financialData} />
      </TabsContent>
      <TabsContent value="loans">
        <LoansTab financialData={financialData} />
      </TabsContent>
      <TabsContent value="businessHealth">
        <BusinessHealthTab />
      </TabsContent>
      <TabsContent value="approvals">
        <ApprovalTab />
      </TabsContent>
      <TabsContent value="reports">
        <ReportsTab />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
