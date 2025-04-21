
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface CashFlowTableProps {
  data: {
    month: string;
    income: number;
    expenses: number;
    balance: number;
  }[];
}

export const CashFlowTable = ({ data }: CashFlowTableProps) => {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium">Monthly Cash Flow Summary</h4>
      <div className="rounded-lg border p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Month</TableHead>
              <TableHead className="text-right">Income</TableHead>
              <TableHead className="text-right">Expenses</TableHead>
              <TableHead className="text-right">Net Balance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((flow) => (
              <TableRow key={flow.month}>
                <TableCell>{flow.month}</TableCell>
                <TableCell className="text-right text-green-600">
                  ${flow.income.toLocaleString('en-US')}
                </TableCell>
                <TableCell className="text-right text-red-600">
                  ${flow.expenses.toLocaleString('en-US')}
                </TableCell>
                <TableCell className={`text-right ${flow.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${flow.balance.toLocaleString('en-US')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
