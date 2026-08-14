import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { storage } from "../utils/storage";
import { createId } from "../utils/format";
import { ENTRY_TYPES } from "../utils/constants";

const CashbookContext = createContext(null);

const seedBooks = () => {
  const now = new Date().toISOString();
  return [
    { id: "book-personal", name: "Personal Cashbook", createdAt: now },
    { id: "book-shop", name: "Shop Daily Book", createdAt: now },
  ];
};

const seedEntries = () => {
  const today = new Date();
  const day = (offset) => new Date(today.getTime() - offset * 86400000).toISOString();
  return [
    {
      id: createId(),
      bookId: "book-shop",
      type: ENTRY_TYPES.IN,
      amount: 12500,
      remark: "Counter sales",
      category: "Sales",
      paymentMode: "Cash",
      date: day(0),
    },
    {
      id: createId(),
      bookId: "book-shop",
      type: ENTRY_TYPES.OUT,
      amount: 4200,
      remark: "Stock purchase",
      category: "Purchase",
      paymentMode: "UPI",
      date: day(1),
    },
    {
      id: createId(),
      bookId: "book-personal",
      type: ENTRY_TYPES.OUT,
      amount: 1800,
      remark: "Groceries",
      category: "Personal",
      paymentMode: "Card",
      date: day(2),
    },
  ];
};

export function CashbookProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [entries, setEntries] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const [storedBooks, storedEntries, storedProfile] = await Promise.all([
        storage.getBooks(),
        storage.getEntries(),
        storage.getProfile(),
      ]);

      if (!mounted) return;

      if (storedBooks.length === 0) {
        const freshBooks = seedBooks();
        const freshEntries = seedEntries();
        setBooks(freshBooks);
        setEntries(freshEntries);
        await Promise.all([storage.setBooks(freshBooks), storage.setEntries(freshEntries)]);
      } else {
        setBooks(storedBooks);
        setEntries(storedEntries);
      }

      setProfile(storedProfile);
      setLoading(false);
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const persistBooks = useCallback((next) => {
    setBooks(next);
    storage.setBooks(next);
  }, []);

  const persistEntries = useCallback((next) => {
    setEntries(next);
    storage.setEntries(next);
  }, []);

  const signIn = useCallback((nextProfile) => {
    const value = { ...nextProfile, signedInAt: new Date().toISOString() };
    setProfile(value);
    storage.setProfile(value);
  }, []);

  const signOut = useCallback(() => {
    setProfile(null);
    storage.setProfile(null);
  }, []);

  const addBook = useCallback(
    (name) => {
      const book = { id: createId(), name: name.trim(), createdAt: new Date().toISOString() };
      persistBooks([book, ...books]);
      return book;
    },
    [books, persistBooks],
  );

  const renameBook = useCallback(
    (bookId, name) => {
      persistBooks(books.map((book) => (book.id === bookId ? { ...book, name: name.trim() } : book)));
    },
    [books, persistBooks],
  );

  const deleteBook = useCallback(
    (bookId) => {
      persistBooks(books.filter((book) => book.id !== bookId));
      persistEntries(entries.filter((entry) => entry.bookId !== bookId));
    },
    [books, entries, persistBooks, persistEntries],
  );

  const addEntry = useCallback(
    (entry) => {
      const record = {
        id: createId(),
        bookId: entry.bookId,
        type: entry.type,
        amount: Number(entry.amount),
        remark: (entry.remark || "").trim(),
        category: entry.category,
        paymentMode: entry.paymentMode,
        date: entry.date || new Date().toISOString(),
      };
      persistEntries([record, ...entries]);
      return record;
    },
    [entries, persistEntries],
  );

  const updateEntry = useCallback(
    (entryId, patch) => {
      persistEntries(
        entries.map((entry) =>
          entry.id === entryId
            ? { ...entry, ...patch, amount: Number(patch.amount ?? entry.amount) }
            : entry,
        ),
      );
    },
    [entries, persistEntries],
  );

  const deleteEntry = useCallback(
    (entryId) => {
      persistEntries(entries.filter((entry) => entry.id !== entryId));
    },
    [entries, persistEntries],
  );

  const getEntriesByBook = useCallback(
    (bookId) =>
      entries
        .filter((entry) => entry.bookId === bookId)
        .sort((a, b) => new Date(b.date) - new Date(a.date)),
    [entries],
  );

  const getBookTotals = useCallback(
    (bookId) => {
      const scoped = entries.filter((entry) => entry.bookId === bookId);
      const cashIn = scoped
        .filter((entry) => entry.type === ENTRY_TYPES.IN)
        .reduce((sum, entry) => sum + Number(entry.amount || 0), 0);
      const cashOut = scoped
        .filter((entry) => entry.type === ENTRY_TYPES.OUT)
        .reduce((sum, entry) => sum + Number(entry.amount || 0), 0);
      return { cashIn, cashOut, balance: cashIn - cashOut, count: scoped.length };
    },
    [entries],
  );

  const totals = useMemo(() => {
    const cashIn = entries
      .filter((entry) => entry.type === ENTRY_TYPES.IN)
      .reduce((sum, entry) => sum + Number(entry.amount || 0), 0);
    const cashOut = entries
      .filter((entry) => entry.type === ENTRY_TYPES.OUT)
      .reduce((sum, entry) => sum + Number(entry.amount || 0), 0);
    return { cashIn, cashOut, balance: cashIn - cashOut };
  }, [entries]);

  const resetData = useCallback(async () => {
    await storage.clearAll();
    setBooks([]);
    setEntries([]);
    setProfile(null);
  }, []);

  const value = useMemo(
    () => ({
      loading,
      books,
      entries,
      profile,
      totals,
      signIn,
      signOut,
      addBook,
      renameBook,
      deleteBook,
      addEntry,
      updateEntry,
      deleteEntry,
      getEntriesByBook,
      getBookTotals,
      resetData,
    }),
    [
      loading,
      books,
      entries,
      profile,
      totals,
      signIn,
      signOut,
      addBook,
      renameBook,
      deleteBook,
      addEntry,
      updateEntry,
      deleteEntry,
      getEntriesByBook,
      getBookTotals,
      resetData,
    ],
  );

  return <CashbookContext.Provider value={value}>{children}</CashbookContext.Provider>;
}

export function useCashbook() {
  const context = useContext(CashbookContext);
  if (!context) {
    throw new Error("useCashbook must be used inside a CashbookProvider");
  }
  return context;
}
