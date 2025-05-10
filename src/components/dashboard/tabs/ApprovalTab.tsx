
import { useState } from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getApprovalLevel } from "@/utils/approvalLevels";

// Sample pending transactions for demonstration
const pendingTransactions = [
  { 
    id: "tx1",
    type: "wire",
    date: "May 8, 2025",
    amount: 12500.00,
    from: "Checking Account",
    to: "Supplier Inc.",
    initiatedBy: "Jane Smith",
    status: "pending"
  },
  { 
    id: "tx2",
    type: "eft",
    date: "May 9, 2025",
    amount: 85000.00,
    from: "Business Account",
    to: "Equipment Vendor Ltd.",
    initiatedBy: "Robert Johnson",
    status: "pending"
  },
  { 
    id: "tx3",
    type: "transfer",
    date: "May 10, 2025",
    amount: 25000.00,
    from: "Investment Account",
    to: "Checking Account",
    initiatedBy: "Sarah Williams",
    status: "pending"
  }
];

const ApprovalTab = () => {
  const { toast } = useToast();
  const [transactions, setTransactions] = useState(pendingTransactions);
  const [activeTab, setActiveTab] = useState("all");

  const handleApprove = (id: string) => {
    setTransactions(prev => prev.filter(tx => tx.id !== id));
    
    toast({
      title: "Transaction approved",
      description: "The transaction has been approved and will be processed shortly."
    });
  };

  const handleReject = (id: string) => {
    setTransactions(prev => prev.filter(tx => tx.id !== id));
    
    toast({
      title: "Transaction rejected",
      description: "The transaction has been rejected and the initiator has been notified."
    });
  };

  const filteredTransactions = activeTab === "all" 
    ? transactions
    : transactions.filter(tx => tx.type === activeTab);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <Clock className="mr-2 h-5 w-5 text-amber-500" />
          Pending Approvals
        </CardTitle>
        <CardDescription>
          Review and approve pending transactions that require your authorization
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="wire">Wire Transfers</TabsTrigger>
            <TabsTrigger value="eft">EFT Payments</TabsTrigger>
            <TabsTrigger value="transfer">Internal Transfers</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            {filteredTransactions.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Approval Level</TableHead>
                    <TableHead>Initiated By</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((tx) => {
                    const approvalLevel = getApprovalLevel(tx.amount);
                    return (
                      <TableRow key={tx.id}>
                        <TableCell>{tx.date}</TableCell>
                        <TableCell className="capitalize">{tx.type}</TableCell>
                        <TableCell>{tx.from}</TableCell>
                        <TableCell>{tx.to}</TableCell>
                        <TableCell>${tx.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="border-amber-500 text-amber-700">
                            {approvalLevel.name} Level
                          </Badge>
                        </TableCell>
                        <TableCell>{tx.initiatedBy}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-red-500 hover:bg-red-50 text-red-600"
                            onClick={() => handleReject(tx.id)}
                          >
                            Reject
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-green-500 hover:bg-green-50 text-green-600"  
                            onClick={() => handleApprove(tx.id)}
                          >
                            <Check className="mr-1 h-4 w-4" /> Approve
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No pending transactions to approve</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ApprovalTab;
