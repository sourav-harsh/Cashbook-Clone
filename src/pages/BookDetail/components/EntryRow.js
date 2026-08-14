import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { ENTRY_TYPES } from "../../../utils/constants";
import {
  formatCurrency,
  formatTime,
  relativeDay,
} from "../../../utils/format";

export default function EntryRow({ entry, onPress, onDelete }) {
  const isIn = entry.type === ENTRY_TYPES.IN;

  return (
      <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Edit entry ${
              entry.remark || entry.category
          }`}
          onPress={onPress}
          style={styles.row}
      >
        <View
            style={[
              styles.iconContainer,
              isIn ? styles.cashInIcon : styles.cashOutIcon,
            ]}
        >
          <Ionicons
              name={isIn ? "arrow-down" : "arrow-up"}
              size={18}
              color={isIn ? "#16a34a" : "#dc2626"}
          />
        </View>

        <View style={styles.details}>
          <Text
              numberOfLines={1}
              style={styles.remark}
          >
            {entry.remark || entry.category}
          </Text>

          <Text style={styles.meta}>
            {relativeDay(entry.date)} · {formatTime(entry.date)} ·{" "}
            {entry.paymentMode}
          </Text>
        </View>

        <View style={styles.amountContainer}>
          <Text
              style={[
                styles.amount,
                isIn ? styles.cashInText : styles.cashOutText,
              ]}
          >
            {isIn ? "+" : "-"} {formatCurrency(entry.amount)}
          </Text>

          <Pressable
              accessibilityRole="button"
              accessibilityLabel="Delete entry"
              hitSlop={8}
              onPress={onDelete}
              style={styles.deleteButton}
          >
            <Ionicons
                name="trash-outline"
                size={16}
                color="#94a3b8"
            />
          </Pressable>
        </View>
      </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 16,
    backgroundColor: "#ffffff",
    padding: 16,
  },

  iconContainer: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },

  cashInIcon: {
    backgroundColor: "rgba(22, 163, 74, 0.1)",
  },

  cashOutIcon: {
    backgroundColor: "rgba(220, 38, 38, 0.1)",
  },

  details: {
    flex: 1,
    marginLeft: 12,
  },

  remark: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0f172a",
  },

  meta: {
    marginTop: 2,
    fontSize: 12,
    color: "#64748b",
  },

  amountContainer: {
    alignItems: "flex-end",
  },

  amount: {
    fontSize: 16,
    fontWeight: "700",
  },

  cashInText: {
    color: "#16a34a",
  },

  cashOutText: {
    color: "#dc2626",
  },

  deleteButton: {
    marginTop: 4,
  },
});
