import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Home from './src/Pages/Home/index.js';
import Buscar from './src/Pages/Buscar/index.js';
import Validar from './src/Pages/Validar/index';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Buscar" component={Buscar} />
          <Stack.Screen name="Validar" component={Validar} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}