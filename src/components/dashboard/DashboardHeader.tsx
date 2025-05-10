
import { LogOut, ArrowRight, Shield, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const DashboardHeader = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">Financial Dashboard</h1>
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
            <span className="text-gray-600">Welcome, User</span>
            <Button variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
