import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useWallet } from "../context/WalletContext";
import BalanceSummary from "../components/BalanceSummary";
import { Opportunity } from "../types";
import { theme } from "../theme";

import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Home: undefined;
  OpportunityDetails: { opportunityId: string };
  Wallet: undefined;
};

export default function HomeScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { balances, opportunities, loading } = useWallet();

  if (loading || !balances) {
    return (
      <View style={{ flex: 1, padding: 16, backgroundColor: theme.background }}>
        <Text style={{ color: theme.textPrimary }}>Loading...</Text>
      </View>
    );
  }

  function renderItem({ item }: { item: Opportunity }) {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate("OpportunityDetails", { opportunityId: item.id })
        }
      >
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.meta}>
          {item.expectedReturn}% • {item.durationMonths} months • Min{" "}
          {item.minAmount.toLocaleString()} SAR
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <BalanceSummary balances={balances} />

      <Text style={styles.sectionTitle}>Investment Opportunities</Text>
      <FlatList
        data={opportunities}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: theme.background },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 8,
    color: theme.primary,
  },
  card: {
    padding: 12,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: theme.surface,
  },
  name: { fontWeight: "600", color: theme.textPrimary },
  meta: { color: theme.textSecondary, marginTop: 6 },
});
