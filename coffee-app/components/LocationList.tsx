import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { View } from "react-native";
import { cn } from "../lib/utils";
import LocationCard from "./LocationCard";
import { Text } from "./ui/Text";

const locationListVariants = cva("w-full", {
  variants: {
    density: {
      cozy: "gap-3",
      tight: "gap-2",
    },
  },
  defaultVariants: {
    density: "cozy",
  },
});

export type LocationListItem = {
  id: string;
  name: string;
  address?: string;
  city?: string;
  distance?: string;
  isOpen?: boolean;
  isPrimary?: boolean;
};

export type LocationListProps = React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof locationListVariants> & {
    locations: LocationListItem[];
    onSelect?: (location: LocationListItem) => void;
  };

const LocationList = React.forwardRef<
  React.ElementRef<typeof View>,
  LocationListProps
>(({ className, density, locations, onSelect, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn(locationListVariants({ density, className }))}
      {...props}
    >
      {locations.length === 0 ? (
        <Text className="text-sm text-muted-foreground">
          No locations available.
        </Text>
      ) : (
        locations.map((location) => (
          <LocationCard
            key={location.id}
            name={location.name}
            address={location.address}
            city={location.city}
            distance={location.distance}
            isOpen={location.isOpen}
            isPrimary={location.isPrimary}
            onPress={() => onSelect?.(location)}
          />
        ))
      )}
    </View>
  );
});

LocationList.displayName = "LocationList";

export default LocationList;
export { locationListVariants };
