import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { DollarSign, CreditCard, Home, ArrowRightLeft, LogOut, FileText, Receipt, BarChart, ArrowRight, Mail } from "lucide-react";
import FinancialHealthCard from "@/components/FinancialHealthCard";

const Dashboard = () => {
  const [activeAccount, setActiveAccount] = useState("1");
  const [activeTab, setActiveTab] = useState("accounts");
  const navigate = useNavigate();
  
  const financialData = {
    totalBalance: 24850.75,
    accounts: [
      { id: "1", name: "Checking Account", balance: 3250.75, accountNumber: "****1234" },
      { id: "2", name: "Savings Account", balance: 15600.00, accountNumber: "****5678" },
      { id: "3", name: "Investment Account", balance: 6000.00, accountNumber: "****9012" },
      { id: "4", name: "Retirement Account", balance: 42500.00, accountNumber: "****3456" },
    ],
    creditCard: {
      balance: 1250.30,
      availableCredit: 8749.70,
      dueDate: "May 15, 2025",
      lastStatement: "April 1, 2025",
    },
    mortgage: {
      balance: 285000.00,
      monthlyPayment: 1450.00,
      nextPaymentDate: "May 1, 2025",
      interestRate: "3.25%",
    },
    recentTransactions: [
      { id: 1, date: "Apr 15, 2025", description: "Grocery Store", amount: -120.53, account: "1" },
      { id: 2, date: "Apr 14, 2025", description: "Salary Deposit", amount: 2800.00, account: "1" },
      { id: 3, date: "Apr 10, 2025", description: "Electric Bill", amount: -95.40, account: "1" },
      { id: 4, date: "Apr 8, 2025", description: "Interest Earned", amount: 12.50, account: "2" },
      { id: 5, date: "Apr 5, 2025", description: "Transfer to Savings", amount: -500.00, account: "1" },
      { id: 6, date: "Apr 5, 2025", description: "Transfer from Checking", amount: 500.00, account: "2" },
    ]
  };
  
  const filteredTransactions = financialData.recentTransactions.filter(
    transaction => transaction.account === activeAccount
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-indigo-600">Financial Dashboard</h1>
            <div className="flex items-center space-x-4">
              <a
                href="https://www.plaid.com/link/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                <FileText className="mr-2 h-4 w-4" />
                Link External Account
                <span className="sr-only">(opens in new tab)</span>
              </a>
              <a
                href="https://www.irs.gov/payments"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                <Receipt className="mr-2 h-4 w-4" />
                Pay Government Tax
                <span className="sr-only">(opens in new tab)</span>
              </a>
              <span className="text-gray-600">Welcome, User</span>
              <Button variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Accounts</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {financialData.accounts.map((account) => (
                      <li key={account.id} className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setActiveAccount(account.id);
                              setActiveTab("accounts");
                            }}
                          >
                            <div className="mb-2 mt-4 text-lg font-medium">
                              {account.name}
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              {account.accountNumber}
                            </p>
                            <p className="text-xl font-bold mt-2">
                              ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Transactions</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none items-center gap-2 rounded-md bg-gradient-to-b from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md"
                          href="#"
                          onClick={() => navigate("/transactions")}
                        >
                          <ArrowRightLeft className="h-4 w-4" />
                          <span>Transfers</span>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none items-center gap-2 rounded-md bg-gradient-to-b from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md"
                          href="#"
                          onClick={() => navigate("/transactions?tab=eft")}
                        >
                          <ArrowRight className="h-4 w-4" />
                          <span>EFT/Wire</span>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none items-center gap-2 rounded-md bg-gradient-to-b from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md"
                          href="#"
                          onClick={() => navigate("/transactions?tab=bill")}
                        >
                          <Receipt className="h-4 w-4" />
                          <span>Pay Bills</span>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none items-center gap-2 rounded-md bg-gradient-to-b from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md"
                          href="#"
                          onClick={() => navigate("/transactions?tab=email")}
                        >
                          <Mail className="h-4 w-4" />
                          <span>Email Transfer</span>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none items-center gap-2 rounded-md bg-gradient-to-b from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md"
                          href="#"
                          onClick={() => navigate("/transactions?tab=tax")}
                        >
                          <Receipt className="h-4 w-4" />
                          <span>Pay Government Tax</span>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink 
                  className={navigationMenuTriggerStyle()}
                  onClick={() => {
                    setActiveTab("businessHealth");
                  }}
                >
                  <BarChart className="mr-2 h-4 w-4" />
                  Business Health
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-full max-w-md mb-4">
            <TabsTrigger value="accounts">Accounts</TabsTrigger>
            <TabsTrigger value="businessHealth">Business Health</TabsTrigger>
          </TabsList>
          
          <TabsContent value="accounts" className="space-y-4">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                  <DollarSign className="h-4 w-4 text-indigo-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${financialData.totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Across all accounts
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Credit Card</CardTitle>
                  <CreditCard className="h-4 w-4 text-indigo-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${financialData.creditCard.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Current balance (Due: {financialData.creditCard.dueDate})
                  </p>
                  <div className="flex justify-between mt-4">
                    <span className="text-sm">Available Credit:</span>
                    <span className="text-sm font-medium">${financialData.creditCard.availableCredit.toLocaleString('en-US')}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Mortgage</CardTitle>
                  <Home className="h-4 w-4 text-indigo-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${financialData.mortgage.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Current balance
                  </p>
                  <div className="flex justify-between mt-4">
                    <span className="text-sm">Monthly Payment:</span>
                    <span className="text-sm font-medium">${financialData.mortgage.monthlyPayment.toLocaleString('en-US')}</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-sm">Next Payment:</span>
                    <span className="text-sm font-medium">{financialData.mortgage.nextPaymentDate}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue={activeAccount} value={activeAccount} onValueChange={setActiveAccount} className="w-full">
              <TabsList className="grid grid-cols-4 w-full max-w-md mb-4">
                {financialData.accounts.map(account => (
                  <TabsTrigger key={account.id} value={account.id}>
                    Account {account.id}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {financialData.accounts.map(account => (
                <TabsContent key={account.id} value={account.id} className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>{account.name}</CardTitle>
                      <CardDescription>Account {account.accountNumber}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold mb-6">
                        ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                      
                      <div className="border rounded-lg">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Date</TableHead>
                              <TableHead>Description</TableHead>
                              <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredTransactions.length > 0 ? (
                              filteredTransactions.map(transaction => (
                                <TableRow key={transaction.id}>
                                  <TableCell>{transaction.date}</TableCell>
                                  <TableCell>{transaction.description}</TableCell>
                                  <TableCell className={`text-right ${transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                                    {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                  </TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <TableRow>
                                <TableCell colSpan={3} className="text-center py-4 text-gray-500">No recent transactions</TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">View All Transactions</Button>
                      <Button>Make a Transfer</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </TabsContent>
          
          <TabsContent value="businessHealth" className="space-y-4">
            <FinancialHealthCard />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
