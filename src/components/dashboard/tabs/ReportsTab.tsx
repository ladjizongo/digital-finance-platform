import React, { useState } from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Download, FileText, Search, Users } from "lucide-react";

// Sample data for demonstration
const approvedTransactions = [
  { 
    id: "tx1",
    type: "EFT",
    date: "May 8, 2025",
    amount: 12500.00,
    from: "Checking Account",
    to: "Supplier Inc.",
    initiatedBy: "Jane Smith",
    status: "approved",
    approvedBy: "Michael Johnson",
    approvedDate: "May 9, 2025"
  },
  { 
    id: "tx2",
    type: "Wire",
    date: "May 6, 2025",
    amount: 85000.00,
    from: "Business Account",
    to: "Equipment Vendor Ltd.",
    initiatedBy: "Robert Brown",
    status: "approved",
    approvedBy: "Sarah Williams",
    approvedDate: "May 7, 2025"
  },
  { 
    id: "tx3",
    type: "Transfer",
    date: "May 5, 2025",
    amount: 25000.00,
    from: "Investment Account",
    to: "Checking Account",
    initiatedBy: "David Miller",
    status: "approved",
    approvedBy: "Jane Smith",
    approvedDate: "May 5, 2025"
  },
  { 
    id: "tx4",
    type: "Email Transfer",
    date: "May 7, 2025",
    amount: 5000.00,
    from: "Business Account",
    to: "client@example.com",
    initiatedBy: "Michael Johnson",
    status: "approved",
    approvedBy: "Sarah Williams",
    approvedDate: "May 8, 2025"
  }
];

const loginAudits = [
  {
    id: "login1",
    userId: "jsmith",
    userName: "Jane Smith",
    date: "May 10, 2025",
    time: "09:15:22",
    ipAddress: "192.168.1.105",
    device: "Desktop - Chrome",
    status: "success",
    location: "New York, USA"
  },
  {
    id: "login2",
    userId: "mjohnson",
    userName: "Michael Johnson",
    date: "May 10, 2025",
    time: "10:22:45",
    ipAddress: "192.168.1.110",
    device: "Mobile - Safari",
    status: "success",
    location: "New York, USA"
  },
  {
    id: "login3",
    userId: "rbrown",
    userName: "Robert Brown",
    date: "May 9, 2025",
    time: "16:05:33",
    ipAddress: "192.168.1.115",
    device: "Desktop - Firefox",
    status: "failed",
    location: "Chicago, USA"
  },
  {
    id: "login4",
    userId: "swilliams",
    userName: "Sarah Williams",
    date: "May 9, 2025",
    time: "14:45:12",
    ipAddress: "192.168.1.120",
    device: "Tablet - Chrome",
    status: "success",
    location: "Boston, USA"
  }
];

const declinedTransactions = [
  { 
    id: "dtx1",
    type: "EFT",
    date: "May 7, 2025",
    amount: 45000.00,
    from: "Checking Account",
    to: "Unknown Vendor",
    initiatedBy: "Jane Smith",
    status: "declined",
    declinedBy: "Sarah Williams",
    declinedDate: "May 8, 2025",
    reason: "Suspicious recipient"
  },
  { 
    id: "dtx2",
    type: "Wire",
    date: "May 5, 2025",
    amount: 120000.00,
    from: "Business Account",
    to: "Overseas Corp",
    initiatedBy: "Robert Brown",
    status: "declined",
    declinedBy: "David Miller",
    declinedDate: "May 6, 2025",
    reason: "Exceeds authorization limit"
  },
  { 
    id: "dtx3",
    type: "Email Transfer",
    date: "May 4, 2025",
    amount: 15000.00,
    from: "Investment Account",
    to: "unknown@example.com",
    initiatedBy: "David Miller",
    status: "declined",
    declinedBy: "Michael Johnson",
    declinedDate: "May 5, 2025",
    reason: "Unverified recipient"
  }
];

const pendingTransactions = [
  { 
    id: "ptx1",
    type: "EFT",
    date: "May 9, 2025",
    amount: 18500.00,
    from: "Checking Account",
    to: "Vendor LLC",
    initiatedBy: "Jane Smith",
    status: "pending",
    requiredApprovers: 2,
    currentApprovers: 1,
    waitingFor: "Director level"
  },
  { 
    id: "ptx2",
    type: "Wire",
    date: "May 8, 2025",
    amount: 75000.00,
    from: "Business Account",
    to: "International Partner",
    initiatedBy: "Robert Brown",
    status: "pending",
    requiredApprovers: 3,
    currentApprovers: 1,
    waitingFor: "Executive level"
  },
  { 
    id: "ptx3",
    type: "Transfer",
    date: "May 10, 2025",
    amount: 50000.00,
    from: "Business Account",
    to: "Investment Account",
    initiatedBy: "Sarah Williams",
    status: "pending",
    requiredApprovers: 2,
    currentApprovers: 0,
    waitingFor: "Manager level"
  }
];

