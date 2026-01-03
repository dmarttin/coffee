import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function UserDetailScreen() {
  const { id } = useLocalSearchParams();

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        {/* User Avatar */}
        <View className="items-center mb-6">
          <View className="w-24 h-24 bg-amber-200 rounded-full items-center justify-center mb-3">
            <Text className="text-4xl">👤</Text>
          </View>
          <Text className="text-2xl font-bold text-gray-800">Username</Text>
          <Text className="text-gray-500">@username</Text>
        </View>

        {/* Stats */}
        <View className="flex-row justify-around mb-6 p-4 bg-gray-50 rounded-lg">
          <View className="items-center">
            <Text className="text-2xl font-bold text-amber-900">0</Text>
            <Text className="text-gray-600">Coffees</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-amber-900">0</Text>
            <Text className="text-gray-600">Reviews</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-amber-900">0</Text>
            <Text className="text-gray-600">Followers</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-amber-900">0</Text>
            <Text className="text-gray-600">Following</Text>
          </View>
        </View>

        {/* Bio */}
        <Text className="text-gray-600 text-center mb-6">
          User bio will be displayed here.
        </Text>

        {/* Follow Button */}
        <TouchableOpacity className="bg-amber-700 px-6 py-3 rounded-lg mb-6">
          <Text className="text-white font-semibold text-center">Follow</Text>
        </TouchableOpacity>

        {/* Recent Activity */}
        <Text className="text-xl font-bold text-gray-800 mb-3">
          Recent Activity
        </Text>
        <View className="p-6 bg-gray-50 rounded-lg">
          <Text className="text-gray-600 text-center">
            User's recent coffee ratings and reviews will appear here.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
