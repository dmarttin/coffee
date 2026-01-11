import { View, ActivityIndicator, FlatList, Pressable } from "react-native";
import { useState, useMemo } from "react";
import { useCoffees, useSearchCoffees } from "../../lib/queries";
import CoffeeCard from "../../components/CoffeeCard";
import FilterBar, { type FilterOption } from "../../components/FilterBar";
import SortDropdown from "../../components/SortDropdown";
import { Input } from "../../components/ui/Input";
import { Text } from "../../components/ui/Text";

type FilterType = "origin" | "process" | "roastLevel" | "tastingNotes" | null;

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

export default function DiscoverScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<FilterType>(null);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [sortValue, setSortValue] = useState("recent");

  const { data: allCoffees, isLoading: isLoadingAll } = useCoffees();
  const { data: searchResults, isLoading: isSearching } =
    useSearchCoffees(searchQuery);

  const coffees: CoffeeWithRoaster[] =
    searchQuery.length > 0 ? searchResults || [] : allCoffees || [];
  const isLoading = searchQuery.length > 0 ? isSearching : isLoadingAll;

  const filterOptions = useMemo(() => {
    if (coffees.length === 0)
      return { origins: [], processes: [], roastLevels: [], tastingNotes: [] };

    const origins = Array.from(
      new Set(coffees.map((c) => c.origin).filter(Boolean))
    ).sort() as string[];
    const processes = Array.from(
      new Set(coffees.map((c) => c.process).filter(Boolean))
    ).sort() as string[];
    const roastLevels = Array.from(
      new Set(coffees.map((c) => c.roast_level).filter(Boolean))
    ).sort() as string[];
    const tastingNotes = Array.from(
      new Set(coffees.flatMap((c) => c.tasting_notes || []))
    ).sort();

    return { origins, processes, roastLevels, tastingNotes };
  }, [coffees]);

  const filteredCoffees = useMemo(() => {
    if (selectedValues.length === 0) return coffees;

    return coffees.filter((coffee) => {
      if (selectedFilter === "origin") {
        return selectedValues.includes(coffee.origin || "");
      }
      if (selectedFilter === "process") {
        return selectedValues.includes(coffee.process || "");
      }
      if (selectedFilter === "roastLevel") {
        return selectedValues.includes(coffee.roast_level || "");
      }
      if (selectedFilter === "tastingNotes") {
        return selectedValues.some((note) =>
          coffee.tasting_notes?.includes(note)
        );
      }
      return true;
    });
  }, [coffees, selectedFilter, selectedValues]);

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

  const toggleFilterValue = (value: string) => {
    setSelectedValues((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const clearFilters = () => {
    setSelectedFilter(null);
    setSelectedValues([]);
  };

  const getFilterOptions = () => {
    switch (selectedFilter) {
      case "origin":
        return filterOptions.origins;
      case "process":
        return filterOptions.processes;
      case "roastLevel":
        return filterOptions.roastLevels;
      case "tastingNotes":
        return filterOptions.tastingNotes;
      default:
        return [];
    }
  };

  const categoryFilters: FilterOption[] = [
    {
      id: "origin",
      label: "Origin",
      selected: selectedFilter === "origin",
      onPress: () => {
        setSelectedFilter(selectedFilter === "origin" ? null : "origin");
        setSelectedValues([]);
      },
    },
    {
      id: "process",
      label: "Process",
      selected: selectedFilter === "process",
      onPress: () => {
        setSelectedFilter(selectedFilter === "process" ? null : "process");
        setSelectedValues([]);
      },
    },
    {
      id: "roastLevel",
      label: "Roast",
      selected: selectedFilter === "roastLevel",
      onPress: () => {
        setSelectedFilter(selectedFilter === "roastLevel" ? null : "roastLevel");
        setSelectedValues([]);
      },
    },
    {
      id: "tastingNotes",
      label: "Notes",
      selected: selectedFilter === "tastingNotes",
      onPress: () => {
        setSelectedFilter(selectedFilter === "tastingNotes" ? null : "tastingNotes");
        setSelectedValues([]);
      },
    },
  ];

  const valueFilters: FilterOption[] = getFilterOptions().map((option) => ({
    id: option,
    label: option,
    selected: selectedValues.includes(option),
    onPress: () => toggleFilterValue(option),
  }));

  return (
    <View className="flex-1 bg-background">
      <View className="p-4 bg-background border-b border-border">
        <Text className="text-2xl font-bold text-foreground mb-4">
          Discover Coffees
        </Text>

        <Input
          placeholder="Search coffees, roasters, origins..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          className="mb-4"
        />

        <View className="gap-3">
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
          <View>
            <Text className="text-sm font-semibold text-muted-foreground mb-2">
              Quick Filters:
            </Text>
            <FilterBar filters={categoryFilters} />
          </View>
        </View>

        {selectedFilter && (
          <View className="mt-3">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-sm font-medium text-muted-foreground">
                Select{" "}
                {selectedFilter === "tastingNotes"
                  ? "Tasting Notes"
                  : selectedFilter}
                :
              </Text>
              {selectedValues.length > 0 && (
                <Pressable onPress={clearFilters}>
                  <Text className="text-sm text-primary">Clear</Text>
                </Pressable>
              )}
            </View>
            <FilterBar filters={valueFilters} onClear={clearFilters} />
          </View>
        )}
      </View>

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="hsl(24, 87%, 41%)" />
          <Text className="mt-2 text-muted-foreground">Loading coffees...</Text>
        </View>
      ) : sortedCoffees.length > 0 ? (
        <FlatList
          data={sortedCoffees}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
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
      ) : (
        <View className="flex-1 items-center justify-center p-8">
          <View className="w-20 h-20 rounded-full bg-secondary items-center justify-center mb-4">
            <View className="w-10 h-10 rounded-full bg-muted-foreground/50" />
          </View>
          <Text className="text-xl font-semibold text-foreground mb-2">
            No coffees found
          </Text>
          <Text className="text-muted-foreground text-center">
            {searchQuery || selectedValues.length > 0
              ? "Try adjusting your search or filters"
              : "The coffee database is empty. Add some coffees to get started!"}
          </Text>
        </View>
      )}
    </View>
  );
}
