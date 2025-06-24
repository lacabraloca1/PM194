import * as SpalshScreen from 'expo-splash-screen';
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
