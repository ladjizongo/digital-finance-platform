
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { FileSpreadsheet, FileText } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface CreditDocumentUploadProps {
  applicationType?: string;
}

interface DocumentUploadForm {
  documentType: string;
  financialYears: string;
  applicationReason: string;
}

const CreditDocumentUpload = ({ applicationType = "overdraft" }: CreditDocumentUploadProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  
  const form = useForm<DocumentUploadForm>({
    defaultValues: {
      documentType: "",
      financialYears: "2015-2016",
      applicationReason: ""
    }
  });
  
  const getRequiredDocuments = () => {
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
  
  const getDocumentTypeOptions = () => {
    return getRequiredDocuments().map((doc) => ({
      value: doc.toLowerCase().replace(/\s+/g, '-'),
      label: doc
    }));
  };
  
  const getTitleByType = () => {
    switch (applicationType) {
      case "overdraft": return "Overdraft Application";
      case "lineOfCredit": return "Line of Credit Application";
      case "termLoan": return "Term Loan Application";
      case "equipmentPurchase": return "Equipment Purchase Financing";
      case "csbfl": return "CSBFL Application";
      default: return "Credit Application";
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...newFiles]);
    }
  };
  
  const handleUpload = () => {
    if (selectedFiles.length === 0) {
      toast.error("Please select files to upload");
      return;
    }
    
    if (!form.getValues("documentType")) {
      toast.error("Please select document type");
      return;
    }
    
    setIsUploading(true);
    
    // Simulate upload
    setTimeout(() => {
      toast.success("Documents uploaded successfully", {
        description: `${selectedFiles.length} documents have been uploaded for your ${getTitleByType()}`
      });
      setSelectedFiles([]);
      setIsUploading(false);
    }, 2000);
  };
  
  const handleRemoveFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="mb-4">
            <CardTitle className="text-lg">{getTitleByType()} Documents</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Upload the following documents to complete your application
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {getRequiredDocuments().map((doc, index) => (
                <div key={index} className="border rounded-md p-4 bg-gray-50">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-4 w-4 text-indigo-600" />
                    <span className="text-sm font-medium">{doc}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <Form {...form}>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="documentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Document Type</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select document type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {getDocumentTypeOptions().map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="financialYears"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Financial Statement Years</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="2015-2016" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="applicationReason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reason for Application</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field}
                          placeholder="Please describe the reason for your application"
                          className="min-h-[100px]"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="flex items-center gap-4 mt-4">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="text-sm file:mr-4 file:rounded-md file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-indigo-700"
                  />
                  <Button 
                    onClick={handleUpload} 
                    disabled={selectedFiles.length === 0 || isUploading}
                  >
                    {isUploading ? "Uploading..." : "Upload"}
                  </Button>
                </div>
              </div>
            </Form>
            
            {selectedFiles.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Selected Files ({selectedFiles.length})</h4>
                <div className="space-y-2">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                      <div className="flex items-center gap-2">
                        <FileSpreadsheet className="h-4 w-4 text-gray-600" />
                        <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                        <span className="text-xs text-gray-500">
                          ({(file.size / 1024).toFixed(0)} KB)
                        </span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleRemoveFile(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreditDocumentUpload;
