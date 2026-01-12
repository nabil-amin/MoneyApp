import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { WalletBalances } from "../types";
import { theme } from "../theme";

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
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Balance Summary</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Available</Text>
        <Text style={[styles.value, styles.available]}>
          {formatCurrency(balances.available)}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Invested</Text>
        <Text style={[styles.value, styles.invested]}>
          {formatCurrency(balances.invested)}
        </Text>
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
  card: {
    padding: 18,
    backgroundColor: theme.balanceCard,
    borderRadius: 16,
    marginBottom: 18,
    shadowColor: theme.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    color: theme.primary,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
    letterSpacing: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    color: theme.textPrimary,
    fontSize: 15,
    fontWeight: "500",
  },
  value: {
    fontWeight: "700",
    fontSize: 16,
    color: theme.textPrimary,
  },
  available: {
    color: theme.success,
  },
  invested: {
    color: theme.primary,
    opacity: 0.85,
  },
  totalLabel: {
    fontWeight: "700",
    color: theme.primary,
  },
  totalValue: {
    fontSize: 18,
    color: theme.primary,
    textShadowColor: theme.secondary,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
