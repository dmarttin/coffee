import * as React from "react";
import {
  View,
  FlatList,
  Pressable,
  useWindowDimensions,
  TextInput,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowLeft,
  List,
  Map as MapIcon,
  X,
  Search,
  Filter,
} from "lucide-react-native";
import { Text } from "../components/ui/Text";
import { Button } from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";
import { Card } from "../components/ui/Card";
import CustomMap from "../components/CustomMap";
import LocationCard from "../components/LocationCard";
import { useLocations } from "../lib/queries";
import type { Location, LocationFilterParams, LocationType } from "../types/location";
import { colors } from "../lib/theme";

type ViewMode = "map" | "list" | "split";

type FilterChip = {
  id: string;
  label: string;
  selected: boolean;
  onPress: () => void;
};

function FilterChips({ filters }: { filters: FilterChip[] }) {
  return (
    <View className="flex-row flex-wrap gap-2">
      {filters.map((filter) => (
        <Pressable
          key={filter.id}
          onPress={filter.onPress}
          className={`px-3 py-1.5 rounded-full border ${
            filter.selected
              ? "bg-primary border-primary"
              : "bg-secondary border-border"
          }`}
        >
          <Text
            className={`text-xs font-medium ${
              filter.selected ? "text-primary-foreground" : "text-foreground"
            }`}
          >
            {filter.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

export default function WhereToFindPage() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const params = useLocalSearchParams<{
    coffeeId?: string;
    city?: string;
    type?: string;
    search?: string;
  }>();

  // Determine layout based on screen width
  const isWideScreen = width >= 768;
  const defaultViewMode: ViewMode = isWideScreen ? "split" : "map";

  // State
  const [viewMode, setViewMode] = React.useState<ViewMode>(defaultViewMode);
  const [selectedId, setSelectedId] = React.useState<string | undefined>();
  const [searchText, setSearchText] = React.useState(params.search || "");
  const [filters, setFilters] = React.useState<LocationFilterParams>({
    city: params.city,
    type: params.type as LocationType | undefined,
    search: params.search,
  });

  // Query locations
  const { data: locations = [], isLoading } = useLocations({
    coffeeId: params.coffeeId,
    ...filters,
  });

  // Extract unique cities for filter chips
  const cities = React.useMemo(() => {
    const uniqueCities = [...new Set(locations.map((l) => l.city))];
    return uniqueCities.sort();
  }, [locations]);

  // Build filter options
  const typeFilters: FilterChip[] = [
    {
      id: "cafe",
      label: "Cafes",
      selected: filters.type === "cafe",
      onPress: () =>
        setFilters((f) => ({
          ...f,
          type: f.type === "cafe" ? undefined : "cafe",
        })),
    },
    {
      id: "roastery",
      label: "Roasteries",
      selected: filters.type === "roastery",
      onPress: () =>
        setFilters((f) => ({
          ...f,
          type: f.type === "roastery" ? undefined : "roastery",
        })),
    },
    {
      id: "shop",
      label: "Shops",
      selected: filters.type === "shop",
      onPress: () =>
        setFilters((f) => ({
          ...f,
          type: f.type === "shop" ? undefined : "shop",
        })),
    },
  ];

  const cityFilters: FilterChip[] = cities.map((city) => ({
    id: city,
    label: city,
    selected: filters.city === city,
    onPress: () =>
      setFilters((f) => ({ ...f, city: f.city === city ? undefined : city })),
  }));

  // Handle search
  const handleSearch = React.useCallback(() => {
    setFilters((f) => ({ ...f, search: searchText || undefined }));
  }, [searchText]);

  // Handle location selection with bidirectional sync
  const handleSelect = React.useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  // Scroll list to selected item
  const listRef = React.useRef<FlatList<Location>>(null);
  React.useEffect(() => {
    if (selectedId && listRef.current && locations.length > 0) {
      const index = locations.findIndex((l) => l.id === selectedId);
      if (index >= 0) {
        listRef.current.scrollToIndex({
          index,
          animated: true,
          viewPosition: 0.5,
        });
      }
    }
  }, [selectedId, locations]);

  // Selected location for centering
  const selectedLocation = locations.find((l) => l.id === selectedId);

  // Has active filters
  const hasActiveFilters = !!(filters.city || filters.type || filters.search);

  // Render header
  const renderHeader = () => (
    <View className="flex-row items-center justify-between p-4 border-b border-border bg-background">
      <View className="flex-row items-center gap-3">
        <Pressable onPress={() => router.back()} className="p-2 -ml-2">
          <Icon icon={ArrowLeft} tone="default" iconSize={24} />
        </Pressable>
        <Text className="text-lg font-semibold text-foreground">
          Where to Find
        </Text>
      </View>

      {!isWideScreen && (
        <View className="flex-row gap-1">
          <Pressable
            onPress={() => setViewMode("map")}
            className={`p-2 rounded-lg ${
              viewMode === "map" ? "bg-primary" : "bg-secondary"
            }`}
          >
            <Icon
              icon={MapIcon}
              color={viewMode === "map" ? colors.cream[50] : colors.coffee[900]}
              iconSize={20}
            />
          </Pressable>
          <Pressable
            onPress={() => setViewMode("list")}
            className={`p-2 rounded-lg ${
              viewMode === "list" ? "bg-primary" : "bg-secondary"
            }`}
          >
            <Icon
              icon={List}
              color={viewMode === "list" ? colors.cream[50] : colors.coffee[900]}
              iconSize={20}
            />
          </Pressable>
        </View>
      )}
    </View>
  );

  // Render filters
  const renderFilters = () => (
    <View className="p-4 border-b border-border bg-card">
      <View className="flex-row gap-2 mb-3">
        <View className="flex-1 flex-row items-center bg-secondary rounded-lg px-3 border border-border">
          <Icon icon={Search} tone="muted" iconSize={16} />
          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
            placeholder="Search locations..."
            placeholderTextColor={colors.coffee[400]}
            className="flex-1 py-2.5 px-2 text-foreground"
            returnKeyType="search"
          />
        </View>
        <Button variant="secondary" size="icon" onPress={handleSearch}>
          <Icon icon={Filter} tone="default" iconSize={18} />
        </Button>
      </View>

      <View className="gap-2">
        <FilterChips filters={typeFilters} />
        {cities.length > 1 && <FilterChips filters={cityFilters} />}
      </View>

      {hasActiveFilters && (
        <Pressable
          onPress={() => {
            setFilters({});
            setSearchText("");
          }}
          className="mt-3 flex-row items-center gap-1"
        >
          <Icon icon={X} tone="muted" iconSize={14} />
          <Text className="text-xs text-muted-foreground">Clear filters</Text>
        </Pressable>
      )}
    </View>
  );

  // Render list
  const renderList = () => (
    <FlatList
      ref={listRef}
      data={locations}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 16, gap: 8 }}
      onScrollToIndexFailed={(info) => {
        // Handle scroll to index failure gracefully
        setTimeout(() => {
          listRef.current?.scrollToOffset({
            offset: info.averageItemLength * info.index,
            animated: true,
          });
        }, 100);
      }}
      renderItem={({ item }) => (
        <LocationCard
          name={item.name}
          address={item.address}
          city={item.city}
          distance={item.distance}
          isOpen={item.isOpen}
          isPrimary={item.isPrimary}
          onPress={() => handleSelect(item.id)}
          className={selectedId === item.id ? "border-2 border-primary" : ""}
        />
      )}
      ListEmptyComponent={
        <Card className="p-8">
          <Text className="text-muted-foreground text-center">
            {isLoading ? "Loading locations..." : "No locations found"}
          </Text>
          {hasActiveFilters && !isLoading && (
            <Pressable
              onPress={() => {
                setFilters({});
                setSearchText("");
              }}
              className="mt-3"
            >
              <Text className="text-primary text-center font-medium">
                Clear filters
              </Text>
            </Pressable>
          )}
        </Card>
      }
    />
  );

  // Render map
  const renderMap = () => (
    <CustomMap
      variant="full"
      markers={locations}
      selectedId={selectedId}
      onSelect={handleSelect}
      center={
        selectedLocation
          ? { lat: selectedLocation.latitude, lng: selectedLocation.longitude }
          : undefined
      }
      zoom={selectedLocation ? 15 : 12}
      showUserLocation
    />
  );

  // Layout based on view mode
  if (isWideScreen) {
    // Split layout for wide screens
    return (
      <View className="flex-1 bg-background">
        {renderHeader()}
        <View className="flex-1 flex-row">
          {/* Sidebar */}
          <View className="w-96 border-r border-border">
            {renderFilters()}
            {renderList()}
          </View>
          {/* Map */}
          <View className="flex-1">{renderMap()}</View>
        </View>
      </View>
    );
  }

  // Mobile layout
  return (
    <View className="flex-1 bg-background">
      {renderHeader()}
      {renderFilters()}
      <View className="flex-1">
        {viewMode === "map" ? renderMap() : renderList()}
      </View>
    </View>
  );
}
