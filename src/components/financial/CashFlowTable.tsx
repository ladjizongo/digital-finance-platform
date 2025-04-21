
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CashFlowEntry } from "@/types/financial";

interface CashFlowTableProps {
  data: CashFlowEntry[];
  accountId: string;
}

export const CashFlowTable = ({ data, accountId }: CashFlowTableProps) => {
  const filteredData = data.filter(flow => flow.accountId === accountId);

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
            {filteredData.length > 0 ? (
              filteredData.map((flow) => (
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                  No cash flow data available for this account
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
