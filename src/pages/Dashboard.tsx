import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import AccountOverviewCards from "@/components/dashboard/AccountOverviewCards";
import AccountDetails from "@/components/dashboard/AccountDetails";
import FinancialHealthCard from "@/components/FinancialHealthCard";
import CreditDocumentUpload from "@/components/financial/CreditDocumentUpload";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { DownloadStatements } from "@/components/dashboard/DownloadStatements";

const Dashboard = () => {
  const [activeAccount, setActiveAccount] = useState("1");
  const [activeTab, setActiveTab] = useState("accounts");
  const [activeCreditCard, setActiveCreditCard] = useState("cc1");
  const [activeLoan, setActiveLoan] = useState("loan1");
  
  const financialData = {
    totalBalance: 24850.75,
    accounts: [
      { id: "1", name: "Checking Account", balance: 3250.75, accountNumber: "****1234" },
      { id: "2", name: "Savings Account", balance: 15600.00, accountNumber: "****5678" },
      { id: "3", name: "Investment Account", balance: 6000.00, accountNumber: "****9012" },
      { id: "4", name: "Retirement Account", balance: 42500.00, accountNumber: "****3456" },
    ],
    creditCards: [
      {
        id: "cc1",
        name: "Premium Rewards Card",
        number: "**** **** **** 4567",
        balance: 2500.30,
        creditLimit: 10000.00,
        availableCredit: 7499.70,
        purchaseRate: 19.99,
        cashAdvanceRate: 22.99,
        dueDate: "May 15, 2025",
        statementDate: "Apr 30, 2025",
        minimumPayment: 125.00,
        transactions: [
          { date: "Apr 20, 2025", description: "Restaurant", amount: -125.30 },
          { date: "Apr 18, 2025", description: "Gas Station", amount: -45.00 },
          { date: "Apr 15, 2025", description: "Online Shopping", amount: -230.00 },
        ]
      },
      {
        id: "cc2",
        name: "Cash Back Card",
        number: "**** **** **** 7890",
        balance: 1750.50,
        creditLimit: 8000.00,
        availableCredit: 6249.50,
        purchaseRate: 18.99,
        cashAdvanceRate: 21.99,
        dueDate: "May 20, 2025",
        statementDate: "Apr 30, 2025",
        minimumPayment: 87.50,
        transactions: [
          { date: "Apr 19, 2025", description: "Grocery Store", amount: -180.50 },
          { date: "Apr 17, 2025", description: "Pharmacy", amount: -65.00 },
          { date: "Apr 14, 2025", description: "Electronics", amount: -505.00 },
        ]
      },
      {
        id: "cc3",
        name: "Travel Miles Card",
        number: "**** **** **** 2345",
        balance: 3200.80,
        creditLimit: 15000.00,
        availableCredit: 11799.20,
        purchaseRate: 20.99,
        cashAdvanceRate: 23.99,
        dueDate: "May 18, 2025",
        statementDate: "Apr 30, 2025",
        minimumPayment: 160.04,
        transactions: [
          { date: "Apr 21, 2025", description: "Airline Tickets", amount: -850.80 },
          { date: "Apr 16, 2025", description: "Hotel", amount: -450.00 },
          { date: "Apr 13, 2025", description: "Car Rental", amount: -200.00 },
        ]
      }
    ],
    loans: [
      {
        id: "loan1",
        name: "Business Line of Credit",
        balance: 75000.00,
        limit: 100000.00,
        availableCredit: 25000.00,
        interestRate: 8.99,
        monthlyPayment: 2291.67,
        nextPaymentDate: "May 1, 2025",
        statementDate: "Apr 30, 2025",
        minimumPayment: 2291.67,
        transactions: [
          { date: "Apr 20, 2025", description: "Equipment Purchase", amount: -25000.00 },
          { date: "Apr 15, 2025", description: "Loan Payment", amount: -2291.67 },
          { date: "Mar 15, 2025", description: "Loan Payment", amount: -2291.67 },
        ]
      },
      {
        id: "loan2",
        name: "Equipment Financing",
        balance: 45000.00,
        limit: 50000.00,
        availableCredit: 5000.00,
        interestRate: 7.50,
        monthlyPayment: 1458.33,
        nextPaymentDate: "May 5, 2025",
        statementDate: "Apr 30, 2025",
        minimumPayment: 1458.33,
        term: 60,
        transactions: [
          { date: "Apr 18, 2025", description: "Manufacturing Equipment", amount: -15000.00 },
          { date: "Apr 15, 2025", description: "Loan Payment", amount: -1458.33 },
          { date: "Mar 15, 2025", description: "Loan Payment", amount: -1458.33 },
        ]
      },
      {
        id: "loan3",
        name: "Working Capital Loan",
        balance: 30000.00,
        limit: 35000.00,
        availableCredit: 5000.00,
        interestRate: 9.99,
        monthlyPayment: 1041.67,
        nextPaymentDate: "May 10, 2025",
        statementDate: "Apr 30, 2025",
        minimumPayment: 1041.67,
        transactions: [
          { date: "Apr 17, 2025", description: "Inventory Purchase", amount: -10000.00 },
          { date: "Apr 15, 2025", description: "Loan Payment", amount: -1041.67 },
          { date: "Mar 15, 2025", description: "Loan Payment", amount: -1041.67 },
        ]
      }
    ],
    recentTransactions: [
      { id: 1, date: "Apr 15, 2025", description: "Grocery Store", amount: -120.53, account: "1" },
      { id: 2, date: "Apr 14, 2025", description: "Salary Deposit", amount: 2800.00, account: "1" },
      { id: 3, date: "Apr 10, 2025", description: "Electric Bill", amount: -95.40, account: "1" },
      { id: 4, date: "Apr 8, 2025", description: "Interest Earned", amount: 12.50, account: "2" },
      { id: 5, date: "Apr 5, 2025", description: "Transfer to Savings", amount: -500.00, account: "1" },
      { id: 6, date: "Apr 5, 2025", description: "Transfer from Checking", amount: 500.00, account: "2" },
    ]
  };

  const bankLinks = [
    { name: "RBC Royal Bank", url: "https://www.rbcroyalbank.com/onlinebanking/bankingusertips/other-useful-services/download-your-transactions.html" },
    { name: "CIBC", url: "https://www.cibc.com/en/personal-banking/ways-to-bank/how-to/download-transactions.html" },
    { name: "TD Canada Trust", url: "https://www.td.com/ca/en/personal-banking/how-to/digital-banking/banking-the-way-you-want-it/download-statements/" },
    { name: "BMO", url: "https://www.bmo.com/main/personal/ways-to-bank/online-banking/" },
    { name: "National Bank", url: "https://www.nbc.ca/personal/accounts/banking-services/online-banking.html" },
    { name: "Desjardins", url: "https://www.desjardins.com/ca/personal/accounts-services/ways-to-bank/online/accesD/index.jsp" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 w-full max-w-md mb-4">
              <TabsTrigger value="accounts">Accounts</TabsTrigger>
              <TabsTrigger value="creditCards">Credit Cards</TabsTrigger>
              <TabsTrigger value="loans">Loans</TabsTrigger>
              <TabsTrigger value="businessHealth">Business Health</TabsTrigger>
              <TabsTrigger value="externalAccount">External Account</TabsTrigger>
            </TabsList>
            
            <TabsContent value="accounts">
              <AccountOverviewCards financialData={financialData} />
              
              <DownloadStatements
                accounts={financialData.accounts}
                creditCards={financialData.creditCards}
                loans={financialData.loans}
              />
              
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
                    <AccountDetails
                      account={account}
                      transactions={financialData.recentTransactions}
                    />
                  </TabsContent>
                ))}
              </Tabs>

              <div className="mt-8">
                <CreditDocumentUpload />
              </div>
            </TabsContent>

            <TabsContent value="creditCards">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {financialData.creditCards.map(card => (
                  <Card 
                    key={card.id}
                    className={`cursor-pointer transition-all ${
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
            </TabsContent>
            
            <TabsContent value="loans" className="space-y-4">
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
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Term:</span>
                          <span className="font-medium">{loan.term} months</span>
                        </div>
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
            </TabsContent>
            
            <TabsContent value="businessHealth">
              <FinancialHealthCard />
            </TabsContent>

            <TabsContent value="externalAccount">
              <Card>
                <CardHeader>
                  <CardTitle>Link External Account</CardTitle>
                  <CardDescription>Connect your account from another bank</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {bankLinks.map((bank) => (
                      <a
                        key={bank.name}
                        href={bank.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                      >
                        <FileText className="h-5 w-5 mr-3 text-blue-600" />
                        <span className="text-sm font-medium">{bank.name}</span>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
