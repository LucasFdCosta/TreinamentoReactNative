import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeProvider } from 'styled-components';
import theme from './src/styles/theme'
import { useFonts } from 'expo-font';
import { Poppins_700Bold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import Home from './src/screens/Home';
import Detalhes from './src/screens/Detalhes';
import Routes from './src/routes';
import { AuthProvider, useAuth } from './src/hooks/auth';

export default function App() {
  
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular
  });

  if (!fontsLoaded) {
    return (
      <View/>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}