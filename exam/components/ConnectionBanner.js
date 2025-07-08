import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ConnectionBanner({ connected }) {
  if (connected) return null;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sin conexión a internet</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ff4444",
    padding: 8,
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
});
