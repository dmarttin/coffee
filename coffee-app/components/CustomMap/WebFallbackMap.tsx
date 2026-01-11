import * as React from "react";
import { View, Pressable, ScrollView } from "react-native";
import { MapPin } from "lucide-react-native";
import { Text } from "../ui/Text";
import { Icon } from "../ui/Icon";
import type { Location } from "../../types/location";

interface WebFallbackMapProps {
  markers: Location[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  center?: { lat: number; lng: number };
  zoom?: number;
}

export default function WebFallbackMap({
  markers,
  selectedId,
  onSelect,
}: WebFallbackMapProps) {
  return (
    <View className="flex-1 bg-secondary">
      <View className="flex-1 items-center justify-center p-4">
        <Icon icon={MapPin} tone="muted" iconSize={48} />
        <Text className="mt-2 text-muted-foreground text-center">
          Interactive map available on mobile
        </Text>
        <Text className="text-xs text-muted-foreground mt-1">
          {markers.length} location{markers.length !== 1 ? "s" : ""}
        </Text>
      </View>

      <ScrollView className="max-h-48 border-t border-border">
        {markers.map((location) => (
          <Pressable
            key={location.id}
            onPress={() => onSelect?.(location.id)}
            className={`p-3 border-b border-border ${
              selectedId === location.id ? "bg-primary/10" : ""
            }`}
          >
            <Text className="text-sm font-medium text-foreground">
              {location.name}
            </Text>
            <Text className="text-xs text-muted-foreground">
              {location.address}, {location.city}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
