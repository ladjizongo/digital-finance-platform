
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReportTabValue } from "./types";

interface ReportHeaderProps {
  reportType: ReportTabValue;
  resultCount: number;
}

const ReportHeader = ({ reportType, resultCount }: ReportHeaderProps) => {
  const getReportTitle = () => {
    switch (reportType) {
      case "approved": return "Approved Transactions";
      case "declined": return "Declined Transactions";
      case "pending": return "Pending Approvals";
      case "login": return "Login Audit Log";
      default: return "Report";
    }
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        <h3 className="text-lg font-medium">{getReportTitle()}</h3>
        <p className="text-sm text-gray-500">
          Showing {resultCount} results
        </p>
      </div>
      <Button variant="outline" size="sm">
        <Download className="mr-2 h-4 w-4" />
        Export
      </Button>
    </div>
  );
};

export default ReportHeader;
