
import { ArrowRight, Mail, Receipt, CreditCard, FileText, ArrowUpDown } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TransferForm from "./TransferForm";
import { EFTSection } from "./payment-forms/EFTSection";
import { WireSection } from "./payment-forms/WireSection";
import BillPaymentForm from "./BillPaymentForm";
import EmailTransferForm from "./EmailTransferForm";
import GovTaxPaymentForm from "./GovTaxPaymentForm";
import FXTabContent from "./forex/FXTabContent";

interface Account {
  id: string;
  name: string;
  number: string;
  balance: number;
}

interface Payee {
  id: string;
  name: string;
  accountNumber: string;
}

interface Contact {
  id: string;
  name: string;
  email: string;
}

interface TransactionTabsProps {
  transactionType: string;
  setTransactionType: (type: string) => void;
  accounts: Account[];
  savedPayees: Payee[];
  contacts: Contact[];
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onRecurringChange?: (isRecurring: boolean) => void;
  onFrequencyChange?: (frequency: string) => void;
  onAmountChange?: (amount: number) => void;
  selectedFromAccount?: string;
  selectedToAccount?: string;
  recipient?: string;
  onFromAccountChange?: (accountId: string) => void;
  onToAccountChange?: (accountId: string) => void;
  onRecipientChange?: (recipient: string) => void;
}

const TransactionTabs = ({
  transactionType,
  setTransactionType,
  accounts,
  savedPayees,
  contacts,
  isSubmitting,
  onSubmit,
  onRecurringChange,
  onFrequencyChange,
  onAmountChange,
  selectedFromAccount,
  selectedToAccount,
  recipient,
  onFromAccountChange,
  onToAccountChange,
  onRecipientChange
}: TransactionTabsProps) => {
  const handleTabChange = (value: string) => {
    setTransactionType(value);
    const searchParams = new URLSearchParams(window.location.search);
    if (value === "transfer") {
      searchParams.delete("tab");
    } else {
      searchParams.set("tab", value);
    }
    window.history.replaceState(null, "", `?${searchParams.toString()}`);
  };

  return (
    <Tabs value={transactionType} onValueChange={handleTabChange} className="w-full">
      <TabsList className="grid grid-cols-6 w-full mb-8">
        <TabsTrigger value="transfer" className="flex items-center">
          <ArrowRight className="mr-2 h-4 w-4" />
          Transfers
        </TabsTrigger>
        <TabsTrigger value="eft" className="flex items-center">
          <CreditCard className="mr-2 h-4 w-4" />
          EFT
        </TabsTrigger>
        <TabsTrigger value="wire" className="flex items-center">
          <ArrowRight className="mr-2 h-4 w-4" />
          Wire
        </TabsTrigger>
        <TabsTrigger value="bill" className="flex items-center">
          <Receipt className="mr-2 h-4 w-4" />
          Bill Payment
        </TabsTrigger>
        <TabsTrigger value="email" className="flex items-center">
          <Mail className="mr-2 h-4 w-4" />
          Email Transfer
        </TabsTrigger>
        <TabsTrigger value="forex" className="flex items-center">
          <ArrowUpDown className="mr-2 h-4 w-4" />
          Foreign Exchange
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="transfer">
        <TransferForm 
          accounts={accounts}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          onAmountChange={onAmountChange}
          selectedFromAccount={selectedFromAccount}
          selectedToAccount={selectedToAccount}
          onFromAccountChange={onFromAccountChange}
          onToAccountChange={onToAccountChange}
        />
      </TabsContent>
      
      <TabsContent value="eft">
        <EFTSection 
          accounts={accounts}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          onAmountChange={onAmountChange}
          selectedFromAccount={selectedFromAccount}
          onFromAccountChange={onFromAccountChange}
        />
      </TabsContent>
      
      <TabsContent value="wire">
        <WireSection 
          accounts={accounts}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          onAmountChange={onAmountChange}
          selectedFromAccount={selectedFromAccount}
          onFromAccountChange={onFromAccountChange}
        />
      </TabsContent>
      
      <TabsContent value="bill">
        <BillPaymentForm 
          accounts={accounts}
          savedPayees={savedPayees}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          onAmountChange={onAmountChange}
          selectedFromAccount={selectedFromAccount}
          recipient={recipient}
          onFromAccountChange={onFromAccountChange}
          onRecipientChange={onRecipientChange}
        />
      </TabsContent>
      
      <TabsContent value="email">
        <EmailTransferForm 
          accounts={accounts}
          contacts={contacts}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          onAmountChange={onAmountChange}
          selectedFromAccount={selectedFromAccount}
          recipient={recipient}
          onFromAccountChange={onFromAccountChange}
          onRecipientChange={onRecipientChange}
        />
      </TabsContent>
      
      <TabsContent value="forex">
        <FXTabContent 
          accounts={accounts}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          onAmountChange={onAmountChange}
          selectedFromAccount={selectedFromAccount}
          selectedToAccount={selectedToAccount}
          onFromAccountChange={onFromAccountChange}
          onToAccountChange={onToAccountChange}
        />
      </TabsContent>
      
      <TabsContent value="tax">
        <GovTaxPaymentForm 
          accounts={accounts}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          onAmountChange={onAmountChange}
          selectedFromAccount={selectedFromAccount}
          onFromAccountChange={onFromAccountChange}
        />
      </TabsContent>
    </Tabs>
  );
};

export default TransactionTabs;
