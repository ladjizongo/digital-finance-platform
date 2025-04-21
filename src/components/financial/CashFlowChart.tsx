
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { CashFlowEntry } from "@/types/financial";

interface CashFlowChartProps {
  data: CashFlowEntry[];
  accountId: string;
}

export const CashFlowChart = ({ data, accountId }: CashFlowChartProps) => {
  const filteredData = data.filter(flow => flow.accountId === accountId);

  return (
    <div>
      <h4 className="mb-2 text-sm font-medium">6-Month Cash Flow Trend</h4>
      <div className="h-72">
        <ChartContainer 
          config={{ 
            income: { label: "Income", color: "#4ade80" },
            expenses: { label: "Expenses", color: "#f87171" },
            balance: { label: "Net Balance", color: "#3b82f6" },
          }}
        >
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <ChartTooltip 
              content={
                <ChartTooltipContent 
                  formatter={(value, name) => [`$${value.toLocaleString()}`, name]} 
                />
              } 
            />
            <Line 
              type="monotone" 
              dataKey="income" 
              stroke="var(--color-income)" 
              strokeWidth={2} 
              dot={{ r: 4 }} 
            />
            <Line 
              type="monotone" 
              dataKey="expenses" 
              stroke="var(--color-expenses)" 
              strokeWidth={2} 
              dot={{ r: 4 }} 
            />
            <Line 
              type="monotone" 
              dataKey="balance" 
              stroke="var(--color-balance)" 
              strokeWidth={2.5} 
              dot={{ r: 5 }} 
            />
          </LineChart>
        </ChartContainer>
      </div>
    </div>
  );
};
