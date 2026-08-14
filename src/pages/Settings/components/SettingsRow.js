import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SettingsRow({
                                        icon,
                                        label,
                                        value,
                                        onPress,
                                        danger = false,
                                    }) {
    const content = (
        <View style={styles.container}>
            <View
                style={[
                    styles.iconContainer,
                    danger ? styles.dangerIcon : styles.defaultIcon,
                ]}
            >
                <Ionicons
                    name={icon}
                    size={18}
                    color={danger ? "#dc2626" : "#0f766e"}
                />
            </View>

            <Text
                style={[
                    styles.label,
                    danger ? styles.dangerText : styles.defaultText,
                ]}
            >
                {label}
            </Text>

            {value ? (
                <Text style={styles.value}>
                    {value}
                </Text>
            ) : null}

            {onPress ? (
                <Ionicons
                    name="chevron-forward"
                    size={18}
                    color="#94a3b8"
                />
            ) : null}
        </View>
    );

    if (!onPress) {
        return content;
    }

    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={label}
            onPress={onPress}
        >
            {content}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#e2e8f0",
        paddingHorizontal: 16,
        paddingVertical: 16,
    },

    iconContainer: {
        width: 36,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 18,
    },

    defaultIcon: {
        backgroundColor: "#ccfbf1",
    },

    dangerIcon: {
        backgroundColor: "rgba(220, 38, 38, 0.1)",
    },

    label: {
        flex: 1,
        marginLeft: 12,
        fontSize: 16,
    },

    defaultText: {
        color: "#0f172a",
    },

    dangerText: {
        color: "#dc2626",
    },

    value: {
        fontSize: 14,
        color: "#64748b",
    },
});
