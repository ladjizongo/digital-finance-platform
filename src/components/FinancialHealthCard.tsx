import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { UploadSection } from "./financial/UploadSection";
import { MetricCard } from "./financial/MetricCard";
import { CashFlowTable } from "./financial/CashFlowTable";
import { FinancialMetrics, YearlyMetrics } from "@/types/financial";
import { ManualEntryForm } from "./financial/ManualEntryForm";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const financialFormSchema = z.object({
  // Year
  year: z.string().min(4, { message: "Please select a year" }),
  
  // Assets
  currentAssets: z.coerce.number().min(0, { message: "Current assets must be 0 or greater" }),
  longTermAssets: z.coerce.number().min(0, { message: "Long-term assets must be 0 or greater" }),
  
  // Liabilities
  currentLiabilities: z.coerce.number().min(0, { message: "Current liabilities must be 0 or greater" }),
  longTermLiabilities: z.coerce.number().min(0, { message: "Long-term liabilities must be 0 or greater" }),
  
  // Income Statement
  revenue: z.coerce.number().min(0, { message: "Revenue must be 0 or greater" }),
  expenses: z.coerce.number().min(0, { message: "Expenses must be 0 or greater" }),
  
  // Metrics
  payableDays: z.coerce.number().min(0, { message: "Payable days must be 0 or greater" }),
  receivableDays: z.coerce.number().min(0, { message: "Receivable days must be 0 or greater" }),
  biWeeklyPayroll: z.coerce.number().min(0, { message: "Bi-weekly payroll must be 0 or greater" }),
  monthlyPayables: z.coerce.number().min(0, { message: "Monthly payables must be 0 or greater" }),
  monthlyReceivables: z.coerce.number().min(0, { message: "Monthly receivables must be 0 or greater" }),
  
  // Optional notes
  notes: z.string().optional(),
});

type FinancialFormValues = z.infer<typeof financialFormSchema>;

