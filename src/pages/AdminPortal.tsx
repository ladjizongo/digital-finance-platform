
import { useState } from "react";
import { Users, Activity } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import TransactionTracker from "@/components/transactions/TransactionTracker";
import AdminHeader from "@/components/admin/AdminHeader";
import UserManagementTab from "@/components/admin/UserManagementTab";

const AdminPortal = () => {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6">
        <AdminHeader />

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="users" className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              User Management
            </TabsTrigger>
            <TabsTrigger value="transactions" className="flex items-center">
              <Activity className="mr-2 h-4 w-4" />
              Transaction Tracking
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="mt-0">
            <UserManagementTab />
          </TabsContent>

          <TabsContent value="transactions" className="mt-0">
            <TransactionTracker />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminPortal;
