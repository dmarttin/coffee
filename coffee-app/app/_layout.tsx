import "../global.css";
import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";

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
        <Stack.Screen name="coffee/[id]" options={{ title: "Coffee Details", headerShown: false }} />
        <Stack.Screen name="roaster/[id]" options={{ title: "Roaster" }} />
        <Stack.Screen name="user/[id]" options={{ title: "Profile" }} />
      </Stack>
    </QueryClientProvider>
  );
}
