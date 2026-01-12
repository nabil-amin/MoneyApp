import React, { createContext, useContext, useEffect, useState } from "react";
import {
  fetchBalances,
  fetchTransactions,
  fetchOpportunities,
} from "../api/mockedApi";
import { Opportunity, Transaction, WalletBalances } from "../types";

type WalletContextType = {
  balances: WalletBalances | null;
  transactions: Transaction[];
  opportunities: Opportunity[];
  loading: boolean;
  invest: (amount: number, opportunityId: string) => Promise<void>;
  refresh: () => Promise<void>;
  addOpportunity: (opportunity: Opportunity) => void;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [balances, setBalances] = useState<WalletBalances | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadAll() {
    setLoading(true);
    const [b, t, o] = await Promise.all([
      fetchBalances(),
      fetchTransactions(),
      fetchOpportunities(),
    ]);
    setBalances(b);
    // ensure newest first
    setTransactions(t.sort((a, b2) => +new Date(b2.date) - +new Date(a.date)));
    setOpportunities(o);
    setLoading(false);
  }

  useEffect(() => {
    loadAll();
  }, []);

  async function invest(amount: number, opportunityId: string) {
    if (!balances) throw new Error("Balances not loaded");
    if (amount > balances.available)
      throw new Error("Insufficient available balance");

    const newBalances: WalletBalances = {
      available: parseFloat((balances.available - amount).toFixed(2)),
      invested: parseFloat((balances.invested + amount).toFixed(2)),
    };

    // create transaction
    const tx: Transaction = {
      id: `tx_${Date.now()}`,
      type: "INVEST",
      amount,
      date: new Date().toISOString(),
      description: `Invested in ${opportunityId}`,
    };

    // update local state
    setBalances(newBalances);
    setTransactions((prev) => [tx, ...prev]);
  }

  function addOpportunity(opportunity: Opportunity) {
    setOpportunities((prev) => [...prev, opportunity]);
  }

  return (
    <WalletContext.Provider
      value={{
        balances,
        transactions,
        opportunities,
        loading,
        invest,
        refresh: loadAll,
        addOpportunity,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used within WalletProvider");
  return ctx;
}
