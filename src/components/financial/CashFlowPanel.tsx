
interface CashFlowPanelProps {
  cashFlow: any[] | null;
}

const CashFlowPanel = ({ cashFlow }: CashFlowPanelProps) => {
  if (!cashFlow) {
    return <p>No cash flow data available</p>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Cash Flow Analysis</h3>
      <div className="border rounded-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="p-2 text-left font-medium">Month</th>
              <th className="p-2 text-right font-medium">Inflow</th>
              <th className="p-2 text-right font-medium">Outflow</th>
              <th className="p-2 text-right font-medium">Net Flow</th>
            </tr>
          </thead>
          <tbody>
            {cashFlow.map((flow, index) => (
              <tr key={index} className="border-t">
                <td className="p-2 text-left">{flow.month}</td>
                <td className="p-2 text-right text-green-600">${flow.inflow?.toFixed(2)}</td>
                <td className="p-2 text-right text-red-600">${flow.outflow?.toFixed(2)}</td>
                <td className={`p-2 text-right ${flow.netFlow > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${flow.netFlow?.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CashFlowPanel;
