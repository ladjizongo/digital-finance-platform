import { 
  ApprovedTransaction, 
  DeclinedTransaction, 
  LoginAudit, 
  PendingTransaction 
} from "./types";

// Sample data for demonstration
export const approvedTransactions: ApprovedTransaction[] = [
  { 
    id: "tx1",
    type: "EFT",
    date: "May 8, 2025",
    amount: 12500.00,
    from: "Checking Account",
    to: "Supplier Inc.",
    initiatedBy: "Jane Smith",
    status: "approved",
    approvedBy: "Michael Johnson",
    approvedDate: "May 9, 2025"
  },
  { 
    id: "tx2",
    type: "Wire",
    date: "May 6, 2025",
    amount: 85000.00,
    from: "Business Account",
    to: "Equipment Vendor Ltd.",
    initiatedBy: "Robert Brown",
    status: "approved",
    approvedBy: "Sarah Williams",
    approvedDate: "May 7, 2025"
  },
  { 
    id: "tx3",
    type: "Transfer",
    date: "May 5, 2025",
    amount: 25000.00,
    from: "Investment Account",
    to: "Checking Account",
    initiatedBy: "David Miller",
    status: "approved",
    approvedBy: "Jane Smith",
    approvedDate: "May 5, 2025"
  },
  { 
    id: "tx4",
    type: "Email Transfer",
    date: "May 7, 2025",
    amount: 5000.00,
    from: "Business Account",
    to: "client@example.com",
    initiatedBy: "Michael Johnson",
    status: "approved",
    approvedBy: "Sarah Williams",
    approvedDate: "May 8, 2025"
  }
];

export const loginAudits: LoginAudit[] = [
  {
    id: "login1",
    user: "Jane Smith",
    date: "May 10, 2025",
    time: "09:15:22",
    ipAddress: "192.168.1.105",
    device: "Desktop - Chrome",
    status: "success",
    location: "New York, USA"
  },
  {
    id: "login2",
    user: "Michael Johnson",
    date: "May 10, 2025",
    time: "10:22:45",
    ipAddress: "192.168.1.110",
    device: "Mobile - Safari",
    status: "success",
    location: "New York, USA"
  },
  {
    id: "login3",
    user: "Robert Brown",
    date: "May 9, 2025",
    time: "16:05:33",
    ipAddress: "192.168.1.115",
    device: "Desktop - Firefox",
    status: "failed",
    location: "Chicago, USA"
  },
  {
    id: "login4",
    user: "Sarah Williams",
    date: "May 9, 2025",
    time: "14:45:12",
    ipAddress: "192.168.1.120",
    device: "Tablet - Chrome",
    status: "success",
    location: "Boston, USA"
  }
];

export const declinedTransactions: DeclinedTransaction[] = [
  { 
    id: "dtx1",
    type: "EFT",
    date: "May 7, 2025",
    amount: 45000.00,
    from: "Checking Account",
    to: "Unknown Vendor",
    initiatedBy: "Jane Smith",
    status: "declined",
    declinedBy: "Sarah Williams",
    declinedDate: "May 8, 2025",
    reason: "Suspicious recipient"
  },
  { 
    id: "dtx2",
    type: "Wire",
    date: "May 5, 2025",
    amount: 120000.00,
    from: "Business Account",
    to: "Overseas Corp",
    initiatedBy: "Robert Brown",
    status: "declined",
    declinedBy: "David Miller",
    declinedDate: "May 6, 2025",
    reason: "Exceeds authorization limit"
  },
  { 
    id: "dtx3",
    type: "Email Transfer",
    date: "May 4, 2025",
    amount: 15000.00,
    from: "Investment Account",
    to: "unknown@example.com",
    initiatedBy: "David Miller",
    status: "declined",
    declinedBy: "Michael Johnson",
    declinedDate: "May 5, 2025",
    reason: "Unverified recipient"
  }
];

export const pendingTransactions: PendingTransaction[] = [
  { 
    id: "ptx1",
    type: "EFT",
    date: "May 9, 2025",
    amount: 18500.00,
    from: "Checking Account",
    to: "Vendor LLC",
    initiatedBy: "Jane Smith",
    status: "pending",
    requiredApprovers: 2,
    currentApprovers: 1,
    waitingFor: "Director level"
  },
  { 
    id: "ptx2",
    type: "Wire",
    date: "May 8, 2025",
    amount: 75000.00,
    from: "Business Account",
    to: "International Partner",
    initiatedBy: "Robert Brown",
    status: "pending",
    requiredApprovers: 3,
    currentApprovers: 1,
    waitingFor: "Executive level"
  },
  { 
    id: "ptx3",
    type: "Transfer",
    date: "May 10, 2025",
    amount: 50000.00,
    from: "Business Account",
    to: "Investment Account",
    initiatedBy: "Sarah Williams",
    status: "pending",
    requiredApprovers: 2,
    currentApprovers: 0,
    waitingFor: "Manager level"
  }
];
