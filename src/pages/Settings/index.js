import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
    ConfirmDialog,
    Header,
    formatCurrency,
} from "../../utils";
import { useCashbook } from "../../context/CashbookContext";
import ProfileCard from "./components/ProfileCard";
import SettingsRow from "./components/SettingsRow";

export default function Settings({ navigation }) {
    const insets = useSafeAreaInsets();

    const {
        profile,
        books,
        entries,
        totals,
        signOut,
        resetData,
    } = useCashbook();

    const [confirmReset, setConfirmReset] = useState(false);
    const [confirmLogout, setConfirmLogout] = useState(false);

    return (
        <View style={styles.container}>
            <Header
                title="Settings"
                subtitle="Profile and app data"
                onBack={() => navigation.goBack()}
            />

            <ScrollView
                contentContainerStyle={[
                    styles.scrollContent,
                    {
                        paddingBottom: insets.bottom + 32,
                    },
                ]}
            >
                <ProfileCard profile={profile} />

                <Text style={styles.sectionTitle}>
                    Overview
                </Text>

                <View style={styles.sectionContainer}>
                    <SettingsRow
                        icon="book-outline"
                        label="Cash books"
                        value={String(books.length)}
                    />

                    <SettingsRow
                        icon="receipt-outline"
                        label="Total entries"
                        value={String(entries.length)}
                    />

                    <SettingsRow
                        icon="wallet-outline"
                        label="Net balance"
                        value={`${totals.balance < 0 ? "-" : ""}${formatCurrency(
                            totals.balance,
                        )}`}
                    />
                </View>

                <Text style={styles.sectionTitle}>
                    Data
                </Text>

                <View style={styles.sectionContainer}>
                    <SettingsRow
                        icon="trash-outline"
                        label="Reset all data"
                        onPress={() => setConfirmReset(true)}
                        danger
                    />

                    <SettingsRow
                        icon="log-out-outline"
                        label="Log out"
                        onPress={() => setConfirmLogout(true)}
                        danger
                    />
                </View>

                <Text style={styles.versionText}>
                    Cashbook Clone · v1.0.0
                </Text>
            </ScrollView>

            <ConfirmDialog
                visible={confirmReset}
                title="Reset all data?"
                message="Every book and entry stored on this device will be deleted."
                confirmLabel="Reset"
                onCancel={() => setConfirmReset(false)}
                onConfirm={async () => {
                    setConfirmReset(false);
                    await resetData();
                }}
            />

            <ConfirmDialog
                visible={confirmLogout}
                title="Log out?"
                message="Your books stay saved on this device."
                confirmLabel="Log out"
                onCancel={() => setConfirmLogout(false)}
                onConfirm={() => {
                    setConfirmLogout(false);
                    signOut();
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5DC",
    },

    scrollContent: {
        padding: 16,
    },

    sectionTitle: {
        marginTop: 24,
        marginBottom: 8,
        fontSize: 14,
        fontWeight: "600",
        color: "#64748b",
    },

    sectionContainer: {
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#e2e8f0",
        borderRadius: 16,
        backgroundColor: "#ffffff",
    },

    versionText: {
        marginTop: 32,
        textAlign: "center",
        fontSize: 12,
        color: "#64748b",
    },
});
