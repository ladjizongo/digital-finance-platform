
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CirclePercent } from "lucide-react";

export const BusinessHealthHeader = () => {
  return (
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
  );
};
