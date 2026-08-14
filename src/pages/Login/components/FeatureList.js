import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FEATURES = [
  {
    icon: "wallet-outline",
    label: "Unlimited cash books",
  },
  {
    icon: "trending-up-outline",
    label: "Instant cash in / out reports",
  },
  {
    icon: "lock-closed-outline",
    label: "Data stored safely on device",
  },
];

export default function FeatureList() {
  return (
      <View style={styles.container}>
        {FEATURES.map((feature) => (
            <View key={feature.label} style={styles.featureRow}>
              <View style={styles.iconContainer}>
                <Ionicons
                    name={feature.icon}
                    size={18}
                    color="#0f766e"
                />
              </View>

              <Text style={styles.label}>
                {feature.label}
              </Text>
            </View>
        ))}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
  },

  featureRow: {
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    backgroundColor: "#ccfbf1",
  },

  label: {
    marginLeft: 12,
    fontSize: 14,
    color: "#0f172a",
  },
});
