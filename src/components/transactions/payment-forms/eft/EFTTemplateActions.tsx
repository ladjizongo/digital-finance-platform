
import { FileText, FilePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export const EFTTemplateActions = () => {
  const { toast } = useToast();
  const [openTemplateDialog, setOpenTemplateDialog] = useState(false);
  const [templateName, setTemplateName] = useState("");
  
  const saveTemplate = () => {
    if (!templateName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a template name",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Template saved",
      description: "Your payment template has been saved successfully",
    });
    
    setOpenTemplateDialog(false);
  };
  
  return (
    <div className="flex gap-2">
      <Dialog open={openTemplateDialog} onOpenChange={setOpenTemplateDialog}>
        <DialogTrigger asChild>
          <Button type="button" variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            Save as Template
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Payment Template</DialogTitle>
            <DialogDescription>
              Create a template to reuse this payment in the future.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="templateName">Template Name</Label>
              <Input 
                id="templateName" 
                value={templateName} 
                onChange={(e) => setTemplateName(e.target.value)} 
                placeholder="e.g. Monthly Rent Payment"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpenTemplateDialog(false)}>Cancel</Button>
            <Button type="button" onClick={saveTemplate}>Save Template</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Button type="button" variant="outline" size="sm">
        <FilePlus className="mr-2 h-4 w-4" />
        Use Template
      </Button>
    </div>
  );
};
