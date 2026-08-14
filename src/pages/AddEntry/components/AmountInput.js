import React from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function AmountInput({
                                        value,
                                        onChangeText,
                                        error,
                                    }) {
    return (
        <View>
            <Text style={styles.label}>Amount</Text>

            <View
                style={[
                    styles.inputContainer,
                    error ? styles.inputError : styles.inputNormal,
                ]}
            >
                <Text style={styles.currency}>{"\u20B9"}</Text>

                <TextInput
                    value={value}
                    onChangeText={(text) =>
                        onChangeText(text.replace(/[^0-9.]/g, ""))
                    }
                    placeholder="0"
                    placeholderTextColor="#94a3b8"
                    keyboardType="decimal-pad"
                    style={styles.input}
                />
            </View>

            {error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        marginBottom: 6,
        fontSize: 14,
        fontWeight: "500",
        color: "#64748b",
    },

    inputContainer: {
        height: 64,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 12,
        backgroundColor: "#ffffff",
        paddingHorizontal: 16,
    },

    inputNormal: {
        borderColor: "#e2e8f0",
    },

    inputError: {
        borderColor: "#dc2626",
    },

    currency: {
        marginRight: 8,
        fontSize: 24,
        fontWeight: "700",
        color: "#64748b",
    },

    input: {
        flex: 1,
        fontSize: 24,
        fontWeight: "700",
        color: "#0f172a",
    },

    errorText: {
        marginTop: 4,
        fontSize: 12,
        color: "#dc2626",
    },
});
