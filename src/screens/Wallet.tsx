import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useWallet } from "../context/WalletContext";
import BalanceSummary from "../components/BalanceSummary";

function humanDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleString();
}

const dummyTransactions = [
  { id: "1", description: "Deposit", amount: 200 },
  { id: "2", description: "Withdrawal", amount: -50 },
];

export default function WalletScreen() {
  const { balances, transactions, loading } = useWallet();

  if (loading || !balances) {
    return (
      <View style={{ padding: 16 }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BalanceSummary balances={balances} />

      <Text style={styles.title}>Transactions</Text>

      {transactions.length === 0 ? (
        <View style={styles.empty}>
          <Text>No transactions found.</Text>
        </View>
      ) : (
        <FlatList
          data={dummyTransactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.transaction}>
              <Text>{item.description}</Text>
              <Text style={{ color: item.amount > 0 ? "green" : "red" }}>
                {item.amount > 0 ? "+" : ""}
                {item.amount}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 16, fontWeight: "600", marginVertical: 8 },
  empty: { padding: 12 },
  transaction: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  balanceLabel: { fontSize: 16, color: "#888" },
  balance: { fontSize: 32, fontWeight: "bold", marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: "600", marginTop: 16 },
});
