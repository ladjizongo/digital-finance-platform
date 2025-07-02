
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FinancialMetricsPanel from "./FinancialMetricsPanel";
import CashFlowPanel from "./CashFlowPanel";
import ForecastPanel from "./ForecastPanel";
import { CashFlowForecast } from "./CashFlowForecast";
import { FinancialMetrics } from "@/types/financial";

interface AnalysisResultsTabsProps {
  metrics: FinancialMetrics;
}

const AnalysisResultsTabs = ({ metrics }: AnalysisResultsTabsProps) => {
  const [activeResultTab, setActiveResultTab] = useState<string>("financialMetrics");

  return (
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
            <FinancialMetricsPanel yearlyData={metrics.yearlyData} />
          </TabsContent>
          
          <TabsContent value="cashFlow" className="space-y-4">
            <CashFlowPanel cashFlow={metrics.cashFlow} />
          </TabsContent>
          
          <TabsContent value="forecast" className="space-y-4">
            <CashFlowForecast metrics={metrics} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AnalysisResultsTabs;
