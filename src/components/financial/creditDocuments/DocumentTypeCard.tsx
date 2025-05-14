
import { FileText } from "lucide-react";

interface DocumentTypeCardProps {
  documentName: string;
}

const DocumentTypeCard = ({ documentName }: DocumentTypeCardProps) => {
  return (
    <div className="border rounded-md p-4 bg-gray-50">
      <div className="flex items-center gap-2 mb-2">
        <FileText className="h-4 w-4 text-indigo-600" />
        <span className="text-sm font-medium">{documentName}</span>
      </div>
    </div>
  );
};

export default DocumentTypeCard;
