import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function EmptyState({
                                       icon = "file-tray-outline",
                                       title,
                                       message,
                                   }) {
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Ionicons name={icon} size={28} color="#0f766e" />
            </View>

            <Text style={styles.title}>{title}</Text>

            {message ? (
                <Text style={styles.message}>{message}</Text>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingHorizontal: 32,
        paddingVertical: 48,
    },

    iconContainer: {
        width: 64,
        height: 64,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 32,
        backgroundColor: "#CCFBF1", // brand-light
    },

    title: {
        marginTop: 16,
        fontSize: 16,
        fontWeight: "600",
        color: "#111827", // ink
    },

    message: {
        marginTop: 4,
        textAlign: "center",
        fontSize: 14,
        color: "#6B7280", // subtle
    },
});
