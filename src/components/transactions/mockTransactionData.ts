
import { Transaction } from "@/types/dashboardTypes";

// Mock transaction tracking data with additional info
export const mockTransactions: Transaction[] = [
  {
    id: 1001,
    date: "2025-05-10",
    description: "Vendor Payment",
    amount: 1250.00,
    status: "completed",
    type: "eft",
    reference: "EFT-2505-001",
    recipient: "ABC Supplies Inc.",
    trackingId: "TX10051250",
    createdBy: "Jane Smith",
    submittedBy: "Jane Smith",
    approvedBy: ["Michael Johnson"],
    currentLocation: "Treasury Department",
    statusHistory: [
      { status: "received", date: "2025-05-09", actor: "Jane Smith", notes: "Transaction created" },
      { status: "pending_approval", date: "2025-05-09", actor: "System" },
      { status: "approved", date: "2025-05-10", actor: "Michael Johnson", notes: "Approved for payment" },
      { status: "completed", date: "2025-05-10", actor: "System", notes: "Payment completed" }
    ]
  },
  {
    id: 1002,
    date: "2025-05-09",
    description: "International Wire",
    amount: 5000.00,
    status: "with_bank",
    type: "wire",
    reference: "WIRE-0905-123",
    recipient: "Global Partners Ltd.",
    trackingId: "WR09055000",
    createdBy: "David Miller",
    submittedBy: "Sarah Williams",
    approvedBy: ["Michael Johnson", "Robert Brown"],
    currentLocation: "Partner Bank",
    statusHistory: [
      { status: "received", date: "2025-05-08", actor: "David Miller", notes: "Transaction created" },
      { status: "pending_approval", date: "2025-05-08", actor: "System" },
      { status: "approved", date: "2025-05-09", actor: "Michael Johnson", notes: "First approval" },
      { status: "approved", date: "2025-05-09", actor: "Robert Brown", notes: "Second approval" },
      { status: "with_bank", date: "2025-05-09", actor: "System", notes: "Sent to partner bank" }
    ]
  },
  {
    id: 1003,
    date: "2025-05-10",
    description: "To Savings",
    amount: 1000.00,
    status: "completed",
    type: "transfer",
    reference: "INT-1005-456",
    recipient: "Savings Account",
    trackingId: "TR10051000",
    createdBy: "Jane Smith",
    submittedBy: "Jane Smith",
    approvedBy: [],
    currentLocation: "Internal Banking System",
    statusHistory: [
      { status: "received", date: "2025-05-10", actor: "Jane Smith", notes: "Transaction created" },
      { status: "completed", date: "2025-05-10", actor: "System", notes: "Transfer completed" }
    ]
  },
  {
    id: 1004,
    date: "2025-05-08",
    description: "To Client",
    amount: 750.00,
    status: "pending_approval",
    type: "email_transfer",
    reference: "EMT-0805-789",
    recipient: "john.client@example.com",
    trackingId: "ET0805750",
    createdBy: "Sarah Williams",
    submittedBy: "Sarah Williams",
    currentLocation: "Approval Queue",
    statusHistory: [
      { status: "received", date: "2025-05-08", actor: "Sarah Williams", notes: "Transaction created" },
      { status: "pending_approval", date: "2025-05-08", actor: "System", notes: "Waiting for approval" }
    ]
  },
  {
    id: 1005,
    date: "2025-05-07",
    description: "Supplier Payment",
    amount: 3450.00,
    status: "received",
    type: "eft",
    reference: "EFT-0705-234",
    recipient: "Quality Goods Co.",
    trackingId: "TX07053450",
    createdBy: "Robert Brown",
    submittedBy: "Robert Brown",
    currentLocation: "Processing Queue",
    statusHistory: [
      { status: "received", date: "2025-05-07", actor: "Robert Brown", notes: "Transaction created" }
    ]
  },
  {
    id: 1006,
    date: "2025-05-06",
    description: "Overseas Payment",
    amount: 12500.00,
    status: "processing",
    type: "wire",
    reference: "WIRE-0605-567",
    recipient: "Overseas Vendor Inc.",
    trackingId: "WR0605125K",
    createdBy: "Michael Johnson",
    submittedBy: "Michael Johnson",
    approvedBy: ["Sarah Williams", "David Miller"],
    currentLocation: "Wire Department",
    statusHistory: [
      { status: "received", date: "2025-05-05", actor: "Michael Johnson", notes: "Transaction created" },
      { status: "pending_approval", date: "2025-05-05", actor: "System" },
      { status: "approved", date: "2025-05-06", actor: "Sarah Williams", notes: "First approval" },
      { status: "approved", date: "2025-05-06", actor: "David Miller", notes: "Second approval" },
      { status: "processing", date: "2025-05-06", actor: "System", notes: "Processing wire" }
    ]
  },
  {
    id: 1007,
    date: "2025-05-05",
    description: "Weekly Transfer",
    amount: 500.00,
    status: "failed",
    type: "transfer",
    reference: "INT-0505-890",
    recipient: "Checking Account",
    trackingId: "TR0505500F",
    createdBy: "Jane Smith",
    submittedBy: "Jane Smith",
    currentLocation: "Failed Queue",
    statusHistory: [
      { status: "received", date: "2025-05-05", actor: "Jane Smith", notes: "Transaction created" },
      { status: "processing", date: "2025-05-05", actor: "System" },
      { status: "failed", date: "2025-05-05", actor: "System", notes: "Insufficient funds" }
    ]
  }
];
