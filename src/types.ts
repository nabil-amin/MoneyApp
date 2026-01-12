export type Transaction = {
  id: string;
  type: "DEPOSIT" | "INVEST";
  amount: number;
  date: string;
  description?: string;
};

export type WalletBalances = {
  available: number;
  invested: number;
};

export type Opportunity = {
  id: string;
  name: string;
  description: string;
  expectedReturn: number;
  durationMonths: number;
  minAmount: number;
};
