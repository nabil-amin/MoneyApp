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

export default function OpportunitiesScreen({ navigation }) {
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
      <Button title="Add Opportunity" onPress={handleAdd} />
      <FlatList
        data={opportunities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("OpportunityDetails", {
                opportunityId: item.id,
              })
            }
          >
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.desc}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  title: { fontSize: 16, fontWeight: "bold" },
  desc: { color: "#555" },
});
