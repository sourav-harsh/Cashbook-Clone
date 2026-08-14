import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button, TextField } from "../../utils";
import { useCashbook } from "../../context/CashbookContext";
import BrandHero from "./components/BrandHero";
import FeatureList from "./components/FeatureList";

export default function Login() {
  const insets = useSafeAreaInsets();
  const { signIn } = useCashbook();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    const nextErrors = {};

    if (!name.trim()) {
      nextErrors.name = "Please enter your name";
    }

    if (!/^\d{10}$/.test(phone.trim())) {
      nextErrors.phone = "Enter a valid 10 digit number";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmitting(true);

    signIn({
      name: name.trim(),
      phone: phone.trim(),
    });

    setSubmitting(false);
  };

  return (
      <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
            contentContainerStyle={[
              styles.scrollContent,
              {
                paddingTop: insets.top + 40,
                paddingBottom: insets.bottom + 32,
              },
            ]}
            keyboardShouldPersistTaps="handled"
        >
          <BrandHero />

          <FeatureList />

          <View style={styles.formContainer}>
            <Text style={styles.title}>
              Get started
            </Text>

            <TextField
                style={styles.textField}
                label="Your name"
                value={name}
                onChangeText={setName}
                placeholder="e.g. Sourav Kumar"
                error={errors.name}
            />

            <TextField
                style={styles.textField}
                label="Mobile number"
                value={phone}
                onChangeText={(text) =>
                    setPhone(text.replace(/[^0-9]/g, ""))
                }
                placeholder="10 digit mobile number"
                keyboardType="number-pad"
                maxLength={10}
                error={errors.phone}
            />

            <Button
                style={styles.continueButton}
                label="Continue"
                onPress={handleSubmit}
                loading={submitting}
            />

            <Text style={styles.disclaimer}>
              By continuing you agree to keep your books
              accurate and up to date.
            </Text>
          </View>
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
    paddingHorizontal: 24,
    flexGrow: 1,
  },

  formContainer: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 16,
    backgroundColor: "#ffffff",
    padding: 20,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f172a",
  },

  textField: {
    marginTop: 16,
  },

  continueButton: {
    marginTop: 24,
  },

  disclaimer: {
    marginTop: 12,
    textAlign: "center",
    fontSize: 12,
    color: "#64748b",
  },
});
