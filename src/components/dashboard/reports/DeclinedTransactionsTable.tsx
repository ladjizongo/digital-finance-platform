
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
import { DeclinedTransaction } from "./types";

interface DeclinedTransactionsTableProps {
  transactions: DeclinedTransaction[];
}

const DeclinedTransactionsTable = ({ transactions }: DeclinedTransactionsTableProps) => {
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
          <TableHead>Declined By</TableHead>
          <TableHead>Declined Date</TableHead>
          <TableHead>Reason</TableHead>
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
              <TableCell>{tx.declinedBy}</TableCell>
              <TableCell>{tx.declinedDate}</TableCell>
              <TableCell>{tx.reason}</TableCell>
              <TableCell><StatusBadge status={tx.status} /></TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={10} className="text-center py-4">
              No declined transactions match your filters
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DeclinedTransactionsTable;
