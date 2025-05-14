
export interface DocumentRequirement {
  applicationType: string;
  documents: string[];
}

export const getRequiredDocuments = (applicationType: string = "overdraft"): string[] => {
  const common = [
    "Business Plan",
    "Financial Statements (Last 2 years)",
    "Business Banking Statements (Last 6 months)"
  ];
  
  switch (applicationType) {
    case "overdraft":
      return [...common, "Overdraft Agreement Form"];
    case "lineOfCredit":
      return [...common, "Cash Flow Projections", "Accounts Receivable Aging Report"];
    case "termLoan":
      return [...common, "Asset List", "Existing Loan Statements", "Purchase Agreements"];
    case "equipmentPurchase":
      return [...common, "Equipment Quotes", "Equipment Specifications", "Vendor Information"];
    case "csbfl":
      return [
        ...common, 
        "CSBFL Application Form", 
        "Purchase Invoices or Estimates",
        "Business Registration Documents"
      ];
    default:
      return common;
  }
};

export const getDocumentTypeOptions = (applicationType: string) => {
  return getRequiredDocuments(applicationType).map((doc) => ({
    value: doc.toLowerCase().replace(/\s+/g, '-'),
    label: doc
  }));
};

export const getTitleByType = (applicationType: string = "overdraft"): string => {
  switch (applicationType) {
    case "overdraft": return "Overdraft Application";
    case "lineOfCredit": return "Line of Credit Application";
    case "termLoan": return "Term Loan Application";
    case "equipmentPurchase": return "Equipment Purchase Financing";
    case "csbfl": return "CSBFL Application";
    default: return "Credit Application";
  }
};
