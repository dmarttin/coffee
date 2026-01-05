import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import RatingStars from "./RatingStars";

interface CoffeeItem {
  id: string;
  name: string;
  roasterName: string;
  imageUrl?: string;
  rating: number;
  price?: string;
}

interface CoffeeCarouselProps {
  coffees: CoffeeItem[];
}

export default function CoffeeCarousel({ coffees }: CoffeeCarouselProps) {
  const router = useRouter();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="flex-row -mx-4"
      contentContainerStyle={{ paddingHorizontal: 16 }}
    >
      {coffees.map((coffee) => (
        <TouchableOpacity
          key={coffee.id}
          onPress={() => router.push(`/coffee/${coffee.id}`)}
          className="mr-4 w-40"
        >
          <View className="bg-[#FFFCF0] rounded-lg border border-[#CECDC3] overflow-hidden">
            {/* Coffee Image */}
            <View className="w-full h-48 bg-[#E6E4D9] items-center justify-center relative">
              {coffee.imageUrl ? (
                <Image
                  source={{ uri: coffee.imageUrl }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              ) : (
                <Text className="text-5xl">☕</Text>
              )}

              {/* Rating Badge - Positioned in top right */}
              <View className="absolute top-2 right-2 bg-white rounded-full px-3 py-2 shadow-md">
                <Text className="text-[#BC5215] font-bold text-base">
                  {coffee.rating.toFixed(1)}
                </Text>
              </View>
            </View>

            {/* Coffee Info */}
            <View className="p-3">
              <Text
                className="text-xs text-[#878580] uppercase mb-1"
                numberOfLines={1}
              >
                {coffee.roasterName}
              </Text>
              <Text
                className="text-sm font-semibold text-[#1C1B1A] mb-2"
                numberOfLines={2}
              >
                {coffee.name}
              </Text>

              <View className="flex-row items-center justify-between">
                <RatingStars rating={coffee.rating} size="sm" />
                {coffee.price && (
                  <Text className="text-sm font-bold text-[#1C1B1A]">
                    {coffee.price}
                  </Text>
                )}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
