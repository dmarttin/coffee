import {
  View,
  Text,
  ScrollView,
  TextInput,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useState } from "react";
import { useCoffees, useSearchCoffees } from "../../lib/queries";
import CoffeeCard from "../../components/CoffeeCard";

export default function DiscoverScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: allCoffees, isLoading: isLoadingAll } = useCoffees();
  const { data: searchResults, isLoading: isSearching } =
    useSearchCoffees(searchQuery);

  const coffees = searchQuery.length > 0 ? searchResults : allCoffees;
  const isLoading = searchQuery.length > 0 ? isSearching : isLoadingAll;

  return (
    <View className="flex-1 bg-white">
      <View className="p-4 bg-white border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-800 mb-4">
          Discover Coffees
        </Text>

        {/* Search Bar */}
        <TextInput
          className="bg-gray-100 px-4 py-3 rounded-lg mb-4"
          placeholder="Search coffees, roasters, origins..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {/* Filters Preview */}
        <View>
          <Text className="text-sm font-semibold text-gray-700 mb-2">
            Quick Filters:
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-2">
              <View className="bg-amber-100 px-3 py-1.5 rounded-full">
                <Text className="text-xs text-amber-900">Origin</Text>
              </View>
              <View className="bg-amber-100 px-3 py-1.5 rounded-full">
                <Text className="text-xs text-amber-900">Process</Text>
              </View>
              <View className="bg-amber-100 px-3 py-1.5 rounded-full">
                <Text className="text-xs text-amber-900">Roast Level</Text>
              </View>
              <View className="bg-amber-100 px-3 py-1.5 rounded-full">
                <Text className="text-xs text-amber-900">Tasting Notes</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>

      {/* Coffee List */}
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#8B4513" />
          <Text className="text-gray-500 mt-2">Loading coffees...</Text>
        </View>
      ) : coffees && coffees.length > 0 ? (
        <FlatList
          data={coffees}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <CoffeeCard
              id={item.id}
              name={item.name}
              roasterName={item.roasters?.name || "Unknown Roaster"}
              roasterLogoUrl={item.roasters?.logo_url || undefined}
              origin={item.origin || undefined}
              process={item.process || undefined}
              bagImageUrl={item.bag_image_url || undefined}
              tastingNotes={item.tasting_notes || undefined}
            />
          )}
        />
      ) : (
        <View className="flex-1 items-center justify-center p-8">
          <Text className="text-6xl mb-4">☕</Text>
          <Text className="text-xl font-semibold text-gray-800 mb-2">
            No coffees found
          </Text>
          <Text className="text-gray-500 text-center">
            {searchQuery
              ? "Try adjusting your search terms"
              : "The coffee database is empty. Add some coffees to get started!"}
          </Text>
        </View>
      )}
    </View>
  );
}
