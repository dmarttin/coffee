import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { View, Platform } from "react-native";
import { cn } from "../../lib/utils";
import type { Location } from "../../types/location";

// Lazy load map implementations based on platform
const MapImplementation = Platform.select({
  native: () => require("./MapLibreView").default,
  web: () => require("./WebFallbackMap").default,
  default: () => require("./MapLibreView").default,
})();

const customMapVariants = cva(
  "w-full overflow-hidden rounded-xl border border-border",
  {
    variants: {
      variant: {
        compact: "h-44",
        full: "flex-1 min-h-[300px]",
      },
    },
    defaultVariants: {
      variant: "full",
    },
  }
);

export type CustomMapProps = React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof customMapVariants> & {
    markers: Location[];
    selectedId?: string;
    onSelect?: (id: string) => void;
    center?: { lat: number; lng: number };
    zoom?: number;
    showUserLocation?: boolean;
    onMarkerPress?: (location: Location) => void;
  };

const CustomMap = React.forwardRef<React.ElementRef<typeof View>, CustomMapProps>(
  (
    {
      className,
      variant,
      markers,
      selectedId,
      onSelect,
      center,
      zoom = 13,
      showUserLocation = false,
      onMarkerPress,
      ...props
    },
    ref
  ) => {
    return (
      <View
        ref={ref}
        className={cn(customMapVariants({ variant }), className)}
        {...props}
      >
        <MapImplementation
          markers={markers}
          selectedId={selectedId}
          onSelect={onSelect}
          center={center}
          zoom={zoom}
          showUserLocation={showUserLocation}
          onMarkerPress={onMarkerPress}
        />
      </View>
    );
  }
);

CustomMap.displayName = "CustomMap";

export default CustomMap;
export { customMapVariants };
export type { Location } from "../../types/location";
