import "../global.css";
import { useEffect } from "react";
import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity, Share } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { fontAssets } from "../lib/fonts";
import { colors } from "../lib/theme";

// Keep splash screen visible while loading fonts
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(fontAssets);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Wait for fonts to load
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.cream[50],
          },
          headerTintColor: colors.coffee[900],
          headerTitleStyle: {
            fontFamily: "DMSans_600SemiBold",
          },
          contentStyle: {
            backgroundColor: colors.cream[50],
          },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="coffee/[id]"
          options={{
            title: "Coffee Details",
            headerShown: true,
            headerRight: () => (
              <TouchableOpacity
                onPress={async () => {
                  try {
                    await Share.share({
                      message: 'Check out this coffee!',
                    });
                  } catch (error) {
                    console.error('Share error:', error);
                  }
                }}
                style={{ marginRight: 16 }}
              >
                <Ionicons name="share-outline" size={24} color="#333" />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen name="roaster/[id]" options={{ title: "Roaster" }} />
        <Stack.Screen name="user/[id]" options={{ title: "Profile" }} />
        <Stack.Screen
          name="showcase"
          options={{
            title: "Design System",
            presentation: "modal",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="where-to-find"
          options={{
            title: "Where to Find",
            headerShown: false,
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
