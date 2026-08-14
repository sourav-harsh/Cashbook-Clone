import React, { useEffect, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Button from "../../../utils/Button";
import TextField from "../../../utils/TextField";

export default function BookFormModal({
                                        visible,
                                        initialName = "",
                                        onClose,
                                        onSubmit,
                                      }) {
  const [name, setName] = useState(initialName);
  const [error, setError] = useState("");

  useEffect(() => {
    if (visible) {
      setName(initialName);
      setError("");
    }
  }, [visible, initialName]);

  const handleSubmit = () => {
    if (!name.trim()) {
      setError("Book name is required");
      return;
    }

    onSubmit(name.trim());
  };

  return (
      <Modal
          visible={visible}
          transparent
          animationType="fade"
          onRequestClose={onClose}
      >
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.title}>
              {initialName ? "Rename book" : "New cash book"}
            </Text>

            <TextField
                style={styles.textField}
                label="Book name"
                value={name}
                onChangeText={setName}
                placeholder="e.g. Shop Daily Book"
                error={error}
                autoFocus
            />

            <View style={styles.buttonRow}>
              <Button
                  label="Cancel"
                  variant="outline"
                  onPress={onClose}
                  style={styles.cancelButton}
              />

              <Button
                  label="Save"
                  onPress={handleSubmit}
                  style={styles.saveButton}
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

  modal: {
    width: "100%",
    borderRadius: 16,
    backgroundColor: "#ffffff",
    padding: 20,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f172a",
  },

  textField: {
    marginTop: 16,
  },

  buttonRow: {
    marginTop: 20,
    flexDirection: "row",
  },

  cancelButton: {
    flex: 1,
    marginRight: 12,
  },

  saveButton: {
    flex: 1,
  },
});
