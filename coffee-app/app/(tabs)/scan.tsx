import { View, Text, TouchableOpacity } from "react-native";

export default function ScanScreen() {
  return (
    <View className="flex-1 bg-black items-center justify-center">
      <View className="bg-white p-8 rounded-lg mx-4">
        <Text className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Coffee Scanner
        </Text>
        <Text className="text-gray-600 text-center mb-6">
          Use your camera to scan coffee bag labels and automatically extract
          information.
        </Text>
        <TouchableOpacity className="bg-amber-700 px-6 py-3 rounded-lg">
          <Text className="text-white font-semibold text-center">
            Open Camera
          </Text>
        </TouchableOpacity>
        <View className="mt-6 p-4 bg-gray-50 rounded-lg">
          <Text className="text-sm text-gray-600 mb-2">Features:</Text>
          <Text className="text-sm text-gray-500">• OCR text extraction</Text>
          <Text className="text-sm text-gray-500">• Barcode scanning</Text>
          <Text className="text-sm text-gray-500">
            • Auto-fill coffee details
          </Text>
        </View>
      </View>
    </View>
  );
}
