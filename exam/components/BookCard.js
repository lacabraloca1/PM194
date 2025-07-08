import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Card, Text } from "react-native-paper";

export default function BookCard({ item, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={styles.card}>
        <View style={styles.row}>
          <Image source={{ uri: item.imagen }} style={styles.imagen} />
          <View style={styles.info}>
            <Text style={styles.titulo}>{item.titulo}</Text>
            <Text style={styles.editorial}>{item.editorial}</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { marginVertical: 6, borderRadius: 10, padding: 8 },
  row: { flexDirection: "row" },
  imagen: { width: 80, height: 120, borderRadius: 6, marginRight: 10 },
  info: { flex: 1, justifyContent: "center" },
  titulo: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  editorial: { fontSize: 14, color: "#666" },
});
