
import FinancialHealthCard from "@/components/FinancialHealthCard";
import CreditDocumentUpload from "@/components/financial/CreditDocumentUpload";

const BusinessHealthTab = () => {
  return (
    <>
      <FinancialHealthCard />
      <div className="mt-8">
        <CreditDocumentUpload />
      </div>
    </>
  );
};

export default BusinessHealthTab;
