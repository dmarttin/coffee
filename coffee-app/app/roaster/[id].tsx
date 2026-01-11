import { ScrollView, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { useRoaster, useRoasterCoffees } from "../../lib/queries";
import BrandHero from "../../components/BrandHero";
import BrandInfo from "../../components/BrandInfo";
import BrandLocations from "../../components/BrandLocations";
import BrandCoffees from "../../components/BrandCoffees";
import { Text } from "../../components/ui/Text";

export default function RoasterDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: roaster, isLoading } = useRoaster(id ?? "");
  const { data: roasterCoffees } = useRoasterCoffees(id ?? "");

  const foundedYear = roaster?.created_at
    ? new Date(roaster.created_at).getFullYear().toString()
    : undefined;

  const locations = useMemo(() => {
    if (!roaster?.location) return [];
    return [
      {
        id: "main",
        name: roaster.name,
        address: roaster.location,
      },
    ];
  }, [roaster]);

  const coffees = useMemo(() => {
    if (!roasterCoffees) return [];
    return roasterCoffees.map((coffee) => ({
      id: coffee.id,
      name: coffee.name,
      roasterName: roaster?.name || "Unknown Roaster",
      origin: coffee.origin || undefined,
      process: coffee.process || undefined,
      bagImageUrl: coffee.bag_image_url || undefined,
      tastingNotes: coffee.tasting_notes || undefined,
    }));
  }, [roasterCoffees, roaster]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Text className="text-muted-foreground">Loading roaster...</Text>
      </View>
    );
  }

  if (!roaster) {
    return (
      <View className="flex-1 items-center justify-center bg-background p-6">
        <Text className="text-lg font-semibold text-foreground">
          Roaster not found
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4 gap-6">
        <BrandHero
          name={roaster.name}
          logoUrl={roaster.logo_url || undefined}
          description={roaster.description || undefined}
          founded={foundedYear}
          location={roaster.location || undefined}
        />

        <BrandInfo
          founded={foundedYear}
          location={roaster.location || undefined}
          story={roaster.description || undefined}
        />

        <BrandLocations locations={locations} />

        <BrandCoffees coffees={coffees} />
      </View>
    </ScrollView>
  );
}
