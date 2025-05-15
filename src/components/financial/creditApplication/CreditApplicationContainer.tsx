
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileSpreadsheet } from "lucide-react";
import { CreditApplicationTypeSelector } from "./CreditApplicationTypeSelector";
import CreditDocumentUpload from "../CreditDocumentUpload";

const CreditApplicationContainer = () => {
  const [applicationType, setApplicationType] = useState<string>("overdraft");

  useEffect(() => {
    // Load saved application type from localStorage if available
    const savedType = localStorage.getItem("creditApplicationType");
    if (savedType) {
      setApplicationType(savedType);
    }
  }, []);

  const handleApplicationTypeChange = (value: string) => {
    setApplicationType(value);
    localStorage.setItem("creditApplicationType", value);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-xl font-bold">Credit Application</CardTitle>
          <CardDescription className="mt-1">
            Apply for business financing and upload supporting documents
          </CardDescription>
        </div>
        <FileSpreadsheet className="h-5 w-5 text-indigo-600" />
      </CardHeader>
      <CardContent className="space-y-6">
        <CreditApplicationTypeSelector 
          value={applicationType} 
          onChange={handleApplicationTypeChange} 
        />
        <CreditDocumentUpload applicationType={applicationType} />
      </CardContent>
    </Card>
  );
};

export default CreditApplicationContainer;
