
import FinancialHealthCard from "@/components/FinancialHealthCard";
import { BusinessCreditScore } from "@/components/financial/BusinessCreditScore";
import { DataIntegrationsSection } from "@/components/transactions/DataIntegrationsSection";

const BusinessHealthTab = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BusinessCreditScore />
        <FinancialHealthCard />
      </div>
      <DataIntegrationsSection />
    </div>
  );
};

export default BusinessHealthTab;
