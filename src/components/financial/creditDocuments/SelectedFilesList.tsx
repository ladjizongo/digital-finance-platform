
import { FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SelectedFilesListProps {
  files: File[];
  onRemoveFile: (index: number) => void;
}

const SelectedFilesList = ({ files, onRemoveFile }: SelectedFilesListProps) => {
  if (files.length === 0) return null;

  return (
    <div className="mt-4">
      <h4 className="text-sm font-medium mb-2">Selected Files ({files.length})</h4>
      <div className="space-y-2">
        {files.map((file, index) => (
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
              onClick={() => onRemoveFile(index)}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedFilesList;
