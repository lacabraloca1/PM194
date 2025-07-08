import React from "react";
import { View, Image, ScrollView, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export default function DetailScreen({ route }) {
  const { libro } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: libro.imagen }} style={styles.imagen} />
      <View style={styles.content}>
        <Text style={styles.titulo}>{libro.titulo}</Text>
        <Text style={styles.editorial}>{libro.editorial}</Text>
        <Text>{libro.descripcion}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  imagen: { width: "100%", height: 250, resizeMode: "cover" },
  content: { padding: 16 },
  titulo: { fontSize: 20, fontWeight: "bold", marginBottom: 6 },
  editorial: { fontSize: 14, fontStyle: "italic", marginBottom: 10 },
});
