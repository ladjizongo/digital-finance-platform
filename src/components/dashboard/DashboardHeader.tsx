
import { FileText, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface BankLink {
  name: string;
  url: string;
}

const bankLinks: BankLink[] = [
  { name: "RBC Royal Bank", url: "https://www.rbcroyalbank.com/onlinebanking/bankingusertips/other-useful-services/download-your-transactions.html" },
  { name: "CIBC", url: "https://www.cibc.com/en/personal-banking/ways-to-bank/how-to/download-transactions.html" },
  { name: "TD Canada Trust", url: "https://www.td.com/ca/en/personal-banking/how-to/digital-banking/banking-the-way-you-want-it/download-statements/" },
  { name: "BMO", url: "https://www.bmo.com/main/personal/ways-to-bank/online-banking/" },
  { name: "National Bank", url: "https://www.nbc.ca/personal/accounts/banking-services/online-banking.html" },
  { name: "Desjardins", url: "https://www.desjardins.com/ca/personal/accounts-services/ways-to-bank/online/accesD/index.jsp" }
];

const DashboardHeader = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">Financial Dashboard</h1>
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500">
                  <FileText className="mr-2 h-4 w-4" />
                  Link External Account
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white">
                {bankLinks.map((bank) => (
                  <DropdownMenuItem key={bank.name} asChild>
                    <a
                      href={bank.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center cursor-pointer"
                    >
                      {bank.name}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <a
              href="https://www.irs.gov/payments"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              <FileText className="mr-2 h-4 w-4" />
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
