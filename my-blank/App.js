// * Zona 1: importaciones
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Button } from 'react-native';

const Texto = (props) => {
  const {contenido}= props;
  // * Zona 1.1: Componente de Texto
  return (
    <Text>
      {contenido}
    </Text>
  );
}

// * Zona 2: Zona de Main
export default function App() {
  return (
    <View style={styles.container}>
      <Texto contenido="Hola" />
      <Texto contenido="mundo" />
      <Texto contenido="React Native" />
      <Button title="Tlabaja" onPress={() => alert('Tlabaja tines que tlabajar')} />
      <StatusBar style="auto" />
    </View>
  );
}

// * Zona 3: Zona de estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
