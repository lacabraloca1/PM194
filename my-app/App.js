import * as SpalshScreen from 'expo-splash-screen';
import { ImageBackground } from 'react-native';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

SpalshScreen.preventAutoHideAsync();

export default function App() {
  const [appRead,setAppReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAppReady(true);
      SpalshScreen.hideAsync();
    },2000);
  }, []);

  return(
    <ImageBackground source={require('./assets/splash.png')}
    style={styles.background}
    resizeMode='cover'>
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenido a mi app</Text>
        <Text style={styles.subtitle}>
          {appRead ? 'La app ya está lista' : 'Cargando...'}
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: 'white',
    fontSize: 18,
  }
});
