
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Search, Shield, Users, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useToast } from "@/hooks/use-toast";
import TransactionTracker from "@/components/transactions/TransactionTracker";

// User role types
type Role = 'Admin' | 'Manager' | 'User';

// User permissions interface
interface UserPermissions {
  eft: boolean;
  wire: boolean;
  transfer: boolean;
  reporting: boolean;
  audit: boolean;
  emailTransfer: boolean;
  approvals: boolean;
}

// User interface
interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  lastActive: string;
  permissions: UserPermissions;
}

const AdminPortal = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("users");
  
  // Sample user data - in a real app, this would come from your backend
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@company.com",
      role: "Admin",
      lastActive: "2025-05-10 09:32 AM",
      permissions: {
        eft: true,
        wire: true,
        transfer: true,
        reporting: true,
        audit: true,
        emailTransfer: true,
        approvals: true
      }
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.j@company.com",
      role: "Manager",
      lastActive: "2025-05-09 04:15 PM",
      permissions: {
        eft: true,
        wire: true,
        transfer: true,
        reporting: true,
        audit: false,
        emailTransfer: true,
        approvals: false
      }
    },
    {
      id: "3",
      name: "Michael Brown",
      email: "m.brown@company.com",
      role: "User",
      lastActive: "2025-05-08 10:45 AM",
      permissions: {
        eft: false,
        wire: false,
        transfer: true,
        reporting: false,
        audit: false,
        emailTransfer: true,
        approvals: false
      }
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "e.davis@company.com",
      role: "User",
      lastActive: "2025-05-10 08:20 AM",
      permissions: {
        eft: true,
        wire: false,
        transfer: true,
        reporting: true,
        audit: false,
        emailTransfer: true,
        approvals: false
      }
    }
  ]);

  // Filter users based on search query
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Update user permission
  const updatePermission = (userId: string, permissionKey: keyof UserPermissions, value: boolean) => {
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          permissions: {
            ...user.permissions,
            [permissionKey]: value
          }
        };
      }
      return user;
    });
    
    setUsers(updatedUsers);
    
    toast({
      title: "Permission updated",
      description: `User permission has been successfully updated.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
              <Shield className="mr-2 h-6 w-6 text-indigo-600" />
              Admin Portal
            </h1>
            <p className="text-gray-500 mt-1">Manage user access and monitor transaction activities</p>
          </div>
          
          <Button onClick={() => navigate('/dashboard')} variant="outline">
            Back to Dashboard
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="users" className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              User Management
            </TabsTrigger>
            <TabsTrigger value="transactions" className="flex items-center">
              <Activity className="mr-2 h-4 w-4" />
              Transaction Tracking
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="mt-0">
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
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>User Permissions</CardTitle>
                <CardDescription>
                  Manage access control for all users in the system
                </CardDescription>
                <div className="relative mt-2">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search users by name or email..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>EFT</TableHead>
                        <TableHead>Wire</TableHead>
                        <TableHead>Transfer</TableHead>
                        <TableHead>E-Transfer</TableHead>
                        <TableHead>Reporting</TableHead>
                        <TableHead>Audit</TableHead>
                        <TableHead>Approvals</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  user.role === 'Admin'
                                    ? 'bg-red-100 text-red-800 hover:bg-red-100'
                                    : user.role === 'Manager'
                                    ? 'bg-blue-100 text-blue-800 hover:bg-blue-100'
                                    : 'bg-gray-100 text-gray-800 hover:bg-gray-100'
                                }
                              >
                                {user.role}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Switch
                                checked={user.permissions.eft}
                                onCheckedChange={(checked) => updatePermission(user.id, 'eft', checked)}
                                disabled={user.role === 'Admin'}
                              />
                            </TableCell>
                            <TableCell>
                              <Switch
                                checked={user.permissions.wire}
                                onCheckedChange={(checked) => updatePermission(user.id, 'wire', checked)}
                                disabled={user.role === 'Admin'}
                              />
                            </TableCell>
                            <TableCell>
                              <Switch
                                checked={user.permissions.transfer}
                                onCheckedChange={(checked) => updatePermission(user.id, 'transfer', checked)}
                                disabled={user.role === 'Admin'}
                              />
                            </TableCell>
                            <TableCell>
                              <Switch
                                checked={user.permissions.emailTransfer}
                                onCheckedChange={(checked) => updatePermission(user.id, 'emailTransfer', checked)}
                                disabled={user.role === 'Admin'}
                              />
                            </TableCell>
                            <TableCell>
                              <Switch
                                checked={user.permissions.reporting}
                                onCheckedChange={(checked) => updatePermission(user.id, 'reporting', checked)}
                                disabled={user.role === 'Admin'}
                              />
                            </TableCell>
                            <TableCell>
                              <Switch
                                checked={user.permissions.audit}
                                onCheckedChange={(checked) => updatePermission(user.id, 'audit', checked)}
                                disabled={user.role === 'Admin'}
                              />
                            </TableCell>
                            <TableCell>
                              <Switch
                                checked={user.permissions.approvals}
                                onCheckedChange={(checked) => updatePermission(user.id, 'approvals', checked)}
                                disabled={user.role === 'Admin'}
                              />
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={9} className="text-center py-6 text-gray-500">
                            No users found matching your search
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="mt-0">
            <TransactionTracker />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminPortal;
