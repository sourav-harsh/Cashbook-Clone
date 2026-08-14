import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

export default function Card({ children, onPress, style }) {
  if (onPress) {
    return (
        <Pressable
            accessibilityRole="button"
            onPress={onPress}
            style={[styles.card, style]}
        >
          {children}
        </Pressable>
    );
  }

  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB", // line
    backgroundColor: "#FFFFFF", // surface
    padding: 16,
  },
});
