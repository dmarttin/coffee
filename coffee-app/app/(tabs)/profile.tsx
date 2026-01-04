import { View, Text, ScrollView, StyleSheet } from "react-native";
import Button from "../../components/ui/Button";
import { Card, CardContent } from "../../components/ui/Card";

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.avatarOuter}>
            <View style={styles.avatarInner} />
          </View>
          <Text style={styles.userName}>Guest User</Text>
          <Text style={styles.userHandle}>@guest</Text>
        </View>

        {/* Stats */}
        <Card style={styles.statsCard}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Coffees</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Reviews</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Favorites</Text>
            </View>
          </View>
        </Card>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <Button variant="default">Sign In</Button>
          <Button variant="outline">Create Account</Button>
        </View>

        {/* Coffee Journal Preview */}
        <View>
          <Text style={styles.sectionTitle}>My Coffee Journal</Text>
          <Card>
            <CardContent>
              <Text style={styles.emptyText}>
                Your rated coffees and favorites will appear here.
              </Text>
            </CardContent>
          </Card>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFCF0",
  },
  content: {
    padding: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatarOuter: {
    width: 96,
    height: 96,
    backgroundColor: "rgba(218, 112, 44, 0.2)",
    borderRadius: 48,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  avatarInner: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#DA702C",
  },
  userName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1C1B1A",
  },
  userHandle: {
    color: "#878580",
  },
  statsCard: {
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "700",
    color: "#BC5215",
  },
  statLabel: {
    color: "#6F6E69",
  },
  buttonContainer: {
    gap: 12,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1C1B1A",
    marginBottom: 12,
  },
  emptyText: {
    color: "#6F6E69",
    textAlign: "center",
    paddingVertical: 16,
  },
});
