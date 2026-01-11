import { ScrollView, View } from "react-native";
import { useRouter } from "expo-router";
import { Palette, Bell, Shield, LogOut } from "lucide-react-native";
import { useMemo, useState } from "react";
import {
  useCurrentUser,
  useSession,
  useUserFavorites,
} from "../../lib/queries";
import ProfileHeader from "../../components/ProfileHeader";
import MyCoffeeList from "../../components/MyCoffeeList";
import SavedCafeterias from "../../components/SavedCafeterias";
import CafeteriaMapFilters, {
  type CafeteriaMapFilter,
} from "../../components/CafeteriaMapFilters";
import SettingsMenu, { type SettingsMenuItem } from "../../components/SettingsMenu";
import { Button } from "../../components/ui/Button";
import { Card, CardContent } from "../../components/ui/Card";
import { Text } from "../../components/ui/Text";
import { colors } from "../../lib/theme";

export default function ProfileScreen() {
  const router = useRouter();
  const { data: session } = useSession();
  const { data: currentUser } = useCurrentUser();
  const { data: favorites } = useUserFavorites(currentUser?.id ?? "");

  const [cafeteriaFilters, setCafeteriaFilters] = useState<CafeteriaMapFilter[]>([
    { id: "saved", label: "Saved", selected: true },
    { id: "wishlist", label: "Want to go" },
    { id: "custom", label: "Custom" },
  ]);

  const favoriteCoffees = useMemo(() => {
    if (!favorites) return [];
    return favorites
      .map((favorite) => favorite.coffees)
      .filter(Boolean)
      .map((coffee) => ({
        id: coffee.id,
        name: coffee.name,
        roasterName: coffee.roasters?.name || "Unknown Roaster",
        origin: coffee.origin || undefined,
        process: coffee.process || undefined,
        bagImageUrl: coffee.bag_image_url || undefined,
        tastingNotes: coffee.tasting_notes || undefined,
      }));
  }, [favorites]);

  const settingsItems: SettingsMenuItem[] = [
    {
      id: "notifications",
      label: "Notifications",
      description: "Get tasting reminders",
      icon: Bell,
      switchValue: true,
    },
    {
      id: "privacy",
      label: "Privacy",
      description: "Manage profile visibility",
      icon: Shield,
      showChevron: true,
    },
    {
      id: "logout",
      label: session ? "Sign out" : "Sign in",
      description: session ? "Log out of your account" : "Access your journal",
      icon: LogOut,
      showChevron: true,
    },
  ];

  const toggleCafeteriaFilter = (id: string) => {
    setCafeteriaFilters((prev) =>
      prev.map((filter) =>
        filter.id === id ? { ...filter, selected: !filter.selected } : filter
      )
    );
  };

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4 gap-6">
        <ProfileHeader
          name={currentUser?.display_name || "Guest User"}
          username={currentUser?.username || "guest"}
          avatarUrl={currentUser?.avatar_url || undefined}
          bio={currentUser?.bio || "Start tracking your coffee adventures."}
          stats={[
            { label: "Coffees", value: favoriteCoffees.length },
            { label: "Reviews", value: 0 },
            { label: "Favorites", value: favoriteCoffees.length },
          ]}
          onEdit={currentUser ? () => {} : undefined}
        />

        {!session ? (
          <View className="gap-3">
            <Button variant="default">
              <Text>Sign In</Text>
            </Button>
            <Button variant="outline">
              <Text>Create Account</Text>
            </Button>
          </View>
        ) : null}

        <View>
          <Text className="text-xl font-bold text-foreground mb-3">
            My Coffee Journal
          </Text>
          {favoriteCoffees.length > 0 ? (
            <MyCoffeeList coffees={favoriteCoffees} />
          ) : (
            <Card>
              <CardContent className="py-6">
                <Text className="text-muted-foreground text-center">
                  Your rated coffees and favorites will appear here.
                </Text>
              </CardContent>
            </Card>
          )}
        </View>

        <View>
          <Text className="text-xl font-bold text-foreground mb-3">
            Saved Cafeterias
          </Text>
          <CafeteriaMapFilters
            filters={cafeteriaFilters}
            onToggle={toggleCafeteriaFilter}
          />
          <View className="mt-4">
            <SavedCafeterias cafeterias={[]} />
          </View>
        </View>

        <SettingsMenu title="Settings" items={settingsItems} />

        {__DEV__ && (
          <View className="pt-6 border-t border-cream-200">
            <Text className="text-xs text-coffee-400 uppercase tracking-wide mb-3">
              Developer Tools
            </Text>
            <Button
              variant="outline"
              className="flex-row gap-2"
              onPress={() => router.push("/showcase")}
            >
              <Palette size={18} color={colors.coffee[600]} />
              <Text className="text-foreground">Design System Showcase</Text>
            </Button>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
