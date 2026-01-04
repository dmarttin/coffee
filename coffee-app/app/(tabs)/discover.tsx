import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState, useMemo } from "react";
import { useCoffees, useSearchCoffees } from "../../lib/queries";
import CoffeeCard from "../../components/CoffeeCard";
import Input from "../../components/ui/Input";
import Badge from "../../components/ui/Badge";

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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Discover Coffees</Text>

        <Input
          placeholder="Search coffees, roasters, origins..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          containerStyle={styles.searchContainer}
        />

        <View>
          <Text style={styles.filterLabel}>Quick Filters:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.filterRow}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedFilter(
                    selectedFilter === "origin" ? null : "origin"
                  );
                  setSelectedValues([]);
                }}
              >
                <Badge
                  variant={selectedFilter === "origin" ? "orange" : "secondary"}
                >
                  Origin
                </Badge>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelectedFilter(
                    selectedFilter === "process" ? null : "process"
                  );
                  setSelectedValues([]);
                }}
              >
                <Badge
                  variant={
                    selectedFilter === "process" ? "yellow" : "secondary"
                  }
                >
                  Process
                </Badge>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelectedFilter(
                    selectedFilter === "roastLevel" ? null : "roastLevel"
                  );
                  setSelectedValues([]);
                }}
              >
                <Badge
                  variant={
                    selectedFilter === "roastLevel" ? "green" : "secondary"
                  }
                >
                  Roast Level
                </Badge>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelectedFilter(
                    selectedFilter === "tastingNotes" ? null : "tastingNotes"
                  );
                  setSelectedValues([]);
                }}
              >
                <Badge
                  variant={
                    selectedFilter === "tastingNotes" ? "blue" : "secondary"
                  }
                >
                  Tasting Notes
                </Badge>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        {selectedFilter && (
          <View style={styles.selectedFilterSection}>
            <View style={styles.selectedFilterHeader}>
              <Text style={styles.selectedFilterLabel}>
                Select{" "}
                {selectedFilter === "tastingNotes"
                  ? "Tasting Notes"
                  : selectedFilter}
                :
              </Text>
              {selectedValues.length > 0 && (
                <TouchableOpacity onPress={clearFilters}>
                  <Text style={styles.clearButton}>Clear</Text>
                </TouchableOpacity>
              )}
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.filterRow}>
                {getFilterOptions().map((option) => (
                  <TouchableOpacity
                    key={option}
                    onPress={() => toggleFilterValue(option)}
                  >
                    <Badge
                      variant={
                        selectedValues.includes(option) ? "default" : "outline"
                      }
                      size="sm"
                    >
                      {option}
                    </Badge>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        )}
      </View>

      {isLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#6F6E69" />
          <Text style={styles.loadingText}>Loading coffees...</Text>
        </View>
      ) : filteredCoffees.length > 0 ? (
        <FlatList
          data={filteredCoffees}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
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
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconOuter}>
            <View style={styles.emptyIconInner} />
          </View>
          <Text style={styles.emptyTitle}>No coffees found</Text>
          <Text style={styles.emptySubtitle}>
            {searchQuery || selectedValues.length > 0
              ? "Try adjusting your search or filters"
              : "The coffee database is empty. Add some coffees to get started!"}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFCF0",
  },
  header: {
    padding: 16,
    backgroundColor: "#FFFCF0",
    borderBottomWidth: 1,
    borderBottomColor: "#CECDC3",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1C1B1A",
    marginBottom: 16,
  },
  searchContainer: {
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#575653",
    marginBottom: 8,
  },
  filterRow: {
    flexDirection: "row",
    gap: 8,
  },
  selectedFilterSection: {
    marginTop: 12,
  },
  selectedFilterHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  selectedFilterLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#575653",
  },
  clearButton: {
    fontSize: 14,
    color: "#205EA6",
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    color: "#878580",
    marginTop: 8,
  },
  listContent: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  emptyIconOuter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E6E4D9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  emptyIconInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#B7B5AC",
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1C1B1A",
    marginBottom: 8,
  },
  emptySubtitle: {
    color: "#878580",
    textAlign: "center",
  },
});
