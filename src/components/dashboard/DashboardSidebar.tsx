
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
    <Sidebar className="border-r border-gray-200 w-64">
      <SidebarHeader className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
            <LayoutDashboard className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-indigo-600">Financial</h2>
            <p className="text-sm text-gray-600">Dashboard</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="flex-1 overflow-y-auto">
        <SidebarGroup>
          <SidebarGroupContent className="p-3">
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onTabChange(item.id)}
                    isActive={activeTab === item.id}
                    className={`w-full justify-start p-3 rounded-lg transition-all duration-200 ${
                      activeTab === item.id 
                        ? 'bg-indigo-50 border-l-4 border-indigo-600 shadow-sm' 
                        : 'hover:bg-gray-50 border-l-4 border-transparent'
                    }`}
                  >
                    <item.icon className={`h-5 w-5 mr-3 ${
                      activeTab === item.id ? 'text-indigo-600' : 'text-gray-500'
                    }`} />
                    <div className="text-left flex-1">
                      <div className={`font-medium ${
                        activeTab === item.id ? 'text-indigo-900' : 'text-gray-900'
                      }`}>
                        {item.title}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {item.description}
                      </div>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="px-3 py-2">
          <div className="h-px bg-gray-200 mb-2"></div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2 px-3">
            Quick Actions
          </p>
        </div>

        <SidebarGroup>
          <SidebarGroupContent className="p-3">
            <SidebarMenu className="space-y-1">
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="w-full justify-start p-3 rounded-lg transition-all duration-200 hover:bg-green-50 border-l-4 border-transparent hover:border-green-400">
                  <Link to="/transactions">
                    <ArrowRight className="h-5 w-5 mr-3 text-green-600" />
                    <div className="text-left flex-1">
                      <div className="font-medium text-green-900">Transactions</div>
                      <div className="text-xs text-gray-500 mt-0.5">Manage payments</div>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="w-full justify-start p-3 rounded-lg transition-all duration-200 hover:bg-purple-50 border-l-4 border-transparent hover:border-purple-400">
                  <Link to="/admin">
                    <Shield className="h-5 w-5 mr-3 text-purple-600" />
                    <div className="text-left flex-1">
                      <div className="font-medium text-purple-900">Admin Portal</div>
                      <div className="text-xs text-gray-500 mt-0.5">Administrative access</div>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="space-y-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start hover:bg-blue-50 border-blue-200 text-blue-700"
            asChild
          >
            <a 
              href="https://www.canada.ca/en/revenue-agency/services/payments/payments-cra/individual-payments/make-payment.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Pay Government Tax
            </a>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start hover:bg-red-50 border-red-200 text-red-700"
          >
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
