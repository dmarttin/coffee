import { View, Text, ScrollView } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        <Text className="text-2xl font-bold text-gray-800 mb-4">
          Coffee Feed
        </Text>
        <Text className="text-gray-600">
          Welcome to Coffee Discovery! Your feed will show recent coffee
          ratings and reviews from the community.
        </Text>
        <View className="mt-6 p-4 bg-amber-50 rounded-lg">
          <Text className="text-lg font-semibold text-amber-900 mb-2">
            Coming Soon
          </Text>
          <Text className="text-amber-800">
            • Recent coffee ratings from people you follow
          </Text>
          <Text className="text-amber-800">
            • New coffee releases from favorite roasters
          </Text>
          <Text className="text-amber-800">• Trending coffees</Text>
        </View>
      </View>
    </ScrollView>
  );
}
