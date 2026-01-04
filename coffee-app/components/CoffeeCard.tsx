import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { Link } from "expo-router";
import RatingStars from "./RatingStars";
import Badge from "./ui/Badge";
import { Card } from "./ui/Card";

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
      <TouchableOpacity style={styles.container}>
        <Card style={styles.card}>
          <View style={styles.imageContainer}>
            {bagImageUrl ? (
              <Image
                source={{ uri: bagImageUrl }}
                style={styles.image}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.placeholderContainer}>
                <View style={styles.placeholderInner} />
              </View>
            )}
          </View>

          <View style={styles.content}>
            <Text style={styles.name} numberOfLines={1}>
              {name}
            </Text>

            <View style={styles.roasterRow}>
              {roasterLogoUrl && (
                <Image source={{ uri: roasterLogoUrl }} style={styles.logo} />
              )}
              <Text style={styles.roasterName}>{roasterName}</Text>
            </View>

            {(origin || process) && (
              <Text style={styles.originProcess}>
                {[origin, process].filter(Boolean).join(" • ")}
              </Text>
            )}

            {reviewCount > 0 && (
              <View style={styles.ratingRow}>
                <RatingStars rating={averageRating} size="sm" />
                <Text style={styles.reviewCount}>({reviewCount})</Text>
              </View>
            )}

            {tastingNotes.length > 0 && (
              <View style={styles.badgeContainer}>
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
                    size="sm"
                  >
                    {note}
                  </Badge>
                ))}
                {tastingNotes.length > 3 && (
                  <Badge variant="secondary" size="sm">
                    +{tastingNotes.length - 3}
                  </Badge>
                )}
              </View>
            )}
          </View>
        </Card>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  card: {
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: 192,
    backgroundColor: "#F2F0E5",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholderContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#CECDC3",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#B7B5AC",
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1C1B1A",
    marginBottom: 4,
  },
  roasterRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  logo: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 6,
  },
  roasterName: {
    fontSize: 14,
    color: "#6F6E69",
    fontWeight: "500",
  },
  originProcess: {
    fontSize: 14,
    color: "#878580",
    marginBottom: 12,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  reviewCount: {
    marginLeft: 8,
    fontSize: 12,
    color: "#878580",
  },
  badgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
});
