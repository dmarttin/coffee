import * as React from "react";
import { View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { MapPin, ChevronRight } from "lucide-react-native";
import { Card } from "../ui/Card";
import { Text } from "../ui/Text";
import { Badge } from "../ui/Badge";
import { Icon } from "../ui/Icon";
import type { Location } from "../../types/location";

interface MarkerCalloutProps {
  location: Location;
  onPress?: () => void;
}

export default function MarkerCallout({ location, onPress }: MarkerCalloutProps) {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (location.roasterId) {
      router.push(`/roaster/${location.roasterId}`);
    }
  };

  return (
    <Pressable onPress={handlePress}>
      <Card className="p-3 min-w-[200px] max-w-[280px] shadow-lg">
        <View className="flex-row items-start justify-between">
          <View className="flex-1 pr-2">
            <Text
              className="text-sm font-semibold text-foreground"
              numberOfLines={1}
            >
              {location.name}
            </Text>
            <View className="flex-row items-center mt-1 gap-1">
              <Icon icon={MapPin} tone="muted" iconSize={12} />
              <Text
                className="text-xs text-muted-foreground flex-1"
                numberOfLines={1}
              >
                {location.address}
              </Text>
            </View>
          </View>
          <Icon icon={ChevronRight} tone="muted" iconSize={16} />
        </View>

        <View className="flex-row items-center gap-2 mt-2">
          {typeof location.isOpen === "boolean" && (
            <Badge variant={location.isOpen ? "green" : "outline"} size="sm">
              <Text>{location.isOpen ? "Open" : "Closed"}</Text>
            </Badge>
          )}
          {location.isPrimary && (
            <Badge variant="yellow" size="sm">
              <Text>Main</Text>
            </Badge>
          )}
          {location.distance && (
            <Text className="text-xs text-muted-foreground">
              {location.distance}
            </Text>
          )}
        </View>
      </Card>
    </Pressable>
  );
}
