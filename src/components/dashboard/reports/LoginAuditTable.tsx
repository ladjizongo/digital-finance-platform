
import { useState } from "react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import StatusBadge from "./StatusBadge";
import UserActivityModal from "./UserActivityModal";
import { LoginAudit } from "./types";

interface LoginAuditTableProps {
  auditLogs: LoginAudit[];
}

const LoginAuditTable = ({ auditLogs }: LoginAuditTableProps) => {
  const [selectedUser, setSelectedUser] = useState<{ name: string; email?: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUserClick = (user: string) => {
    // Extract email from user string if it contains both name and email
    // Format could be "John Smith (john.smith@company.com)" or just "John Smith"
    const emailMatch = user.match(/\(([^)]+)\)/);
    const email = emailMatch ? emailMatch[1] : undefined;
    const name = user.replace(/\s*\([^)]*\)/, '').trim();
    
    setSelectedUser({ name, email });
    setIsModalOpen(true);
  };

  return (
    <>
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
                <TableCell>
                  <button
                    onClick={() => handleUserClick(log.user)}
                    className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer text-left"
                  >
                    {log.user}
                  </button>
                </TableCell>
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

      {selectedUser && (
        <UserActivityModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          userName={selectedUser.name}
          userEmail={selectedUser.email}
        />
      )}
    </>
  );
};

export default LoginAuditTable;
