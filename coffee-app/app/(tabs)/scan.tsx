import { View, Text, StyleSheet } from "react-native";
import Button from "../../components/ui/Button";
import { Card, CardHeader, CardContent } from "../../components/ui/Card";

export default function ScanScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Card>
          <CardHeader>
            <Text style={styles.title}>Coffee Scanner</Text>
          </CardHeader>
          <CardContent>
            <Text style={styles.description}>
              Use your camera to scan coffee bag labels and automatically
              extract information.
            </Text>
            <Button variant="default" style={styles.button}>
              Open Camera
            </Button>
            <View style={styles.featuresBox}>
              <Text style={styles.featuresTitle}>Features:</Text>
              <Text style={styles.featureItem}>OCR text extraction</Text>
              <Text style={styles.featureItem}>Barcode scanning</Text>
              <Text style={styles.featureItem}>Auto-fill coffee details</Text>
            </View>
          </CardContent>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1B1A",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    paddingHorizontal: 16,
    width: "100%",
    maxWidth: 400,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1C1B1A",
    textAlign: "center",
  },
  description: {
    color: "#6F6E69",
    textAlign: "center",
    marginBottom: 24,
  },
  button: {
    marginBottom: 16,
  },
  featuresBox: {
    padding: 16,
    backgroundColor: "#F2F0E5",
    borderRadius: 8,
  },
  featuresTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#575653",
    marginBottom: 8,
  },
  featureItem: {
    fontSize: 14,
    color: "#6F6E69",
    marginBottom: 4,
  },
});
