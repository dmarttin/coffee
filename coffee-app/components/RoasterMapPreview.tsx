import { View, Text, Image } from "react-native";

interface RoasterMapPreviewProps {
  location: string;
  mapImageUrl?: string;
}

export default function RoasterMapPreview({
  location,
  mapImageUrl,
}: RoasterMapPreviewProps) {
  return (
    <View className="bg-[#FFFCF0] rounded-lg overflow-hidden border border-[#CECDC3]">
      {/* Location Header */}
      <View className="px-4 pt-3 pb-2">
        <Text className="text-sm text-[#878580]">Find the stores here:</Text>
      </View>

      {/* Map Preview */}
      <View className="w-full h-48 bg-[#E6E4D9] items-center justify-center">
        {mapImageUrl ? (
          <Image
            source={{ uri: mapImageUrl }}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <View className="items-center">
            <Text className="text-4xl mb-2">📍</Text>
            <Text className="text-[#6F6E69] font-semibold">{location}</Text>
          </View>
        )}
      </View>
    </View>
  );
}
