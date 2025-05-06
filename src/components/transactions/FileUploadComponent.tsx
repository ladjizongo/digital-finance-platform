
import { useState } from "react";
import { FileUp, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface FileUploadComponentProps {
  allowedFileTypes: string[];
  onFileSelected: (file: File) => void;
  uploadTitle: string;
  uploadDescription: string;
}

const FileUploadComponent = ({
  allowedFileTypes,
  onFileSelected,
  uploadTitle,
  uploadDescription
}: FileUploadComponentProps) => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check file extension
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      const isAllowedType = allowedFileTypes.some(type => 
        type.toLowerCase() === `.${fileExtension}` || 
        type.toLowerCase() === fileExtension
      );
      
      if (!isAllowedType) {
        setError(`Invalid file type. Allowed types: ${allowedFileTypes.join(', ')}`);
        e.target.value = '';
        setSelectedFile(null);
        return;
      }
      
      setSelectedFile(file);
      onFileSelected(file);
      
      toast({
        title: "File selected",
        description: `${file.name} has been selected`,
      });
    }
  };

  return (
    <div className="space-y-4 mt-6 border-t pt-6">
      <div>
        <h3 className="text-lg font-medium">{uploadTitle}</h3>
        <p className="text-sm text-muted-foreground">{uploadDescription}</p>
      </div>
      
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="flex items-center gap-4">
        <input
          id="file-upload"
          type="file"
          className="text-sm file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-foreground hover:file:bg-primary/90"
          onChange={handleFileChange}
          accept={allowedFileTypes.join(',')}
        />
        
        {selectedFile && (
          <p className="text-sm text-muted-foreground">
            Selected file: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
          </p>
        )}
      </div>
      
      <div className="text-sm text-muted-foreground">
        <p>Supported file types:</p>
        <ul className="list-disc pl-5 mt-1">
          {allowedFileTypes.map((type, index) => (
            <li key={index}>{type}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FileUploadComponent;
