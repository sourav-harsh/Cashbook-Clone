import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const styles = StyleSheet.create({
  button: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    paddingHorizontal: 16,
  },

  content: {
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    marginRight: 8,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
  },

  disabled: {
    opacity: 0.6,
  },

  primaryBox: {
    backgroundColor: "#0f766e",
  },

  outlineBox: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#0f766e",
  },

  cashinBox: {
    backgroundColor: "#16a34a",
  },

  cashoutBox: {
    backgroundColor: "#dc2626",
  },

  ghostBox: {
    backgroundColor: "transparent",
  },

  dangerBox: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#dc2626",
  },

  whiteLabel: {
    color: "#ffffff",
  },

  brandLabel: {
    color: "#0f766e",
  },

  subtleLabel: {
    color: "#64748b",
  },

  cashoutLabel: {
    color: "#dc2626",
  },
});

const VARIANTS = {
  primary: {
    box: styles.primaryBox,
    label: styles.whiteLabel,
  },

  outline: {
    box: styles.outlineBox,
    label: styles.brandLabel,
  },

  cashin: {
    box: styles.cashinBox,
    label: styles.whiteLabel,
  },

  cashout: {
    box: styles.cashoutBox,
    label: styles.whiteLabel,
  },

  ghost: {
    box: styles.ghostBox,
    label: styles.subtleLabel,
  },

  danger: {
    box: styles.dangerBox,
    label: styles.cashoutLabel,
  },
};

export default function Button({
                                 label,
                                 onPress,
                                 variant = "primary",
                                 icon = null,
                                 loading = false,
                                 disabled = false,
                                 style,
                               }) {
  const variantStyle = VARIANTS[variant] || VARIANTS.primary;
  const isDisabled = disabled || loading;

  const isLoadingWithDarkText =
      variant === "outline" || variant === "danger";

  return (
      <Pressable
          accessibilityRole="button"
          accessibilityLabel={label}
          onPress={isDisabled ? undefined : onPress}
          style={[
            styles.button,
            variantStyle.box,
            isDisabled && styles.disabled,
            style,
          ]}
      >
        {loading ? (
            <ActivityIndicator
                color={isLoadingWithDarkText ? "#0f766e" : "#ffffff"}
            />
        ) : (
            <View style={styles.content}>
              {icon ? <View style={styles.icon}>{icon}</View> : null}

              <Text style={[styles.label, variantStyle.label]}>
                {label}
              </Text>
            </View>
        )}
      </Pressable>
  );
}
