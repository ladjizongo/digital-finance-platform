
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import TransactionHeader from "@/components/transactions/TransactionHeader";
import TransactionTabs from "@/components/transactions/TransactionTabs";
import PaymentFileUpload from "@/components/transactions/PaymentFileUpload";

const Transactions = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transactionType, setTransactionType] = useState("transfer");

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      switch (tab) {
        case "eft":
          setTransactionType("eft");
          break;
        case "wire":
          setTransactionType("wire");
          break;
        case "bill":
          setTransactionType("bill");
          break;
        case "email":
          setTransactionType("email");
          break;
        case "tax":
          setTransactionType("tax");
          break;
        default:
          setTransactionType("transfer");
      }
    }
  }, [searchParams]);

  const accounts = [
    { id: "1", name: "Checking Account", number: "****1234", balance: 3250.75 },
    { id: "2", name: "Savings Account", number: "****5678", balance: 15600.00 },
    { id: "3", name: "Investment Account", number: "****9012", balance: 6000.00 },
    { id: "4", name: "Retirement Account", number: "****3456", balance: 42500.00 },
  ];

  const savedPayees = [
    { id: "1", name: "Electric Company", accountNumber: "987654321" },
    { id: "2", name: "Water Utility", accountNumber: "123456789" },
    { id: "3", name: "Internet Provider", accountNumber: "456789123" },
    { id: "4", name: "Cell Phone Provider", accountNumber: "789123456" },
    { id: "5", name: "Credit Card Company", accountNumber: "321654987" },
  ];

  const contacts = [
    { id: "1", name: "John Smith", email: "john.smith@example.com" },
    { id: "2", name: "Jane Doe", email: "jane.doe@example.com" },
    { id: "3", name: "Robert Johnson", email: "robert.j@example.com" },
    { id: "4", name: "Sarah Williams", email: "sarah.w@example.com" },
    { id: "5", name: "Michael Brown", email: "michael.b@example.com" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      
      toast({
        title: "Transaction submitted",
        description: "Your transaction has been processed successfully.",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TransactionHeader />
      
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6">
        <PaymentFileUpload />
        
        <TransactionTabs
          transactionType={transactionType}
          setTransactionType={setTransactionType}
          accounts={accounts}
          savedPayees={savedPayees}
          contacts={contacts}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
        />
      </main>
    </div>
  );
};

export default Transactions;