const ReportsTab = () => {
  const [reportType, setReportType] = useState("approved");
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined);
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined);
  const [transactionType, setTransactionType] = useState("all");
  const [userFilter, setUserFilter] = useState("all");
  const [amountMin, setAmountMin] = useState("");
  const [amountMax, setAmountMax] = useState("");

  // Filtered data based on selected filters
  const getFilteredData = () => {
    let data;
    
    // Select base data based on report type
    switch (reportType) {
      case "approved":
        data = [...approvedTransactions];
        break;
      case "login":
        data = [...loginAudits];
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
    
    // Skip additional filtering for login audits
    if (reportType === "login") {
      return data;
    }
    
    // Filter by transaction type
    if (transactionType !== "all") {
      data = data.filter(item => item.type.toLowerCase() === transactionType.toLowerCase());
    }
    
    // Filter by date range
    if (dateFrom) {
      data = data.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= dateFrom;
      });
    }
    
    if (dateTo) {
      data = data.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate <= dateTo;
      });
    }
    
    // Filter by amount range for transaction reports
    if (amountMin && !isNaN(parseFloat(amountMin))) {
      const min = parseFloat(amountMin);
      data = data.filter(item => item.amount >= min);
    }
    
    if (amountMax && !isNaN(parseFloat(amountMax))) {
      const max = parseFloat(amountMax);
      data = data.filter(item => item.amount <= max);
    }
    
    // Filter by user
    if (userFilter !== "all") {
      if (reportType === "approved") {
        data = data.filter(item => 
          item.initiatedBy === userFilter || item.approvedBy === userFilter
        );
      } else if (reportType === "declined") {
        data = data.filter(item => 
          item.initiatedBy === userFilter || item.declinedBy === userFilter
        );
      } else if (reportType === "pending") {
        data = data.filter(item => item.initiatedBy === userFilter);
      }
    }
    
    return data;
  };

  const filteredData = getFilteredData();
  
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return <Badge variant="outline" className="border-green-500 text-green-700">Approved</Badge>;
      case "declined":
        return <Badge variant="outline" className="border-red-500 text-red-700">Declined</Badge>;
      case "pending":
        return <Badge variant="outline" className="border-amber-500 text-amber-700">Pending</Badge>;
      case "success":
        return <Badge variant="outline" className="border-green-500 text-green-700">Success</Badge>;
      case "failed":
        return <Badge variant="outline" className="border-red-500 text-red-700">Failed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Function to safely format currency values
  const formatCurrency = (amount: number | undefined) => {
    if (amount === undefined || amount === null) {
      return "$0.00";
    }
    return `$${amount.toLocaleString()}`;
  };

  // List of users for filtering
  const users = ["All Users", "Jane Smith", "Michael Johnson", "Robert Brown", "Sarah Williams", "David Miller"];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <FileText className="mr-2 h-5 w-5 text-indigo-500" />
          Reports
        </CardTitle>
        <CardDescription>
          Generate and view reports for transactions, approvals, and system activity
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={reportType} onValueChange={setReportType} className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-4">
            <TabsTrigger value="approved">Approved Transactions</TabsTrigger>
            <TabsTrigger value="declined">Declined Transactions</TabsTrigger>
            <TabsTrigger value="pending">Pending Approvals</TabsTrigger>
            <TabsTrigger value="login">Login Audit</TabsTrigger>
          </TabsList>
          
          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {reportType !== "login" && (
              <>
                <div>
                  <label className="text-sm font-medium">Transaction Type</label>
                  <Select value={transactionType} onValueChange={setTransactionType}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="eft">EFT</SelectItem>
                      <SelectItem value="wire">Wire</SelectItem>
                      <SelectItem value="transfer">Transfer</SelectItem>
                      <SelectItem value="email transfer">Email Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Amount Range</label>
                  <div className="mt-1 flex space-x-2">
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">$</span>
                      </div>
                      <Input 
                        placeholder="Min" 
                        className="pl-7"
                        value={amountMin}
                        onChange={(e) => setAmountMin(e.target.value)}
                      />
                    </div>
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">$</span>
                      </div>
                      <Input 
                        placeholder="Max" 
                        className="pl-7"
                        value={amountMax}
                        onChange={(e) => setAmountMax(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
            
            <div>
              <label className="text-sm font-medium">User</label>
              <Select value={userFilter} onValueChange={setUserFilter}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select user" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  {users.slice(1).map((user, index) => (
                    <SelectItem key={index} value={user}>{user}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">Date From</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal mt-1"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFrom ? format(dateFrom, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateFrom}
                    onSelect={setDateFrom}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div>
              <label className="text-sm font-medium">Date To</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal mt-1"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateTo ? format(dateTo, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateTo}
                    onSelect={setDateTo}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="flex items-end">
              <Button className="w-full" onClick={() => {}}>
                <Search className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-medium">
                {reportType === "approved" && "Approved Transactions"}
                {reportType === "declined" && "Declined Transactions"}
                {reportType === "pending" && "Pending Approvals"}
                {reportType === "login" && "Login Audit Log"}
              </h3>
              <p className="text-sm text-gray-500">
                Showing {filteredData.length} results
              </p>
            </div>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
          
          <TabsContent value="approved" className="mt-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Initiated By</TableHead>
                  <TableHead>Approved By</TableHead>
                  <TableHead>Approved Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((tx: any) => (
                    <TableRow key={tx.id}>
                      <TableCell>{tx.date}</TableCell>
                      <TableCell>{tx.type}</TableCell>
                      <TableCell>{formatCurrency(tx.amount)}</TableCell>
                      <TableCell>{tx.from}</TableCell>
                      <TableCell>{tx.to}</TableCell>
                      <TableCell>{tx.initiatedBy}</TableCell>
                      <TableCell>{tx.approvedBy}</TableCell>
                      <TableCell>{tx.approvedDate}</TableCell>
                      <TableCell>{getStatusBadge(tx.status)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-4">
                      No approved transactions match your filters
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="login" className="mt-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>User ID</TableHead>
                  <TableHead>User Name</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Device</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((log: any) => (
                    <TableRow key={log.id}>
                      <TableCell>{log.date}</TableCell>
                      <TableCell>{log.time}</TableCell>
                      <TableCell>{log.userId}</TableCell>
                      <TableCell>{log.userName}</TableCell>
                      <TableCell>{log.ipAddress}</TableCell>
                      <TableCell>{log.device}</TableCell>
                      <TableCell>{log.location}</TableCell>
                      <TableCell>{getStatusBadge(log.status)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4">
                      No login records match your filters
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="declined" className="mt-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Initiated By</TableHead>
                  <TableHead>Declined By</TableHead>
                  <TableHead>Declined Date</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((tx: any) => (
                    <TableRow key={tx.id}>
                      <TableCell>{tx.date}</TableCell>
                      <TableCell>{tx.type}</TableCell>
                      <TableCell>{formatCurrency(tx.amount)}</TableCell>
                      <TableCell>{tx.from}</TableCell>
                      <TableCell>{tx.to}</TableCell>
                      <TableCell>{tx.initiatedBy}</TableCell>
                      <TableCell>{tx.declinedBy}</TableCell>
                      <TableCell>{tx.declinedDate}</TableCell>
                      <TableCell>{tx.reason}</TableCell>
                      <TableCell>{getStatusBadge(tx.status)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-4">
                      No declined transactions match your filters
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="pending" className="mt-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Initiated By</TableHead>
                  <TableHead>Required Approvers</TableHead>
                  <TableHead>Current Approvers</TableHead>
                  <TableHead>Waiting For</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((tx: any) => (
                    <TableRow key={tx.id}>
                      <TableCell>{tx.date}</TableCell>
                      <TableCell>{tx.type}</TableCell>
                      <TableCell>{formatCurrency(tx.amount)}</TableCell>
                      <TableCell>{tx.from}</TableCell>
                      <TableCell>{tx.to}</TableCell>
                      <TableCell>{tx.initiatedBy}</TableCell>
                      <TableCell>{tx.requiredApprovers}</TableCell>
                      <TableCell>{tx.currentApprovers}</TableCell>
                      <TableCell>{tx.waitingFor}</TableCell>
                      <TableCell>{getStatusBadge(tx.status)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-4">
                      No pending transactions match your filters
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ReportsTab;
