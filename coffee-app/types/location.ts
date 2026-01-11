export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  country?: string;
  latitude: number;
  longitude: number;
  type: "cafe" | "roastery" | "shop";
  isOpen?: boolean;
  isPrimary?: boolean;
  distance?: string;
  coffeeIds?: string[];
  roasterId?: string;
  phone?: string;
  website?: string;
  hours?: {
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
  };
}

export interface MapRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface MapCenter {
  lat: number;
  lng: number;
}

export type LocationType = Location["type"];

export type LocationFilterParams = {
  city?: string;
  type?: LocationType;
  search?: string;
  coffeeId?: string;
};
