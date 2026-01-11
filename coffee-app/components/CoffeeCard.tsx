import { View, Pressable, Image } from "react-native";
import { Link } from "expo-router";
import RatingStars from "./RatingStars";
import { Badge } from "./ui/Badge";
import { Card } from "./ui/Card";
import { Text } from "./ui/Text";

interface CoffeeCardProps {
  id: string;
  name: string;
  roasterName: string;
  roasterLogoUrl?: string;
  origin?: string;
  process?: string;
  bagImageUrl?: string;
  averageRating?: number;
  reviewCount?: number;
  tastingNotes?: string[];
}

export default function CoffeeCard({
  id,
  name,
  roasterName,
  roasterLogoUrl,
  origin,
  process,
  bagImageUrl,
  averageRating = 0,
  reviewCount = 0,
  tastingNotes = [],
}: CoffeeCardProps) {
  return (
    <Link href={`/coffee/${id}`} asChild>
      <Pressable className="mb-3">
        <Card className="overflow-hidden">
          <View className="w-full h-48 bg-secondary items-center justify-center">
            {bagImageUrl ? (
              <Image
                source={{ uri: bagImageUrl }}
                className="w-full h-full"
                resizeMode="cover"
              />
            ) : (
              <View className="w-20 h-20 rounded-full bg-border items-center justify-center">
                <View className="w-10 h-10 rounded-full bg-muted-foreground/50" />
              </View>
            )}
          </View>

          <View className="p-4">
            <Text className="text-lg font-semibold text-foreground mb-1" numberOfLines={1}>
              {name}
            </Text>

            <View className="flex-row items-center mb-2">
              {roasterLogoUrl && (
                <Image
                  source={{ uri: roasterLogoUrl }}
                  className="w-4 h-4 rounded-full mr-1.5"
                />
              )}
              <Text className="text-sm text-muted-foreground font-medium">
                {roasterName}
              </Text>
            </View>

            {(origin || process) && (
              <Text className="text-sm text-muted-foreground mb-3">
                {[origin, process].filter(Boolean).join(" • ")}
              </Text>
            )}

            {reviewCount > 0 && (
              <View className="flex-row items-center mb-3">
                <RatingStars rating={averageRating} size="sm" />
                <Text className="ml-2 text-xs text-muted-foreground">
                  ({reviewCount})
                </Text>
              </View>
            )}

            {tastingNotes.length > 0 && (
              <View className="flex-row flex-wrap gap-1.5">
                {tastingNotes.slice(0, 3).map((note, index) => (
                  <Badge
                    key={note}
                    variant={
                      index === 0
                        ? "orange"
                        : index === 1
                          ? "yellow"
                          : "green"
                    }
                  >
                    <Text>{note}</Text>
                  </Badge>
                ))}
                {tastingNotes.length > 3 && (
                  <Badge variant="secondary">
                    <Text>+{tastingNotes.length - 3}</Text>
                  </Badge>
                )}
              </View>
            )}
          </View>
        </Card>
      </Pressable>
    </Link>
  );
}
