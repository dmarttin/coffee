import { Tabs } from "expo-router";
import { View } from "react-native";

function FeedIcon({ focused }: { focused: boolean }) {
  return (
    <View
      style={{
        width: 24,
        height: 24,
        borderRadius: 4,
        backgroundColor: focused ? "#BC5215" : "#B7B5AC",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          width: 12,
          height: 8,
          borderRadius: 2,
          backgroundColor: focused ? "#FFFCF0" : "#6F6E69",
        }}
      />
    </View>
  );
}

function DiscoverIcon({ focused }: { focused: boolean }) {
  return (
    <View
      style={{
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 3,
        borderColor: focused ? "#BC5215" : "#B7B5AC",
      }}
    />
  );
}

function ScanIcon({ focused }: { focused: boolean }) {
  return (
    <View
      style={{
        width: 24,
        height: 24,
        borderRadius: 4,
        borderWidth: 3,
        borderColor: focused ? "#BC5215" : "#B7B5AC",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: focused ? "#BC5215" : "#B7B5AC",
        }}
      />
    </View>
  );
}

function ProfileIcon({ focused }: { focused: boolean }) {
  return (
    <View style={{ alignItems: "center" }}>
      <View
        style={{
          width: 12,
          height: 12,
          borderRadius: 6,
          backgroundColor: focused ? "#BC5215" : "#B7B5AC",
          marginBottom: 2,
        }}
      />
      <View
        style={{
          width: 20,
          height: 10,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          backgroundColor: focused ? "#BC5215" : "#B7B5AC",
        }}
      />
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#BC5215",
        tabBarInactiveTintColor: "#6F6E69",
        tabBarStyle: {
          backgroundColor: "#FFFCF0",
          borderTopWidth: 1,
          borderTopColor: "#CECDC3",
          paddingTop: 8,
          paddingBottom: 8,
          height: 60,
        },
        headerStyle: {
          backgroundColor: "#FFFCF0",
        },
        headerTitleStyle: {
          fontWeight: "600",
          fontSize: 20,
          color: "#1C1B1A",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Feed",
          tabBarIcon: ({ focused }) => <FeedIcon focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: "Discover",
          tabBarIcon: ({ focused }) => <DiscoverIcon focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: "Scan",
          tabBarIcon: ({ focused }) => <ScanIcon focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => <ProfileIcon focused={focused} />,
        }}
      />
    </Tabs>
  );
}
