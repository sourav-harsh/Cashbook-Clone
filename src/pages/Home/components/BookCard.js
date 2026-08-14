import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { formatCurrency, relativeDay } from "../../../utils/format";

export default function BookCard({
                                   book,
                                   totals,
                                   onPress,
                                   onLongPress,
                                 }) {
  const positive = totals.balance >= 0;

  return (
      <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Open ${book.name}`}
          onPress={onPress}
          onLongPress={onLongPress}
          style={styles.card}
      >
        <View style={styles.iconContainer}>
          <Ionicons
              name="book-outline"
              size={20}
              color="#0f766e"
          />
        </View>

        <View style={styles.details}>
          <Text
              numberOfLines={1}
              style={styles.bookName}
          >
            {book.name}
          </Text>

          <Text style={styles.meta}>
            {totals.count}{" "}
            {totals.count === 1 ? "entry" : "entries"} ·{" "}
            {relativeDay(book.createdAt)}
          </Text>
        </View>

        <View style={styles.balanceContainer}>
          <Text
              style={[
                styles.balance,
                positive
                    ? styles.cashInText
                    : styles.cashOutText,
              ]}
          >
            {positive ? "" : "-"}
            {formatCurrency(totals.balance)}
          </Text>

          <Text style={styles.balanceLabel}>
            Balance
          </Text>
        </View>
      </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
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
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#ccfbf1",
  },

  details: {
    flex: 1,
    marginLeft: 12,
  },

  bookName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0f172a",
  },

  meta: {
    marginTop: 2,
    fontSize: 12,
    color: "#64748b",
  },

  balanceContainer: {
    alignItems: "flex-end",
  },

  balance: {
    fontSize: 16,
    fontWeight: "700",
  },

  cashInText: {
    color: "#16a34a",
  },

  cashOutText: {
    color: "#dc2626",
  },

  balanceLabel: {
    fontSize: 11,
    color: "#64748b",
  },
});
