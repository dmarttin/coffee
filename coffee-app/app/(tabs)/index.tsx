import { View, FlatList, RefreshControl, ActivityIndicator } from "react-native";
import { useMemo, useState } from "react";
import { useRouter } from "expo-router";
import { useCoffees } from "../../lib/queries";
import CoffeeCard from "../../components/CoffeeCard";
import CaptureButton from "../../components/CaptureButton";
import FilterBar, { type FilterOption } from "../../components/FilterBar";
import SortDropdown from "../../components/SortDropdown";
import { Text } from "../../components/ui/Text";

type CoffeeWithRoaster = {
  id: string;
  name: string;
  origin: string | null;
  region: string | null;
  process: string | null;
  roast_level: string | null;
  tasting_notes: string[] | null;
  bag_image_url: string | null;
  roasters: {
    name: string;
    logo_url: string | null;
  } | null;
};

export default function HomeScreen() {
  const router = useRouter();
  const { data: coffees, isLoading, refetch } = useCoffees();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedOrigin, setSelectedOrigin] = useState<string | null>(null);
  const [sortValue, setSortValue] = useState("recent");

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color="hsl(24, 87%, 41%)" />
        <Text className="mt-2 text-muted-foreground">Loading coffees...</Text>
      </View>
    );
  }

  if (!coffees || coffees.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-background p-8">
        <View className="w-20 h-20 rounded-full bg-secondary items-center justify-center mb-4">
          <View className="w-10 h-10 rounded-full bg-muted-foreground/50" />
        </View>
        <Text className="text-xl font-semibold text-foreground mb-2">
          No coffees yet
        </Text>
        <Text className="text-muted-foreground text-center">
          The coffee database is empty. Check out the Discover tab to start
          exploring!
        </Text>
      </View>
    );
  }

  const origins = useMemo(() => {
    const values = (coffees as CoffeeWithRoaster[])
      .map((coffee) => coffee.origin)
      .filter(Boolean) as string[];
    return Array.from(new Set(values)).sort();
  }, [coffees]);

  const filterOptions: FilterOption[] = [
    {
      id: "all",
      label: "All",
      selected: selectedOrigin === null,
      onPress: () => setSelectedOrigin(null),
    },
    ...origins.map((origin) => ({
      id: origin,
      label: origin,
      selected: selectedOrigin === origin,
      onPress: () => setSelectedOrigin(origin),
    })),
  ];

  const filteredCoffees = useMemo(() => {
    if (!selectedOrigin) return coffees as CoffeeWithRoaster[];
    return (coffees as CoffeeWithRoaster[]).filter(
      (coffee) => coffee.origin === selectedOrigin
    );
  }, [coffees, selectedOrigin]);

  const sortedCoffees = useMemo(() => {
    const data = [...filteredCoffees];
    if (sortValue === "name-asc") {
      return data.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sortValue === "name-desc") {
      return data.sort((a, b) => b.name.localeCompare(a.name));
    }
    return data;
  }, [filteredCoffees, sortValue]);

  return (
    <View className="flex-1 bg-background">
      <FlatList
        data={sortedCoffees}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="hsl(24, 87%, 41%)"
          />
        }
        ListHeaderComponent={
          <View className="mb-4">
            <Text className="text-2xl font-bold text-foreground mb-2">
              Coffee Feed
            </Text>
            <Text className="text-muted-foreground">
              Discover the latest coffees from our community
            </Text>
            <View className="mt-4 gap-3">
              <SortDropdown
                label="Sort by"
                value={sortValue}
                onValueChange={setSortValue}
                options={[
                  { label: "Newest", value: "recent" },
                  { label: "Name A-Z", value: "name-asc" },
                  { label: "Name Z-A", value: "name-desc" },
                ]}
              />
              <FilterBar
                filters={filterOptions}
                onClear={() => setSelectedOrigin(null)}
              />
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <CoffeeCard
            id={item.id}
            name={item.name}
            roasterName={item.roasters?.name || "Unknown Roaster"}
            roasterLogoUrl={item.roasters?.logo_url || undefined}
            origin={item.origin || undefined}
            process={item.process || undefined}
            bagImageUrl={item.bag_image_url || undefined}
            tastingNotes={item.tasting_notes || undefined}
          />
        )}
      />
      <View className="absolute bottom-8 right-6">
        <CaptureButton
          size="lg"
          onPress={() => router.push("/(tabs)/scan")}
          label="Scan"
        />
      </View>
    </View>
  );
}
