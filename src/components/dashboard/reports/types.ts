
import { TransactionStatus, TransactionType } from "@/types/dashboardTypes";

export type ReportTabValue = "approved" | "declined" | "pending" | "login";

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

export interface LoginAudit {
  id: string;
  userId: string;
  userName: string;
  date: string;
  time: string;
  ipAddress: string;
  device: string;
  status: string;
  location: string;
}
