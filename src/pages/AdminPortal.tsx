
import { useState } from "react";
import { Users, Activity, Shield } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import TransactionTracker from "@/components/transactions/TransactionTracker";
import AdminHeader from "@/components/admin/AdminHeader";
import UserManagementTab from "@/components/admin/UserManagementTab";
import LoginAuditTable from "@/components/dashboard/reports/LoginAuditTable";
import { loginAudits } from "@/components/dashboard/reports/data";

const AdminPortal = () => {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader />
        
        <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6">
          <AdminHeader />

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="users" className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                User Management
              </TabsTrigger>
              <TabsTrigger value="audit" className="flex items-center">
                <Shield className="mr-2 h-4 w-4" />
                Login Audit
              </TabsTrigger>
              <TabsTrigger value="transactions" className="flex items-center">
                <Activity className="mr-2 h-4 w-4" />
                Transaction Tracking
              </TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="mt-0">
              <UserManagementTab />
            </TabsContent>

            <TabsContent value="audit" className="mt-0">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Login Audit Trail</h3>
                  <p className="text-gray-600">Monitor user login activity and security events</p>
                </div>
                <LoginAuditTable auditLogs={loginAudits} />
              </div>
            </TabsContent>

            <TabsContent value="transactions" className="mt-0">
              <TransactionTracker />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminPortal;
