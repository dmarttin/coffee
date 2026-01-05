import { View, Text } from "react-native";

interface TasteSliderProps {
  leftLabel: string;
  rightLabel: string;
  value: number; // 0-100
}

export default function TasteSlider({
  leftLabel,
  rightLabel,
  value,
}: TasteSliderProps) {
  return (
    <View className="mb-4">
      {/* Labels */}
      <View className="flex-row justify-between mb-2">
        <Text className="text-sm text-gray-600">{leftLabel}</Text>
        <Text className="text-sm text-gray-600">{rightLabel}</Text>
      </View>

      {/* Slider Track */}
      <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <View
          className="h-full bg-[#BC5215] rounded-full"
          style={{ width: `${value}%` }}
        />
      </View>
    </View>
  );
}
