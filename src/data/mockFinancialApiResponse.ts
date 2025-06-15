
const mockFinancialApiResponse = {
  monthlyRevenue: [22800, 24150, 23700, 22400, 23100, 24325],
  netIncome: 6700,
  cashBalance: 15880,
  accountsReceivable: {
    total: 9500,
    overdue30: 3200
  },
  accountsPayable: {
    total: 7400,
    dueIn7Days: 4300
  },
  shopifyPayouts: [
    { date: "2025-06-12", amount: 1360 },
    { date: "2025-06-05", amount: 1295 },
    { date: "2025-05-29", amount: 1345 },
    { date: "2025-05-22", amount: 1270 }
  ],
  amazonPayouts: [
    { date: "2025-06-08", amount: 1050 },
    { date: "2025-05-31", amount: 1010 },
    { date: "2025-05-24", amount: 995 },
    { expectedDate: "2025-06-15", amount: 1090 }
  ],
  financialRatios: {
    currentRatio: 1.82,
    debtToIncome: 0.17,
    receivableCoverage: 0.84
  }
};

export default mockFinancialApiResponse;
