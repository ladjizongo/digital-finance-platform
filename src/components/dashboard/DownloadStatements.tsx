
import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";

interface DownloadStatementsProps {
  accounts: Array<{ id: string; name: string }>;
  creditCards: Array<{ id: string; name: string }>;
  loans: Array<{ id: string; name: string }>;
}

export const DownloadStatements = ({ accounts, creditCards, loans }: DownloadStatementsProps) => {
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedAccount, setSelectedAccount] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");

  const handleDownload = () => {
    if (!selectedType || !selectedAccount || !selectedMonth) {
      toast.error("Please select all required fields");
      return;
    }
    
    // In a real application, this would make an API call to fetch the statement
    toast.success("Your statement is being downloaded");
  };

  const months = [
    "January 2025", "February 2025", "March 2025", "April 2025",
    "December 2024", "November 2024", "October 2024",
  ];

  const getAccountOptions = () => {
    switch (selectedType) {
      case "bank":
        return accounts;
      case "credit":
        return creditCards;
      case "loan":
        return loans;
      default:
        return [];
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Download Statements</CardTitle>
        <FileText className="h-5 w-5 text-indigo-600" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Statement Type</label>
            <Select
              value={selectedType}
              onValueChange={(value) => {
                setSelectedType(value);
                setSelectedAccount("");
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bank">Bank Account</SelectItem>
                <SelectItem value="credit">Credit Card</SelectItem>
                <SelectItem value="loan">Business Loan</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Account</label>
            <Select
              value={selectedAccount}
              onValueChange={setSelectedAccount}
              disabled={!selectedType}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent>
                {getAccountOptions().map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    {account.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Month</label>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger>
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button
              onClick={handleDownload}
              disabled={!selectedType || !selectedAccount || !selectedMonth}
              className="w-full"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Statement
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
