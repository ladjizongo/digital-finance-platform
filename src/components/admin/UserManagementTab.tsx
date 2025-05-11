
import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserMetricsCards from "./UserMetricsCards";
import UserPermissionsTable from "./UserPermissionsTable";
import AddUserDialog from "./AddUserDialog";
import DeleteUserConfirmDialog from "./DeleteUserConfirmDialog";
import { User } from "./types";
import { useToast } from "@/hooks/use-toast";

// Sample user data
const initialUsers: User[] = [
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
    },
    approvalLimits: {
      eft: 100000,
      wire: 250000,
      transfer: 200000,
      emailTransfer: 50000
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
      approvals: true
    },
    approvalLimits: {
      eft: 25000,
      wire: 50000,
      transfer: 50000,
      emailTransfer: 10000
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
    },
    approvalLimits: {
      eft: 0,
      wire: 0,
      transfer: 5000,
      emailTransfer: 2500
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
      approvals: true
    },
    approvalLimits: {
      eft: 10000,
      wire: 0,
      transfer: 15000,
      emailTransfer: 5000
    }
  }
];

const UserManagementTab = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  
  // Add new user
  const handleAddUser = (newUser: Omit<User, "id">) => {
    // Generate a new ID (in a real app, this would come from the backend)
    const id = (users.length + 1).toString();
    setUsers([...users, { ...newUser, id }]);
  };

  // Delete user
  const openDeleteDialog = (user: User) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteUser = () => {
    if (!userToDelete) return;
    
    const updatedUsers = users.filter(user => user.id !== userToDelete.id);
    setUsers(updatedUsers);
    
    toast({
      title: "User deleted",
      description: `${userToDelete.name} has been removed.`,
    });
    
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };
  
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <UserMetricsCards users={users} />
        <Button 
          onClick={() => setAddUserDialogOpen(true)}
          className="flex items-center gap-1"
        >
          <PlusCircle className="h-4 w-4" />
          Add User
        </Button>
      </div>
      
      <UserPermissionsTable 
        users={users} 
        setUsers={setUsers} 
        onDeleteUser={openDeleteDialog}
      />
      
      <AddUserDialog 
        open={addUserDialogOpen}
        onOpenChange={setAddUserDialogOpen}
        onAddUser={handleAddUser}
      />
      
      {userToDelete && (
        <DeleteUserConfirmDialog 
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={confirmDeleteUser}
          userName={userToDelete.name}
        />
      )}
    </>
  );
};

export default UserManagementTab;
