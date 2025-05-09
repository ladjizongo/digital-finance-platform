
import FileUploadComponent from "../../FileUploadComponent";

interface WireFileUploadProps {
  onFileSelected: (file: File) => void;
}

export const WireFileUpload = ({ onFileSelected }: WireFileUploadProps) => {
  return (
    <FileUploadComponent
      allowedFileTypes={['.xml', '.txt', '.csv']}
      onFileSelected={onFileSelected}
      uploadTitle="Upload Wire Transfer File"
      uploadDescription="Upload a wire transfer file in XML, TXT, or CSV format"
    />
  );
};
