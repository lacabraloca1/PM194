import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button ,TextInput , Alert , ScrollView } from 'react-native';
import React, { useState } from 'react';

export default function App() {
  const [nombre , setNombre] = useState('');
  const [password , setPassword] = useState('');
  const [comments, setComments] = useState('');
  const [showComments, setShowComments] = useState('')
  const [Age , setAge] = useState('');

  const showAlert = () => {
    if (nombre.trim() === '' || password.trim() === '' || Age.trim() === '') {
      window.alert('Por favor, completa todos los campos.');
    }
    else {
      window.alert(
        `Nombre: ${nombre}\nContraseña: ${password}\nEdad: ${Age}\nComentarios: ${comments}`
      );
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Nombre (normal):</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe tu nombre"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.title}>Contraseña (oculta):</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe tu contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <Text style={styles.title}>Edad:</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe tu edad"
        value={Age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      <Text style={styles.title}>Comentarios Multilinea:</Text>
      <TextInput
        style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
        placeholder="Escribe tus comentarios"
        value={comments}
        onChangeText={setComments}
        multiline={true}
        numberOfLines={4}
      />

      <Text style={styles.title}>Campo solo lectura:</Text>
      <TextInput
        style={styles.input}
        value="Este campo es de solo lectura"
        editable={false}
      />

      <Button title="Mostrar alerta" onPress={showAlert} />
    </ScrollView> 
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 17,
    color: '#333',
    marginBottom: 6,
    alignSelf: 'flex-start',
  },
  input: {
    height: 44,
    borderColor: '#bbb',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    width: '100%',
    fontSize: 15,
  },
});
