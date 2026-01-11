import * as React from "react";
import { StyleSheet, View } from "react-native";
import MapLibre, {
  MapView,
  Camera,
  PointAnnotation,
  UserLocation,
} from "@maplibre/maplibre-react-native";
import type { Location } from "../../types/location";
import { MAPLIBRE_STYLE_JSON } from "../../lib/maplibre";
import MapMarker from "./MapMarker";
import MarkerCallout from "./MarkerCallout";

interface MapLibreViewProps {
  markers: Location[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  center?: { lat: number; lng: number };
  zoom?: number;
  showUserLocation?: boolean;
  onMarkerPress?: (location: Location) => void;
}

export default function MapLibreViewComponent({
  markers,
  selectedId,
  onSelect,
  center,
  zoom = 13,
  showUserLocation = false,
  onMarkerPress,
}: MapLibreViewProps) {
  const [activeMarker, setActiveMarker] = React.useState<string | null>(
    selectedId || null
  );

  React.useEffect(() => {
    setActiveMarker(selectedId || null);
  }, [selectedId]);

  const handleMarkerPress = React.useCallback(
    (location: Location) => {
      setActiveMarker(location.id);
      onSelect?.(location.id);
      onMarkerPress?.(location);
    },
    [onSelect, onMarkerPress]
  );

  const cameraCenter = React.useMemo(() => {
    if (center) {
      return [center.lng, center.lat];
    }
    if (markers.length > 0) {
      const avgLat =
        markers.reduce((sum, m) => sum + m.latitude, 0) / markers.length;
      const avgLng =
        markers.reduce((sum, m) => sum + m.longitude, 0) / markers.length;
      return [avgLng, avgLat];
    }
    // Default: Barcelona
    return [2.1686, 41.3874];
  }, [center, markers]);

  return (
    <MapView
      style={styles.map}
      styleJSON={JSON.stringify(MAPLIBRE_STYLE_JSON)}
    >
      <Camera
        zoomLevel={zoom}
        centerCoordinate={cameraCenter as [number, number]}
        animationMode="flyTo"
        animationDuration={500}
      />

      {showUserLocation && <UserLocation visible animated />}

      {markers.map((location) => (
        <PointAnnotation
          key={location.id}
          id={location.id}
          coordinate={[location.longitude, location.latitude]}
          onSelected={() => handleMarkerPress(location)}
        >
          <MapMarker
            type={location.type}
            isSelected={activeMarker === location.id}
            isOpen={location.isOpen}
          />
          {activeMarker === location.id ? (
            <MapLibre.Callout title="">
              <MarkerCallout location={location} />
            </MapLibre.Callout>
          ) : (
            <View />
          )}
        </PointAnnotation>
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
