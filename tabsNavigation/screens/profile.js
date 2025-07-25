// screens/profile.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Profile({ navigation }) {
  return (
    <View style={styles.container}>
      <Ionicons name="person-outline" size={28} color="green" />
      <Text style={styles.title}>Perfil de usuario</Text>
      <Button
        title="Detalles de usuario"
        onPress={() => navigation.navigate('Detalle')}
        color="#28a745"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#fff',
    justifyContent: 'center', alignItems: 'center', padding: 20
  },
  title: {
    fontSize: 22, fontWeight: 'bold', marginVertical: 10, color: 'green'
  },
});
