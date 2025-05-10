
export const formatCurrency = (amount: number | undefined) => {
  if (amount === undefined || amount === null) {
    return "$0.00";
  }
  return `$${amount.toLocaleString()}`;
};
