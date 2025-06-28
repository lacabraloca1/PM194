import {View, Text, ActivityIndicator, Button ,StyleSheet} from 'react-native';
import React, { useState, useEffect } from 'react';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const simularCarga = () => {
    setLoading(true);
    setMessage('');
    setTimeout(() => {
      setLoading(false);
      setMessage('');
    }, 3000);
  }

  return (
    <View style={styles.container}>
      <Text>Carga</Text>
      {loading ? (
        <>
          <ActivityIndicator size="large" color="#CC6CE7"/>
          <Text style={styles.titulo}>CARGANDO...</Text>
        </>
      ) : (
        <>
          <Button title="Iniciar carga" onPress={simularCarga} />
          <Text style={styles.exito}>Carga completada</Text>
          {message ? <Text>{message}</Text> : null}
        </>
      )} 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  exito: {
    fontSize: 16,
    color: 'green',
    marginTop: 10,
  },
});

