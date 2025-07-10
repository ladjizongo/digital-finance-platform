
import { SidebarTrigger } from "@/components/ui/sidebar";
import LogoutButton from "@/components/auth/LogoutButton";

const DashboardHeader = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <SidebarTrigger />
          <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <a
            href="https://www.canada.ca/en/revenue-agency/services/payments/payments-cra/individual-payments/make-payment.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            Pay Government Tax
            <span className="sr-only">(opens in new tab)</span>
          </a>
          <LogoutButton variant="outline" size="sm" />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
