import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { useCoffees } from "../../lib/queries";
import CoffeeCard from "../../components/CoffeeCard";

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
  const { data: coffees, isLoading, refetch } = useCoffees();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6F6E69" />
        <Text style={styles.loadingText}>Loading coffees...</Text>
      </View>
    );
  }

  if (!coffees || coffees.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIconOuter}>
          <View style={styles.emptyIconInner} />
        </View>
        <Text style={styles.emptyTitle}>No coffees yet</Text>
        <Text style={styles.emptySubtitle}>
          The coffee database is empty. Check out the Discover tab to start
          exploring!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={coffees as CoffeeWithRoaster[]}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#6F6E69"
          />
        }
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Coffee Feed</Text>
            <Text style={styles.subtitle}>
              Discover the latest coffees from our community
            </Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFCF0",
  },
  centered: {
    flex: 1,
    backgroundColor: "#FFFCF0",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    color: "#878580",
    marginTop: 8,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: "#FFFCF0",
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
  listContent: {
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1C1B1A",
    marginBottom: 8,
  },
  subtitle: {
    color: "#6F6E69",
  },
});
