
import { FC } from 'react';

interface Bank {
  name: string;
  url: string;
  logo: string;
}

export const bankData: Bank[] = [
  {
    name: "RBC Royal Bank",
    url: "https://www.rbcroyalbank.com/onlinebanking/bankingusertips/other-useful-services/download-your-transactions.html",
    logo: "https://www.rbc.com/our-company/_assets-custom/images/RBC_logo.svg"
  },
  {
    name: "CIBC",
    url: "https://www.cibc.com/en/personal-banking/ways-to-bank/how-to/download-transactions.html",
    logo: "https://upload.wikimedia.org/wikipedia/en/c/cf/CIBC_logo.svg"
  },
  {
    name: "TD Canada Trust",
    url: "https://www.td.com/ca/en/personal-banking/how-to/digital-banking/banking-the-way-you-want-it/download-statements/",
    logo: "https://www.td.com/content/dam/tdcom/images/logos/td-logo.svg"
  },
  {
    name: "BMO",
    url: "https://www.bmo.com/main/personal/ways-to-bank/online-banking/",
    logo: "https://www.bmo.com/main/assets/images/bmo-logo-header-en.svg"
  },
  {
    name: "National Bank",
    url: "https://www.nbc.ca/personal/accounts/banking-services/online-banking.html",
    logo: "https://www.nbc.ca/content/dam/bnc/en/about-us/news/news-publications/images/nbc-logo.svg"
  },
  {
    name: "Desjardins",
    url: "https://www.desjardins.com/ca/personal/accounts-services/ways-to-bank/online/accesD/index.jsp",
    logo: "https://www.desjardins.com/content/dam/desjardins-logo.svg"
  }
];

const BankLogos: FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {bankData.map((bank) => (
        <a
          key={bank.name}
          href={bank.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center p-4 rounded-lg border hover:bg-gray-50 transition-colors"
        >
          <div className="h-12 w-full flex items-center justify-center mb-2">
            <img
              src={bank.logo}
              alt={`${bank.name} logo`}
              className="h-10 w-auto object-contain"
              onError={(e) => {
                // Fallback if image fails to load
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  const fallback = document.createElement('span');
                  fallback.className = 'font-bold text-blue-600 text-lg';
                  fallback.textContent = bank.name.split(' ').map(word => word[0]).join('');
                  parent.appendChild(fallback);
                }
              }}
            />
          </div>
          <span className="text-sm font-medium text-gray-600 text-center">{bank.name}</span>
        </a>
      ))}
    </div>
  );
};

export default BankLogos;
