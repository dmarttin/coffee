import { View, Text, TouchableOpacity } from "react-native";

interface RatingStarsProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  size?: "sm" | "md" | "lg";
  showNumber?: boolean;
  interactive?: boolean;
}

const starSizes = {
  sm: { size: 14, gap: 2 },
  md: { size: 20, gap: 3 },
  lg: { size: 28, gap: 4 },
};

function Star({ filled, size }: { filled: boolean; size: number }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        marginRight: 2,
      }}
    >
      <View
        style={{
          width: size,
          height: size,
          backgroundColor: filled ? "#D0A215" : "#CECDC3",
          transform: [{ rotate: "45deg" }],
          borderRadius: 2,
        }}
      />
    </View>
  );
}

export default function RatingStars({
  rating,
  onRatingChange,
  size = "md",
  showNumber = false,
  interactive = false,
}: RatingStarsProps) {
  const stars = [1, 2, 3, 4, 5];
  const { size: starSize } = starSizes[size];

  const handlePress = (value: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(value);
    }
  };

  return (
    <View className="flex-row items-center">
      {stars.map((star) => {
        const filled = star <= Math.round(rating);

        if (interactive) {
          return (
            <TouchableOpacity key={star} onPress={() => handlePress(star)}>
              <Star filled={filled} size={starSize} />
            </TouchableOpacity>
          );
        }

        return <Star key={star} filled={filled} size={starSize} />;
      })}
      {showNumber && (
        <Text className="ml-2 text-flexoki-base-600 font-semibold">
          {rating.toFixed(1)}
        </Text>
      )}
    </View>
  );
}
