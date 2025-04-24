
import { useState } from "react";
import { FileUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const ALLOWED_FILE_TYPES = [
  { name: "CPA 1464", extension: ".txt,.dat" },
  { name: "CPA 005", extension: ".txt,.dat" }
];

const PaymentFileUpload = () => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    try {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "File uploaded successfully",
        description: `${selectedFile.name} has been processed`,
      });
      
      setSelectedFile(null);
      if (document.getElementById('payment-file-upload') instanceof HTMLInputElement) {
        (document.getElementById('payment-file-upload') as HTMLInputElement).value = '';
      }
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your file",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment File Upload</CardTitle>
        <CardDescription>
          Upload CPA 1464 or CPA 005 payment files for processing
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid w-full gap-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="payment-file-upload" className="text-sm font-medium">
              Select payment file
            </label>
            <div className="flex items-center gap-4">
              <input
                id="payment-file-upload"
                type="file"
                className="text-sm file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-foreground hover:file:bg-primary/90"
                onChange={handleFileChange}
                accept={ALLOWED_FILE_TYPES.map(type => type.extension).join(',')}
              />
              <Button 
                onClick={handleUpload}
                disabled={!selectedFile || isUploading}
              >
                {isUploading ? "Uploading..." : "Upload"}
                <FileUp className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {selectedFile && (
            <p className="text-sm text-muted-foreground">
              Selected file: {selectedFile.name}
            </p>
          )}
          
          <div className="text-sm text-muted-foreground">
            <p>Supported file types:</p>
            <ul className="list-disc pl-5 mt-1">
              {ALLOWED_FILE_TYPES.map((type) => (
                <li key={type.name}>{type.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentFileUpload;
