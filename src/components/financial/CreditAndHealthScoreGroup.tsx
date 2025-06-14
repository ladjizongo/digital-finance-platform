
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { FileUp } from "lucide-react";
import { BusinessCreditScore } from "./BusinessCreditScore";
import { BusinessHealthScore } from "./BusinessHealthScore";
import { FinancialMetrics } from "@/types/financial";

interface CreditAndHealthScoreGroupProps {
  metrics: FinancialMetrics | null;
}

export function CreditAndHealthScoreGroup({ metrics }: CreditAndHealthScoreGroupProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <BusinessCreditScore />
      {metrics ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Business Health Score</CardTitle>
          </CardHeader>
          <CardContent>
            <BusinessHealthScore metrics={metrics} />
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Business Health Score</CardTitle>
            <CardDescription>
              Upload financial documents to calculate your business health score
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-32 text-muted-foreground">
              <FileUp className="h-8 w-8 mr-2" />
              <span>Awaiting financial data</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
