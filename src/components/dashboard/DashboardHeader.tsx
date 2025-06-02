
import { ArrowRight, Shield } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const DashboardHeader = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <SidebarTrigger />
          <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/transactions" className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-500">
            <ArrowRight className="mr-2 h-4 w-4" />
            Transactions & Payments
          </Link>
          <Link to="/admin" className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-500">
            <Shield className="mr-2 h-4 w-4" />
            Admin Portal
          </Link>
          <a
            href="https://www.canada.ca/en/revenue-agency/services/payments/payments-cra/individual-payments/make-payment.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            Pay Government Tax
            <span className="sr-only">(opens in new tab)</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
