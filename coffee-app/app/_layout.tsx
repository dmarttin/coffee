import "../global.css";
import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity, Share } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#f5f5f5",
          },
          headerTintColor: "#333",
          headerTitleStyle: {
            fontWeight: "600",
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
      </Stack>
    </QueryClientProvider>
  );
}
