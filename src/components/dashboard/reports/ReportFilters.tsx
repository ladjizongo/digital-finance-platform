
import { useState } from "react";
import { format } from "date-fns";
import { Search, CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { BaseReportFilters, ReportTabValue, TransactionReportFilters } from "./types";

interface ReportFiltersProps {
  reportType: ReportTabValue;
  filters: TransactionReportFilters;
  onFilterChange: (filters: Partial<TransactionReportFilters>) => void;
  onGenerateReport: () => void;
}

const ReportFilters = ({ reportType, filters, onFilterChange, onGenerateReport }: ReportFiltersProps) => {
  // List of users for filtering
  const users = ["All Users", "Jane Smith", "Michael Johnson", "Robert Brown", "Sarah Williams", "David Miller"];

  return (
    <>
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {reportType !== "login" && (
          <>
            <div>
              <label className="text-sm font-medium">Transaction Type</label>
              <Select 
                value={filters.transactionType} 
                onValueChange={(value) => onFilterChange({ transactionType: value })}
              >
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
                    value={filters.amountMin}
                    onChange={(e) => onFilterChange({ amountMin: e.target.value })}
                  />
                </div>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <Input 
                    placeholder="Max" 
                    className="pl-7"
                    value={filters.amountMax}
                    onChange={(e) => onFilterChange({ amountMax: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </>
        )}
        
        <div>
          <label className="text-sm font-medium">User</label>
          <Select 
            value={filters.userFilter} 
            onValueChange={(value) => onFilterChange({ userFilter: value })}
          >
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
                {filters.dateFrom ? format(filters.dateFrom, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={filters.dateFrom}
                onSelect={(date) => onFilterChange({ dateFrom: date })}
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
                {filters.dateTo ? format(filters.dateTo, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={filters.dateTo}
                onSelect={(date) => onFilterChange({ dateTo: date })}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="flex items-end">
          <Button className="w-full" onClick={onGenerateReport}>
            <Search className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>
    </>
  );
};

export default ReportFilters;
