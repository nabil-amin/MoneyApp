import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { useWallet } from "../context/WalletContext";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  OpportunityDetails: { opportunityId: string };
  Wallet: undefined;
  // add other routes here if needed
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

  const opp = opportunities.find((o) => o.id === opportunityId);
  if (!opp) return <Text>Opportunity not found.</Text>;

  async function handleInvest() {
    if (!balances) return;
    if (!opp) return;
    const amt = 1000;
    if (balances.available < amt) {
      Alert.alert(
        "Insufficient balance",
        "You do not have enough available balance to invest 1,000 ﷼."
      );
      return;
    }

    try {
      setLoading(true);
      await invest(amt, opp.id);
      Alert.alert("Success", "Investment successful");
      navigation.navigate("Wallet");
    } catch (err: any) {
      Alert.alert("Error", err?.message || "Failed to invest");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{opp.name}</Text>
      <Text style={styles.desc}>{opp.description}</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Expected return</Text>
        <Text>{opp.expectedReturn}%</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Duration</Text>
        <Text>{opp.durationMonths} months</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Minimum</Text>
        <Text>{formatCurrency(opp.minAmount)}</Text>
      </View>

      <View style={{ marginTop: 16 }}>
        <Button
          title={loading ? "Processing…" : "Invest 1,000 ﷼"}
          onPress={handleInvest}
          disabled={loading}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
  name: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
  desc: { color: "#444", marginBottom: 12 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomColor: "#f0f0f0",
    borderBottomWidth: 1,
  },
  label: { color: "#666" },
});
