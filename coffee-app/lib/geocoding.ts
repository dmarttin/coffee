import * as Location from 'expo-location';

export async function geocodeAddress(address: string): Promise<{
  latitude: number;
  longitude: number;
} | null> {
  try {
    const results = await Location.geocodeAsync(address);
    if (results.length > 0) {
      return {
        latitude: results[0].latitude,
        longitude: results[0].longitude,
      };
    }
    return null;
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
}
