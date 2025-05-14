
import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import DocumentTypeCard from "./creditDocuments/DocumentTypeCard";
import DocumentUploadForm from "./creditDocuments/DocumentUploadForm"; 
import SelectedFilesList from "./creditDocuments/SelectedFilesList";
import { 
  getRequiredDocuments, 
  getDocumentTypeOptions, 
  getTitleByType 
} from "./creditDocuments/documentUtils";

interface CreditDocumentUploadProps {
  applicationType?: string;
}

const CreditDocumentUpload = ({ applicationType = "overdraft" }: CreditDocumentUploadProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  
  const handleFileChange = (files: FileList) => {
    const newFiles = Array.from(files);
    setSelectedFiles(prev => [...prev, ...newFiles]);
  };
  
  const handleUpload = () => {
    if (selectedFiles.length === 0) {
      toast.error("Please select files to upload");
      return;
    }
    
    setIsUploading(true);
    
    // Simulate upload
    setTimeout(() => {
      toast.success("Documents uploaded successfully", {
        description: `${selectedFiles.length} documents have been uploaded for your ${getTitleByType(applicationType)}`
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
            <CardTitle className="text-lg">{getTitleByType(applicationType)} Documents</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Upload the following documents to complete your application
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {getRequiredDocuments(applicationType).map((doc, index) => (
                <DocumentTypeCard key={index} documentName={doc} />
              ))}
            </div>
            
            <DocumentUploadForm 
              documentOptions={getDocumentTypeOptions(applicationType)}
              onFilesSelected={handleFileChange}
              onUpload={handleUpload}
              isUploading={isUploading}
              hasSelectedFiles={selectedFiles.length > 0}
            />
            
            <SelectedFilesList 
              files={selectedFiles}
              onRemoveFile={handleRemoveFile}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreditDocumentUpload;
