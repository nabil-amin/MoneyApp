import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import { useWallet } from "../context/WalletContext";
import { theme } from "../theme";
import { StackNavigationProp } from "@react-navigation/stack";

type OpportunitiesScreenProps = {
  navigation: StackNavigationProp<any, any>;
};

export default function OpportunitiesScreen({
  navigation,
}: OpportunitiesScreenProps) {
  const { opportunities, addOpportunity } = useWallet();

  function handleAdd() {
    addOpportunity({
      id: Date.now().toString(),
      name: "New Opportunity",
      description: "A new investment opportunity.",
      expectedReturn: 10,
      durationMonths: 6,
      minAmount: 500,
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.screenTitle}>Investment Opportunities</Text>
        <Button title="Add" onPress={handleAdd} color={theme.primary} />
      </View>
      <FlatList
        data={opportunities}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate("OpportunityDetails", {
                opportunityId: item.id,
              })
            }
          >
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.meta}>
              {item.expectedReturn}% • {item.durationMonths} months • Min{" "}
              {item.minAmount.toLocaleString()} SAR
            </Text>
            <Text style={styles.desc}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: theme.background },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.primary,
    letterSpacing: 1,
  },
  card: {
    backgroundColor: theme.surface,
    padding: 18,
    borderRadius: 14,
    marginBottom: 14,
    shadowColor: theme.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: theme.border,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: theme.textPrimary,
    marginBottom: 2,
  },
  meta: { color: theme.primary, fontWeight: "600", marginBottom: 6 },
  desc: { color: theme.textSecondary, fontSize: 14 },
});
