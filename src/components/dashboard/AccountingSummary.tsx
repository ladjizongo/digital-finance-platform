
import { Button } from "@/components/ui/button";

const accountingSummaryData = {
  receivables: { total: 42300, upcoming: 14000, overdue: 8200 },
  payables: { total: 25100, upcoming: 7800, overdue: 5300 },
};

const payablesList = [
  {
    vendor: "Staples Inc.",
    amount: 820,
    dueDate: "Jun. 16",
    status: "Upcoming",
    suggestedAction: "Schedule Payment",
    overdue: false,
  },
  {
    vendor: "FedEx",
    amount: 1520,
    dueDate: "Jun. 12",
    status: "Overdue",
    suggestedAction: "Send Alert or Pay Now",
    overdue: true,
  },
];

export const AccountingSummary = () => {
  return (
    <div className="space-y-8">
      {/* Accounting Summary Card */}
      <div className="rounded-2xl bg-white shadow-md border p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mb-6">
          <div>
            <div className="text-2xl font-semibold tracking-tight">Accounting Summary</div>
          </div>
          <div className="flex gap-3 mt-3 sm:mt-0">
            <Button variant="outline" className="bg-blue-600 text-white hover:bg-blue-700 border-blue-600">
              Sync Now
            </Button>
            <Button variant="outline" className="bg-blue-600 text-white hover:bg-blue-700 border-blue-600">
              View All Invoices
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="font-medium py-2 px-3"></th>
                <th className="font-medium py-2 px-3">TOTAL</th>
                <th className="font-medium py-2 px-3">UPCOMING</th>
                <th className="font-medium py-2 px-3">OVERDUE</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 px-3 font-medium">Receivables</td>
                <td className="py-2 px-3">${accountingSummaryData.receivables.total.toLocaleString()}</td>
                <td className="py-2 px-3">${accountingSummaryData.receivables.upcoming.toLocaleString()}</td>
                <td className="py-2 px-3">${accountingSummaryData.receivables.overdue.toLocaleString()}</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium">Payables</td>
                <td className="py-2 px-3">${accountingSummaryData.payables.total.toLocaleString()}</td>
                <td className="py-2 px-3">${accountingSummaryData.payables.upcoming.toLocaleString()}</td>
                <td className="py-2 px-3">${accountingSummaryData.payables.overdue.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* Upcoming Payables Card */}
      <div className="rounded-2xl bg-white shadow-md border p-6">
        <div className="text-xl font-semibold mb-4">Upcoming Payables</div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="font-medium py-2 px-3">VENDOR</th>
                <th className="font-medium py-2 px-3">AMOUNT</th>
                <th className="font-medium py-2 px-3">DUE DATE</th>
                <th className="font-medium py-2 px-3">STATUS</th>
                <th className="font-medium py-2 px-3">SUGGESTED ACTION</th>
              </tr>
            </thead>
            <tbody>
              {payablesList.map((item, idx) => (
                <tr key={idx} className="border-b last:border-0">
                  <td className="py-2 px-3">{item.vendor}</td>
                  <td className="py-2 px-3">${item.amount.toLocaleString()}</td>
                  <td className="py-2 px-3">{item.dueDate}</td>
                  <td className="py-2 px-3">
                    <span className={item.overdue ? "text-red-600 font-medium" : "text-gray-500"}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-2 px-3">
                    <Button
                      size="sm"
                      className={item.overdue
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-blue-600 text-white hover:bg-blue-700"}
                    >
                      {item.suggestedAction}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AccountingSummary;

