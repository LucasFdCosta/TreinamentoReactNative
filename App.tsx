import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './src/styles/theme'
import { useFonts } from 'expo-font';
import { Poppins_700Bold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import Routes from './src/routes';
import { AuthProvider } from './src/hooks/auth';
import SplashScreen from './src/screens/SplashScreen';

export default function App() {
  
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular
  });

  const [teste, setTeste] = useState(false);

  function alteraState() {
    setTimeout(() => {
      setTeste(true)
    }, 7000);
  }

  useEffect(() => {
    alteraState()
  }, [])

  if (!fontsLoaded || !teste) {
    return (
      <SplashScreen/>
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