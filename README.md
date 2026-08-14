# Cashbook Clone (React Native + Expo + NativeWind/Tailwind CSS)

A production-ready clone of the Cashbook (com.cashbooknew) Android app: multiple cash books,
cash-in / cash-out entries, categories, payment modes, live balances and on-device persistence.

## Tech stack

- React Native 0.74 via Expo SDK 51
- NativeWind v4 (Tailwind CSS for React Native)
- React Navigation (native stack)
- AsyncStorage for offline persistence
- Icons via `@expo/vector-icons` (Ionicons) — the React Native equivalent of `react-icons`
  (`react-icons` renders SVG DOM elements and cannot be used in a native app; `react-native-vector-icons`
  is also included in dependencies if you prefer the bare-workflow package)

## Getting started

```bash
npm install
npm start        # then press "a" for Android, "i" for iOS, "w" for web
```

Build production binaries with EAS:

```bash
npx eas build -p android --profile production
```

## Project structure

```
public/images/            static images used in the app (logo / icon / splash)
src/
  pages/                  one folder per screen, each with its own components/ subfolder
    Login/                onboarding + profile capture
      components/         BrandHero, FeatureList
    Home/                 cash book list + net balance summary
      components/         SummaryCard, BookCard, BookFormModal
    BookDetail/           entries of one book, filters, delete
      components/         BalanceStrip, EntryRow
    AddEntry/             add / edit a cash in or cash out entry
      components/         TypeToggle, AmountInput
    Settings/             profile, overview, reset data, logout
      components/         ProfileCard, SettingsRow
  utils/                  common components + helpers shared across pages
                          Button, Header, Card, TextField, ChipGroup, ConfirmDialog,
                          EmptyState, AppText, format.js, constants.js, storage.js
  context/                CashbookContext (global state + persistence)
  navigation/             RootNavigator (auth-aware stack)
App.js                    providers + global.css import
tailwind.config.js        design tokens (brand, cashin, cashout, ink, subtle, line, surface, canvas)
```

## Features

- Create, rename-ready, search and delete cash books
- Cash In / Cash Out entries with amount, remark, category and payment mode
- Edit and delete existing entries
- Per-book totals and app-wide net balance
- Filter entries by All / Cash In / Cash Out
- Offline-first: all data persisted with AsyncStorage
- Reset all data and log out from Settings
- Accessibility labels and roles on every interactive element
# Cashbook-Clone
