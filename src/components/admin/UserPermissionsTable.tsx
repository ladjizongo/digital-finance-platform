
import { useState } from "react";
import { Search } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

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

interface UserPermissionsTableProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const UserPermissionsTable = ({ users, setUsers }: UserPermissionsTableProps) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  
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
  );
};

export default UserPermissionsTable;
