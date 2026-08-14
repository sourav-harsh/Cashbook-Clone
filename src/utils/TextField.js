import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function TextField({
                                    label,
                                    value,
                                    onChangeText,
                                    placeholder,
                                    keyboardType = "default",
                                    error = "",
                                    multiline = false,
                                    autoFocus = false,
                                    maxLength,
                                    style,
                                  }) {
  return (
      <View style={style}>
        {label ? <Text style={styles.label}>{label}</Text> : null}

        <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor="#94A3B8"
            keyboardType={keyboardType}
            multiline={multiline}
            autoFocus={autoFocus}
            maxLength={maxLength}
            style={[
              styles.input,
              error ? styles.inputError : styles.inputNormal,
              multiline ? styles.multiline : styles.singleLine,
            ]}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 6,
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280", // subtle
  },

  input: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#111827", // ink
    backgroundColor: "#FFFFFF", // surface
  },

  inputNormal: {
    borderColor: "#E5E7EB", // line
  },

  inputError: {
    borderColor: "#DC2626", // cashout
  },

  singleLine: {
    height: 48,
    paddingVertical: 0,
  },

  multiline: {
    height: 96,
    paddingVertical: 12,
    textAlignVertical: "top",
  },

  error: {
    marginTop: 4,
    fontSize: 12,
    color: "#DC2626", // cashout
  },
});
