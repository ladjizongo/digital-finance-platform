
import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: string;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  switch (status.toLowerCase()) {
    case "approved":
      return <Badge variant="outline" className="border-green-500 text-green-700">Approved</Badge>;
    case "declined":
      return <Badge variant="outline" className="border-red-500 text-red-700">Declined</Badge>;
    case "pending":
      return <Badge variant="outline" className="border-amber-500 text-amber-700">Pending</Badge>;
    case "success":
      return <Badge variant="outline" className="border-green-500 text-green-700">Success</Badge>;
    case "failed":
      return <Badge variant="outline" className="border-red-500 text-red-700">Failed</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

export default StatusBadge;
