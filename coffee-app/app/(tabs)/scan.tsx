import { View, ScrollView } from "react-native";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "expo-router";
import { useCoffees } from "../../lib/queries";
import CaptureButton from "../../components/CaptureButton";
import CaptureScreen from "../../components/CaptureScreen";
import LoadingOCR from "../../components/LoadingOCR";
import PossibleMatches, { type PossibleMatch } from "../../components/PossibleMatches";
import Scanner from "../../components/Scanner";
import { Button } from "../../components/ui/Button";
import { Card, CardHeader, CardContent } from "../../components/ui/Card";
import { Text } from "../../components/ui/Text";

export default function ScanScreen() {
  const router = useRouter();
  const { data: coffees } = useCoffees();
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [scanData, setScanData] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resetToken, setResetToken] = useState(0);

  const matches: PossibleMatch[] = useMemo(() => {
    if (!scanData || !coffees) return [];
    return coffees.slice(0, 3).map((coffee) => ({
      id: coffee.id,
      name: coffee.name,
      roasterName: coffee.roasters?.name || "Unknown Roaster",
      origin: coffee.origin || undefined,
      imageUrl: coffee.bag_image_url || undefined,
      score: 0.82,
    }));
  }, [scanData, coffees]);

  useEffect(() => {
    if (!scanData) return;
    setIsProcessing(true);
    const timer = setTimeout(() => setIsProcessing(false), 900);
    return () => clearTimeout(timer);
  }, [scanData]);

  const handleScan = (data: string) => {
    setScanData(data);
    setIsCameraOpen(false);
  };

  if (isCameraOpen) {
    return (
      <CaptureScreen
        onClose={() => setIsCameraOpen(false)}
        onCapture={() => {
          setScanData(null);
          setResetToken((prev) => prev + 1);
        }}
        hint="Align the barcode or label inside the frame"
      >
        <Scanner
          variant="embedded"
          onScan={handleScan}
          resetToken={resetToken}
        />
      </CaptureScreen>
    );
  }

  return (
    <ScrollView className="flex-1 bg-background" contentContainerClassName="p-4 pb-12">
      <Card className="mb-6">
        <CardHeader>
          <Text className="text-2xl font-bold text-foreground text-center">
            Coffee Scanner
          </Text>
        </CardHeader>
        <CardContent>
          <Text className="text-muted-foreground text-center mb-6">
            Scan a coffee bag label to auto-fill the coffee details and match
            with our catalog.
          </Text>
          <Button variant="default" className="mb-4" onPress={() => setIsCameraOpen(true)}>
            <Text>Open Camera</Text>
          </Button>
          <View className="p-4 bg-secondary rounded-lg">
            <Text className="text-sm font-semibold text-muted-foreground mb-2">
              Tips:
            </Text>
            <Text className="text-sm text-muted-foreground mb-1">
              Use good lighting for OCR accuracy
            </Text>
            <Text className="text-sm text-muted-foreground mb-1">
              Hold the bag steady and in focus
            </Text>
            <Text className="text-sm text-muted-foreground">
              Scan the front label or barcode
            </Text>
          </View>
        </CardContent>
      </Card>

      <View className="items-center mb-6">
        <CaptureButton size="lg" onPress={() => setIsCameraOpen(true)} label="Scan now" />
      </View>

      {scanData && isProcessing ? (
        <LoadingOCR message="Matching coffee profiles" progress={0.6} />
      ) : null}

      {scanData && !isProcessing ? (
        <PossibleMatches
          matches={matches}
          onSelect={(match) => router.push(`/coffee/${match.id}`)}
        />
      ) : null}
    </ScrollView>
  );
}
