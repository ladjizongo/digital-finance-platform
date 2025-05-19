
import FinancialHealthCard from "@/components/FinancialHealthCard";
import { BusinessCreditScore } from "@/components/financial/BusinessCreditScore";
import { BusinessHealthHeader } from "@/components/financial/BusinessHealthHeader";
import { BusinessHealthScore } from "@/components/financial/BusinessHealthScore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CirclePercent } from "lucide-react";

const BusinessHealthTab = () => {
  return (
    <div className="space-y-8">
      <BusinessHealthHeader />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BusinessCreditScore />
        <FinancialHealthCard />
      </div>
    </div>
  );
};

export default BusinessHealthTab;
