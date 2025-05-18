
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import { financialData } from "@/data/mockFinancialData";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <DashboardTabs financialData={financialData} />
      </main>
    </div>
  );
};

export default Dashboard;
