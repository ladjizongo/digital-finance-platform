import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { MetricCard } from "@/components/financial/MetricCard";
import CreditCardActions from "../CreditCardActions";
import TransactionDisputeDialog from "../TransactionDisputeDialog";
import type { FinancialData, CreditCard, Transaction } from "@/types/dashboardTypes";

interface CreditCardsTabProps {
  financialData: FinancialData;
}

const CreditCardsTab = ({ financialData }: CreditCardsTabProps) => {
  const [activeCreditCard, setActiveCreditCard] = useState("cc1");
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [disputeDialogOpen, setDisputeDialogOpen] = useState(false);

  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setDisputeDialogOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {financialData.creditCards.map(card => {
          const utilizationPercent = Math.round((card.balance / card.creditLimit) * 100);
          return (
            <MetricCard
              key={card.id}
              title={card.name}
              value={card.balance}
              unit="$"
              description={card.number}
              showUtilization={true}
              utilizationValue={utilizationPercent}
              utilizationLabel="Credit Utilization"
              warningThreshold={card.creditLimit * 0.75}
              warningMessage="High utilization may impact credit score"
              successMessage="Good utilization ratio"
            />
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {financialData.creditCards.map(card => (
          <Card 
            key={card.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              activeCreditCard === card.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setActiveCreditCard(card.id)}
          >
            <CardHeader>
              <CardTitle className="text-lg">{card.name}</CardTitle>
              <CardDescription>{card.number}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Balance:</span>
                  <span className="font-medium">${card.balance.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Credit Limit:</span>
                  <span className="font-medium">${card.creditLimit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Available Credit:</span>
                  <span className="font-medium">${card.availableCredit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Purchase Rate:</span>
                  <span className="font-medium">{card.purchaseRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Cash Advance Rate:</span>
                  <span className="font-medium">{card.cashAdvanceRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Minimum Payment:</span>
                  <span className="font-medium">${card.minimumPayment.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Statement Date:</span>
                  <span className="font-medium">{card.statementDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Due Date:</span>
                  <span className="font-medium">{card.dueDate}</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <CreditCardActions creditCard={card} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {activeCreditCard && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>
              {financialData.creditCards.find(card => card.id === activeCreditCard)?.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {financialData.creditCards
                .find(card => card.id === activeCreditCard)
                ?.transactions.map((transaction, idx) => (
                  <div 
                    key={idx} 
                    className="flex justify-between items-center py-2 border-b last:border-0 cursor-pointer hover:bg-gray-50 rounded px-2 transition-colors"
                    onClick={() => handleTransactionClick(transaction)}
                  >
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

      <TransactionDisputeDialog 
        transaction={selectedTransaction}
        open={disputeDialogOpen}
        onOpenChange={setDisputeDialogOpen}
      />
    </>
  );
};

export default CreditCardsTab;
