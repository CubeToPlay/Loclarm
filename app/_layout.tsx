import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { AppState, useColorScheme } from "react-native";

import { Stack } from "expo-router";
import { useFonts } from 'expo-font';

import * as SplashScreen from 'expo-splash-screen';

import { useEffect, useState } from 'react';
import Alarm from '@/src/Alarm';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, setLoaded] = useState(false);
  const colorScheme = useColorScheme();

  useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  async function load() {
    await Alarm.load();

    setLoaded(true);
  }

  useEffect(() => {
    load();
  }, [])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
