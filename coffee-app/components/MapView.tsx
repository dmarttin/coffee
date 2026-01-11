import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { View } from "react-native";
import MapViewRN, {
  Marker,
  PROVIDER_GOOGLE,
  type MapViewProps as RNMapViewProps,
  type Region,
} from "react-native-maps";
import { cn } from "../lib/utils";
import LocationPin from "./LocationPin";

const mapViewVariants = cva(
  "w-full overflow-hidden rounded-xl border border-border",
  {
    variants: {
      size: {
        sm: "h-44",
        md: "h-56",
        lg: "h-72",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export type MapMarker = {
  id: string;
  latitude: number;
  longitude: number;
  label?: string;
};

export type MapViewProps = React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof mapViewVariants> & {
    markers?: MapMarker[];
    region?: Region;
    initialRegion?: Region;
    height?: number;
    mapProps?: Partial<RNMapViewProps>;
    onMarkerPress?: (marker: MapMarker) => void;
  };

const MapView = React.forwardRef<React.ElementRef<typeof View>, MapViewProps>(
  (
    {
      className,
      size,
      markers,
      region,
      initialRegion,
      height,
      mapProps,
      onMarkerPress,
      ...props
    },
    ref
  ) => {
    const resolvedRegion = React.useMemo(() => {
      if (region) return region;
      if (initialRegion) return initialRegion;
      if (!markers || markers.length === 0) return undefined;

      const latitudes = markers.map((marker) => marker.latitude);
      const longitudes = markers.map((marker) => marker.longitude);
      const centerLatitude =
        latitudes.reduce((sum, lat) => sum + lat, 0) / latitudes.length;
      const centerLongitude =
        longitudes.reduce((sum, lng) => sum + lng, 0) / longitudes.length;

      const latDelta = Math.max(...latitudes) - Math.min(...latitudes);
      const lngDelta = Math.max(...longitudes) - Math.min(...longitudes);

      return {
        latitude: centerLatitude,
        longitude: centerLongitude,
        latitudeDelta: latDelta * 1.5 || 0.02,
        longitudeDelta: lngDelta * 1.5 || 0.02,
      };
    }, [region, initialRegion, markers]);

    return (
      <View
        ref={ref}
        className={cn(mapViewVariants({ size, className }))}
        style={height ? { height } : undefined}
        {...props}
      >
        <MapViewRN
          provider={PROVIDER_GOOGLE}
          style={{ width: "100%", height: "100%" }}
          region={region}
          initialRegion={region ? undefined : resolvedRegion}
          {...mapProps}
        >
          {markers?.map((marker) => (
            <Marker
              key={marker.id}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              onPress={() => onMarkerPress?.(marker)}
            >
              <LocationPin variant="accent" />
            </Marker>
          ))}
        </MapViewRN>
      </View>
    );
  }
);

MapView.displayName = "MapView";

export default MapView;
export { mapViewVariants };
