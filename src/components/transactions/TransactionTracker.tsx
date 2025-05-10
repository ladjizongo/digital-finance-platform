
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Transaction } from "@/types/dashboardTypes";
import { mockTransactions } from "./mockTransactionData";
import TransactionTable from "./TransactionTable";
import TransactionFilters from "./TransactionFilters";
import TransactionDetailModal from "./TransactionDetailModal";
import { formatCurrency, formatDate } from "./transactionUtils";

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

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Transaction Tracker</CardTitle>
        <CardDescription>
          Track and monitor the status of all payment transactions
        </CardDescription>
        
        <TransactionFilters 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          transactionType={transactionType}
          setTransactionType={setTransactionType}
        />
      </CardHeader>
      
      <CardContent>
        <TransactionTable 
          transactions={filteredTransactions}
          onRowClick={handleRowClick}
          formatCurrency={formatCurrency}
          formatDate={formatDate}
        />
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
