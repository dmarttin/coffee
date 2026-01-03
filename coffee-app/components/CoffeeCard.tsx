import { View, Text, TouchableOpacity, Image } from "react-native";
import { Link } from "expo-router";
import RatingStars from "./RatingStars";

interface CoffeeCardProps {
  id: string;
  name: string;
  roasterName: string;
  roasterLogoUrl?: string;
  origin?: string;
  process?: string;
  bagImageUrl?: string;
  averageRating?: number;
  reviewCount?: number;
  tastingNotes?: string[];
}

export default function CoffeeCard({
  id,
  name,
  roasterName,
  roasterLogoUrl,
  origin,
  process,
  bagImageUrl,
  averageRating = 0,
  reviewCount = 0,
  tastingNotes = [],
}: CoffeeCardProps) {
  return (
    <Link href={`/coffee/${id}`} asChild>
      <TouchableOpacity className="bg-white rounded-lg shadow-sm border border-gray-200 mb-3 overflow-hidden">
        {/* Coffee Image */}
        <View className="w-full h-48 bg-gray-200 items-center justify-center">
          {bagImageUrl ? (
            <Image
              source={{ uri: bagImageUrl }}
              className="w-full h-full"
              resizeMode="cover"
            />
          ) : (
            <Text className="text-6xl">📷</Text>
          )}
        </View>

        {/* Content */}
        <View className="p-4">
          {/* Coffee Name */}
          <Text className="text-xl font-bold text-gray-800 mb-1" numberOfLines={1}>
            {name}
          </Text>

          {/* Roaster */}
          <View className="flex-row items-center mb-2">
            {roasterLogoUrl && (
              <Image
                source={{ uri: roasterLogoUrl }}
                className="w-5 h-5 rounded-full mr-2"
              />
            )}
            <Text className="text-amber-700 font-medium">{roasterName}</Text>
          </View>

          {/* Origin & Process */}
          {(origin || process) && (
            <Text className="text-sm text-gray-600 mb-2">
              {[origin, process].filter(Boolean).join(" • ")}
            </Text>
          )}

          {/* Rating */}
          {reviewCount > 0 && (
            <View className="flex-row items-center mb-3">
              <RatingStars rating={averageRating} size="sm" />
              <Text className="ml-2 text-sm text-gray-500">
                ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
              </Text>
            </View>
          )}

          {/* Tasting Notes */}
          {tastingNotes.length > 0 && (
            <View className="flex-row flex-wrap gap-1">
              {tastingNotes.slice(0, 3).map((note) => (
                <View key={note} className="bg-amber-50 px-2 py-1 rounded-full">
                  <Text className="text-xs text-amber-900">{note}</Text>
                </View>
              ))}
              {tastingNotes.length > 3 && (
                <View className="bg-amber-50 px-2 py-1 rounded-full">
                  <Text className="text-xs text-amber-900">
                    +{tastingNotes.length - 3}
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Link>
  );
}
