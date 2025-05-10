
export type ReportTabValue = 'approved' | 'declined' | 'pending' | 'login';

export type TransactionStatus = 'received' | 'pending_approval' | 'processing' | 'with_bank' | 'completed' | 'failed' | 'approved' | 'declined' | 'pending';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  accountFrom?: string;
  accountTo?: string;
  status: TransactionStatus;
  reference?: string;
  type: 'EFT' | 'Wire' | 'Transfer' | 'Email Transfer';
  confirmationNumber?: string;
  memo?: string;
  recipient?: string;
  bank?: string;
}

export interface LoginAudit {
  id: string;
  user: string;
  date: string;
  time: string;
  ipAddress: string;
  device: string;
  status: 'success' | 'failed';
  location: string;
}

export interface ApprovedTransaction {
  id: string;
  type: string;
  date: string;
  amount: number;
  from: string;
  to: string;
  initiatedBy: string;
  status: TransactionStatus;
  approvedBy: string;
  approvedDate: string;
}

export interface DeclinedTransaction {
  id: string;
  type: string;
  date: string;
  amount: number;
  from: string;
  to: string;
  initiatedBy: string;
  status: TransactionStatus;
  declinedBy: string;
  declinedDate: string;
  reason: string;
}

export interface PendingTransaction {
  id: string;
  type: string;
  date: string;
  amount: number;
  from: string;
  to: string;
  initiatedBy: string;
  status: TransactionStatus;
  requiredApprovers: number;
  currentApprovers: number;
  waitingFor: string;
}

export interface BaseReportFilters {
  dateFrom?: Date;
  dateTo?: Date;
  userFilter: string;
}

export interface TransactionReportFilters extends BaseReportFilters {
  transactionType: string;
  amountMin: string;
  amountMax: string;
}
