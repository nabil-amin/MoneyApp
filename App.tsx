import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { WalletProvider } from "./src/context/WalletContext";
import AppNavigation from "./src/Navigation";

export default function App() {
  return (
    <WalletProvider>
      <AppNavigation />
    </WalletProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { padding: 16, borderBottomWidth: 1, borderBottomColor: "#eee" },
  title: { fontSize: 18, fontWeight: "600" },
  tabs: { flexDirection: "row", marginTop: 8 },
  tabButton: { marginRight: 12 },
  tabText: { color: "#0a84ff" },
  content: { flex: 1, padding: 16 },
});
