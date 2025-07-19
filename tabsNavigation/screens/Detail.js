// screens/Detail.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Detail() {
  return (
    <View style={styles.container}>
      <Ionicons name="information-circle-outline" size={28} color="purple" />
      <Text style={styles.title}>Detalles Usuario</Text>
      <Text style={styles.subtitle}>Usando navegación Stack</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center'
  },
  title: {
    fontSize: 22, fontWeight: 'bold', marginTop: 10, color: 'purple'
  },
  subtitle: {
    fontSize: 16, marginTop: 5
  }
});
