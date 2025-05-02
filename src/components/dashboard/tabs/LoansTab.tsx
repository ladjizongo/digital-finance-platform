
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import type { FinancialData, Loan } from "@/types/dashboardTypes";

interface LoansTabProps {
  financialData: FinancialData;
}

const LoansTab = ({ financialData }: LoansTabProps) => {
  const [activeLoan, setActiveLoan] = useState("loan1");

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {financialData.loans.map(loan => (
          <Card 
            key={loan.id}
            className={`cursor-pointer transition-all ${
              activeLoan === loan.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setActiveLoan(loan.id)}
          >
            <CardHeader>
              <CardTitle className="text-lg">{loan.name}</CardTitle>
              <CardDescription>Loan ID: {loan.id}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Balance:</span>
                  <span className="font-medium">${loan.balance.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Credit Limit:</span>
                  <span className="font-medium">${loan.limit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Available Credit:</span>
                  <span className="font-medium">${loan.availableCredit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Interest Rate:</span>
                  <span className="font-medium">{loan.interestRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Monthly Payment:</span>
                  <span className="font-medium">${loan.monthlyPayment.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Statement Date:</span>
                  <span className="font-medium">{loan.statementDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Next Payment:</span>
                  <span className="font-medium">{loan.nextPaymentDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Minimum Payment:</span>
                  <span className="font-medium">${loan.minimumPayment.toLocaleString()}</span>
                </div>
                {loan.remainingTerm && loan.term && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Term:</span>
                    <span className="font-medium">{loan.remainingTerm}/{loan.term} months</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {activeLoan && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>
              {financialData.loans.find(loan => loan.id === activeLoan)?.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {financialData.loans
                .find(loan => loan.id === activeLoan)
                ?.transactions.map((transaction, idx) => (
                  <div key={idx} className="flex justify-between items-center py-2 border-b last:border-0">
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-muted-foreground">{transaction.date}</p>
                    </div>
                    <span className={`font-medium ${
                      transaction.amount < 0 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      ${Math.abs(transaction.amount).toLocaleString()}
                    </span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LoansTab;
