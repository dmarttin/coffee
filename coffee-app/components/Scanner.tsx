import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CameraView, Camera } from "expo-camera";

interface ScannerProps {
  onScan?: (data: string) => void;
  onClose?: () => void;
}

export default function Scanner({ onScan, onClose }: ScannerProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    onScan?.(data);
  };

  if (hasPermission === null) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <Text className="text-white">Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View className="flex-1 bg-black items-center justify-center p-4">
        <Text className="text-white text-center mb-4">
          No access to camera. Please grant camera permission in settings.
        </Text>
        <TouchableOpacity className="bg-amber-700 px-6 py-3 rounded-lg" onPress={onClose}>
          <Text className="text-white font-semibold">Close</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <CameraView
        style={StyleSheet.absoluteFillObject}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "ean13", "ean8", "upc_a", "upc_e"],
        }}
      />

      {/* Overlay */}
      <View className="flex-1 items-center justify-center">
        <View className="border-2 border-white w-64 h-64 rounded-lg" />
        <Text className="text-white text-center mt-4 px-4">
          Align the barcode or QR code within the frame
        </Text>
      </View>

      {/* Actions */}
      <View className="absolute bottom-8 left-0 right-0 items-center">
        <View className="flex-row gap-3">
          <TouchableOpacity
            className="bg-white px-6 py-3 rounded-lg"
            onPress={onClose}
          >
            <Text className="text-gray-800 font-semibold">Cancel</Text>
          </TouchableOpacity>
          {scanned && (
            <TouchableOpacity
              className="bg-amber-700 px-6 py-3 rounded-lg"
              onPress={() => setScanned(false)}
            >
              <Text className="text-white font-semibold">Scan Again</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
