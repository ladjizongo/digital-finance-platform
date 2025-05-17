
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import { PlusCircle, Pencil } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import PADDialog from "./pad/PADDialog";
import type { Account, Transaction } from "@/types/dashboardTypes";

interface AccountDetailsProps {
  account: Account;
  transactions: Transaction[];
  onRenameAccount?: (accountId: string, newName: string) => void;
}

const AccountDetails = ({ account, transactions, onRenameAccount }: AccountDetailsProps) => {
  const [isPADDialogOpen, setIsPADDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [accountName, setAccountName] = useState(account.name);
  
  const filteredTransactions = transactions.filter(
    transaction => transaction.account === account.id
  );

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveName = () => {
    if (accountName.trim() === "") {
      toast.error("Account name cannot be empty");
      return;
    }
    
    if (onRenameAccount) {
      onRenameAccount(account.id, accountName);
      toast.success("Account renamed successfully");
    }
    
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setAccountName(account.name);
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          {isEditing ? (
            <div className="flex space-x-2 items-center">
              <Input
                className="font-semibold text-lg"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                autoFocus
              />
              <Button size="sm" onClick={handleSaveName}>Save</Button>
              <Button size="sm" variant="outline" onClick={handleCancelEdit}>Cancel</Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <CardTitle>{account.name}</CardTitle>
              {onRenameAccount && (
                <Button variant="ghost" size="icon" onClick={handleEditClick}>
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Edit account name</span>
                </Button>
              )}
            </div>
          )}
          <CardDescription>Account {account.accountNumber}</CardDescription>
        </div>
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
