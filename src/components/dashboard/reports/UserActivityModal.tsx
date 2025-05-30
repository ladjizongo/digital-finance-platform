
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CreditCard, MousePointer, User } from "lucide-react";
import { formatCurrency, formatDate } from "../../transactions/transactionUtils";

interface UserTransaction {
  id: string;
  date: string;
  type: string;
  amount: number;
  description: string;
  status: string;
  reference?: string;
}

interface UserActivity {
  id: string;
  timestamp: string;
  action: string;
  page: string;
  details?: string;
}

interface UserActivityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userName: string;
  userEmail?: string;
}

// Mock data - in a real app, this would come from an API
const mockUserTransactions: UserTransaction[] = [
  {
    id: "TXN001",
    date: "2025-05-29",
    type: "Wire Transfer",
    amount: 15000,
    description: "Payment to Supplier ABC",
    status: "completed",
    reference: "WR240529001"
  },
  {
    id: "TXN002", 
    date: "2025-05-28",
    type: "EFT",
    amount: 2500,
    description: "Payroll Transfer",
    status: "completed",
    reference: "EFT240528002"
  },
  {
    id: "TXN003",
    date: "2025-05-27",
    type: "Email Transfer",
    amount: 750,
    description: "Contractor Payment",
    status: "pending",
    reference: "ET240527003"
  }
];

const mockUserActivity: UserActivity[] = [
  {
    id: "ACT001",
    timestamp: "2025-05-29 14:32:15",
    action: "Viewed Dashboard",
    page: "/dashboard",
    details: "Accessed main dashboard"
  },
  {
    id: "ACT002",
    timestamp: "2025-05-29 14:30:22",
    action: "Initiated Wire Transfer",
    page: "/transactions",
    details: "Started wire transfer form"
  },
  {
    id: "ACT003",
    timestamp: "2025-05-29 14:28:45",
    action: "Viewed Reports",
    page: "/dashboard?tab=reports",
    details: "Accessed transaction reports"
  },
  {
    id: "ACT004",
    timestamp: "2025-05-29 14:25:12",
    action: "Clicked Business Health",
    page: "/dashboard?tab=business-health",
    details: "Navigated to business health tab"
  },
  {
    id: "ACT005",
    timestamp: "2025-05-29 14:20:33",
    action: "Logged In",
    page: "/login",
    details: "Successful authentication"
  }
];

const UserActivityModal = ({ open, onOpenChange, userName, userEmail }: UserActivityModalProps) => {
  const [activeTab, setActiveTab] = useState("transactions");

  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "failed":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <User className="mr-2 h-5 w-5 text-indigo-500" />
            User Activity - {userName}
          </DialogTitle>
          {userEmail && (
            <p className="text-sm text-muted-foreground">{userEmail}</p>
          )}
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="transactions" className="flex items-center">
              <CreditCard className="mr-2 h-4 w-4" />
              Transactions
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center">
              <Activity className="mr-2 h-4 w-4" />
              Page Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="transactions" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Reference</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockUserTransactions.length > 0 ? (
                        mockUserTransactions.map((transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell>{formatDate(transaction.date)}</TableCell>
                            <TableCell>
                              <Badge variant="secondary">{transaction.type}</Badge>
                            </TableCell>
                            <TableCell>{transaction.description}</TableCell>
                            <TableCell className="font-medium">
                              {formatCurrency(transaction.amount)}
                            </TableCell>
                            <TableCell className="font-mono text-xs">
                              {transaction.reference}
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusBadgeColor(transaction.status)}>
                                {transaction.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                            No transactions found for this user
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Page Activity & Navigation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead>Page/URL</TableHead>
                        <TableHead>Details</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockUserActivity.length > 0 ? (
                        mockUserActivity.map((activity) => (
                          <TableRow key={activity.id}>
                            <TableCell className="font-mono text-xs">
                              {activity.timestamp}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <MousePointer className="mr-2 h-3 w-3 text-blue-500" />
                                {activity.action}
                              </div>
                            </TableCell>
                            <TableCell className="font-mono text-xs">
                              {activity.page}
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {activity.details}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                            No activity found for this user
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default UserActivityModal;
