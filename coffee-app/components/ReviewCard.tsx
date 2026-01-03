import { View, Text, Image } from "react-native";
import RatingStars from "./RatingStars";

interface ReviewCardProps {
  username: string;
  displayName?: string;
  avatarUrl?: string;
  rating: number;
  reviewText?: string;
  brewingMethod?: string;
  brewDate?: string;
  createdAt: string;
}

export default function ReviewCard({
  username,
  displayName,
  avatarUrl,
  rating,
  reviewText,
  brewingMethod,
  brewDate,
  createdAt,
}: ReviewCardProps) {
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <View className="bg-white border border-gray-200 rounded-lg p-4 mb-3">
      {/* User Info */}
      <View className="flex-row items-center mb-3">
        <View className="w-10 h-10 bg-amber-200 rounded-full items-center justify-center mr-3">
          {avatarUrl ? (
            <Image
              source={{ uri: avatarUrl }}
              className="w-full h-full rounded-full"
            />
          ) : (
            <Text className="text-lg">👤</Text>
          )}
        </View>
        <View className="flex-1">
          <Text className="font-semibold text-gray-800">
            {displayName || username}
          </Text>
          <Text className="text-sm text-gray-500">{formattedDate}</Text>
        </View>
      </View>

      {/* Rating */}
      <RatingStars rating={rating} size="sm" />

      {/* Review Text */}
      {reviewText && (
        <Text className="text-gray-700 mt-3 leading-relaxed">{reviewText}</Text>
      )}

      {/* Brewing Details */}
      {(brewingMethod || brewDate) && (
        <View className="flex-row flex-wrap gap-2 mt-3">
          {brewingMethod && (
            <View className="bg-gray-100 px-3 py-1 rounded-full">
              <Text className="text-xs text-gray-700">☕ {brewingMethod}</Text>
            </View>
          )}
          {brewDate && (
            <View className="bg-gray-100 px-3 py-1 rounded-full">
              <Text className="text-xs text-gray-700">
                📅 {new Date(brewDate).toLocaleDateString()}
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}
