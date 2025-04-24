
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";
import { useState } from "react";

interface WireTemplate {
  id: string;
  name: string;
  recipientName: string;
  recipientBank: string;
  swiftCode: string;
  accountNumber: string;
  recipientAddress: string;
  transferType: string;
}

interface WireTemplateDialogProps {
  onSaveTemplate: (template: Omit<WireTemplate, "id">) => void;
  currentData: Omit<WireTemplate, "id" | "name">;
}

export const WireTemplateDialog = ({ onSaveTemplate, currentData }: WireTemplateDialogProps) => {
  const [templateName, setTemplateName] = useState("");

  const handleSave = () => {
    if (!templateName.trim()) return;
    
    onSaveTemplate({
      name: templateName,
      ...currentData
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" type="button">
          <Save className="mr-2" />
          Save as Template
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save Wire Transfer Template</DialogTitle>
          <DialogDescription>
            Create a template to reuse this wire transfer information in the future.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="templateName">Template Name</Label>
            <Input
              id="templateName"
              placeholder="e.g., Monthly Supplier Payment"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave} type="button">
            Save Template
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
