import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function BrandHero() {
    return (
        <View style={styles.container}>
            <Image
                source={require("../../../../public/images/logo.png")}
                style={styles.logo}
                resizeMode="contain"
                accessibilityLabel="Cashbook logo"
            />

            <Text style={styles.title}>
                Cashbook
            </Text>

            <Text style={styles.subtitle}>
                Track cash in and cash out, manage multiple books and always know your balance.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },

    logo: {
        width: 96,
        height: 96,
    },

    title: {
        marginTop: 16,
        fontSize: 24,
        fontWeight: "800",
        color: "#0f172a",
    },

    subtitle: {
        marginTop: 4,
        textAlign: "center",
        fontSize: 14,
        color: "#64748b",
    },
});
