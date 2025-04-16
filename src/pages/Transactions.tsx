
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Repeat, Receipt, FileText, CreditCard, FileCheck2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const Transactions = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transactionType, setTransactionType] = useState("transfer");

  // Mock accounts data
  const accounts = [
    { id: "1", name: "Checking Account", number: "****1234", balance: 3250.75 },
    { id: "2", name: "Savings Account", number: "****5678", balance: 15600.00 },
    { id: "3", name: "Investment Account", number: "****9012", balance: 6000.00 },
    { id: "4", name: "Retirement Account", number: "****3456", balance: 42500.00 },
  ];

  // Mock payees/billers
  const savedPayees = [
    { id: "1", name: "Electric Company", accountNumber: "987654321" },
    { id: "2", name: "Water Utility", accountNumber: "123456789" },
    { id: "3", name: "Internet Provider", accountNumber: "456789123" },
    { id: "4", name: "Cell Phone Provider", accountNumber: "789123456" },
    { id: "5", name: "Credit Card Company", accountNumber: "321654987" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate transaction processing
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
      <header className="bg-white shadow-sm">
        <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
            <h1 className="ml-4 text-2xl font-bold text-indigo-600">Transactions</h1>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Tabs value={transactionType} onValueChange={setTransactionType} className="w-full">
          <TabsList className="grid grid-cols-4 w-full mb-8">
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
          </TabsList>
          
          {/* Transfer Between Accounts */}
          <TabsContent value="transfer">
            <Card>
              <CardHeader>
                <CardTitle>Transfer Between Accounts</CardTitle>
                <CardDescription>
                  Move money between your accounts instantly
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fromAccount">From Account</Label>
                      <Select defaultValue="1">
                        <SelectTrigger id="fromAccount">
                          <SelectValue placeholder="Select account" />
                        </SelectTrigger>
                        <SelectContent>
                          {accounts.map(account => (
                            <SelectItem key={account.id} value={account.id}>
                              {account.name} ({account.number}) - ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="toAccount">To Account</Label>
                      <Select defaultValue="2">
                        <SelectTrigger id="toAccount">
                          <SelectValue placeholder="Select account" />
                        </SelectTrigger>
                        <SelectContent>
                          {accounts.map(account => (
                            <SelectItem key={account.id} value={account.id}>
                              {account.name} ({account.number})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="transferAmount">Amount</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">$</span>
                      </div>
                      <Input id="transferAmount" type="number" min="0.01" step="0.01" placeholder="0.00" className="pl-7" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="transferDate">Date</Label>
                    <Input id="transferDate" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="transferMemo">Memo (Optional)</Label>
                    <Input id="transferMemo" placeholder="Add a memo for this transfer" />
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox id="makeRecurring" />
                    <Label htmlFor="makeRecurring" className="text-sm font-normal">Make this a recurring transfer</Label>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
                    {isSubmitting ? "Processing..." : "Submit Transfer"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          {/* EFT/ACH Transfer */}
          <TabsContent value="eft">
            <Card>
              <CardHeader>
                <CardTitle>EFT/ACH Transfer</CardTitle>
                <CardDescription>
                  Send money electronically to external accounts
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="eftFromAccount">From Account</Label>
                    <Select defaultValue="1">
                      <SelectTrigger id="eftFromAccount">
                        <SelectValue placeholder="Select account" />
                      </SelectTrigger>
                      <SelectContent>
                        {accounts.map(account => (
                          <SelectItem key={account.id} value={account.id}>
                            {account.name} ({account.number}) - ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="recipientName">Recipient Name</Label>
                    <Input id="recipientName" placeholder="Full name of recipient" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="bankRoutingNumber">Routing Number</Label>
                      <Input id="bankRoutingNumber" placeholder="9-digit routing number" maxLength={9} />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bankAccountNumber">Account Number</Label>
                      <Input id="bankAccountNumber" placeholder="Account number" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="accountType">Account Type</Label>
                    <Select defaultValue="checking">
                      <SelectTrigger id="accountType">
                        <SelectValue placeholder="Select account type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="checking">Checking</SelectItem>
                        <SelectItem value="savings">Savings</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="eftAmount">Amount</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">$</span>
                      </div>
                      <Input id="eftAmount" type="number" min="0.01" step="0.01" placeholder="0.00" className="pl-7" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="eftDate">Date</Label>
                    <Input id="eftDate" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="eftMemo">Memo (Optional)</Label>
                    <Input id="eftMemo" placeholder="Add a memo for this transaction" />
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
                    {isSubmitting ? "Processing..." : "Send ACH Transfer"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          {/* Wire Transfer */}
          <TabsContent value="wire">
            <Card>
              <CardHeader>
                <CardTitle>Wire Transfer</CardTitle>
                <CardDescription>
                  Send funds via wire transfer domestically or internationally
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="wireFromAccount">From Account</Label>
                    <Select defaultValue="1">
                      <SelectTrigger id="wireFromAccount">
                        <SelectValue placeholder="Select account" />
                      </SelectTrigger>
                      <SelectContent>
                        {accounts.map(account => (
                          <SelectItem key={account.id} value={account.id}>
                            {account.name} ({account.number}) - ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="wireRecipientName">Recipient Name</Label>
                    <Input id="wireRecipientName" placeholder="Full name of recipient" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="wireRoutingNumber">Routing Number / Swift Code</Label>
                      <Input id="wireRoutingNumber" placeholder="Enter bank routing number or swift code" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="wireAccountNumber">Account Number / IBAN</Label>
                      <Input id="wireAccountNumber" placeholder="Account number or IBAN" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="wireRecipientBank">Recipient Bank Name</Label>
                    <Input id="wireRecipientBank" placeholder="Bank name" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="wireRecipientAddress">Recipient Address</Label>
                    <Textarea id="wireRecipientAddress" placeholder="Enter full address" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="wireTransferType">Transfer Type</Label>
                    <Select defaultValue="domestic">
                      <SelectTrigger id="wireTransferType">
                        <SelectValue placeholder="Select transfer type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="domestic">Domestic Wire</SelectItem>
                        <SelectItem value="international">International Wire</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="wireAmount">Amount</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">$</span>
                      </div>
                      <Input id="wireAmount" type="number" min="0.01" step="0.01" placeholder="0.00" className="pl-7" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="wireDate">Date</Label>
                    <Input id="wireDate" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="wireDescription">Description / Purpose of Payment</Label>
                    <Textarea id="wireDescription" placeholder="Purpose of payment" />
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
                    {isSubmitting ? "Processing..." : "Send Wire Transfer"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          {/* Bill Payment */}
          <TabsContent value="bill">
            <Card>
              <CardHeader>
                <CardTitle>Bill Payment</CardTitle>
                <CardDescription>
                  Pay your bills from your accounts
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="billFromAccount">From Account</Label>
                    <Select defaultValue="1">
                      <SelectTrigger id="billFromAccount">
                        <SelectValue placeholder="Select account" />
                      </SelectTrigger>
                      <SelectContent>
                        {accounts.map(account => (
                          <SelectItem key={account.id} value={account.id}>
                            {account.name} ({account.number}) - ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="billPayee">Payee / Biller</Label>
                    <Select>
                      <SelectTrigger id="billPayee">
                        <SelectValue placeholder="Select a payee or add new" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">+ Add New Payee</SelectItem>
                        {savedPayees.map(payee => (
                          <SelectItem key={payee.id} value={payee.id}>
                            {payee.name} - Acct: {payee.accountNumber}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="billAmount">Amount</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">$</span>
                      </div>
                      <Input id="billAmount" type="number" min="0.01" step="0.01" placeholder="0.00" className="pl-7" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="billPayDate">Payment Date</Label>
                    <Input id="billPayDate" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="billMemo">Memo / Account Number (Optional)</Label>
                    <Input id="billMemo" placeholder="Add account number or reference number" />
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox id="billRecurring" />
                    <Label htmlFor="billRecurring" className="text-sm font-normal">Make this a recurring payment</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="eStatement" />
                    <Label htmlFor="eStatement" className="text-sm font-normal">Receive e-bill statement for this payee</Label>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
                    {isSubmitting ? "Processing..." : "Schedule Payment"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Transactions;
