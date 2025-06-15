
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
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Financial Mock API Data</CardTitle>
        <CardDescription>Showing results from mockFinancialApiResponse for quick integration review.</CardDescription>
      </CardHeader>
      <CardContent>
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <span className="font-semibold">Monthly Revenue (last 6 months):</span>
            <div className="mt-1 flex flex-wrap gap-2">
              {data.monthlyRevenue.map((v: number, i: number) => (
                <span key={i} className="inline-block px-2 py-1 rounded bg-blue-100 text-blue-800 text-xs">
                  ${v.toLocaleString()}
                </span>
              ))}
            </div>
          </div>
          <div>
            <span className="font-semibold">Net Income:</span>
            <span className="ml-2">${data.netIncome.toLocaleString()}</span>
          </div>
          <div>
            <span className="font-semibold">Cash Balance:</span>
            <span className="ml-2">${data.cashBalance.toLocaleString()}</span>
          </div>
          <div>
            <span className="font-semibold">Accounts Receivable:</span>
            <ul className="ml-4 list-disc text-sm">
              <li>Total: ${data.accountsReceivable.total.toLocaleString()}</li>
              <li>Overdue &gt;30d: ${data.accountsReceivable.overdue30.toLocaleString()}</li>
            </ul>
          </div>
          <div>
            <span className="font-semibold">Accounts Payable:</span>
            <ul className="ml-4 list-disc text-sm">
              <li>Total: ${data.accountsPayable.total.toLocaleString()}</li>
              <li>Due &lt;7d: ${data.accountsPayable.dueIn7Days.toLocaleString()}</li>
            </ul>
          </div>
          <div>
            <span className="font-semibold">Shopify Payouts:</span>
            <ul className="ml-4">
              {data.shopifyPayouts.map(
                (p: any, i: number) => (
                  <li key={i}>
                    {p.date && <span>Date: {p.date}, </span>}Amount: ${p.amount.toLocaleString()}
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <span className="font-semibold">Amazon Payouts:</span>
            <ul className="ml-4">
              {data.amazonPayouts.map((p: any, i: number) => (
                <li key={i}>
                  {p.date ? <>Date: {p.date}, </> : null}
                  {p.expectedDate ? <>Expected: {p.expectedDate}, </> : null}
                  Amount: ${p.amount.toLocaleString()}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="font-semibold">Key Financial Ratios:</span>
            <ul className="ml-4 text-sm">
              <li>Current Ratio: {data.financialRatios.currentRatio}</li>
              <li>Debt-to-Income: {data.financialRatios.debtToIncome}</li>
              <li>Receivable Coverage: {data.financialRatios.receivableCoverage}</li>
            </ul>
          </div>
        </section>
      </CardContent>
    </Card>
  );
};
export default FinancialMockApiPanel;
