
import { useState } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import AccountsTab from "@/components/dashboard/tabs/AccountsTab";
import CreditCardsTab from "@/components/dashboard/tabs/CreditCardsTab";
import LoansTab from "@/components/dashboard/tabs/LoansTab";
import BusinessHealthTab from "@/components/dashboard/tabs/BusinessHealthTab";
import ExternalAccountTab from "@/components/dashboard/tabs/ExternalAccountTab";
import ApprovalTab from "@/components/dashboard/tabs/ApprovalTab";
import ReportsTab from "@/components/dashboard/tabs/ReportsTab";
import { financialData } from "@/data/mockFinancialData";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("accounts");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "accounts":
        return <AccountsTab financialData={financialData} onTabChange={handleTabChange} />;
      case "creditCards":
        return <CreditCardsTab financialData={financialData} />;
      case "loans":
        return <LoansTab financialData={financialData} />;
      case "approvals":
        return <ApprovalTab />;
      case "reports":
        return <ReportsTab />;
      case "businessHealth":
        return <BusinessHealthTab />;
      case "externalAccount":
        return <ExternalAccountTab />;
      default:
        return <AccountsTab financialData={financialData} onTabChange={handleTabChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <DashboardSidebar 
            activeTab={activeTab} 
            onTabChange={handleTabChange} 
          />
          <SidebarInset className="flex-1">
            <DashboardHeader />
            <main className="flex-1 p-6">
              <div className="max-w-7xl mx-auto">
                {renderTabContent()}
              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Dashboard;
