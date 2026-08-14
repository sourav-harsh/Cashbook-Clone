import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { ENTRY_TYPES } from "../../../utils/constants";

export default function TypeToggle({ value, onChange }) {
  const options = [
    {
      key: ENTRY_TYPES.IN,
      label: "Cash In",
      activeStyle: styles.cashIn,
    },
    {
      key: ENTRY_TYPES.OUT,
      label: "Cash Out",
      activeStyle: styles.cashOut,
    },
  ];

  return (
      <View style={styles.container}>
        {options.map((option) => {
          const selected = value === option.key;

          return (
              <Pressable
                  key={option.key}
                  accessibilityRole="button"
                  onPress={() => onChange(option.key)}
                  style={[
                    styles.option,
                    selected ? option.activeStyle : styles.inactive,
                  ]}
              >
                <Text
                    style={[
                      styles.label,
                      selected ? styles.selectedLabel : styles.unselectedLabel,
                    ]}
                >
                  {option.label}
                </Text>
              </Pressable>
          );
        })}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    backgroundColor: "#ffffff",
    padding: 4,
  },

  option: {
    height: 44,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },

  inactive: {
    backgroundColor: "transparent",
  },

  cashIn: {
    backgroundColor: "#16a34a",
  },

  cashOut: {
    backgroundColor: "#dc2626",
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
  },

  selectedLabel: {
    color: "#ffffff",
  },

  unselectedLabel: {
    color: "#64748b",
  },
});
