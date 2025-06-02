
import { useState } from "react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  CreditCard, 
  Banknote, 
  CheckCircle, 
  FileText, 
  Activity, 
  ExternalLink,
  LogOut,
  ArrowRight,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface DashboardSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const DashboardSidebar = ({ activeTab, onTabChange }: DashboardSidebarProps) => {
  const menuItems = [
    {
      id: "accounts",
      title: "Accounts",
      icon: LayoutDashboard,
      description: "View all accounts"
    },
    {
      id: "creditCards", 
      title: "Credit Cards",
      icon: CreditCard,
      description: "Manage credit cards"
    },
    {
      id: "loans",
      title: "Loans", 
      icon: Banknote,
      description: "Loan management"
    },
    {
      id: "approvals",
      title: "Approvals",
      icon: CheckCircle,
      description: "Pending approvals"
    },
    {
      id: "reports",
      title: "Reports",
      icon: FileText,
      description: "Financial reports"
    },
    {
      id: "businessHealth",
      title: "Business Health",
      icon: Activity,
      description: "Health metrics"
    },
    {
      id: "externalAccount",
      title: "External Account",
      icon: ExternalLink,
      description: "External connections"
    }
  ];

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <LayoutDashboard className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-indigo-600">Financial</h2>
            <p className="text-sm text-gray-600">Dashboard</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onTabChange(item.id)}
                    isActive={activeTab === item.id}
                    className="w-full justify-start p-3 rounded-lg transition-colors hover:bg-indigo-50"
                  >
                    <item.icon className={`h-5 w-5 mr-3 ${
                      activeTab === item.id ? 'text-indigo-600' : 'text-gray-500'
                    }`} />
                    <div className="text-left">
                      <div className={`font-medium ${
                        activeTab === item.id ? 'text-indigo-900' : 'text-gray-900'
                      }`}>
                        {item.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        {item.description}
                      </div>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              
              {/* Navigation Links */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="w-full justify-start p-3 rounded-lg transition-colors hover:bg-green-50">
                  <Link to="/transactions" className="flex items-center">
                    <ArrowRight className="h-5 w-5 mr-3 text-green-600" />
                    <div className="text-left">
                      <div className="font-medium text-green-900">Transactions & Payments</div>
                      <div className="text-xs text-gray-500">Manage transactions</div>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="w-full justify-start p-3 rounded-lg transition-colors hover:bg-purple-50">
                  <Link to="/admin" className="flex items-center">
                    <Shield className="h-5 w-5 mr-3 text-purple-600" />
                    <div className="text-left">
                      <div className="font-medium text-purple-900">Admin Portal</div>
                      <div className="text-xs text-gray-500">Administrative access</div>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-gray-200">
        <div className="space-y-2">
          <Button variant="outline" size="sm" className="w-full justify-start">
            <ExternalLink className="h-4 w-4 mr-2" />
            Pay Government Tax
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">Welcome, User</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
