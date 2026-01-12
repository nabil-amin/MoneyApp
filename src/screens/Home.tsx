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

export default function HomeScreen({
  navigate,
}: {
  navigate: (r: any) => void;
}) {
  const { balances, opportunities, loading } = useWallet();

  if (loading || !balances) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  function renderItem({ item }: { item: Opportunity }) {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigate({ name: "Details", params: { opportunityId: item.id } })
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
    <View>
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
  sectionTitle: { fontSize: 16, fontWeight: "600", marginVertical: 8 },
  card: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 8,
    marginBottom: 8,
  },
  name: { fontWeight: "600" },
  meta: { color: "#666", marginTop: 6 },
});
