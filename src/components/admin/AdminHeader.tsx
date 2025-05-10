
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AdminHeaderProps {
  title?: string;
  description?: string;
}

const AdminHeader = ({ 
  title = "Admin Portal",
  description = "Manage user access and monitor transaction activities" 
}: AdminHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <Shield className="mr-2 h-6 w-6 text-indigo-600" />
          {title}
        </h1>
        <p className="text-gray-500 mt-1">{description}</p>
      </div>
      
      <Button onClick={() => navigate('/dashboard')} variant="outline">
        Back to Dashboard
      </Button>
    </div>
  );
};

export default AdminHeader;
