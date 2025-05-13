
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import TransactionHeader from "@/components/transactions/TransactionHeader";
import TransactionTabs from "@/components/transactions/TransactionTabs";
import { DataIntegrationsSection } from "@/components/transactions/DataIntegrationsSection";
import { getApprovalLevel } from "@/utils/approvalLevels";
import AIAgentInterface from "@/components/AIAgent/AIAgentInterface";

const Transactions = () => {
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transactionType, setTransactionType] = useState("transfer");
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringFrequency, setRecurringFrequency] = useState("monthly");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [selectedFromAccount, setSelectedFromAccount] = useState("");
  const [selectedToAccount, setSelectedToAccount] = useState("");
  const [recipient, setRecipient] = useState("");

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
        case "forex":
          setTransactionType("forex");
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
      
      const recurringText = isRecurring ? ` (${recurringFrequency} recurring)` : "";
      const approvalLevel = getApprovalLevel(transactionAmount);
      
      // Custom success message for forex
      if (transactionType === "forex") {
        toast({
          title: "Foreign Exchange Initiated",
          description: `Your currency exchange has been submitted successfully${approvalLevel.requiredApprovers > 0 ? ' and requires approval' : ''}.`,
        });
      } else if (approvalLevel.requiredApprovers > 0) {
        toast({
          title: "Transaction submitted for approval",
          description: `Your ${transactionType} transaction${recurringText} requires ${approvalLevel.requiredApprovers} approval(s). You'll be notified once approved.`,
        });
      } else {
        toast({
          title: "Transaction submitted",
          description: `Your ${transactionType} transaction${recurringText} has been processed successfully.`,
        });
      }
    }, 2000);
  };

  const handleRecurringChange = (isRecurring: boolean) => {
    setIsRecurring(isRecurring);
  };

  const handleFrequencyChange = (frequency: string) => {
    setRecurringFrequency(frequency);
  };

  const handleAmountChange = (amount: number) => {
    setTransactionAmount(amount);
  };

  const handleFromAccountChange = (accountId: string) => {
    setSelectedFromAccount(accountId);
  };

  const handleToAccountChange = (accountId: string) => {
    setSelectedToAccount(accountId);
  };

  const handleRecipientChange = (recipient: string) => {
    setRecipient(recipient);
  };

  const handleExecuteTransaction = (transactionDetails: { 
    type: string; 
    amount?: number; 
    fromAccount?: string; 
    toAccount?: string; 
    recipient?: string;
    purpose?: string;
  }) => {
    // Set form values based on AI agent's extracted transaction details
    setTransactionType(transactionDetails.type);
    if (transactionDetails.amount) {
      setTransactionAmount(transactionDetails.amount);
    }
    
    if (transactionDetails.fromAccount) {
      setSelectedFromAccount(transactionDetails.fromAccount);
    }
    
    if (transactionDetails.toAccount) {
      setSelectedToAccount(transactionDetails.toAccount);
    }
    
    if (transactionDetails.recipient) {
      setRecipient(transactionDetails.recipient);
    }
    
    // Update URL with transaction type
    const newParams = new URLSearchParams(window.location.search);
    newParams.set('tab', transactionDetails.type);
    setSearchParams(newParams);
    
    toast({
      title: "Transaction prepared",
      description: `I've set up a ${transactionDetails.type} transaction for you${transactionDetails.amount ? ` for $${transactionDetails.amount}` : ''}. Please review and submit.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TransactionHeader />
      
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6">
        <TransactionTabs
          transactionType={transactionType}
          setTransactionType={setTransactionType}
          accounts={accounts}
          savedPayees={savedPayees}
          contacts={contacts}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          onRecurringChange={handleRecurringChange}
          onFrequencyChange={handleFrequencyChange}
          onAmountChange={handleAmountChange}
          selectedFromAccount={selectedFromAccount} 
          selectedToAccount={selectedToAccount}
          recipient={recipient}
        />
        
        <DataIntegrationsSection />
      </main>
      
      <AIAgentInterface 
        onExecuteTransaction={handleExecuteTransaction}
        accounts={accounts}
      />
    </div>
  );
};

export default Transactions;
