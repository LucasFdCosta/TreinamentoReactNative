import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './src/styles/theme'
import { useFonts } from 'expo-font';
import { Poppins_700Bold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import Routes from './src/routes';
import SplashScreen from './src/screens/SplashScreen';
import { FavoriteProvider } from './src/hooks/favorite';

export default function App() {
  
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular
  });

  if (!fontsLoaded) {
    return (
      <SplashScreen/>
    );
  }

  return (
    <ThemeProvider theme={theme}>
        <FavoriteProvider>
          <Routes />
        </FavoriteProvider>
    </ThemeProvider>
  );
}