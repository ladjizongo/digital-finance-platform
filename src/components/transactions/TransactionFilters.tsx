
import React from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

interface TransactionFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  transactionType: string | null;
  setTransactionType: (type: string | null) => void;
}

const TransactionFilters = ({ 
  searchQuery, 
  setSearchQuery, 
  transactionType, 
  setTransactionType 
}: TransactionFiltersProps) => {
  return (
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
      
      <Tabs defaultValue={transactionType || ""} value={transactionType || ""} onValueChange={setTransactionType} className="w-full sm:w-auto">
        <TabsList>
          <TabsTrigger value="" onClick={() => setTransactionType(null)}>All</TabsTrigger>
          <TabsTrigger value="eft">EFT</TabsTrigger>
          <TabsTrigger value="wire">Wire</TabsTrigger>
          <TabsTrigger value="transfer">Transfer</TabsTrigger>
          <TabsTrigger value="email_transfer">E-Transfer</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default TransactionFilters;
