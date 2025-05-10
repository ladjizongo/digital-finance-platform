
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Transaction } from "@/types/dashboardTypes";
import TransactionStatusBadge from "./TransactionStatusBadge";

interface TransactionTableProps {
  transactions: Transaction[];
  onRowClick: (transaction: Transaction) => void;
  formatCurrency: (amount: number) => string;
  formatDate: (dateString: string) => string;
}

const TransactionTable = ({ transactions, onRowClick, formatCurrency, formatDate }: TransactionTableProps) => {
  return (
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
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <TableRow 
                key={transaction.id}
                onClick={() => onRowClick(transaction)}
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
                <TableCell>{transaction.status && <TransactionStatusBadge status={transaction.status} />}</TableCell>
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
  );
};

export default TransactionTable;
