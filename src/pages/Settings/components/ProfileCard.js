import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileCard({ profile }) {
    const initial =
        profile?.name?.trim()?.charAt(0)?.toUpperCase() || "U";

    return (
        <View style={styles.container}>
            <View style={styles.avatar}>
                <Text style={styles.initial}>
                    {initial}
                </Text>
            </View>

            <View style={styles.details}>
                <Text style={styles.name}>
                    {profile?.name || "Cashbook user"}
                </Text>

                <View style={styles.phoneRow}>
                    <Ionicons
                        name="call-outline"
                        size={13}
                        color="#64748b"
                    />

                    <Text style={styles.phone}>
                        {profile?.phone || "Not provided"}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e2e8f0",
        borderRadius: 16,
        backgroundColor: "#ffffff",
        padding: 16,
    },

    avatar: {
        width: 56,
        height: 56,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 28,
        backgroundColor: "#0f766e",
    },

    initial: {
        fontSize: 20,
        fontWeight: "700",
        color: "#ffffff",
    },

    details: {
        flex: 1,
        marginLeft: 16,
    },

    name: {
        fontSize: 16,
        fontWeight: "700",
        color: "#0f172a",
    },

    phoneRow: {
        marginTop: 4,
        flexDirection: "row",
        alignItems: "center",
    },

    phone: {
        marginLeft: 6,
        fontSize: 14,
        color: "#64748b",
    },
});
