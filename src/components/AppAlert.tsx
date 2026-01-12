import React from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { theme } from "../theme";

interface AppAlertProps {
  visible: boolean;
  title?: string;
  message: string;
  onClose: () => void;
  type?: "success" | "error";
}

export default function AppAlert({
  visible,
  title,
  message,
  onClose,
  type,
}: AppAlertProps) {
  const titleColor = type === "success" ? theme.success : theme.error;
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          {title && (
            <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
          )}
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: theme.transparent,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: theme.surface,
    borderRadius: 16,
    padding: 24,
    minWidth: 260,
    shadowColor: theme.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.primary,
    marginBottom: 8,
    textAlign: "center",
  },
  message: {
    fontSize: 15,
    color: theme.textPrimary,
    marginBottom: 18,
    textAlign: "center",
  },
  button: {
    backgroundColor: theme.primary,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  buttonText: {
    color: theme.surface,
    fontWeight: "600",
    fontSize: 16,
  },
});
