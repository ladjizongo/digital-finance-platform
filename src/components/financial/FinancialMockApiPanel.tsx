
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { useMockFinancialApi } from "@/hooks/useMockFinancialApi";

export const FinancialMockApiPanel = () => {
  const { data, isLoading, error } = useMockFinancialApi();

  if (isLoading) {
    return <Card><CardContent>Loading...</CardContent></Card>;
  }
  if (error || !data) {
    return <Card><CardContent>Error loading mock data.</CardContent></Card>;
  }

  return (
    <Card className="mb-8 shadow-md border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-blue-900">Financial Snapshot</CardTitle>
        <CardDescription className="text-sm text-blue-800">Last 6 months - mock integration preview</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          <div className="rounded-lg bg-blue-100 p-4 flex flex-col items-center">
            <div className="text-xs font-medium text-blue-700">Monthly Revenue</div>
            <div className="flex flex-wrap gap-2 mt-2">
              {data.monthlyRevenue.map((v: number, i: number) => (
                <span key={i} className="bg-white/80 px-2 py-1 rounded shadow-sm text-blue-900 text-sm font-semibold">
                  ${v.toLocaleString()}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-lg bg-indigo-100 p-4 flex flex-col items-center">
            <div className="text-xs font-medium text-indigo-700">Net Income</div>
            <span className="text-2xl font-bold text-indigo-900 mt-2">${data.netIncome.toLocaleString()}</span>
          </div>
          <div className="rounded-lg bg-teal-100 p-4 flex flex-col items-center">
            <div className="text-xs font-medium text-teal-800">Cash Balance</div>
            <span className="text-2xl font-bold text-teal-900 mt-2">${data.cashBalance.toLocaleString()}</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="rounded-lg bg-yellow-50 p-4">
            <div className="text-xs font-medium text-yellow-800">Accounts Receivable</div>
            <div className="flex flex-col gap-1 mt-2">
              <span className="text-lg font-semibold text-yellow-900">Total: ${data.accountsReceivable.total.toLocaleString()}</span>
              <span className="text-sm text-yellow-700">Overdue &gt;30d: ${data.accountsReceivable.overdue30.toLocaleString()}</span>
            </div>
          </div>
          <div className="rounded-lg bg-red-50 p-4">
            <div className="text-xs font-medium text-rose-800">Accounts Payable</div>
            <div className="flex flex-col gap-1 mt-2">
              <span className="text-lg font-semibold text-rose-900">Total: ${data.accountsPayable.total.toLocaleString()}</span>
              <span className="text-sm text-rose-700">Due &lt;7d: ${data.accountsPayable.dueIn7Days.toLocaleString()}</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="rounded-lg bg-green-50 p-4">
            <div className="font-medium text-green-700 mb-2">Shopify Payouts</div>
            <ul className="text-sm space-y-1">
              {data.shopifyPayouts.map((p: any, i: number) => (
                <li key={i}>
                  {p.date && <span className="text-green-800 font-medium">{p.date}</span>}
                  <span className="ml-2 text-green-900">${p.amount.toLocaleString()}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg bg-purple-50 p-4">
            <div className="font-medium text-purple-700 mb-2">Amazon Payouts</div>
            <ul className="text-sm space-y-1">
              {data.amazonPayouts.map((p: any, i: number) => (
                <li key={i}>
                  {p.date && <span className="text-purple-800 font-medium">{p.date}</span>}
                  {p.expectedDate && <span className="text-purple-600 font-medium">Expected: {p.expectedDate}</span>}
                  <span className="ml-2 text-purple-900">${p.amount.toLocaleString()}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="rounded-lg bg-gray-50 p-4 mt-3">
          <div className="font-medium text-gray-700 mb-2">Key Financial Ratios</div>
          <ul className="flex flex-wrap gap-4">
            <li>
              <span className="block text-xs text-gray-500">Current Ratio</span>
              <span className="text-lg font-semibold text-gray-900">{data.financialRatios.currentRatio}</span>
            </li>
            <li>
              <span className="block text-xs text-gray-500">Debt-to-Income</span>
              <span className="text-lg font-semibold text-gray-900">{data.financialRatios.debtToIncome}</span>
            </li>
            <li>
              <span className="block text-xs text-gray-500">Receivable Coverage</span>
              <span className="text-lg font-semibold text-gray-900">{data.financialRatios.receivableCoverage}</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialMockApiPanel;
