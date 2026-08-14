import React from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";

export default function ChipGroup({
                                    options,
                                    value,
                                    onChange,
                                    style,
                                  }) {
  return (
      <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={style}
          contentContainerStyle={styles.contentContainer}
      >
        {options.map((option) => {
          const key = typeof option === "string" ? option : option.key;
          const label = typeof option === "string" ? option : option.label;
          const active = value === key;

          return (
              <Pressable
                  key={key}
                  accessibilityRole="button"
                  onPress={() => onChange(key)}
                  style={[
                    styles.chip,
                    active ? styles.chipActive : styles.chipInactive,
                  ]}
              >
                <Text
                    style={[
                      styles.text,
                      active ? styles.textActive : styles.textInactive,
                    ]}
                >
                  {label}
                </Text>
              </Pressable>
          );
        })}
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingRight: 8,
  },

  chip: {
    marginRight: 8,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  chipActive: {
    borderColor: "#2563EB", // brand
    backgroundColor: "#2563EB", // brand
  },

  chipInactive: {
    borderColor: "#E5E7EB", // line
    backgroundColor: "#FFFFFF", // surface
  },

  text: {
    fontSize: 14,
    fontWeight: "500",
  },

  textActive: {
    color: "#FFFFFF",
  },

  textInactive: {
    color: "#6B7280", // subtle
  },
});
