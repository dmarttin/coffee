import { View, Text, TouchableOpacity } from "react-native";

interface RatingStarsProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  size?: "sm" | "md" | "lg";
  showNumber?: boolean;
  interactive?: boolean;
}

export default function RatingStars({
  rating,
  onRatingChange,
  size = "md",
  showNumber = false,
  interactive = false,
}: RatingStarsProps) {
  const stars = [1, 2, 3, 4, 5];

  const sizeClasses = {
    sm: "text-base",
    md: "text-2xl",
    lg: "text-4xl",
  };

  const handlePress = (value: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(value);
    }
  };

  return (
    <View className="flex-row items-center">
      {stars.map((star) => {
        const filled = star <= Math.round(rating);
        const StarComponent = interactive ? TouchableOpacity : View;

        return (
          <StarComponent
            key={star}
            onPress={() => handlePress(star)}
            disabled={!interactive}
          >
            <Text className={`${sizeClasses[size]} ${filled ? "opacity-100" : "opacity-30"}`}>
              ⭐
            </Text>
          </StarComponent>
        );
      })}
      {showNumber && (
        <Text className="ml-2 text-gray-600 font-semibold">
          {rating.toFixed(1)}
        </Text>
      )}
    </View>
  );
}
