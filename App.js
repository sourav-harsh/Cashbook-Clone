import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import RootNavigator from "./src/navigation/RootNavigator";
import { CashbookProvider } from "./src/context/CashbookContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <CashbookProvider>
        <StatusBar style="light" backgroundColor="#0f766e" />
        <RootNavigator />
      </CashbookProvider>
    </SafeAreaProvider>
  );
}
