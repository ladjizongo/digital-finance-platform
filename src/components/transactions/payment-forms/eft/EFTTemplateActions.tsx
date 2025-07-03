
import { FileText, FilePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

interface EFTTemplate {
  id: string;
  name: string;
  recipients: Array<{
    name: string;
    transitNumber: string;
    bankId: string;
    accountNumber: string;
  }>;
}

export const EFTTemplateActions = () => {
  const { toast } = useToast();
  const [openTemplateDialog, setOpenTemplateDialog] = useState(false);
  const [openUseTemplateDialog, setOpenUseTemplateDialog] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [savedTemplates, setSavedTemplates] = useState<EFTTemplate[]>([]);
  
  useEffect(() => {
    const templates = JSON.parse(localStorage.getItem("eftTemplates") || "[]");
    setSavedTemplates(templates);
  }, [openUseTemplateDialog]);

  const saveTemplate = () => {
    if (!templateName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a template name",
        variant: "destructive",
      });
      return;
    }
    
    // Mock template data - in real app this would come from form
    const newTemplate: EFTTemplate = {
      id: Date.now().toString(),
      name: templateName,
      recipients: [
        {
          name: "Sample Recipient",
          transitNumber: "12345",
          bankId: "123",
          accountNumber: "1234567890"
        }
      ]
    };
    
    const templates = JSON.parse(localStorage.getItem("eftTemplates") || "[]");
    const updatedTemplates = [...templates, newTemplate];
    localStorage.setItem("eftTemplates", JSON.stringify(updatedTemplates));
    setSavedTemplates(updatedTemplates);
    
    toast({
      title: "Template saved",
      description: "Your payment template has been saved successfully",
    });
    
    setOpenTemplateDialog(false);
    setTemplateName("");
  };

  const useTemplate = (template: EFTTemplate) => {
    toast({
      title: "Template loaded",
      description: `Template "${template.name}" has been loaded into the form`,
    });
    setOpenUseTemplateDialog(false);
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
      
      <Dialog open={openUseTemplateDialog} onOpenChange={setOpenUseTemplateDialog}>
        <DialogTrigger asChild>
          <Button type="button" variant="outline" size="sm">
            <FilePlus className="mr-2 h-4 w-4" />
            Use Template
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Template</DialogTitle>
            <DialogDescription>
              Choose a saved template to load into the form.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 max-h-64 overflow-y-auto">
            {savedTemplates.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No templates saved yet. Create a template first.
              </p>
            ) : (
              savedTemplates.map((template) => (
                <div 
                  key={template.id} 
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted cursor-pointer"
                  onClick={() => useTemplate(template)}
                >
                  <div>
                    <h4 className="font-medium">{template.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {template.recipients.length} recipient(s)
                    </p>
                  </div>
                  <Button size="sm" variant="ghost">
                    Use
                  </Button>
                </div>
              ))
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpenUseTemplateDialog(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
