
// User role types
export type Role = 'Admin' | 'Manager' | 'User';

// User permissions interface
export interface UserPermissions {
  eft: boolean;
  wire: boolean;
  transfer: boolean;
  reporting: boolean;
  audit: boolean;
  emailTransfer: boolean;
  approvals: boolean;
}

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  lastActive: string;
  permissions: UserPermissions;
}
