
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { FileUp, BarChart } from "lucide-react";
import { toast } from "sonner";

interface FinancialMetrics {
  payableDays: number;
  receivableDays: number;
  monthlyAverageBalance: number;
  cashFlow: {
    month: string;
    income: number;
    expenses: number;
    balance: number;
  }[];
}

const FinancialHealthCard = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [metrics, setMetrics] = useState<FinancialMetrics | null>(null);

  // This would normally process the actual uploaded file
  // For demo purposes, we're simulating metrics calculation
  const processFinancials = () => {
    setIsLoading(true);
    
    // Simulate API call/processing time
    setTimeout(() => {
      // Mock data - in a real app, this would be calculated from the uploaded file
      setMetrics({
        payableDays: 32,
        receivableDays: 45,
        monthlyAverageBalance: 12580.75,
        cashFlow: [
          { month: "Jan", income: 24000, expenses: 18000, balance: 6000 },
          { month: "Feb", income: 22000, expenses: 17500, balance: 4500 },
          { month: "Mar", income: 26000, expenses: 19000, balance: 7000 },
          { month: "Apr", income: 23000, expenses: 21000, balance: 2000 },
          { month: "May", income: 28000, expenses: 20000, balance: 8000 },
          { month: "Jun", income: 29000, expenses: 22000, balance: 7000 },
        ]
      });
      
      setIsLoading(false);
      toast.success("Financial analysis complete!");
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

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Financial Health</CardTitle>
        <BarChart className="h-5 w-5 text-indigo-600" />
      </CardHeader>
      <CardContent>
        {!metrics ? (
          <div className="space-y-4">
            <CardDescription>
              Upload your business financials to analyze your financial health metrics
            </CardDescription>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <label htmlFor="financial-upload" className="text-sm font-medium">
                    Upload financial data (CSV, XLSX)
                  </label>
                  <input
                    id="financial-upload"
                    type="file"
                    className="text-sm file:mr-4 file:rounded-md file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-indigo-700"
                    onChange={handleFileChange}
                    accept=".csv,.xlsx,.xls"
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
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-lg border p-3">
                <div className="text-sm font-medium text-muted-foreground">Payable Days</div>
                <div className="mt-1 flex items-baseline">
                  <div className="text-2xl font-semibold">{metrics.payableDays}</div>
                  <div className="ml-1 text-xs text-muted-foreground">days</div>
                </div>
                {metrics.payableDays > 30 ? (
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
                  <div className="text-2xl font-semibold">{metrics.receivableDays}</div>
                  <div className="ml-1 text-xs text-muted-foreground">days</div>
                </div>
                {metrics.receivableDays > 45 ? (
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
                <div className="text-sm font-medium text-muted-foreground">Monthly Avg. Balance</div>
                <div className="mt-1 flex items-baseline">
                  <div className="text-2xl font-semibold">
                    ${metrics.monthlyAverageBalance.toLocaleString('en-US', { 
                      minimumFractionDigits: 2, 
                      maximumFractionDigits: 2 
                    })}
                  </div>
                </div>
              </div>
            </div>
            
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
            }}
          >
            Reset
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default FinancialHealthCard;
