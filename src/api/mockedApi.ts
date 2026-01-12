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
      amount: 10000,
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
      id: "o1",
      name: "Real Estate Fund A",
      description:
        "A conservative real estate fund focused on rental properties.",
      expectedReturn: 12,
      durationMonths: 24,
      minAmount: 1000,
    },
    {
      id: "o2",
      name: "Tech Growth B",
      description: "Growth-focused technology investments with higher upside.",
      expectedReturn: 18,
      durationMonths: 12,
      minAmount: 5000,
    },
  ];
}
