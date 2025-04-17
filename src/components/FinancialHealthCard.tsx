import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { FileUp, BarChart, FileText } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface YearlyMetrics {
  year: string;
  payableDays: number;
  receivableDays: number;
  biWeeklyPayroll: number;
  monthlyPayables: number;
  monthlyReceivables: number;
  assets: {
    currentAssets: number;
    longTermAssets: number;
    totalAssets: number;
  };
  liabilities: {
    currentLiabilities: number;
    longTermLiabilities: number;
    totalLiabilities: number;
  };
  equity: number;
  income: {
    revenue: number;
    expenses: number;
    netIncome: number;
  };
}

interface FinancialMetrics {
  monthlyAverageBalance: number;
  cashFlow: {
    month: string;
    income: number;
    expenses: number;
    balance: number;
  }[];
  yearlyData: YearlyMetrics[];
  selectedYear?: string;
}

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
  const [isLoading, setIsLoading] = useState(false);
  const [metrics, setMetrics] = useState<FinancialMetrics | null>(null);
  const [activeTab, setActiveTab] = useState<"upload" | "manual">("upload");
  const [selectedYear, setSelectedYear] = useState<string | undefined>(undefined);

  const form = useForm<FinancialFormValues>({
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

  // This would normally process the actual uploaded file
  // For demo purposes, we're simulating metrics calculation
  const processFinancials = () => {
    setIsLoading(true);
    
    // Simulate API call/processing time
    setTimeout(() => {
      // Mock data - in a real app, this would be calculated from the uploaded file
      setMetrics({
        monthlyAverageBalance: 12580.75,
        cashFlow: [
          { month: "Jan", income: 24000, expenses: 18000, balance: 6000 },
          { month: "Feb", income: 22000, expenses: 17500, balance: 4500 },
          { month: "Mar", income: 26000, expenses: 19000, balance: 7000 },
          { month: "Apr", income: 23000, expenses: 21000, balance: 2000 },
          { month: "May", income: 28000, expenses: 20000, balance: 8000 },
          { month: "Jun", income: 29000, expenses: 22000, balance: 7000 },
        ],
        yearlyData: [
          {
            year: "2023",
            payableDays: 32,
            receivableDays: 45,
            biWeeklyPayroll: 8500,
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
      });
      
      setSelectedYear("2024");
      setIsLoading(false);
      toast.success("Business health analysis complete!");
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (file) {
      processFinancials();
    } else {
      toast.error("Please select a file to upload");
    }
  };

  const handleManualSubmit = (values: FinancialFormValues) => {
    setIsLoading(true);
    
    // Calculate some derived values
    const totalAssets = values.currentAssets + values.longTermAssets;
    const totalLiabilities = values.currentLiabilities + values.longTermLiabilities;
    const calculatedEquity = totalAssets - totalLiabilities;
    const netIncome = values.revenue - values.expenses;

    // Mock API processing delay
    setTimeout(() => {
      // If metrics already exist, add a new year or update existing year
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
        
        setMetrics({
          ...metrics,
          yearlyData: newYearlyData,
          selectedYear: values.year,
        });
        setSelectedYear(values.year);
      } else {
        // Create new metrics object
        setMetrics({
          monthlyAverageBalance: values.revenue / 12, // Simple average
          cashFlow: [
            // Simple mock data based on entered values
            { month: "Jan", income: values.revenue / 6, expenses: values.expenses / 6, balance: (values.revenue - values.expenses) / 6 },
            { month: "Feb", income: values.revenue / 6, expenses: values.expenses / 6, balance: (values.revenue - values.expenses) / 6 },
            { month: "Mar", income: values.revenue / 6, expenses: values.expenses / 6, balance: (values.revenue - values.expenses) / 6 },
            { month: "Apr", income: values.revenue / 6, expenses: values.expenses / 6, balance: (values.revenue - values.expenses) / 6 },
            { month: "May", income: values.revenue / 6, expenses: values.expenses / 6, balance: (values.revenue - values.expenses) / 6 },
            { month: "Jun", income: values.revenue / 6, expenses: values.expenses / 6, balance: (values.revenue - values.expenses) / 6 },
          ],
          yearlyData: [
            {
              year: values.year,
              payableDays: values.payableDays,
              receivableDays: values.receivableDays,
              biWeeklyPayroll: values.biWeeklyPayroll,
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
        });
        setSelectedYear(values.year);
      }
      
      form.reset();
      setIsLoading(false);
      toast.success("Business health analysis updated!");
    }, 1500);
  };
  
  const handleYearChange = (year: string) => {
    if (metrics) {
      setSelectedYear(year);
    }
  };
  
  // Get current year data based on selected year
  const getCurrentYearData = () => {
    if (!metrics || !selectedYear) return null;
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
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <label htmlFor="financial-upload" className="text-sm font-medium">
                        Upload financial statements (PDF, CSV, XLSX)
                      </label>
                      <input
                        id="financial-upload"
                        type="file"
                        className="text-sm file:mr-4 file:rounded-md file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-indigo-700"
                        onChange={handleFileChange}
                        accept=".csv,.xlsx,.xls,.pdf"
                      />
                    </div>
                    <Button 
                      onClick={handleUpload} 
                      disabled={!file || isLoading}
                    >
                      {isLoading ? "Processing..." : "Analyze"}
                      {!isLoading && <FileUp className="ml-2 h-4 w-4" />}
                    </Button>
                  </div>
                  {file && (
                    <p className="text-sm text-muted-foreground">
                      Selected file: {file.name}
                    </p>
                  )}
                  <div className="text-sm text-muted-foreground mt-2">
                    <p>Supported statement types:</p>
                    <ul className="list-disc pl-5 mt-1">
                      <li>Balance Sheet</li>
                      <li>Income Statement</li>
                      <li>Cash Flow Statement</li>
                      <li>Accounts Payable Aging</li>
                      <li>Accounts Receivable Aging</li>
                      <li>Payroll Reports</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="manual" className="space-y-4 mt-4">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleManualSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select year" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="2022">2022</SelectItem>
                              <SelectItem value="2023">2023</SelectItem>
                              <SelectItem value="2024">2024</SelectItem>
                              <SelectItem value="2025">2025</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="space-y-4">
                      <h4 className="font-medium text-sm">Key Metrics</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                          control={form.control}
                          name="payableDays"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Payable Days</FormLabel>
                              <FormControl>
                                <Input placeholder="0" type="number" min="0" {...field} />
                              </FormControl>
                              <FormDescription>
                                Average days to pay vendors
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="receivableDays"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Receivable Days</FormLabel>
                              <FormControl>
                                <Input placeholder="0" type="number" min="0" {...field} />
                              </FormControl>
                              <FormDescription>
                                Average days to collect payments
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="biWeeklyPayroll"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bi-Weekly Payroll ($)</FormLabel>
                              <FormControl>
                                <Input placeholder="0.00" type="number" min="0" step="0.01" {...field} />
                              </FormControl>
                              <FormDescription>
                                Average bi-weekly payroll expense
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium text-sm">Assets</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="currentAssets"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Current Assets ($)</FormLabel>
                              <FormControl>
                                <Input placeholder="0.00" type="number" min="0" step="0.01" {...field} />
                              </FormControl>
                              <FormDescription>
                                Cash, accounts receivable, inventory, etc.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="longTermAssets"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Long-term Assets ($)</FormLabel>
                              <FormControl>
                                <Input placeholder="0.00" type="number" min="0" step="0.01" {...field} />
                              </FormControl>
                              <FormDescription>
                                Property, equipment, investments, etc.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium text-sm">Liabilities</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="currentLiabilities"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Current Liabilities ($)</FormLabel>
                              <FormControl>
                                <Input placeholder="0.00" type="number" min="0" step="0.01" {...field} />
                              </FormControl>
                              <FormDescription>
                                Accounts payable, short-term debt, etc.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="longTermLiabilities"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Long-term Liabilities ($)</FormLabel>
                              <FormControl>
                                <Input placeholder="0.00" type="number" min="0" step="0.01" {...field} />
                              </FormControl>
                              <FormDescription>
                                Long-term loans, mortgages, bonds, etc.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium text-sm">Income Statement</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="revenue"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Annual Revenue ($)</FormLabel>
                              <FormControl>
                                <Input placeholder="0.00" type="number" min="0" step="0.01" {...field} />
                              </FormControl>
                              <FormDescription>
                                Total annual income from business activities
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="expenses"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Annual Expenses ($)</FormLabel>
                              <FormControl>
                                <Input placeholder="0.00" type="number" min="0" step="0.01" {...field} />
                              </FormControl>
                              <FormDescription>
                                Total annual business expenses
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium text-sm">Averages</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="monthlyPayables"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Monthly Payables ($)</FormLabel>
                              <FormControl>
                                <Input placeholder="0.00" type="number" min="0" step="0.01" {...field} />
                              </FormControl>
                              <FormDescription>
                                Average monthly payables
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="monthlyReceivables"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Monthly Receivables ($)</FormLabel>
                              <FormControl>
                                <Input placeholder="0.00" type="number" min="0" step="0.01" {...field} />
                              </FormControl>
                              <FormDescription>
                                Average monthly receivables
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Notes</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Any additional information about your financial situation..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" disabled={isLoading} className="w-full">
                      {isLoading ? "Processing..." : "Generate Business Analysis"}
                      {!isLoading && <FileText className="ml-2 h-4 w-4" />}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="space-y-6">
            {metrics.yearlyData.length > 1 && (
              <div className="flex justify-end">
                <Select 
                  value={selectedYear} 
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
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium text-muted-foreground">Payable Days</div>
                  <div className="mt-1 flex items-baseline">
                    <div className="text-2xl font-semibold">{currentYearData.payableDays}</div>
                    <div className="ml-1 text-xs text-muted-foreground">days</div>
                  </div>
                  {currentYearData.payableDays > 30 ? (
                    <div className="mt-1 text-xs text-amber-600">
                      Above recommended 30 days
                    </div>
                  ) : (
                    <div className="mt-1 text-xs text-green-600">
                      Within healthy range
                    </div>
                  )}
                </div>
                
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium text-muted-foreground">Receivable Days</div>
                  <div className="mt-1 flex items-baseline">
                    <div className="text-2xl font-semibold">{currentYearData.receivableDays}</div>
                    <div className="ml-1 text-xs text-muted-foreground">days</div>
                  </div>
                  {currentYearData.receivableDays > 45 ? (
                    <div className="mt-1 text-xs text-amber-600">
                      Collection period is too long
                    </div>
                  ) : (
                    <div className="mt-1 text-xs text-green-600">
                      Healthy collection period
                    </div>
                  )}
                </div>
                
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium text-muted-foreground">Monthly Average Payables</div>
                  <div className="mt-1 flex items-baseline">
                    <div className="text-2xl font-semibold">
                      ${currentYearData.monthlyPayables.toLocaleString('en-US', { 
                        minimumFractionDigits: 2, 
                        maximumFractionDigits: 2 
                      })}
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium text-muted-foreground">Monthly Average Receivables</div>
                  <div className="mt-1 flex items-baseline">
                    <div className="text-2xl font-semibold">
                      ${currentYearData.monthlyReceivables.toLocaleString('en-US', { 
                        minimumFractionDigits: 2, 
                        maximumFractionDigits: 2 
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentYearData && (
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Financial Statements Summary ({currentYearData.year})</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="rounded-lg border p-4">
                    <h5 className="font-medium mb-3">Balance Sheet</h5>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[50%]">Item</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Current Assets</TableCell>
                          <TableCell className="text-right">
                            ${currentYearData.assets.currentAssets.toLocaleString('en-US')}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Long-term Assets</TableCell>
                          <TableCell className="text-right">
                            ${currentYearData.assets.longTermAssets.toLocaleString('en-US')}
                          </TableCell>
                        </TableRow>
                        <TableRow className="font-medium">
                          <TableCell>Total Assets</TableCell>
                          <TableCell className="text-right">
                            ${currentYearData.assets.totalAssets.toLocaleString('en-US')}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Current Liabilities</TableCell>
                          <TableCell className="text-right">
                            ${currentYearData.liabilities.currentLiabilities.toLocaleString('en-US')}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Long-term Liabilities</TableCell>
                          <TableCell className="text-right">
                            ${currentYearData.liabilities.longTermLiabilities.toLocaleString('en-US')}
                          </TableCell>
                        </TableRow>
                        <TableRow className="font-medium">
                          <TableCell>Total Liabilities</TableCell>
                          <TableCell className="text-right">
                            ${currentYearData.liabilities.totalLiabilities.toLocaleString('en-US')}
                          </TableCell>
                        </TableRow>
                        <TableRow className="font-medium">
                          <TableCell>Total Equity</TableCell>
                          <TableCell className="text-right">
                            ${currentYearData.equity.toLocaleString('en-US')}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div className="rounded-lg border p-4">
                    <h5 className="font-medium mb-3">Income Statement</h5>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[50%]">Item</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Revenue</TableCell>
                          <TableCell className="text-right">
                            ${currentYearData.income.revenue.toLocaleString('en-US')}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Expenses</TableCell>
                          <TableCell className="text-right">
                            ${currentYearData.income.expenses.toLocaleString('en-US')}
                          </TableCell>
                        </TableRow>
                        <TableRow className="font-medium">
                          <TableCell>Net Income</TableCell>
                          <TableCell className="text-right">
                            ${currentYearData.income.netIncome.toLocaleString('en-US')}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            )}
            
            <div>
              <h4 className="mb-2 text-sm font-medium">6-Month Cash Flow</h4>
              <div className="h-72">
                <ChartContainer 
                  config={{ 
                    income: { label: "Income", color: "#4ade80" },
                    expenses: { label: "Expenses", color: "#f87171" },
                    balance: { label: "Net Balance", color: "#3b82f6" },
                  }}
                >
                  <LineChart data={metrics.cashFlow}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip 
                      content={
                        <ChartTooltipContent 
                          formatter={(value, name) => [`$${value.toLocaleString()}`, name]} 
                        />
                      } 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="income" 
                      stroke="var(--color-income)" 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="expenses" 
                      stroke="var(--color-expenses)" 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="balance" 
                      stroke="var(--color-balance)" 
                      strokeWidth={2.5} 
                      dot={{ r: 5 }} 
                    />
                  </LineChart>
                </ChartContainer>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2">
        {metrics && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              setMetrics(null);
              setFile(null);
              form.reset();
              setActiveTab("upload");
              setSelectedYear(undefined);
            }}
          >
            Reset
