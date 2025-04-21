
import { useState } from "react";
import { FileUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  year: string;
}

const CreditDocumentUpload = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;
    
    setIsUploading(true);
    const newFiles: UploadedFile[] = [];
    
    for (const file of Array.from(event.target.files)) {
      // Create a unique ID for each file
      const fileId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      newFiles.push({
        id: fileId,
        name: file.name,
        type: file.type,
        year: new Date().getFullYear().toString() // You might want to let users select the year
      });
    }
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setFiles(prev => [...prev, ...newFiles]);
    setIsUploading(false);
    toast.success("Documents uploaded successfully");
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
    toast.success("Document removed");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Credit Application Documents</CardTitle>
        <CardDescription>
          Upload your T4 slips and financial documents for the past 2 years
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="documentUpload"
              className="text-sm font-medium text-gray-700"
            >
              Upload Documents
            </label>
            <div className="flex items-center gap-4">
              <input
                id="documentUpload"
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                onChange={handleFileUpload}
                className="text-sm file:mr-4 file:rounded-md file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-indigo-700"
                disabled={isUploading}
              />
              {isUploading && (
                <div className="text-sm text-gray-500">Uploading...</div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Required Documents:</h4>
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
              <li>T4 slips for the last 2 years</li>
              <li>Notice of Assessment for the last 2 years</li>
              <li>Recent pay stubs (last 3 months)</li>
              <li>Bank statements (last 3 months)</li>
              <li>Investment statements (if applicable)</li>
            </ul>
          </div>

          {files.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700">Uploaded Documents:</h4>
              <div className="border rounded-lg divide-y">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-3 hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-3">
                      <FileUp className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">{file.name}</p>
                        <p className="text-xs text-gray-500">Year: {file.year}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(file.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
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
  );
};

export default CreditDocumentUpload;
