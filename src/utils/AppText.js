import React from "react";
import { StyleSheet, Text } from "react-native";

export default function AppText({ style, children, ...rest }) {
  return (
      <Text style={[styles.text, style]} {...rest}>
        {children}
      </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#0f172a",
  },
});
