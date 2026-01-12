import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import AppAlert from "../components/AppAlert";
import { useWallet } from "../context/WalletContext";
import { theme } from "../theme";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  OpportunityDetails: { opportunityId: string };
  Wallet: undefined;
};

function formatCurrency(n: number) {
  return (
    n.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + " ﷼"
  );
}

export default function OpportunityDetails({ route }: { route: any }) {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { opportunityId } = route.params;
  const { opportunities, balances, invest } = useWallet();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{
    visible: boolean;
    title?: string;
    message: string;
  }>({ visible: false, title: undefined, message: "" });

  const opp = opportunities.find((o) => o.id === opportunityId);
  if (!opp) return <Text>Opportunity not found.</Text>;

  async function handleInvest() {
    if (!balances) return;
    if (!opp) return;
    const amt = opp.minAmount;
    if (balances.available < amt) {
      setAlert({
        visible: true,
        title: "Insufficient balance",
        message: `You do not have enough available balance to invest ${formatCurrency(
          amt
        )}.`,
      });
      return;
    }

    try {
      setLoading(true);
      await invest(amt, opp.id);
      setAlert({
        visible: true,
        title: "Success",
        message: "Investment successful",
      });
    } catch (err: any) {
      setAlert({
        visible: true,
        title: "Error",
        message: err?.message || "Failed to invest",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <AppAlert
        visible={alert.visible}
        title={alert.title}
        message={alert.message}
        type={
          alert.title === "Success"
            ? "success"
            : alert.title === "Error"
            ? "error"
            : undefined
        }
        onClose={() => {
          setAlert({ ...alert, visible: false });
          if (alert.title === "Success") navigation.navigate("Wallet");
        }}
      />
      <View style={styles.card}>
        <Text style={styles.title}>{opp.name}</Text>
        <Text style={styles.desc}>{opp.description}</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Expected return</Text>
          <Text style={styles.value}>{opp.expectedReturn}%</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Duration</Text>
          <Text style={styles.value}>{opp.durationMonths} months</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Minimum</Text>
          <Text style={styles.value}>{formatCurrency(opp.minAmount)}</Text>
        </View>

        <View style={styles.buttonRow}>
          <Button
            title={
              loading
                ? "Processing…"
                : `Invest ${formatCurrency(opp.minAmount)}`
            }
            onPress={handleInvest}
            disabled={loading}
            color={theme.primary}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: theme.background },
  card: {
    backgroundColor: theme.surface,
    borderRadius: 16,
    padding: 20,
    shadowColor: theme.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: theme.border,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: theme.primary,
    marginBottom: 8,
    textAlign: "center",
    letterSpacing: 1,
  },
  desc: {
    color: theme.textSecondary,
    marginBottom: 16,
    textAlign: "center",
    fontSize: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomColor: theme.border,
    borderBottomWidth: 1,
  },
  label: {
    color: theme.textPrimary,
    fontWeight: "500",
    fontSize: 15,
  },
  value: {
    color: theme.primary,
    fontWeight: "700",
    fontSize: 15,
  },
  buttonRow: {
    marginTop: 24,
    alignItems: "center",
  },
});
