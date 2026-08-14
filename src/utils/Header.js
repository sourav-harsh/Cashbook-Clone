import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Header({ title, subtitle, onBack, right = null }) {
    const insets = useSafeAreaInsets();

    return (
        <View
            style={[
                styles.header,
                {
                    paddingTop: insets.top + 12,
                },
            ]}
        >
            <View style={styles.row}>
                {onBack ? (
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Go back"
                        hitSlop={10}
                        onPress={onBack}
                        style={styles.backButton}
                    >
                        <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
                    </Pressable>
                ) : null}

                <View style={styles.titleContainer}>
                    <Text numberOfLines={1} style={styles.title}>
                        {title}
                    </Text>

                    {subtitle ? (
                        <Text numberOfLines={1} style={styles.subtitle}>
                            {subtitle}
                        </Text>
                    ) : null}
                </View>

                {right}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#0F766E", // brand
        paddingHorizontal: 16,
        paddingBottom: 16,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
    },

    backButton: {
        width: 36,
        height: 36,
        marginRight: 12,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 18,
        backgroundColor: "rgba(255, 255, 255, 0.15)",
    },

    titleContainer: {
        flex: 1,
    },

    title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#FFFFFF",
    },

    subtitle: {
        marginTop: 2,
        fontSize: 12,
        color: "rgba(255, 255, 255, 0.8)",
    },
});
