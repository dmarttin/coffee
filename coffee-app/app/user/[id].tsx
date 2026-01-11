import { ScrollView, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useUser } from "../../lib/queries";
import ProfileHeader from "../../components/ProfileHeader";
import { Text } from "../../components/ui/Text";

export default function UserDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: user, isLoading } = useUser(id ?? "");

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Text className="text-muted-foreground">Loading profile...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View className="flex-1 items-center justify-center bg-background p-6">
        <Text className="text-lg font-semibold text-foreground">
          User not found
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4 gap-6">
        <ProfileHeader
          name={user.display_name || user.username}
          username={user.username}
          avatarUrl={user.avatar_url || undefined}
          bio={user.bio || "Coffee explorer"}
          stats={[
            { label: "Coffees", value: 0 },
            { label: "Reviews", value: 0 },
            { label: "Followers", value: 0 },
          ]}
        />
        <Text className="text-sm text-muted-foreground">
          Recent activity will appear here.
        </Text>
      </View>
    </ScrollView>
  );
}
