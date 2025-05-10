
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import StatusBadge from "./StatusBadge";
import { LoginAudit } from "./types";

interface LoginAuditTableProps {
  auditLogs: LoginAudit[];
}

const LoginAuditTable = ({ auditLogs }: LoginAuditTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>User</TableHead>
          <TableHead>IP Address</TableHead>
          <TableHead>Device</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {auditLogs.length > 0 ? (
          auditLogs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>{log.date}</TableCell>
              <TableCell>{log.time}</TableCell>
              <TableCell>{log.user}</TableCell>
              <TableCell>{log.ipAddress}</TableCell>
              <TableCell>{log.device}</TableCell>
              <TableCell>{log.location}</TableCell>
              <TableCell><StatusBadge status={log.status} /></TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-4">
              No login records match your filters
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default LoginAuditTable;
