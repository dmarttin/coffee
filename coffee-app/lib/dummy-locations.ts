import type { Location } from "../types/location";

export const DUMMY_LOCATIONS: Location[] = [
  {
    id: "loc-1",
    name: "Nomad Coffee Lab",
    address: "Passatge Sert 12",
    city: "Barcelona",
    country: "Spain",
    latitude: 41.3921,
    longitude: 2.1649,
    type: "roastery",
    isOpen: true,
    isPrimary: true,
    roasterId: "nomad-1",
    distance: "0.3 km",
  },
  {
    id: "loc-2",
    name: "Nomad Coffee - Eixample",
    address: "Carrer de Consell de Cent 413",
    city: "Barcelona",
    country: "Spain",
    latitude: 41.3897,
    longitude: 2.1623,
    type: "cafe",
    isOpen: true,
    isPrimary: false,
    roasterId: "nomad-1",
    distance: "0.8 km",
  },
  {
    id: "loc-3",
    name: "Satan's Coffee Corner",
    address: "Carrer de l'Arc de Sant Ramon del Call 11",
    city: "Barcelona",
    country: "Spain",
    latitude: 41.3833,
    longitude: 2.1767,
    type: "cafe",
    isOpen: false,
    isPrimary: true,
    roasterId: "satans-1",
    distance: "1.2 km",
  },
  {
    id: "loc-4",
    name: "Three Marks Coffee",
    address: "Carrer del Rec Comtal 20",
    city: "Barcelona",
    country: "Spain",
    latitude: 41.3876,
    longitude: 2.1789,
    type: "cafe",
    isOpen: true,
    isPrimary: true,
    roasterId: "three-marks-1",
    distance: "1.5 km",
  },
  {
    id: "loc-5",
    name: "Skye Coffee Co.",
    address: "Carrer de Pujades 78",
    city: "Barcelona",
    country: "Spain",
    latitude: 41.3901,
    longitude: 2.1945,
    type: "roastery",
    isOpen: true,
    isPrimary: true,
    roasterId: "skye-1",
    distance: "2.1 km",
  },
];

export const DEFAULT_CENTER = {
  lat: 41.3874,
  lng: 2.1686,
};

export const DEFAULT_ZOOM = 13;

export function getLocationsByCity(city: string): Location[] {
  return DUMMY_LOCATIONS.filter(
    (loc) => loc.city.toLowerCase() === city.toLowerCase()
  );
}

export function getLocationsByType(type: Location["type"]): Location[] {
  return DUMMY_LOCATIONS.filter((loc) => loc.type === type);
}

export function searchLocations(query: string): Location[] {
  const lowerQuery = query.toLowerCase();
  return DUMMY_LOCATIONS.filter(
    (loc) =>
      loc.name.toLowerCase().includes(lowerQuery) ||
      loc.address.toLowerCase().includes(lowerQuery) ||
      loc.city.toLowerCase().includes(lowerQuery)
  );
}
