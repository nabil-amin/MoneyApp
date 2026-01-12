import { Opportunity, Transaction, WalletBalances } from "../types";

const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms));

export async function fetchBalances(): Promise<WalletBalances> {
  await delay(400);
  return { available: 8500, invested: 1500 };
}

export async function fetchTransactions(): Promise<Transaction[]> {
  await delay(300);
  const now = Date.now();
  return [
    {
      id: "t1",
      type: "DEPOSIT",
      amount: 1000,
      date: new Date(now - 1000 * 60 * 60 * 24 * 10).toISOString(),
      description: "Initial deposit",
    },
    {
      id: "t2",
      type: "INVEST",
      amount: 1500,
      date: new Date(now - 1000 * 60 * 60 * 24 * 2).toISOString(),
      description: "Invested in Real Estate Fund A",
    },
  ];
}

export async function fetchOpportunities(): Promise<Opportunity[]> {
  await delay(250);
  return [
    {
      id: "1",
      name: "Solar Energy Investment",
      description: "Invest in renewable energy and earn returns.",
      expectedReturn: 8,
      durationMonths: 12,
      minAmount: 1000,
    },
    {
      id: "2",
      name: "Startup Loan",
      description: "Support a new business and share profits.",
      expectedReturn: 12,
      durationMonths: 24,
      minAmount: 4000,
    },
  ];
}
