
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, CheckCircle, Clock, AlertCircle, Send, RotateCw } from "lucide-react";
import { useState } from "react";
import { Transaction, TransactionStatus } from "@/types/dashboardTypes";
import TransactionDetailModal from "./TransactionDetailModal";

// Mock transaction tracking data with additional info
const mockTransactions: Transaction[] = [
  {
    id: 1001,
    date: "2025-05-10",
    description: "Vendor Payment",
    amount: 1250.00,
    status: "completed",
    type: "eft",
    reference: "EFT-2505-001",
    recipient: "ABC Supplies Inc.",
    trackingId: "TX10051250",
    createdBy: "Jane Smith",
    submittedBy: "Jane Smith",
    approvedBy: ["Michael Johnson"],
    currentLocation: "Treasury Department",
    statusHistory: [
      { status: "received", date: "2025-05-09", actor: "Jane Smith", notes: "Transaction created" },
      { status: "pending_approval", date: "2025-05-09", actor: "System" },
      { status: "approved", date: "2025-05-10", actor: "Michael Johnson", notes: "Approved for payment" },
      { status: "completed", date: "2025-05-10", actor: "System", notes: "Payment completed" }
    ]
  },
  {
    id: 1002,
    date: "2025-05-09",
    description: "International Wire",
    amount: 5000.00,
    status: "with_bank",
    type: "wire",
    reference: "WIRE-0905-123",
    recipient: "Global Partners Ltd.",
    trackingId: "WR09055000",
    createdBy: "David Miller",
    submittedBy: "Sarah Williams",
    approvedBy: ["Michael Johnson", "Robert Brown"],
    currentLocation: "Partner Bank",
    statusHistory: [
      { status: "received", date: "2025-05-08", actor: "David Miller", notes: "Transaction created" },
      { status: "pending_approval", date: "2025-05-08", actor: "System" },
      { status: "approved", date: "2025-05-09", actor: "Michael Johnson", notes: "First approval" },
      { status: "approved", date: "2025-05-09", actor: "Robert Brown", notes: "Second approval" },
      { status: "with_bank", date: "2025-05-09", actor: "System", notes: "Sent to partner bank" }
    ]
  },
  {
    id: 1003,
    date: "2025-05-10",
    description: "To Savings",
    amount: 1000.00,
    status: "completed",
    type: "transfer",
    reference: "INT-1005-456",
    recipient: "Savings Account",
    trackingId: "TR10051000",
    createdBy: "Jane Smith",
    submittedBy: "Jane Smith",
    approvedBy: [],
    currentLocation: "Internal Banking System",
    statusHistory: [
      { status: "received", date: "2025-05-10", actor: "Jane Smith", notes: "Transaction created" },
      { status: "completed", date: "2025-05-10", actor: "System", notes: "Transfer completed" }
    ]
  },
  {
    id: 1004,
    date: "2025-05-08",
    description: "To Client",
    amount: 750.00,
    status: "pending_approval",
    type: "email_transfer",
    reference: "EMT-0805-789",
    recipient: "john.client@example.com",
    trackingId: "ET0805750",
    createdBy: "Sarah Williams",
    submittedBy: "Sarah Williams",
    currentLocation: "Approval Queue",
    statusHistory: [
      { status: "received", date: "2025-05-08", actor: "Sarah Williams", notes: "Transaction created" },
      { status: "pending_approval", date: "2025-05-08", actor: "System", notes: "Waiting for approval" }
    ]
  },
  {
    id: 1005,
    date: "2025-05-07",
    description: "Supplier Payment",
    amount: 3450.00,
    status: "received",
    type: "eft",
    reference: "EFT-0705-234",
    recipient: "Quality Goods Co.",
    trackingId: "TX07053450",
    createdBy: "Robert Brown",
    submittedBy: "Robert Brown",
    currentLocation: "Processing Queue",
    statusHistory: [
      { status: "received", date: "2025-05-07", actor: "Robert Brown", notes: "Transaction created" }
    ]
  },
  {
    id: 1006,
    date: "2025-05-06",
    description: "Overseas Payment",
    amount: 12500.00,
    status: "processing",
    type: "wire",
    reference: "WIRE-0605-567",
    recipient: "Overseas Vendor Inc.",
    trackingId: "WR0605125K",
    createdBy: "Michael Johnson",
    submittedBy: "Michael Johnson",
    approvedBy: ["Sarah Williams", "David Miller"],
    currentLocation: "Wire Department",
    statusHistory: [
      { status: "received", date: "2025-05-05", actor: "Michael Johnson", notes: "Transaction created" },
      { status: "pending_approval", date: "2025-05-05", actor: "System" },
      { status: "approved", date: "2025-05-06", actor: "Sarah Williams", notes: "First approval" },
      { status: "approved", date: "2025-05-06", actor: "David Miller", notes: "Second approval" },
      { status: "processing", date: "2025-05-06", actor: "System", notes: "Processing wire" }
    ]
  },
  {
    id: 1007,
    date: "2025-05-05",
    description: "Weekly Transfer",
    amount: 500.00,
    status: "failed",
    type: "transfer",
    reference: "INT-0505-890",
    recipient: "Checking Account",
    trackingId: "TR0505500F",
    createdBy: "Jane Smith",
    submittedBy: "Jane Smith",
    currentLocation: "Failed Queue",
    statusHistory: [
      { status: "received", date: "2025-05-05", actor: "Jane Smith", notes: "Transaction created" },
      { status: "processing", date: "2025-05-05", actor: "System" },
      { status: "failed", date: "2025-05-05", actor: "System", notes: "Insufficient funds" }
    ]
  }
];

