
import React, { useState } from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Clock, Users, Shield, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getApprovalLevel } from "@/utils/approvalLevels";
import { RSATokenVerification } from "@/components/transactions/RSATokenVerification";
import { useUser } from "@/contexts/UserContext";

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
    status: "pending",
    approvers: [
      { name: "Michael Johnson", role: "Manager", status: "pending" },
      { name: "Sarah Williams", role: "Director", status: "pending" }
    ]
  },
  { 
    id: "tx2",
    type: "eft",
    date: "May 9, 2025",
    amount: 85000.00,
    from: "Business Account",
    to: "Equipment Vendor Ltd.",
    initiatedBy: "Robert Johnson",
    status: "pending",
    approvers: [
      { name: "Michael Johnson", role: "Manager", status: "approved" },
      { name: "Sarah Williams", role: "Director", status: "pending" },
      { name: "David Miller", role: "Executive", status: "pending" }
    ]
  },
  { 
    id: "tx3",
    type: "transfer",
    date: "May 10, 2025",
    amount: 25000.00,
    from: "Investment Account",
    to: "Checking Account",
    initiatedBy: "Sarah Williams",
    status: "pending",
    approvers: [
      { name: "Michael Johnson", role: "Manager", status: "pending" },
      { name: "David Miller", role: "Director", status: "pending" }
    ]
  }
];

