
import { useState } from "react";
import UserMetricsCards from "./UserMetricsCards";
import UserPermissionsTable from "./UserPermissionsTable";
import { User } from "./types";

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
  const [users, setUsers] = useState<User[]>(initialUsers);
  
  return (
    <>
      <UserMetricsCards users={users} />
      <UserPermissionsTable users={users} setUsers={setUsers} />
    </>
  );
};

export default UserManagementTab;
