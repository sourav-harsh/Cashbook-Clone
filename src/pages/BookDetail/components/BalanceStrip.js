import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { formatCurrency } from "../../../utils/format";

export default function BalanceStrip({ totals }) {
  const positive = totals.balance >= 0;

  return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Cash In</Text>

            <Text style={[styles.amount, styles.cashInText]}>
              {formatCurrency(totals.cashIn)}
            </Text>
          </View>

          <View style={[styles.column, styles.divider]}>
            <Text style={styles.label}>Cash Out</Text>

            <Text style={[styles.amount, styles.cashOutText]}>
              {formatCurrency(totals.cashOut)}
            </Text>
          </View>

          <View style={[styles.column, styles.divider]}>
            <Text style={styles.label}>Balance</Text>

            <Text
                style={[
                  styles.amount,
                  positive ? styles.cashInText : styles.cashOutText,
                ]}
            >
              {positive ? "" : "-"}
              {formatCurrency(totals.balance)}
            </Text>
          </View>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 16,
    backgroundColor: "#ffffff",
    padding: 16,
  },

  row: {
    flexDirection: "row",
  },

  column: {
    flex: 1,
  },

  divider: {
    borderLeftWidth: 1,
    borderLeftColor: "#e2e8f0",
    paddingLeft: 16,
  },

  label: {
    fontSize: 12,
    color: "#64748b",
  },

  amount: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: "700",
  },

  cashInText: {
    color: "#16a34a",
  },

  cashOutText: {
    color: "#dc2626",
  },
});
