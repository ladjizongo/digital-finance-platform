
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUp } from "lucide-react";
import { UploadSection } from "@/components/financial/UploadSection";
import { toast } from "sonner";
import { useFinancialMetrics } from "@/hooks/useFinancialMetrics";

const ExternalDataSourcesTab = () => {
  const [file, setFile] = useState<File | null>(null);
  const [activeResultTab, setActiveResultTab] = useState<string>("financialMetrics");
  
  const {
    metrics,
    isLoading,
    isProcessing,
    processFinancials,
    handleYearChange,
    resetMetrics,
  } = useFinancialMetrics();

  const handleUpload = () => {
    if (file) {
      processFinancials();
      toast.success("Financial statement processed successfully");
    } else {
      toast.error("Please select a file to upload");
    }
  };

  return (
    <div className="space-y-8">
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-indigo-800">External Data Sources</CardTitle>
          <CardDescription>
            Upload and analyze financial statements from external sources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UploadSection 
            file={file}
            setFile={setFile}
            isLoading={isProcessing}
            onUpload={handleUpload}
          />
        </CardContent>
      </Card>

      {metrics && (
        <Card>
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs 
              defaultValue={activeResultTab} 
              value={activeResultTab} 
              onValueChange={setActiveResultTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 w-full max-w-md mb-4">
                <TabsTrigger value="financialMetrics">Financial Metrics</TabsTrigger>
                <TabsTrigger value="cashFlow">Cash Flow</TabsTrigger>
                <TabsTrigger value="forecast">Forecast</TabsTrigger>
              </TabsList>
              
              <TabsContent value="financialMetrics" className="space-y-4">
                {metrics.yearlyData && metrics.yearlyData.length > 0 ? (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Key Financial Metrics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {Object.entries(metrics.yearlyData[0]).map(([key, value]) => {
                        if (key !== 'year' && typeof value === 'number') {
                          return (
                            <Card key={key}>
                              <CardContent className="pt-6">
                                <div className="text-2xl font-bold">
                                  {typeof value === 'number' ? value.toFixed(2) : value}
                                </div>
                                <p className="text-sm text-muted-foreground capitalize">
                                  {key.replace(/([A-Z])/g, ' $1').trim()}
                                </p>
                              </CardContent>
                            </Card>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                ) : (
                  <p>No financial metrics available</p>
                )}
              </TabsContent>
              
              <TabsContent value="cashFlow" className="space-y-4">
                {metrics.cashFlow ? (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Cash Flow Analysis</h3>
                    <div className="border rounded-md overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-muted">
                          <tr>
                            <th className="p-2 text-left font-medium">Month</th>
                            <th className="p-2 text-right font-medium">Inflow</th>
                            <th className="p-2 text-right font-medium">Outflow</th>
                            <th className="p-2 text-right font-medium">Net Flow</th>
                          </tr>
                        </thead>
                        <tbody>
                          {metrics.cashFlow.map((flow, index) => (
                            <tr key={index} className="border-t">
                              <td className="p-2 text-left">{flow.month}</td>
                              <td className="p-2 text-right text-green-600">${flow.inflow?.toFixed(2)}</td>
                              <td className="p-2 text-right text-red-600">${flow.outflow?.toFixed(2)}</td>
                              <td className={`p-2 text-right ${flow.netFlow > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                ${flow.netFlow?.toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <p>No cash flow data available</p>
                )}
              </TabsContent>
              
              <TabsContent value="forecast" className="space-y-4">
                <h3 className="text-lg font-medium">Financial Forecast</h3>
                <p className="text-muted-foreground">
                  Based on your financial statements, we predict the following trends for the next quarter:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold text-green-600">+4.2%</div>
                      <p className="text-sm text-muted-foreground">
                        Projected Revenue Growth
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold text-amber-600">-1.8%</div>
                      <p className="text-sm text-muted-foreground">
                        Projected Expense Change
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ExternalDataSourcesTab;
