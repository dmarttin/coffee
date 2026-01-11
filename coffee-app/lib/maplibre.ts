/**
 * MapLibre Configuration for Coffee App
 *
 * MapLibre is an open-source fork of Mapbox GL.
 * No API key required - uses free OpenFreeMap tiles.
 */

import MapLibre from "@maplibre/maplibre-react-native";
import { coffeeMapStyle } from "./map-style";

// No access token needed for MapLibre with OpenFreeMap tiles

export { MapLibre };

// Custom style with warm coffee-themed colors
export const MAPLIBRE_STYLE_JSON = coffeeMapStyle;

// Alternative: Use a remote style URL (uncomment if preferred)
// export const MAPLIBRE_STYLE_URL = "https://tiles.openfreemap.org/styles/liberty";
