
// Sample FX rates (against USD as base)
export const fxRates = {
  USD: 1.00,
  EUR: 0.93,
  GBP: 0.82,
  CAD: 1.38,
  AUD: 1.54,
  JPY: 158.43,
  CHF: 0.94,
  CNY: 7.25,
};

export interface FXRate {
  currency: string;
  rate: number;
  change: number;
  timestamp: string;
}

export interface FXTransaction {
  id: string;
  date: string;
  fromCurrency: string;
  toCurrency: string;
  fromAmount: number;
  toAmount: number;
  rate: number;
  status: "completed" | "pending" | "failed";
}

// Sample FX rates for display
export const recentRates: FXRate[] = [
  { currency: "EUR", rate: 0.93, change: -0.002, timestamp: "2023-05-11T10:30:00Z" },
  { currency: "GBP", rate: 0.82, change: 0.004, timestamp: "2023-05-11T10:30:00Z" },
  { currency: "CAD", rate: 1.38, change: -0.001, timestamp: "2023-05-11T10:30:00Z" },
  { currency: "AUD", rate: 1.54, change: 0.003, timestamp: "2023-05-11T10:30:00Z" },
  { currency: "JPY", rate: 158.43, change: 0.25, timestamp: "2023-05-11T10:30:00Z" },
  { currency: "CHF", rate: 0.94, change: -0.005, timestamp: "2023-05-11T10:30:00Z" },
];

// Sample FX transactions for display
export const recentTransactions: FXTransaction[] = [
  {
    id: "fx-1",
    date: "2023-05-10",
    fromCurrency: "USD",
    toCurrency: "EUR",
    fromAmount: 1000,
    toAmount: 930,
    rate: 0.93,
    status: "completed"
  },
  {
    id: "fx-2",
    date: "2023-05-09",
    fromCurrency: "EUR",
    toCurrency: "GBP",
    fromAmount: 500,
    toAmount: 441.94,
    rate: 0.8839,
    status: "completed"
  },
  {
    id: "fx-3",
    date: "2023-05-08",
    fromCurrency: "USD",
    toCurrency: "JPY",
    fromAmount: 250,
    toAmount: 39607.5,
    rate: 158.43,
    status: "completed"
  },
  {
    id: "fx-4",
    date: "2023-05-07",
    fromCurrency: "CAD",
    toCurrency: "USD",
    fromAmount: 1000,
    toAmount: 724.64,
    rate: 0.7246,
    status: "completed"
  },
  {
    id: "fx-5",
    date: "2023-05-06",
    fromCurrency: "GBP",
    toCurrency: "AUD",
    fromAmount: 750,
    toAmount: 1406.25,
    rate: 1.875,
    status: "completed"
  }
];
