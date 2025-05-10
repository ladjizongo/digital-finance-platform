
import { Users, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// User role types
type Role = 'Admin' | 'Manager' | 'User';

// User interface
interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  lastActive: string;
  permissions: {
    eft: boolean;
    wire: boolean;
    transfer: boolean;
    reporting: boolean;
    audit: boolean;
    emailTransfer: boolean;
    approvals: boolean;
  };
}

interface UserMetricsCardsProps {
  users: User[];
}

const UserMetricsCards = ({ users }: UserMetricsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2 text-indigo-500" />
            Total Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{users.length}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2 text-indigo-500" />
            Admins
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">
            {users.filter(u => u.role === 'Admin').length}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Active Today</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">
            {users.filter(u => u.lastActive.includes('2025-05-10')).length}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserMetricsCards;
