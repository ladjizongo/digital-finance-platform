
import FileUploadComponent from "../../FileUploadComponent";

interface EFTFileUploadProps {
  onFileSelected: (file: File) => void;
}

export const EFTFileUpload = ({ onFileSelected }: EFTFileUploadProps) => {
  return (
    <FileUploadComponent
      allowedFileTypes={['.txt']}
      onFileSelected={onFileSelected}
      uploadTitle="Upload EFT File"
      uploadDescription="Upload a payment file (CPA 1464 and CPA 005 formats)"
    />
  );
};