const FinancialHealthCard = () => {
  const [file, setFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<"upload" | "manual">("upload");
  const [activeAccount, setActiveAccount] = useState("1");
  const queryClient = useQueryClient();

  // Use React Query to fetch and cache the financial metrics data
  const { data: metrics, isLoading } = useQuery({
    queryKey: ['financialMetrics'],
    // Since we're not actually fetching from a server, we'll return null as the initial data
    queryFn: async () => {
      // Try to get the data from localStorage first to ensure persistence
      const storedData = localStorage.getItem('financialMetrics');
      return storedData ? JSON.parse(storedData) : null;
    },
    staleTime: Infinity, // Keep the data fresh indefinitely
    gcTime: Infinity, // Don't garbage collect the data
  });

  // Process financials mutation
  const { mutate: processFinancials, isPending: isProcessing } = useMutation({
    mutationFn: async () => {
      // Simulating API call with the same mock data
      await new Promise(resolve => setTimeout(resolve, 1500));
      return {
        monthlyAverageBalance: 12580.75,
        cashFlow: [
          { month: "Jan", income: 24000, expenses: 18000, balance: 6000, accountId: "1" },
          { month: "Feb", income: 22000, expenses: 17500, balance: 4500, accountId: "1" },
          { month: "Mar", income: 26000, expenses: 19000, balance: 7000, accountId: "1" },
          { month: "Apr", income: 23000, expenses: 21000, balance: 2000, accountId: "1" },
          { month: "May", income: 28000, expenses: 20000, balance: 8000, accountId: "1" },
          { month: "Jun", income: 29000, expenses: 22000, balance: 7000, accountId: "1" },
          { month: "Jan", income: 12000, expenses: 8000, balance: 4000, accountId: "2" },
          { month: "Feb", income: 13000, expenses: 9500, balance: 3500, accountId: "2" },
          { month: "Mar", income: 15000, expenses: 10000, balance: 5000, accountId: "2" },
          { month: "Apr", income: 14000, expenses: 11000, balance: 3000, accountId: "2" },
          { month: "May", income: 16000, expenses: 12000, balance: 4000, accountId: "2" },
          { month: "Jun", income: 17000, expenses: 12500, balance: 4500, accountId: "2" },
        ],
        yearlyData: [
          {
            year: "2023",
            payableDays: 32,
            receivableDays: 45,
            biWeeklyPayroll: 8500,
            monthlyPayroll: 8500 * 2.17,
            monthlyPayables: 45000,
            monthlyReceivables: 52000,
            assets: {
              currentAssets: 45000,
              longTermAssets: 230000,
              totalAssets: 275000,
            },
            liabilities: {
              currentLiabilities: 35000,
              longTermLiabilities: 150000,
              totalLiabilities: 185000,
            },
            equity: 90000,
            income: {
              revenue: 320000,
              expenses: 270000,
              netIncome: 50000,
            },
          },
          {
            year: "2024",
            payableDays: 28,
            receivableDays: 42,
            biWeeklyPayroll: 9200,
            monthlyPayroll: 9200 * 2.17,
            monthlyPayables: 48000,
            monthlyReceivables: 55000,
            assets: {
              currentAssets: 58000,
              longTermAssets: 245000,
              totalAssets: 303000,
            },
            liabilities: {
              currentLiabilities: 38000,
              longTermLiabilities: 140000,
              totalLiabilities: 178000,
            },
            equity: 125000,
            income: {
              revenue: 380000,
              expenses: 295000,
              netIncome: 85000,
            },
          }
        ],
        selectedYear: "2024"
      } as FinancialMetrics;
    },
    onSuccess: (data) => {
      // Store in React Query cache
      queryClient.setQueryData(['financialMetrics'], data);
      
      // Also save to localStorage for persistence across refreshes
      localStorage.setItem('financialMetrics', JSON.stringify(data));
      
      toast.success("Business health analysis complete!");
    },
  });

  const form = useForm<z.infer<typeof financialFormSchema>>({
    resolver: zodResolver(financialFormSchema),
    defaultValues: {
      year: new Date().getFullYear().toString(),
      currentAssets: 0,
      longTermAssets: 0,
      currentLiabilities: 0,
      longTermLiabilities: 0,
      revenue: 0,
      expenses: 0,
      payableDays: 0,
      receivableDays: 0,
      biWeeklyPayroll: 0,
      notes: "",
      monthlyPayables: 0,
      monthlyReceivables: 0,
    },
  });

  const handleUpload = () => {
    if (file) {
      processFinancials();
    } else {
      toast.error("Please select a file to upload");
    }
  };

  const handleManualSubmit = (values: FinancialFormValues) => {
    const totalAssets = values.currentAssets + values.longTermAssets;
    const totalLiabilities = values.currentLiabilities + values.longTermLiabilities;
    const calculatedEquity = totalAssets - totalLiabilities;
    const netIncome = values.revenue - values.expenses;
    
    let newData: FinancialMetrics;
    
    if (metrics) {
      const existingYearIndex = metrics.yearlyData.findIndex(
        data => data.year === values.year
      );
      
      const newYearlyData = [...metrics.yearlyData];
      const newYearData: YearlyMetrics = {
        year: values.year,
        payableDays: values.payableDays,
        receivableDays: values.receivableDays,
        biWeeklyPayroll: values.biWeeklyPayroll,
        monthlyPayroll: values.biWeeklyPayroll * 2.17,
        monthlyPayables: values.monthlyPayables,
        monthlyReceivables: values.monthlyReceivables,
        assets: {
          currentAssets: values.currentAssets,
          longTermAssets: values.longTermAssets,
          totalAssets,
        },
        liabilities: {
          currentLiabilities: values.currentLiabilities,
          longTermLiabilities: values.longTermLiabilities,
          totalLiabilities,
        },
        equity: calculatedEquity,
        income: {
          revenue: values.revenue,
          expenses: values.expenses,
          netIncome,
        },
      };
      
      if (existingYearIndex >= 0) {
        newYearlyData[existingYearIndex] = newYearData;
      } else {
        newYearlyData.push(newYearData);
      }
      
      newData = {
        ...metrics,
        yearlyData: newYearlyData,
        selectedYear: values.year,
        cashFlow: metrics.cashFlow
      };
    } else {
      newData = {
        monthlyAverageBalance: values.revenue / 12,
        cashFlow: [
          { month: "Jan", income: values.revenue / 6, expenses: values.expenses / 6, balance: (values.revenue - values.expenses) / 6, accountId: "1" },
          { month: "Feb", income: values.revenue / 6, expenses: values.expenses / 6, balance: (values.revenue - values.expenses) / 6, accountId: "1" },
          { month: "Mar", income: values.revenue / 6, expenses: values.expenses / 6, balance: (values.revenue - values.expenses) / 6, accountId: "1" },
          { month: "Apr", income: values.revenue / 6, expenses: values.expenses / 6, balance: (values.revenue - values.expenses) / 6, accountId: "1" },
          { month: "May", income: values.revenue / 6, expenses: values.expenses / 6, balance: (values.revenue - values.expenses) / 6, accountId: "1" },
          { month: "Jun", income: values.revenue / 6, expenses: values.expenses / 6, balance: (values.revenue - values.expenses) / 6, accountId: "1" },
        ],
        yearlyData: [
          {
            year: values.year,
            payableDays: values.payableDays,
            receivableDays: values.receivableDays,
            biWeeklyPayroll: values.biWeeklyPayroll,
            monthlyPayroll: values.biWeeklyPayroll * 2.17,
            monthlyPayables: values.monthlyPayables,
            monthlyReceivables: values.monthlyReceivables,
            assets: {
              currentAssets: values.currentAssets,
              longTermAssets: values.longTermAssets,
              totalAssets,
            },
            liabilities: {
              currentLiabilities: values.currentLiabilities,
              longTermLiabilities: values.longTermLiabilities,
              totalLiabilities,
            },
            equity: calculatedEquity,
            income: {
              revenue: values.revenue,
              expenses: values.expenses,
              netIncome,
            },
          }
        ],
        selectedYear: values.year,
      };
    }
    
    // Update React Query cache
    queryClient.setQueryData(['financialMetrics'], newData);
    
    // Also save to localStorage for persistence
    localStorage.setItem('financialMetrics', JSON.stringify(newData));
      
    form.reset();
    toast.success("Business health analysis updated!");
  };
  
  const handleYearChange = (year: string) => {
    if (metrics) {
      const updatedMetrics = {
        ...metrics,
        selectedYear: year
      };
      
      // Update React Query cache
      queryClient.setQueryData(['financialMetrics'], updatedMetrics);
      
      // Also update localStorage
      localStorage.setItem('financialMetrics', JSON.stringify(updatedMetrics));
    }
  };
  
  const handleReset = () => {
    // Clear React Query cache
    queryClient.removeQueries({ queryKey: ['financialMetrics'] });
    
    // Clear localStorage
    localStorage.removeItem('financialMetrics');
    
    setFile(null);
    form.reset();
    setActiveTab("upload");
  };
  
  const getCurrentYearData = () => {
    if (!metrics || !metrics.yearlyData) return null;
    const selectedYear = metrics.selectedYear || metrics.yearlyData[0]?.year;
    return metrics.yearlyData.find(data => data.year === selectedYear) || metrics.yearlyData[0];
  };
  
  const currentYearData = getCurrentYearData();

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Business Health</CardTitle>
        <BarChart className="h-5 w-5 text-indigo-600" />
      </CardHeader>
      <CardContent>
        {!metrics ? (
          <div className="space-y-4">
            <CardDescription>
              Analyze your business health by uploading statements or entering data manually
            </CardDescription>
            
            <Tabs defaultValue="upload" value={activeTab} onValueChange={(value) => setActiveTab(value as "upload" | "manual")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upload">Upload Statements</TabsTrigger>
                <TabsTrigger value="manual">Enter Manually</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upload" className="space-y-4 mt-4">
                <UploadSection 
                  file={file}
                  setFile={setFile}
                  isLoading={isProcessing}
                  onUpload={handleUpload}
                />
              </TabsContent>
              
              <TabsContent value="manual" className="space-y-4 mt-4">
                <ManualEntryForm form={form} isLoading={isProcessing} onSubmit={handleManualSubmit} />
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="space-y-6">
            {metrics.yearlyData.length > 1 && (
              <div className="flex justify-end">
                <Select 
                  value={metrics.selectedYear} 
                  onValueChange={handleYearChange}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {metrics.yearlyData.map(data => (
                      <SelectItem key={data.year} value={data.year}>
                        {data.year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            {currentYearData && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
                <MetricCard
                  title="Payable Days"
                  value={currentYearData.payableDays}
                  unit="days"
                  warningThreshold={30}
                  warningMessage="Above recommended 30 days"
                  successMessage="Within healthy range"
                  isCircleDisplay
                  compareValue={currentYearData.receivableDays}
                />
                <MetricCard
                  title="Receivable Days"
                  value={currentYearData.receivableDays}
                  unit="days"
                  warningThreshold={45}
                  warningMessage="Collection period is too long"
                  successMessage="Healthy collection period"
                  isCircleDisplay
                  compareValue={currentYearData.payableDays}
                />
                <MetricCard
                  title="Monthly Average Payables"
                  value={currentYearData.monthlyPayables}
                  description="Monthly average payables amount"
                />
                <MetricCard
                  title="Monthly Average Receivables"
                  value={currentYearData.monthlyReceivables}
                  description="Monthly average receivables amount"
                />
                <MetricCard
                  title="Monthly Payroll Average"
                  value={currentYearData.monthlyPayroll}
                  description="Based on bi-weekly payroll"
                />
              </div>
            )}

            {metrics && (
              <div className="space-y-4">
                <CashFlowTable data={metrics.cashFlow} accountId={activeAccount} />
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2">
        {metrics && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleReset}
          >
            Reset
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default FinancialHealthCard;
