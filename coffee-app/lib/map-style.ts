/**
 * Custom MapLibre Style for Coffee App
 *
 * Warm color palette based on theme.ts
 * Uses OpenFreeMap tiles (free, no API key required)
 */

import { colors } from "./theme";

// Map color palette derived from theme
const mapPalette = {
  // Background and terrain
  background: colors.cream[100], // #FAF8F5
  landuse: colors.cream[200], // #F5F1EB

  // Water - desaturated warm blue
  water: "#C5D4E8",
  waterOutline: "#A8BDD4",

  // Vegetation - soft olive greens
  park: "#D5E2C8",
  grass: "#DCE8D0",
  wood: "#C8DBBC",

  // Buildings - cream tones
  building: colors.cream[300], // #EBE5DB
  buildingOutline: colors.cream[400], // #DED5C7

  // Roads - warm visual hierarchy
  motorway: colors.accent.light, // #E8A878
  motorwayOutline: colors.accent.dark, // #9E4A1A
  primary: colors.coffee[200], // #D4C4B0
  secondary: colors.coffee[100], // #E6DDD3
  tertiary: colors.cream[200], // #F5F1EB
  minor: colors.cream[50], // #FDFCFA
  path: colors.cream[300], // #EBE5DB

  // Text - coffee hierarchy
  textPrimary: colors.coffee[700], // #4D3726
  textSecondary: colors.coffee[500], // #7D5A3C
  textTertiary: colors.coffee[400], // #9A7B5D
  textHalo: colors.cream[50], // #FDFCFA

  // Boundaries
  boundary: colors.coffee[300], // #B8A08A
  boundaryAdmin: colors.coffee[400], // #9A7B5D
};

export const coffeeMapStyle = {
  version: 8,
  name: "Coffee App Warm Style",
  glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
  sources: {
    openmaptiles: {
      type: "vector",
      url: "https://tiles.openfreemap.org/planet",
      maxzoom: 14,
    },
  },
  layers: [
    // === BACKGROUND ===
    {
      id: "background",
      type: "background",
      paint: {
        "background-color": mapPalette.background,
      },
    },

    // === LANDUSE ===
    {
      id: "landuse-residential",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landuse",
      filter: ["==", "class", "residential"],
      paint: {
        "fill-color": mapPalette.landuse,
        "fill-opacity": 0.6,
      },
    },
    {
      id: "park",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landuse",
      filter: ["in", "class", "park", "cemetery", "playground"],
      paint: {
        "fill-color": mapPalette.park,
        "fill-opacity": 0.8,
      },
    },
    {
      id: "grass",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landcover",
      filter: ["==", "class", "grass"],
      paint: {
        "fill-color": mapPalette.grass,
        "fill-opacity": 0.6,
      },
    },
    {
      id: "wood",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "landcover",
      filter: ["==", "class", "wood"],
      paint: {
        "fill-color": mapPalette.wood,
        "fill-opacity": 0.5,
      },
    },

    // === WATER ===
    {
      id: "water",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "water",
      paint: {
        "fill-color": mapPalette.water,
      },
    },
    {
      id: "waterway",
      type: "line",
      source: "openmaptiles",
      "source-layer": "waterway",
      paint: {
        "line-color": mapPalette.waterOutline,
        "line-width": ["interpolate", ["linear"], ["zoom"], 8, 0.5, 14, 2],
      },
    },

    // === BUILDINGS ===
    {
      id: "building",
      type: "fill",
      source: "openmaptiles",
      "source-layer": "building",
      minzoom: 13,
      paint: {
        "fill-color": mapPalette.building,
        "fill-opacity": ["interpolate", ["linear"], ["zoom"], 13, 0, 15, 0.8],
      },
    },
    {
      id: "building-outline",
      type: "line",
      source: "openmaptiles",
      "source-layer": "building",
      minzoom: 14,
      paint: {
        "line-color": mapPalette.buildingOutline,
        "line-width": 0.5,
      },
    },

    // === ROADS ===
    {
      id: "road-motorway",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: ["==", "class", "motorway"],
      paint: {
        "line-color": mapPalette.motorway,
        "line-width": ["interpolate", ["linear"], ["zoom"], 5, 1, 14, 6],
      },
    },
    {
      id: "road-primary",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: ["in", "class", "primary", "trunk"],
      paint: {
        "line-color": mapPalette.primary,
        "line-width": ["interpolate", ["linear"], ["zoom"], 8, 1, 14, 4],
      },
    },
    {
      id: "road-secondary",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: ["==", "class", "secondary"],
      paint: {
        "line-color": mapPalette.secondary,
        "line-width": ["interpolate", ["linear"], ["zoom"], 10, 0.5, 14, 3],
      },
    },
    {
      id: "road-tertiary",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: ["==", "class", "tertiary"],
      paint: {
        "line-color": mapPalette.tertiary,
        "line-width": ["interpolate", ["linear"], ["zoom"], 11, 0.3, 14, 2],
      },
    },
    {
      id: "road-minor",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: ["in", "class", "minor", "service"],
      minzoom: 12,
      paint: {
        "line-color": mapPalette.minor,
        "line-width": 1,
      },
    },
    {
      id: "road-path",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: ["==", "class", "path"],
      minzoom: 14,
      paint: {
        "line-color": mapPalette.path,
        "line-width": 1,
        "line-dasharray": [2, 2],
      },
    },

    // === BOUNDARIES ===
    {
      id: "boundary-admin",
      type: "line",
      source: "openmaptiles",
      "source-layer": "boundary",
      filter: [">=", "admin_level", 2],
      paint: {
        "line-color": mapPalette.boundary,
        "line-width": 1,
        "line-dasharray": [3, 2],
      },
    },

    // === LABELS ===
    {
      id: "place-city",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "place",
      filter: ["==", "class", "city"],
      layout: {
        "text-field": "{name:latin}",
        "text-font": ["Open Sans Bold"],
        "text-size": ["interpolate", ["linear"], ["zoom"], 4, 10, 10, 16],
      },
      paint: {
        "text-color": mapPalette.textPrimary,
        "text-halo-color": mapPalette.textHalo,
        "text-halo-width": 1.5,
      },
    },
    {
      id: "place-town",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "place",
      filter: ["==", "class", "town"],
      minzoom: 8,
      layout: {
        "text-field": "{name:latin}",
        "text-font": ["Open Sans Regular"],
        "text-size": 12,
      },
      paint: {
        "text-color": mapPalette.textSecondary,
        "text-halo-color": mapPalette.textHalo,
        "text-halo-width": 1,
      },
    },
    {
      id: "road-label",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "transportation_name",
      minzoom: 13,
      layout: {
        "text-field": "{name:latin}",
        "text-font": ["Open Sans Regular"],
        "text-size": 10,
        "symbol-placement": "line",
      },
      paint: {
        "text-color": mapPalette.textTertiary,
        "text-halo-color": mapPalette.textHalo,
        "text-halo-width": 1,
      },
    },
  ],
};

export type MapStyle = typeof coffeeMapStyle;
