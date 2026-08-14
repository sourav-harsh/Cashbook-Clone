import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { formatCurrency } from "../../../utils/format";

export default function SummaryCard({ totals }) {
    const positive = totals.balance >= 0;

    return (
        <View style={styles.container}>
            <Text style={styles.balanceLabel}>
                Net balance
            </Text>

            <Text style={styles.balance}>
                {positive ? "" : "-"}
                {formatCurrency(totals.balance)}
            </Text>

            <View style={styles.summaryRow}>
                <View style={styles.summaryItem}>
                    <View style={styles.itemHeader}>
                        <Ionicons
                            name="arrow-down-circle"
                            size={16}
                            color="#86efac"
                        />

                        <Text style={styles.itemLabel}>
                            Cash In
                        </Text>
                    </View>

                    <Text style={styles.itemAmount}>
                        {formatCurrency(totals.cashIn)}
                    </Text>
                </View>

                <View style={styles.summaryItem}>
                    <View style={styles.itemHeader}>
                        <Ionicons
                            name="arrow-up-circle"
                            size={16}
                            color="#fca5a5"
                        />

                        <Text style={styles.itemLabel}>
                            Cash Out
                        </Text>
                    </View>

                    <Text style={styles.itemAmount}>
                        {formatCurrency(totals.cashOut)}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        backgroundColor: "#134e4a",
        padding: 20,
    },

    balanceLabel: {
        fontSize: 12,
        textTransform: "uppercase",
        letterSpacing: 1,
        color: "rgba(255, 255, 255, 0.7)",
    },

    balance: {
        marginTop: 4,
        fontSize: 30,
        fontWeight: "800",
        color: "#ffffff",
    },

    summaryRow: {
        marginTop: 16,
        flexDirection: "row",
    },

    summaryItem: {
        flex: 1,
        borderRadius: 12,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        padding: 12,
    },

    itemHeader: {
        flexDirection: "row",
        alignItems: "center",
    },

    itemLabel: {
        marginLeft: 6,
        fontSize: 12,
        color: "rgba(255, 255, 255, 0.8)",
    },

    itemAmount: {
        marginTop: 4,
        fontSize: 16,
        fontWeight: "700",
        color: "#ffffff",
    },

    summaryItemRight: {
        marginLeft: 12,
    },
});
