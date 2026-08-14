import React, { useMemo, useState } from "react";
import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
    ChipGroup,
    ConfirmDialog,
    EmptyState,
    FILTERS,
    Header,
} from "../../utils";
import { useCashbook } from "../../context/CashbookContext";
import BalanceStrip from "./components/BalanceStrip";
import EntryRow from "./components/EntryRow";

export default function BookDetail({ navigation, route }) {
    const insets = useSafeAreaInsets();
    const { bookId } = route.params || {};

    const {
        books,
        getEntriesByBook,
        getBookTotals,
        deleteEntry,
        deleteBook,
    } = useCashbook();

    const [filter, setFilter] = useState("all");
    const [pendingEntryId, setPendingEntryId] = useState(null);
    const [confirmBook, setConfirmBook] = useState(false);

    const book = books.find((item) => item.id === bookId);

    const entries = useMemo(
        () => getEntriesByBook(bookId),
        [getEntriesByBook, bookId],
    );

    const totals = getBookTotals(bookId);

    const visibleEntries = useMemo(
        () =>
            filter === "all"
                ? entries
                : entries.filter((entry) => entry.type === filter),
        [entries, filter],
    );

    if (!book) {
        return (
            <View style={styles.container}>
                <Header
                    title="Cash book"
                    onBack={() => navigation.goBack()}
                />

                <EmptyState
                    icon="alert-circle-outline"
                    title="Book not found"
                    message="It may have been deleted."
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Header
                title={book.name}
                subtitle={`${totals.count} ${
                    totals.count === 1 ? "entry" : "entries"
                }`}
                onBack={() => navigation.goBack()}
                right={
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Delete book"
                        hitSlop={10}
                        onPress={() => setConfirmBook(true)}
                        style={styles.deleteButton}
                    >
                        <Ionicons
                            name="trash-outline"
                            size={18}
                            color="#ffffff"
                        />
                    </Pressable>
                }
            />

            <FlatList
                data={visibleEntries}
                keyExtractor={(item) => item.id}
                contentContainerStyle={[
                    styles.listContent,
                    {
                        paddingBottom: insets.bottom + 110,
                    },
                ]}
                ListHeaderComponent={
                    <View style={styles.listHeader}>
                        <BalanceStrip totals={totals} />

                        <ChipGroup
                            style={styles.filterGroup}
                            options={FILTERS}
                            value={filter}
                            onChange={setFilter}
                        />
                    </View>
                }
                renderItem={({ item }) => (
                    <EntryRow
                        entry={item}
                        onPress={() =>
                            navigation.navigate("AddEntry", {
                                bookId,
                                entryId: item.id,
                            })
                        }
                        onDelete={() => setPendingEntryId(item.id)}
                    />
                )}
                ListEmptyComponent={
                    <EmptyState
                        icon="receipt-outline"
                        title="No entries yet"
                        message="Add your first cash in or cash out entry."
                    />
                }
            />

            <View
                style={[
                    styles.bottomBar,
                    {
                        paddingBottom: insets.bottom + 12,
                    },
                ]}
            >
                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Add cash in"
                    onPress={() =>
                        navigation.navigate("AddEntry", {
                            bookId,
                            type: "in",
                        })
                    }
                    style={styles.cashInButton}
                >
                    <Ionicons
                        name="arrow-down"
                        size={18}
                        color="#ffffff"
                    />

                    <Text style={styles.buttonText}>Cash In</Text>
                </Pressable>

                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Add cash out"
                    onPress={() =>
                        navigation.navigate("AddEntry", {
                            bookId,
                            type: "out",
                        })
                    }
                    style={styles.cashOutButton}
                >
                    <Ionicons
                        name="arrow-up"
                        size={18}
                        color="#ffffff"
                    />

                    <Text style={styles.buttonText}>Cash Out</Text>
                </Pressable>
            </View>

            <ConfirmDialog
                visible={Boolean(pendingEntryId)}
                title="Delete this entry?"
                message="This action cannot be undone."
                onCancel={() => setPendingEntryId(null)}
                onConfirm={() => {
                    deleteEntry(pendingEntryId);
                    setPendingEntryId(null);
                }}
            />

            <ConfirmDialog
                visible={confirmBook}
                title="Delete this book?"
                message="All entries in this book will be removed."
                onCancel={() => setConfirmBook(false)}
                onConfirm={() => {
                    setConfirmBook(false);
                    deleteBook(bookId);
                    navigation.goBack();
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

    deleteButton: {
        width: 36,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 18,
        backgroundColor: "rgba(255, 255, 255, 0.15)",
    },

    listContent: {
        paddingHorizontal: 16,
        paddingTop: 16,
    },

    listHeader: {
        marginBottom: 16,
    },

    filterGroup: {
        marginTop: 16,
    },

    bottomBar: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: "row",
        borderTopWidth: 1,
        borderTopColor: "#e2e8f0",
        backgroundColor: "#ffffff",
        paddingHorizontal: 16,
        paddingTop: 12,
    },

    cashInButton: {
        height: 48,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
        borderRadius: 12,
        backgroundColor: "#16a34a",
    },

    cashOutButton: {
        height: 48,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        backgroundColor: "#dc2626",
    },

    buttonText: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: "600",
        color: "#ffffff",
    },
});
