import React from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import Button from "./Button";

export default function ConfirmDialog({
                                        visible,
                                        title,
                                        message,
                                        confirmLabel = "Delete",
                                        onCancel,
                                        onConfirm,
                                      }) {
  return (
      <Modal
          visible={visible}
          transparent
          animationType="fade"
          onRequestClose={onCancel}
      >
        <View style={styles.overlay}>
          <View style={styles.dialog}>
            <Text style={styles.title}>{title}</Text>

            {message ? (
                <Text style={styles.message}>{message}</Text>
            ) : null}

            <View style={styles.actions}>
              <Button
                  label="Cancel"
                  variant="outline"
                  onPress={onCancel}
                  style={styles.cancelButton}
              />

              <Button
                  label={confirmLabel}
                  variant="cashout"
                  onPress={onConfirm}
                  style={styles.confirmButton}
              />
            </View>
          </View>
        </View>
      </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 24,
  },

  dialog: {
    width: "100%",
    borderRadius: 16,
    backgroundColor: "#FFFFFF", // surface
    padding: 20,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827", // ink
  },

  message: {
    marginTop: 8,
    fontSize: 14,
    color: "#6B7280", // subtle
  },

  actions: {
    flexDirection: "row",
    marginTop: 20,
  },

  cancelButton: {
    flex: 1,
    marginRight: 12,
  },

  confirmButton: {
    flex: 1,
  },
});
