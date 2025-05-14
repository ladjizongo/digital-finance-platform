
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";

export interface DocumentOption {
  value: string;
  label: string;
}

export interface DocumentUploadForm {
  documentType: string;
  financialYears: string;
  applicationReason: string;
}

interface DocumentUploadFormProps {
  documentOptions: DocumentOption[];
  onFilesSelected: (files: FileList) => void;
  onUpload: () => void;
  isUploading: boolean;
  hasSelectedFiles: boolean;
}

const DocumentUploadForm = ({
  documentOptions,
  onFilesSelected,
  onUpload,
  isUploading,
  hasSelectedFiles
}: DocumentUploadFormProps) => {
  const form = useForm<DocumentUploadForm>({
    defaultValues: {
      documentType: "",
      financialYears: "2015-2016",
      applicationReason: ""
    }
  });
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(e.target.files);
    }
  };
  
  return (
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
                  {documentOptions.map((option) => (
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
            onClick={onUpload} 
            disabled={!hasSelectedFiles || isUploading}
          >
            {isUploading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default DocumentUploadForm;
