import AsyncStorage from "@react-native-async-storage/async-storage";

const KEYS = {
  books: "@cashbook/books",
  entries: "@cashbook/entries",
  profile: "@cashbook/profile",
};

const read = async (key, fallback) => {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.warn(`Failed reading ${key}`, error);
    return fallback;
  }
};

const write = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn(`Failed writing ${key}`, error);
    return false;
  }
};

export const storage = {
  KEYS,
  getBooks: () => read(KEYS.books, []),
  setBooks: (books) => write(KEYS.books, books),
  getEntries: () => read(KEYS.entries, []),
  setEntries: (entries) => write(KEYS.entries, entries),
  getProfile: () => read(KEYS.profile, null),
  setProfile: (profile) => write(KEYS.profile, profile),
  clearAll: async () => {
    try {
      await AsyncStorage.multiRemove(Object.values(KEYS));
      return true;
    } catch (error) {
      console.warn("Failed clearing storage", error);
      return false;
    }
  },
};
