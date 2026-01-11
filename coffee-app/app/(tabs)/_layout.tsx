import { Tabs } from "expo-router";
import { Home, Search, ScanLine, User } from "lucide-react-native";
import { colors } from "../../lib/theme";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.accent.DEFAULT,
        tabBarInactiveTintColor: colors.coffee[400],
        tabBarStyle: {
          backgroundColor: colors.cream[50],
          borderTopWidth: 1,
          borderTopColor: colors.cream[200],
          paddingTop: 8,
          paddingBottom: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontFamily: "DMSans_500Medium",
          fontSize: 11,
          marginTop: 2,
        },
        headerStyle: {
          backgroundColor: colors.cream[50],
        },
        headerTitleStyle: {
          fontFamily: "Fraunces_600SemiBold",
          fontSize: 20,
          color: colors.coffee[900],
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Feed",
          tabBarIcon: ({ color, size }) => (
            <Home color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: "Discover",
          tabBarIcon: ({ color, size }) => (
            <Search color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: "Scan",
          tabBarIcon: ({ color, size }) => (
            <ScanLine color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <User color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
