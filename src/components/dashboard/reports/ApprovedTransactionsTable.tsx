
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
import { ApprovedTransaction } from "./types";

interface ApprovedTransactionsTableProps {
  transactions: ApprovedTransaction[];
}

const ApprovedTransactionsTable = ({ transactions }: ApprovedTransactionsTableProps) => {
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
          <TableHead>Approved By</TableHead>
          <TableHead>Approved Date</TableHead>
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
              <TableCell>{tx.approvedBy}</TableCell>
              <TableCell>{tx.approvedDate}</TableCell>
              <TableCell><StatusBadge status={tx.status} /></TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={9} className="text-center py-4">
              No approved transactions match your filters
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ApprovedTransactionsTable;
