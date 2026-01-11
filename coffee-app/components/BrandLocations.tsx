import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { View } from "react-native";
import { cn } from "../lib/utils";
import LocationList, { type LocationListItem } from "./LocationList";
import MapView from "./MapView";
import { Text } from "./ui/Text";

const brandLocationsVariants = cva("w-full", {
  variants: {
    layout: {
      list: "gap-3",
      split: "gap-4",
    },
  },
  defaultVariants: {
    layout: "list",
  },
});

export type BrandLocationsProps = React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof brandLocationsVariants> & {
    locations: LocationListItem[];
    mapMarkers?: Array<{ id: string; latitude: number; longitude: number; label?: string }>;
  };

const BrandLocations = React.forwardRef<
  React.ElementRef<typeof View>,
  BrandLocationsProps
>(({ className, layout, locations, mapMarkers, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn(brandLocationsVariants({ layout, className }))}
      {...props}
    >
      <Text className="text-sm font-semibold text-foreground">
        Where to find
      </Text>
      {layout === "split" && mapMarkers && mapMarkers.length > 0 ? (
        <MapView markers={mapMarkers} />
      ) : null}
      <LocationList locations={locations} />
    </View>
  );
});

BrandLocations.displayName = "BrandLocations";

export default BrandLocations;
export { brandLocationsVariants };
