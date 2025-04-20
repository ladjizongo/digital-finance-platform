import { Send, Repeat, Receipt, CreditCard, Mail } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TransferForm from "./TransferForm";
import EFTForm from "./EFTForm";
import WireTransferForm from "./WireTransferForm";
import BillPaymentForm from "./BillPaymentForm";
import EmailTransferForm from "./EmailTransferForm";

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
}

const TransactionTabs = ({
  transactionType,
  setTransactionType,
  accounts,
  savedPayees,
  contacts,
  isSubmitting,
  onSubmit
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
      <TabsList className="grid grid-cols-5 w-full mb-8">
        <TabsTrigger value="transfer" className="flex items-center">
          <Repeat className="mr-2 h-4 w-4" />
          Transfers
        </TabsTrigger>
        <TabsTrigger value="eft" className="flex items-center">
          <CreditCard className="mr-2 h-4 w-4" />
          EFT/ACH
        </TabsTrigger>
        <TabsTrigger value="wire" className="flex items-center">
          <Send className="mr-2 h-4 w-4" />
          Wire Transfer
        </TabsTrigger>
        <TabsTrigger value="bill" className="flex items-center">
          <Receipt className="mr-2 h-4 w-4" />
          Bill Payment
        </TabsTrigger>
        <TabsTrigger value="email" className="flex items-center">
          <Mail className="mr-2 h-4 w-4" />
          Email Transfer
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="transfer">
        <TransferForm 
          accounts={accounts}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
        />
      </TabsContent>
      
      <TabsContent value="eft">
        <EFTForm 
          accounts={accounts}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
        />
      </TabsContent>
      
      <TabsContent value="wire">
        <WireTransferForm 
          accounts={accounts}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
        />
      </TabsContent>
      
      <TabsContent value="bill">
        <BillPaymentForm 
          accounts={accounts}
          savedPayees={savedPayees}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
        />
      </TabsContent>
      
      <TabsContent value="email">
        <EmailTransferForm 
          accounts={accounts}
          contacts={contacts}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
        />
      </TabsContent>
    </Tabs>
  );
};

export default TransactionTabs;
