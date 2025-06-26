import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Button, ImageBackground , Switch} from 'react-native';

export default function App() {
  const [EstadoSwtich, setIsEnabled] = useState(false);
  const cambio =()=>setIsEnabled(previousState => !previousState);
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 2000);
  }, []);
  const [nombre, setNombre] = useState('');
  const [Email, setEmail] = useState('');
  const showAlert = () => {
    if (nombre.trim() === '' || Email.trim() === '') {
      alert('Por favor, completa todos los campos.');
    } else if (!EstadoSwtich) {
      alert('Debes aceptar los términos y condiciones para continuar.');
    } else {
      alert(  
        `Nombre: ${nombre}\nCorreo: ${Email}\nAceptaste los términos y condiciones: Sí`
      );
    }
  }
  return (
    <ImageBackground source={require('./assets/splash.png')}
        style={styles.background}
        resizeMode='cover'>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Nombre:</Text>
          <TextInput
                style={styles.input}
              placeholder="Escribe tu nombre"
              value={nombre}
              onChangeText={setNombre}
            />
          <Text style={styles.title}>Correo:</Text>
          <TextInput
                style={styles.input}
              placeholder="Escribe tu correo"
              value={Email}
              onChangeText={setEmail}
            />
          <Text style={styles.subtitle}>Acepto los términos y condiciones</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={EstadoSwtich ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={cambio}
            value={EstadoSwtich}
            require />
          <Button title="Registrarse" onPress={showAlert} />
        </ScrollView>
        <StatusBar style="auto" />
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
    fontSize: 15,
  },
});
