
import { ArrowLeftRight, Clock, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const FXHeader = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Foreign Exchange</h1>
            <p className="text-sm text-gray-500">Convert currencies and view exchange rates</p>
          </div>
          
          <div className="flex space-x-3">
            <Button asChild variant="outline" size="sm">
              <Link to="/dashboard">
                Back to Dashboard
              </Link>
            </Button>
            
            <Button asChild size="sm">
              <Link to="/transactions">
                Make Transaction
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="mt-4 flex space-x-4 overflow-x-auto pb-2">
          <Button variant="ghost" size="sm" className="flex items-center">
            <ArrowLeftRight className="mr-2 h-4 w-4" />
            <span>Convert</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            <span>Rate Alerts</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center">
            <DollarSign className="mr-2 h-4 w-4" />
            <span>FX Market News</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default FXHeader;
