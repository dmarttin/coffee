import { View, Text, ScrollView, TouchableOpacity } from "react-native";

export default function ProfileScreen() {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        {/* Profile Header */}
        <View className="items-center mb-6">
          <View className="w-24 h-24 bg-amber-200 rounded-full items-center justify-center mb-3">
            <Text className="text-4xl">☕</Text>
          </View>
          <Text className="text-2xl font-bold text-gray-800">Guest User</Text>
          <Text className="text-gray-500">@guest</Text>
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
            <Text className="text-gray-600">Favorites</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="gap-3">
          <TouchableOpacity className="bg-amber-700 px-6 py-3 rounded-lg">
            <Text className="text-white font-semibold text-center">
              Sign In
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-gray-200 px-6 py-3 rounded-lg">
            <Text className="text-gray-800 font-semibold text-center">
              Create Account
            </Text>
          </TouchableOpacity>
        </View>

        {/* Coffee Journal Preview */}
        <View className="mt-6">
          <Text className="text-xl font-bold text-gray-800 mb-3">
            My Coffee Journal
          </Text>
          <View className="p-6 bg-gray-50 rounded-lg">
            <Text className="text-gray-600 text-center">
              Your rated coffees and favorites will appear here.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
