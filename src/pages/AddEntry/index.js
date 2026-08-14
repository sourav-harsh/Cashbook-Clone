import React, { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  Button,
  CATEGORIES,
  ChipGroup,
  ENTRY_TYPES,
  Header,
  PAYMENT_MODES,
  TextField,
} from "../../utils";
import { useCashbook } from "../../context/CashbookContext";
import TypeToggle from "./components/TypeToggle";
import AmountInput from "./components/AmountInput";

export default function AddEntry({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const { bookId, entryId, type } = route.params || {};
  const { entries, addEntry, updateEntry } = useCashbook();

  const existing = useMemo(
      () => entries.find((entry) => entry.id === entryId) || null,
      [entries, entryId],
  );

  const [entryType, setEntryType] = useState(
      existing?.type || type || ENTRY_TYPES.IN,
  );
  const [amount, setAmount] = useState(
      existing ? String(existing.amount) : "",
  );
  const [remark, setRemark] = useState(existing?.remark || "");
  const [category, setCategory] = useState(
      existing?.category || CATEGORIES[0],
  );
  const [paymentMode, setPaymentMode] = useState(
      existing?.paymentMode || PAYMENT_MODES[0],
  );
  const [error, setError] = useState("");

  const handleSave = () => {
    const parsed = Number(amount);

    if (!amount || Number.isNaN(parsed) || parsed <= 0) {
      setError("Enter an amount greater than 0");
      return;
    }

    const payload = {
      bookId,
      type: entryType,
      amount: parsed,
      remark,
      category,
      paymentMode,
    };

    if (existing) {
      updateEntry(existing.id, payload);
    } else {
      addEntry(payload);
    }

    navigation.goBack();
  };

  return (
      <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Header
            title={existing ? "Edit entry" : "New entry"}
            subtitle={
              entryType === ENTRY_TYPES.IN
                  ? "Money coming in"
                  : "Money going out"
            }
            onBack={() => navigation.goBack()}
        />

        <ScrollView
            contentContainerStyle={[
              styles.scrollContent,
              {
                paddingBottom: insets.bottom + 32,
              },
            ]}
            keyboardShouldPersistTaps="handled"
        >
          <TypeToggle
              value={entryType}
              onChange={setEntryType}
          />

          <View style={styles.amountContainer}>
            <AmountInput
                value={amount}
                onChangeText={setAmount}
                error={error}
            />
          </View>

          <TextField
              style={styles.remarkField}
              label="Remark"
              value={remark}
              onChangeText={setRemark}
              placeholder="What was this for?"
              multiline
          />

          <Text style={styles.sectionLabel}>Category</Text>

          <ChipGroup
              options={CATEGORIES}
              value={category}
              onChange={setCategory}
          />

          <Text style={styles.sectionLabel}>Payment mode</Text>

          <ChipGroup
              options={PAYMENT_MODES}
              value={paymentMode}
              onChange={setPaymentMode}
          />

          <Button
              style={styles.saveButton}
              label={existing ? "Update entry" : "Save entry"}
              variant={
                entryType === ENTRY_TYPES.IN
                    ? "cashin"
                    : "cashout"
              }
              onPress={handleSave}
          />
        </ScrollView>
      </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  scrollContent: {
    padding: 16,
  },

  amountContainer: {
    marginTop: 20,
  },

  remarkField: {
    marginTop: 20,
  },

  sectionLabel: {
    marginTop: 20,
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "500",
    color: "#64748b",
  },

  saveButton: {
    marginTop: 32,
  },
});
