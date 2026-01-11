import * as React from "react";
import { View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { ChevronRight, MapPin } from "lucide-react-native";
import { Text } from "./ui/Text";
import { Icon } from "./ui/Icon";
import CustomMap from "./CustomMap";
import LocationCard from "./LocationCard";
import type { Location } from "../types/location";

interface WhereToFindPreviewProps {
  coffeeId: string;
  coffeeName: string;
  locations: Location[];
  maxVisible?: number;
}

export default function WhereToFindPreview({
  coffeeId,
  coffeeName,
  locations,
  maxVisible = 2,
}: WhereToFindPreviewProps) {
  const router = useRouter();
  const [selectedId, setSelectedId] = React.useState<string | undefined>();

  const visibleLocations = locations.slice(0, maxVisible);
  const remainingCount = locations.length - maxVisible;

  const handleViewAll = () => {
    router.push(`/where-to-find?coffeeId=${coffeeId}`);
  };

  const handleLocationPress = (location: Location) => {
    setSelectedId(location.id);
  };

  if (locations.length === 0) {
    return null;
  }

  return (
    <View className="mt-6">
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center gap-2">
          <Icon icon={MapPin} tone="muted" iconSize={18} />
          <Text className="text-lg font-semibold text-foreground">
            Where to find
          </Text>
        </View>
        <Pressable
          onPress={handleViewAll}
          className="flex-row items-center gap-1"
        >
          <Text className="text-sm text-primary font-medium">
            View all ({locations.length})
          </Text>
          <Icon icon={ChevronRight} tone="accent" iconSize={16} />
        </Pressable>
      </View>

      <CustomMap
        variant="compact"
        markers={locations}
        selectedId={selectedId}
        onSelect={setSelectedId}
        zoom={12}
      />

      <View className="mt-3 gap-2">
        {visibleLocations.map((location) => (
          <LocationCard
            key={location.id}
            name={location.name}
            address={location.address}
            city={location.city}
            distance={location.distance}
            isOpen={location.isOpen}
            isPrimary={location.isPrimary}
            onPress={() => handleLocationPress(location)}
            density="tight"
            className={selectedId === location.id ? "border-2 border-primary" : ""}
          />
        ))}

        {remainingCount > 0 && (
          <Pressable
            onPress={handleViewAll}
            className="py-3 items-center border border-border rounded-lg bg-secondary/50"
          >
            <Text className="text-sm text-muted-foreground">
              +{remainingCount} more location{remainingCount > 1 ? "s" : ""}
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
