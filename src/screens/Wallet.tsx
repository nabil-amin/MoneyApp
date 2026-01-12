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
import { theme } from "../theme";

function humanDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleString();
}

export default function WalletScreen() {
  const { balances, transactions, loading } = useWallet();

  if (loading || !balances) {
    return (
      <View style={{ padding: 16, backgroundColor: theme.background }}>
        <ActivityIndicator color={theme.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BalanceSummary balances={balances} />

      <Text style={styles.title}>Transactions</Text>

      {transactions.length === 0 ? (
        <View style={styles.empty}>
          <Text style={{ color: theme.textPrimary }}>
            No transactions found.
          </Text>
        </View>
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.transaction}>
              <View>
                <Text style={{ fontWeight: "600", color: theme.textPrimary }}>
                  {item.type}
                </Text>
                <Text style={{ color: theme.textPrimary, fontSize: 12 }}>
                  {humanDate(item.date)}
                </Text>
              </View>
              <Text
                style={{
                  color: item.type === "DEPOSIT" ? theme.success : theme.error,
                  fontWeight: "600",
                }}
              >
                {item.type === "DEPOSIT" ? "+" : "-"}
                {Math.abs(item.amount).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                ﷼
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: theme.background },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 8,
    color: theme.primary,
  },
  empty: { padding: 12, backgroundColor: theme.balanceCard, borderRadius: 12 },
  transaction: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
    backgroundColor: theme.balanceCard,
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  balanceLabel: { fontSize: 16, color: theme.textSecondary },
  balance: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24,
    color: theme.textPrimary,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
    color: theme.primary,
  },
});