const ApprovalTab = () => {
  const { toast } = useToast();
  const { currentUser } = useUser();
  const [transactions, setTransactions] = useState(pendingTransactions);
  const [activeTab, setActiveTab] = useState("all");
  const [expandedTransaction, setExpandedTransaction] = useState<string | null>(null);
  const [showRSADialog, setShowRSADialog] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<typeof pendingTransactions[0] | null>(null);

  // Check if current user can approve a specific transaction
  const canApproveTransaction = (transaction: typeof pendingTransactions[0]) => {
    if (!currentUser) return false;
    
    // Admin can't approve, only view
    if (currentUser.role === 'Admin') return false;
    
    // Check if user is in the approvers list and hasn't approved yet
    const userApprover = transaction.approvers.find(
      approver => approver.name === currentUser.name
    );
    
    return userApprover && userApprover.status === 'pending';
  };

  const handleApprove = (id: string, transaction: typeof pendingTransactions[0]) => {
    if (!canApproveTransaction(transaction)) {
      toast({
        title: "Access denied",
        description: "You are not authorized to approve this transaction.",
        variant: "destructive"
      });
      return;
    }

    // Check if transaction requires RSA verification (EFT or Wire with high amount)
    if ((transaction.type === "eft" || transaction.type === "wire") && transaction.amount >= 10000) {
      setSelectedTransaction(transaction);
      setShowRSADialog(true);
      return;
    }

    // Regular approval for other transactions
    completeApproval(id);
  };

  const completeApproval = (id: string) => {
    if (!currentUser) return;

    setTransactions(prev => prev.map(tx => {
      if (tx.id === id) {
        return {
          ...tx,
          approvers: tx.approvers.map(approver => 
            approver.name === currentUser.name 
              ? { ...approver, status: "approved" as const }
              : approver
          )
        };
      }
      return tx;
    }));
    
    toast({
      title: "Transaction approved",
      description: "Your approval has been recorded. The transaction will proceed once all required approvals are obtained."
    });
  };

  const handleRSAVerified = () => {
    if (selectedTransaction) {
      completeApproval(selectedTransaction.id);
    }
    setShowRSADialog(false);
    setSelectedTransaction(null);
  };

  const handleRSACancel = () => {
    setShowRSADialog(false);
    setSelectedTransaction(null);
  };

  const handleReject = (id: string, transaction: typeof pendingTransactions[0]) => {
    if (!canApproveTransaction(transaction)) {
      toast({
        title: "Access denied",
        description: "You are not authorized to reject this transaction.",
        variant: "destructive"
      });
      return;
    }

    setTransactions(prev => prev.filter(tx => tx.id !== id));
    
    toast({
      title: "Transaction rejected",
      description: "The transaction has been rejected and the initiator has been notified."
    });
  };

  const toggleTransactionDetails = (id: string) => {
    setExpandedTransaction(prev => prev === id ? null : id);
  };

  const filteredTransactions = activeTab === "all" 
    ? transactions
    : transactions.filter(tx => tx.type === activeTab);

  const renderApprovalFlow = (transaction: typeof pendingTransactions[0]) => {
    const approvalLevel = getApprovalLevel(transaction.amount);
    const requiresRSA = (transaction.type === "eft" || transaction.type === "wire") && transaction.amount >= 10000;
    
    return (
      <div className="mt-2 bg-gray-50 p-4 rounded-md border border-gray-200">
        <div className="flex items-center mb-3">
          <Users className="h-5 w-5 text-amber-500 mr-2" />
          <h3 className="font-medium text-gray-700">Approval Flow</h3>
          {requiresRSA && (
            <Badge variant="outline" className="ml-2 border-red-500 text-red-700">
              <Shield className="h-3 w-3 mr-1" />
              RSA Required
            </Badge>
          )}
        </div>
        
        <p className="text-sm text-gray-500 mb-3">
          <span className="font-medium">Required approvals:</span> {approvalLevel.requiredApprovers} ({approvalLevel.description})
          {requiresRSA && (
            <span className="block text-red-600 font-medium mt-1">
              RSA token verification required for {transaction.type.toUpperCase()} transactions ≥ $10,000
            </span>
          )}
        </p>
        
        <div className="space-y-3">
          {transaction.approvers.map((approver, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100">
              <div>
                <p className="font-medium">{approver.name}</p>
                <p className="text-sm text-gray-500">{approver.role}</p>
              </div>
              <Badge variant={approver.status === "approved" ? "outline" : "secondary"} 
                className={approver.status === "approved" 
                  ? "border-green-500 text-green-700" 
                  : "border-amber-500 text-amber-700"}>
                {approver.status === "approved" ? (
                  <span className="flex items-center">
                    <Check className="mr-1 h-3 w-3" /> Approved
                  </span>
                ) : "Pending"}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Clock className="mr-2 h-5 w-5 text-amber-500" />
            Pending Approvals
          </CardTitle>
          <CardDescription>
            Review and approve pending transactions that require your authorization. High-value EFT and Wire transfers require RSA token verification.
          </CardDescription>
          
          {currentUser?.role === 'Admin' && (
            <Alert className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Admin View:</strong> You can view all pending approvals but cannot approve transactions. Only designated approvers can approve transactions.
              </AlertDescription>
            </Alert>
          )}
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
                      const isExpanded = expandedTransaction === tx.id;
                      const requiresRSA = (tx.type === "eft" || tx.type === "wire") && tx.amount >= 10000;
                      const canApprove = canApproveTransaction(tx);
                      
                      return (
                        <React.Fragment key={tx.id}>
                          <TableRow 
                            className={isExpanded ? "bg-gray-50" : ""}
                            onClick={() => toggleTransactionDetails(tx.id)}
                            style={{ cursor: "pointer" }}
                          >
                            <TableCell>{tx.date}</TableCell>
                            <TableCell className="capitalize">
                              <div className="flex items-center gap-2">
                                {tx.type}
                                {requiresRSA && (
                                  <Shield className="h-4 w-4 text-red-500" />
                                )}
                              </div>
                            </TableCell>
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
                              {canApprove ? (
                                <>
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="border-red-500 hover:bg-red-50 text-red-600"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleReject(tx.id, tx);
                                    }}
                                  >
                                    Reject
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    className="border-green-500 hover:bg-green-50 text-green-600"  
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleApprove(tx.id, tx);
                                    }}
                                  >
                                    {requiresRSA ? (
                                      <>
                                        <Shield className="mr-1 h-4 w-4" /> RSA Approve
                                      </>
                                    ) : (
                                      <>
                                        <Check className="mr-1 h-4 w-4" /> Approve
                                      </>
                                    )}
                                  </Button>
                                </>
                              ) : (
                                <div className="text-sm text-gray-500">
                                  {currentUser?.role === 'Admin' ? 'View Only' : 'Not Authorized'}
                                </div>
                              )}
                            </TableCell>
                          </TableRow>
                          {isExpanded && (
                            <TableRow>
                              <TableCell colSpan={8} className="p-0">
                                {renderApprovalFlow(tx)}
                              </TableCell>
                            </TableRow>
                          )}
                        </React.Fragment>
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

      <Dialog open={showRSADialog} onOpenChange={setShowRSADialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Security Verification Required</DialogTitle>
          </DialogHeader>
          {selectedTransaction && (
            <RSATokenVerification
              onVerified={handleRSAVerified}
              onCancel={handleRSACancel}
              transactionType={selectedTransaction.type.toUpperCase()}
              amount={selectedTransaction.amount}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ApprovalTab;