const TransactionTracker = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [transactionType, setTransactionType] = useState<string | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Filter transactions based on search and type
  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesSearch = 
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.reference?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.recipient?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.trackingId?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = transactionType === null || transaction.type === transactionType;
    
    return matchesSearch && matchesType;
  });

  // Handle row click to show transaction details
  const handleRowClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  // Status badge color and icon based on transaction status
  const getStatusBadge = (status: TransactionStatus) => {
    switch (status) {
      case 'received':
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Received
          </Badge>
        );
      case 'pending_approval':
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Awaiting Approval
          </Badge>
        );
      case 'processing':
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 flex items-center gap-1">
            <RotateCw className="h-3 w-3" />
            Processing
          </Badge>
        );
      case 'with_bank':
        return (
          <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 flex items-center gap-1">
            <Send className="h-3 w-3" />
            With Bank
          </Badge>
        );
      case 'completed':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Completed
          </Badge>
        );
      case 'failed':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            Failed
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Format currency values safely
  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString()}`;
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Transaction Tracker</CardTitle>
        <CardDescription>
          Track and monitor the status of all payment transactions
        </CardDescription>
        
        <div className="mt-4 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search by description, reference, or recipient..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Tabs defaultValue={null} value={transactionType || ""} onValueChange={setTransactionType} className="w-full sm:w-auto">
            <TabsList>
              <TabsTrigger value="" onClick={() => setTransactionType(null)}>All</TabsTrigger>
              <TabsTrigger value="eft">EFT</TabsTrigger>
              <TabsTrigger value="wire">Wire</TabsTrigger>
              <TabsTrigger value="transfer">Transfer</TabsTrigger>
              <TabsTrigger value="email_transfer">E-Transfer</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead>Tracking ID</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <TableRow 
                    key={transaction.id}
                    onClick={() => handleRowClick(transaction)}
                    className="cursor-pointer hover:bg-muted"
                  >
                    <TableCell>{formatDate(transaction.date)}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="capitalize">
                        {transaction.type?.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell className="font-mono text-xs">{transaction.reference}</TableCell>
                    <TableCell>{formatCurrency(transaction.amount)}</TableCell>
                    <TableCell>{transaction.recipient}</TableCell>
                    <TableCell className="font-mono text-xs">{transaction.trackingId}</TableCell>
                    <TableCell>{getStatusBadge(transaction.status!)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-6 text-gray-500">
                    No transactions matching your search
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <TransactionDetailModal 
        transaction={selectedTransaction}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </Card>
  );
};

export default TransactionTracker;
