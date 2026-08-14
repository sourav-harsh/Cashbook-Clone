import React, {useMemo, useState} from "react";
import {FlatList, Pressable, StyleSheet, Text, TextInput, View,} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {useSafeAreaInsets} from "react-native-safe-area-context";

import {EmptyState, Header} from "../../utils";
import {useCashbook} from "../../context/CashbookContext";
import SummaryCard from "./components/SummaryCard";
import BookCard from "./components/BookCard";
import BookFormModal from "./components/BookFormModal";

export default function Home({navigation}) {
    const insets = useSafeAreaInsets();
    const {
        books,
        profile,
        totals,
        addBook,
        getBookTotals,
    } = useCashbook();

    const [query, setQuery] = useState("");
    const [showForm, setShowForm] = useState(false);

    const filteredBooks = useMemo(() => {
        const term = query.trim().toLowerCase();

        if (!term) {
            return books;
        }

        return books.filter((book) =>
            book.name.toLowerCase().includes(term),
        );
    }, [books, query]);

    const handleCreate = (name) => {
        const book = addBook(name);

        setShowForm(false);

        navigation.navigate("BookDetail", {
            bookId: book.id,
        });
    };

    return (
        <View style={styles.container}>
            <Header
                title={`Hi, ${profile?.name?.split(" ")[0] || "there"}`}
                subtitle="Your cash books"
                right={
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Open settings"
                        hitSlop={10}
                        onPress={() => navigation.navigate("Settings")}
                        style={styles.settingsButton}
                    >
                        <Ionicons
                            name="settings-outline"
                            size={18}
                            color="#ffffff"
                        />
                    </Pressable>
                }
            />

            <FlatList
                data={filteredBooks}
                keyExtractor={(item) => item.id}
                contentContainerStyle={[
                    styles.listContent,
                    {
                        paddingBottom: insets.bottom + 96,
                    },
                ]}
                ListHeaderComponent={
                    <View style={styles.listHeader}>
                        <SummaryCard totals={totals}/>

                        <View style={styles.searchContainer}>
                            <Ionicons
                                name="search-outline"
                                size={18}
                                color="#64748b"
                            />

                            <TextInput
                                value={query}
                                onChangeText={setQuery}
                                placeholder="Search cash books"
                                placeholderTextColor="#94a3b8"
                                style={styles.searchInput}
                            />

                            {query ? (
                                <Pressable
                                    accessibilityRole="button"
                                    hitSlop={8}
                                    onPress={() => setQuery("")}
                                >
                                    <Ionicons
                                        name="close-circle"
                                        size={18}
                                        color="#94a3b8"
                                    />
                                </Pressable>
                            ) : null}
                        </View>

                        <Text style={styles.bookCount}>
                            {filteredBooks.length}{" "}
                            {filteredBooks.length === 1 ? "book" : "books"}
                        </Text>
                    </View>
                }
                renderItem={({item}) => (
                    <BookCard
                        book={item}
                        totals={getBookTotals(item.id)}
                        onPress={() =>
                            navigation.navigate("BookDetail", {
                                bookId: item.id,
                            })
                        }
                    />
                )}
                ListEmptyComponent={
                    <EmptyState
                        icon="book-outline"
                        title={
                            query
                                ? "No books found"
                                : "No cash books yet"
                        }
                        message={
                            query
                                ? "Try a different search term."
                                : "Create your first book to start tracking cash."
                        }
                    />
                }
            />

            <Pressable
                accessibilityRole="button"
                accessibilityLabel="Add cash book"
                onPress={() => setShowForm(true)}
                style={[
                    styles.addBookButton,
                    {
                        bottom: insets.bottom + 20,
                    },
                ]}
            >
                <Ionicons
                    name="add"
                    size={22}
                    color="#ffffff"
                />

                <Text style={styles.addBookText}>
                    Add Book
                </Text>
            </Pressable>

            <BookFormModal
                visible={showForm}
                onClose={() => setShowForm(false)}
                onSubmit={handleCreate}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5DC",
    },

    settingsButton: {
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

    searchContainer: {
        marginTop: 16,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e2e8f0",
        borderRadius: 12,
        backgroundColor: "#ffffff",
        paddingHorizontal: 12,
    },

    searchInput: {
        marginLeft: 8,
        height: 44,
        flex: 1,
        fontSize: 16,
        color: "#0f172a",
    },

    bookCount: {
        marginTop: 16,
        fontSize: 14,
        fontWeight: "600",
        color: "#64748b",
    },

    addBookButton: {
        position: "absolute",
        right: 20,
        height: 56,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 28,
        backgroundColor: "#0f766e",
        paddingHorizontal: 20,
    },

    addBookText: {
        marginLeft: 6,
        fontSize: 16,
        fontWeight: "600",
        color: "#ffffff",
    },
});
