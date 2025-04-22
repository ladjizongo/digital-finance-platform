
import { FC, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Bank {
  name: string;
  url: string;
  logo: string;
}

export const bankData: Bank[] = [
  {
    name: "RBC Royal Bank",
    url: "https://www.rbcroyalbank.com/onlinebanking/bankingusertips/other-useful-services/download-your-transactions.html",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Royal_Bank_of_Canada_logo.svg"
  },
  {
    name: "CIBC",
    url: "https://www.cibc.com/en/personal-banking/ways-to-bank/how-to/download-transactions.html",
    logo: "https://upload.wikimedia.org/wikipedia/en/c/cf/CIBC_logo.svg"
  },
  {
    name: "TD Canada Trust",
    url: "https://www.td.com/ca/en/personal-banking/how-to/digital-banking/banking-the-way-you-want-it/download-statements/",
    logo: "https://upload.wikimedia.org/wikipedia/en/c/c0/TD_Bank_logo.svg"
  },
  {
    name: "BMO",
    url: "https://www.bmo.com/main/personal/ways-to-bank/online-banking/",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Bank_of_Montreal_Logo.svg"
  },
  {
    name: "National Bank",
    url: "https://www.nbc.ca/personal/accounts/banking-services/online-banking.html",
    logo: "https://upload.wikimedia.org/wikipedia/en/0/02/National_Bank_of_Canada.svg"
  },
  {
    name: "Desjardins",
    url: "https://www.desjardins.com/ca/personal/accounts-services/ways-to-bank/online/accesD/index.jsp",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Desjardins_logo.svg"
  }
];

// Example transaction data for demo
const externalBankTransactions: Record<string, { date: string; description: string; amount: number; }[]> = {
  "RBC Royal Bank": [
    { date: "2025-04-14", description: "Deposit", amount: 3500.00 },
    { date: "2025-04-10", description: "Transfer to Main", amount: -800.00 },
    { date: "2025-04-07", description: "Interest Earned", amount: 4.56 }
  ],
  "CIBC": [
    { date: "2025-04-13", description: "Online Shopping", amount: -240.00 },
    { date: "2025-04-12", description: "ATM Withdrawal", amount: -100.00 },
    { date: "2025-04-09", description: "Salary", amount: 2500.00 },
  ],
  "TD Canada Trust": [
    { date: "2025-04-11", description: "Rent", amount: -1500.00 },
    { date: "2025-04-05", description: "Deposit", amount: 1500.00 },
    { date: "2025-04-03", description: "Bill Payment", amount: -220.00 },
  ],
  "BMO": [
    { date: "2025-04-16", description: "Transfer to Savings", amount: -600.00 },
    { date: "2025-04-11", description: "Refund", amount: 120.00 },
    { date: "2025-04-01", description: "Online Transfer", amount: 1000.00 },
  ],
  "National Bank": [
    { date: "2025-04-12", description: "Market Purchase", amount: -96.30 },
    { date: "2025-04-04", description: "Wire Transfer", amount: -800.00 },
    { date: "2025-04-02", description: "Interest", amount: 2.00 },
  ],
  "Desjardins": [
    { date: "2025-04-15", description: "Car Payment", amount: -400.00 },
    { date: "2025-04-13", description: "Deposit", amount: 800.00 },
    { date: "2025-04-10", description: "Groceries", amount: -125.50 },
  ]
};

const BankLogos: FC = () => {
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (bank: Bank) => {
    setSelectedBank(bank);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedBank(null);
    setIsOpen(false);
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {bankData.map((bank) => (
          <button
            key={bank.name}
            type="button"
            onClick={() => openModal(bank)}
            className="flex flex-col items-center p-4 rounded-lg border hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            tabIndex={0}
          >
            <div className="h-12 w-full flex items-center justify-center mb-2">
              <img
                src={bank.logo}
                alt={`${bank.name} logo`}
                className="h-10 w-auto object-contain"
                style={{ display: "block" }}
                onError={e => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.style.display = 'none';
                  // fallback text rendered below if logo fails
                }}
              />
              {/* fallback text if there's no logo */}
            </div>
            <span className="text-sm font-medium text-gray-600 text-center">{bank.name}</span>
          </button>
        ))}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-lg w-full">
          <DialogHeader>
            <DialogTitle>
              {selectedBank ? selectedBank.name : "Bank"}
            </DialogTitle>
            <DialogDescription>
              External Account Transactions
            </DialogDescription>
          </DialogHeader>
          {selectedBank && (
            <div className="mb-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(externalBankTransactions[selectedBank.name] || []).map((txn, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{txn.date}</TableCell>
                      <TableCell>{txn.description}</TableCell>
                      <TableCell className={`text-right ${txn.amount < 0 ? "text-red-600" : "text-green-600"}`}>
                        {txn.amount < 0 ? '-' : '+'}${Math.abs(txn.amount).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          <div className="flex justify-end">
            <Button variant="outline" onClick={closeModal}>Close</Button>
            {selectedBank && (
              <Button asChild>
                <a
                  href={selectedBank.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2"
                >
                  Visit Bank Website
                </a>
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BankLogos;

