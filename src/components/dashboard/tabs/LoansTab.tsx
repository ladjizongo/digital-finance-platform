
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import type { FinancialData, Loan } from "@/types/dashboardTypes";
import { cn } from "@/lib/utils";

interface LoansTabProps {
  financialData: FinancialData;
}

const LoansTab = ({ financialData }: LoansTabProps) => {
  const [activeLoan, setActiveLoan] = useState("loan1");

  const getPayableDaysColorClass = (days: number) => {
    if (days >= 30) return "text-red-600";
    if (days >= 20 && days <= 29) return "text-amber-600";
    return "text-green-600";
  };

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
                
                {/* Special case for Equipment Financing */}
                {loan.name === "Equipment Financing" ? (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Loan Amount:</span>
                    <span className="font-medium">${loan.limit.toLocaleString()}</span>
                  </div>
                ) : (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Credit Limit:</span>
                    <span className="font-medium">${loan.limit.toLocaleString()}</span>
                  </div>
                )}
                
                {/* Only show Available Credit for loans other than Equipment Financing */}
                {loan.name !== "Equipment Financing" && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Available Credit:</span>
                    <span className="font-medium">${loan.availableCredit.toLocaleString()}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Interest Rate:</span>
                  <span className="font-medium">{loan.interestRate}%</span>
                </div>
                
                {/* Don't show Monthly Payment for Overdraft */}
                {loan.name !== "Overdraft" && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Monthly Payment:</span>
                    <span className="font-medium">${loan.monthlyPayment.toLocaleString()}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Statement Date:</span>
                  <span className="font-medium">{loan.statementDate}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Next Payment:</span>
                  <span className="font-medium">{loan.nextPaymentDate}</span>
                </div>
                
                {/* Only show Minimum Payment for loans other than Equipment Financing, Overdraft,
                    and Business Line of Credit */}
                {loan.name !== "Equipment Financing" && 
                  loan.name !== "Overdraft" && 
                  loan.name !== "Business Line of Credit" && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Minimum Payment:</span>
                    <span className="font-medium">${loan.minimumPayment.toLocaleString()}</span>
                  </div>
                )}
                
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
