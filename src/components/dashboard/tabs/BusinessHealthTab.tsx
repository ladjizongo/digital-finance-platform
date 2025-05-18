
import FinancialHealthCard from "@/components/FinancialHealthCard";
import { BusinessCreditScore } from "@/components/financial/BusinessCreditScore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CirclePercent } from "lucide-react";

const BusinessHealthTab = () => {
  return (
    <div className="space-y-8">
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-indigo-800">Business Financial Health Dashboard</CardTitle>
            <CirclePercent className="h-6 w-6 text-indigo-600" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Monitor your business credit score, financial metrics, and overall financial health.
          </p>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BusinessCreditScore />
        <FinancialHealthCard />
      </div>
    </div>
  );
};

export default BusinessHealthTab;
