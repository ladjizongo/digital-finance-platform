
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
  ip: string;
  device: string;
  status: 'success' | 'failed';
  location: string;
}
