
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import { PlusCircle, ArrowUpDown } from "lucide-react";
import { useState } from "react";
import PADDialog from "./PADDialog";
import type { Account, Transaction } from "@/types/dashboardTypes";

interface AccountDetailsProps {
  account: Account;
  transactions: Transaction[];
}

const AccountDetails = ({ account, transactions }: AccountDetailsProps) => {
  const [isPADDialogOpen, setIsPADDialogOpen] = useState(false);
  const filteredTransactions = transactions.filter(
    transaction => transaction.account === account.id
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{account.name}</CardTitle>
        <CardDescription>Account {account.accountNumber}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold mb-6">
          ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction, idx) => (
                  <TableRow key={transaction.id || idx}>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell className={`text-right ${transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-4 text-gray-500">No recent transactions</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2 justify-between">
        <div className="flex flex-wrap gap-2">
          <Button variant="outline">View All Transactions</Button>
          <Button 
            variant="outline" 
            className="flex items-center" 
            onClick={() => setIsPADDialogOpen(true)}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            PAD Agreement
          </Button>
          <Button variant="outline" className="flex items-center" asChild>
            <Link to="/forex">
              <ArrowUpDown className="mr-2 h-4 w-4" />
              Foreign Exchange
            </Link>
          </Button>
        </div>
        <Button asChild>
          <Link to="/transactions">Make Transaction</Link>
        </Button>
      </CardFooter>
      
      <PADDialog 
        open={isPADDialogOpen} 
        onOpenChange={setIsPADDialogOpen} 
        account={account} 
      />
    </Card>
  );
};

export default AccountDetails;
