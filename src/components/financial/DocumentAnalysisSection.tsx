
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { EnhancedUploadSection } from "@/components/financial/EnhancedUploadSection";

interface DocumentAnalysisSectionProps {
  file: File | null;
  setFile: (file: File | null) => void;
  isProcessing: boolean;
  onUpload: () => void;
  onParseComplete: (data: any) => void;
}

export function DocumentAnalysisSection({
  file,
  setFile,
  isProcessing,
  onUpload,
  onParseComplete
}: DocumentAnalysisSectionProps) {
  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-indigo-800">Document Analysis</CardTitle>
        <CardDescription>
          Upload and analyze financial statements with advanced document parsing and AI-powered insights
        </CardDescription>
      </CardHeader>
      <CardContent>
        <EnhancedUploadSection 
          file={file}
          setFile={setFile}
          isLoading={isProcessing}
          onUpload={onUpload}
          onParseComplete={onParseComplete}
        />
      </CardContent>
    </Card>
  );
}
