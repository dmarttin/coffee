import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function RoasterDetailScreen() {
  const { id } = useLocalSearchParams();

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        {/* Roaster Logo */}
        <View className="w-32 h-32 bg-gray-200 rounded-full items-center justify-center mb-4 self-center">
          <Text className="text-6xl">☕</Text>
        </View>

        {/* Roaster Name */}
        <Text className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Roaster Name
        </Text>
        <Text className="text-gray-600 text-center mb-4">Location</Text>

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
        </View>

        {/* About */}
        <Text className="text-xl font-bold text-gray-800 mb-3">About</Text>
        <Text className="text-gray-600 mb-6">
          Roaster description and story will be displayed here.
        </Text>

        {/* Action Buttons */}
        <View className="flex-row gap-3 mb-6">
          <TouchableOpacity className="flex-1 bg-amber-700 px-6 py-3 rounded-lg">
            <Text className="text-white font-semibold text-center">
              Follow
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-gray-200 px-6 py-3 rounded-lg">
            <Text className="text-gray-800 font-semibold text-center">
              Visit Website
            </Text>
          </TouchableOpacity>
        </View>

        {/* Coffee Catalog */}
        <Text className="text-xl font-bold text-gray-800 mb-3">
          Coffee Catalog
        </Text>
        <View className="p-6 bg-gray-50 rounded-lg">
          <Text className="text-gray-600 text-center">
            Roaster's coffee catalog will be displayed here.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
