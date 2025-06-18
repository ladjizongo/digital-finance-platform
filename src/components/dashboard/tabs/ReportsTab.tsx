
import React, { useState } from "react";
import { FileText } from "lucide-react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ReportFilters from "../reports/ReportFilters";
import ReportHeader from "../reports/ReportHeader";
import ApprovedTransactionsTable from "../reports/ApprovedTransactionsTable";
import DeclinedTransactionsTable from "../reports/DeclinedTransactionsTable";
import PendingTransactionsTable from "../reports/PendingTransactionsTable";
import { 
  approvedTransactions, 
  declinedTransactions, 
  pendingTransactions 
} from "../reports/data";
import { TransactionReportFilters } from "../reports/types";

type ReportTabValue = 'approved' | 'declined' | 'pending';

const ReportsTab = () => {
  const [reportType, setReportType] = useState<ReportTabValue>("approved");
  const [filters, setFilters] = useState<TransactionReportFilters>({
    dateFrom: undefined,
    dateTo: undefined,
    transactionType: "all",
    userFilter: "all",
    amountMin: "",
    amountMax: ""
  });

  // Handle filter changes
  const handleFilterChange = (newFilters: Partial<TransactionReportFilters>) => {
    setFilters({
      ...filters,
      ...newFilters
    });
  };

  // Filtered data based on selected filters
  const getFilteredData = () => {
    let data;
    
    // Select base data based on report type
    switch (reportType) {
      case "approved":
        data = [...approvedTransactions];
        break;
      case "declined":
        data = [...declinedTransactions];
        break;
      case "pending":
        data = [...pendingTransactions];
        break;
      default:
        data = [];
    }
    
    // Filter by transaction type
    if (filters.transactionType !== "all") {
      data = data.filter(item => item.type.toLowerCase() === filters.transactionType.toLowerCase());
    }
    
    // Filter by date range
    if (filters.dateFrom) {
      data = data.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= filters.dateFrom!;
      });
    }
    
    if (filters.dateTo) {
      data = data.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate <= filters.dateTo!;
      });
    }
    
    // Filter by amount range for transaction reports
    if (filters.amountMin && !isNaN(parseFloat(filters.amountMin))) {
      const min = parseFloat(filters.amountMin);
      data = data.filter(item => item.amount >= min);
    }
    
    if (filters.amountMax && !isNaN(parseFloat(filters.amountMax))) {
      const max = parseFloat(filters.amountMax);
      data = data.filter(item => item.amount <= max);
    }
    
    // Filter by user
    if (filters.userFilter !== "all") {
      if (reportType === "approved") {
        data = data.filter(item => 
          item.initiatedBy === filters.userFilter || item.approvedBy === filters.userFilter
        );
      } else if (reportType === "declined") {
        data = data.filter(item => 
          item.initiatedBy === filters.userFilter || item.declinedBy === filters.userFilter
        );
      } else if (reportType === "pending") {
        data = data.filter(item => item.initiatedBy === filters.userFilter);
      }
    }
    
    return data;
  };

  const filteredData = getFilteredData();
  
  const handleGenerateReport = () => {
    // This function can be expanded later to fetch data from an API
    // For now, it just triggers filtering
    console.log("Generating report with filters:", filters);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <FileText className="mr-2 h-5 w-5 text-indigo-500" />
          Reports
        </CardTitle>
        <CardDescription>
          Generate and view reports for transactions and approvals
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={reportType} onValueChange={setReportType as any} className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-3">
            <TabsTrigger value="approved">Approved Transactions</TabsTrigger>
            <TabsTrigger value="declined">Declined Transactions</TabsTrigger>
            <TabsTrigger value="pending">Pending Approvals</TabsTrigger>
          </TabsList>
          
          {/* Report Filters */}
          <ReportFilters 
            reportType={reportType}
            filters={filters}
            onFilterChange={handleFilterChange}
            onGenerateReport={handleGenerateReport}
          />

          {/* Report Header */}
          <ReportHeader 
            reportType={reportType}
            resultCount={filteredData.length}
          />
          
          {/* Report Tables */}
          <TabsContent value="approved" className="mt-0">
            <ApprovedTransactionsTable transactions={filteredData as any} />
          </TabsContent>
          
          <TabsContent value="declined" className="mt-0">
            <DeclinedTransactionsTable transactions={filteredData as any} />
          </TabsContent>
          
          <TabsContent value="pending" className="mt-0">
            <PendingTransactionsTable transactions={filteredData as any} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ReportsTab;
