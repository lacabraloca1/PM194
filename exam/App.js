import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import HomeScreen from "./screens/HomeScreen";
import DetailScreen from "./screens/DetailScreen";

const Stack = createNativeStackNavigator();

const temaClaro = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3E64FF",
    background: "#fafafa",
    surface: "#ffffff",
    text: "#222222",
  },
};

export default function App() {
  return (
    <PaperProvider theme={temaClaro}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Inicio" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Detalle" component={DetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
