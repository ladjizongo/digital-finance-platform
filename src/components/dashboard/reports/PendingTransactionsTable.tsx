
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import StatusBadge from "./StatusBadge";
import { formatCurrency } from "./utils";
import { PendingTransaction } from "./types";

interface PendingTransactionsTableProps {
  transactions: PendingTransaction[];
}

const PendingTransactionsTable = ({ transactions }: PendingTransactionsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>From</TableHead>
          <TableHead>To</TableHead>
          <TableHead>Initiated By</TableHead>
          <TableHead>Required Approvers</TableHead>
          <TableHead>Current Approvers</TableHead>
          <TableHead>Waiting For</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.length > 0 ? (
          transactions.map((tx) => (
            <TableRow key={tx.id}>
              <TableCell>{tx.date}</TableCell>
              <TableCell>{tx.type}</TableCell>
              <TableCell>{formatCurrency(tx.amount)}</TableCell>
              <TableCell>{tx.from}</TableCell>
              <TableCell>{tx.to}</TableCell>
              <TableCell>{tx.initiatedBy}</TableCell>
              <TableCell>{tx.requiredApprovers}</TableCell>
              <TableCell>{tx.currentApprovers}</TableCell>
              <TableCell>{tx.waitingFor}</TableCell>
              <TableCell><StatusBadge status={tx.status} /></TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={10} className="text-center py-4">
              No pending transactions match your filters
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default PendingTransactionsTable;
