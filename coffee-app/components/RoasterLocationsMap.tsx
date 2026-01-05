import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";

type Location = {
  id: string;
  name: string | null;
  address: string;
  city: string | null;
  postal_code: string | null;
  latitude: number | null;
  longitude: number | null;
  opening_hours: string | null;
  is_primary: boolean | null;
};

type RoasterLocationsMapProps = {
  locations: Location[];
  roasterName?: string;
};

export default function RoasterLocationsMap({
  locations,
  roasterName,
}: RoasterLocationsMapProps) {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );

  if (!locations || locations.length === 0) {
    return (
      <View className="bg-[#FFFCF0] rounded-lg border border-[#CECDC3] p-4">
        <Text className="text-[#6F6E69] text-center">
          No locations available
        </Text>
      </View>
    );
  }

  // Filter locations that have coordinates
  const locationsWithCoords = locations.filter(
    (loc) => loc.latitude !== null && loc.longitude !== null
  );

  // If no locations have coordinates, show a list view instead
  if (locationsWithCoords.length === 0) {
    return (
      <View className="gap-3">
        {locations.map((location) => (
          <View
            key={location.id}
            className="bg-[#FFFCF0] rounded-lg border border-[#CECDC3] p-4"
          >
            {location.name && (
              <Text className="font-bold text-[#1C1B1A] mb-1">
                {location.name}
              </Text>
            )}
            <Text className="text-sm text-[#6F6E69] mb-1">
              {location.address}
            </Text>
            <Text className="text-sm text-[#6F6E69] mb-2">
              {location.postal_code} {location.city}
            </Text>
            {location.opening_hours && (
              <Text className="text-xs text-[#878580]">
                {location.opening_hours}
              </Text>
            )}
          </View>
        ))}
      </View>
    );
  }

  // Calculate region to show all markers
  const latitudes = locationsWithCoords.map((loc) => loc.latitude!);
  const longitudes = locationsWithCoords.map((loc) => loc.longitude!);

  const centerLatitude =
    latitudes.reduce((sum, lat) => sum + lat, 0) / latitudes.length;
  const centerLongitude =
    longitudes.reduce((sum, lng) => sum + lng, 0) / longitudes.length;

  const latDelta = Math.max(...latitudes) - Math.min(...latitudes);
  const lngDelta = Math.max(...longitudes) - Math.min(...longitudes);

  const region = {
    latitude: centerLatitude,
    longitude: centerLongitude,
    latitudeDelta: latDelta * 1.5 || 0.02, // Add padding and fallback for single location
    longitudeDelta: lngDelta * 1.5 || 0.02,
  };

  return (
    <>
      <View className="rounded-lg overflow-hidden border border-[#CECDC3]">
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={region}
          showsUserLocation={false}
          showsMyLocationButton={false}
          showsCompass={false}
        >
          {locationsWithCoords.map((location) => (
            <Marker
              key={location.id}
              coordinate={{
                latitude: location.latitude!,
                longitude: location.longitude!,
              }}
              onPress={() => setSelectedLocation(location)}
            >
              <View className="bg-white rounded-full p-3 shadow-lg border-2 border-[#BC5215]">
                <Ionicons name="cafe" size={20} color="#BC5215" />
              </View>
            </Marker>
          ))}
        </MapView>
      </View>

      {/* Location Details Modal */}
      <Modal
        visible={selectedLocation !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedLocation(null)}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-3xl p-6">
            {/* Header */}
            <View className="flex-row justify-between items-start mb-4">
              <View className="flex-1 mr-4">
                <Text className="text-2xl font-bold text-[#1C1B1A] mb-1">
                  {selectedLocation?.name || roasterName || "Coffee Shop"}
                </Text>
                {selectedLocation?.is_primary && (
                  <View className="bg-[#BC5215] px-2 py-1 rounded-full self-start">
                    <Text className="text-xs text-white font-semibold">
                      Main Location
                    </Text>
                  </View>
                )}
              </View>
              <TouchableOpacity
                onPress={() => setSelectedLocation(null)}
                className="p-2"
              >
                <Ionicons name="close" size={24} color="#6F6E69" />
              </TouchableOpacity>
            </View>

            {/* Address */}
            <View className="mb-4">
              <View className="flex-row items-start mb-3">
                <Ionicons
                  name="location"
                  size={20}
                  color="#BC5215"
                  style={{ marginRight: 12, marginTop: 2 }}
                />
                <View className="flex-1">
                  <Text className="text-[#1C1B1A] font-semibold mb-1">
                    Address
                  </Text>
                  <Text className="text-[#6F6E69]">
                    {selectedLocation?.address}
                  </Text>
                  <Text className="text-[#6F6E69]">
                    {selectedLocation?.postal_code} {selectedLocation?.city}
                  </Text>
                </View>
              </View>

              {/* Opening Hours */}
              {selectedLocation?.opening_hours && (
                <View className="flex-row items-start">
                  <Ionicons
                    name="time"
                    size={20}
                    color="#BC5215"
                    style={{ marginRight: 12, marginTop: 2 }}
                  />
                  <View className="flex-1">
                    <Text className="text-[#1C1B1A] font-semibold mb-1">
                      Opening Hours
                    </Text>
                    <Text className="text-[#6F6E69]">
                      {selectedLocation.opening_hours}
                    </Text>
                  </View>
                </View>
              )}
            </View>

            {/* Actions */}
            <View className="flex-row gap-3 mt-2">
              <TouchableOpacity className="flex-1 bg-[#BC5215] py-4 rounded-lg flex-row items-center justify-center">
                <Ionicons
                  name="navigate"
                  size={20}
                  color="white"
                  style={{ marginRight: 8 }}
                />
                <Text className="text-white font-bold">Get Directions</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 border border-[#BC5215] py-4 rounded-lg flex-row items-center justify-center">
                <Ionicons
                  name="call"
                  size={20}
                  color="#BC5215"
                  style={{ marginRight: 8 }}
                />
                <Text className="text-[#BC5215] font-bold">Call</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: 300,
  },
});
