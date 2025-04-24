
import { Store, CreditCard, FileText, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const DataIntegrationsSection = () => {
  const handleConnectService = (service: string) => {
    toast.success(`Integration with ${service} initiated. This is a demo feature.`);
  };

  return (
    <div className="rounded-lg border bg-gradient-to-r from-blue-50 to-indigo-50 p-6 shadow-md space-y-4">
      <h3 className="text-xl font-semibold mb-2 text-indigo-700">Data Integrations</h3>
      <p className="text-sm text-gray-700">
        Sync your financial data automatically for more accurate processing by connecting to your business tools.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="bg-white p-4 rounded-lg border border-indigo-100 shadow-sm hover:shadow-md transition-all">
          <Store className="h-6 w-6 text-indigo-600 mb-2" />
          <h4 className="font-medium mb-1">Point-of-Sale Systems</h4>
          <p className="text-xs text-gray-600 mb-3">Import daily sales and inventory data from your POS system.</p>
          <Button 
            variant="outline" 
            className="w-full border-indigo-200 hover:bg-indigo-50"
            onClick={() => handleConnectService('POS')}
          >
            Connect POS
          </Button>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-indigo-100 shadow-sm hover:shadow-md transition-all">
          <CreditCard className="h-6 w-6 text-indigo-600 mb-2" />
          <h4 className="font-medium mb-1">E-Commerce Platforms</h4>
          <p className="text-xs text-gray-600 mb-3">Sync online store transactions and customer data automatically.</p>
          <Button 
            variant="outline" 
            className="w-full border-indigo-200 hover:bg-indigo-50"
            onClick={() => handleConnectService('E-Commerce')}
          >
            Connect E-Commerce
          </Button>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-indigo-100 shadow-sm hover:shadow-md transition-all">
          <FileText className="h-6 w-6 text-indigo-600 mb-2" />
          <h4 className="font-medium mb-1">Invoicing Software</h4>
          <p className="text-xs text-gray-600 mb-3">Track pending payments and invoice status from your billing system.</p>
          <Button 
            variant="outline" 
            className="w-full border-indigo-200 hover:bg-indigo-50"
            onClick={() => handleConnectService('Invoicing')}
          >
            Connect Invoicing
          </Button>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4 pt-2 border-t border-indigo-100">
        <p className="text-xs text-gray-500">
          Demo feature. Connect Supabase to enable real integrations with your business tools.
        </p>
        <Button 
          variant="link" 
          size="sm" 
          className="text-indigo-600 p-0 h-auto" 
          onClick={() => toast.info("API documentation would appear here in a production environment.")}
        >
          <Link className="h-4 w-4 mr-1" />
          API Docs
        </Button>
      </div>
    </div>
  );
};
