import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { WalletBalances } from "../types";

function formatCurrency(n: number) {
  return (
    n.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + " ﷼"
  );
}

export default function BalanceSummary({
  balances,
}: {
  balances: WalletBalances;
}) {
  const total = balances.available + balances.invested;
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Available</Text>
        <Text style={styles.value}>{formatCurrency(balances.available)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Invested</Text>
        <Text style={styles.value}>{formatCurrency(balances.invested)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.label, styles.totalLabel]}>Total</Text>
        <Text style={[styles.value, styles.totalValue]}>
          {formatCurrency(total)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  label: { color: "#444" },
  value: { fontWeight: "600" },
  totalLabel: { fontWeight: "600" },
  totalValue: { fontSize: 16 },
});
