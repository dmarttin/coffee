import * as React from "react";
import { View, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  Coffee,
  MapPin,
  Star,
  Heart,
  Share2,
  ChevronRight,
  Scan,
} from "lucide-react-native";
import { Text } from "../components/ui/Text";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Input } from "../components/ui/Input";
import { Separator } from "../components/ui/Separator";
import { colors, gradients, shadows, spacing } from "../lib/theme";

export default function ShowcaseScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-cream-50">
      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-12"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="px-5 pt-4 pb-6">
          <Text
            style={{
              fontFamily: "Fraunces_700Bold",
              fontSize: 32,
              color: colors.coffee[900],
              letterSpacing: -0.5,
            }}
          >
            Design System
          </Text>
          <Text
            style={{
              fontFamily: "DMSans_400Regular",
              fontSize: 15,
              color: colors.coffee[400],
              marginTop: 4,
            }}
          >
            Component showcase for the Coffee App
          </Text>
        </View>

        {/* Typography Section */}
        <Section title="Typography">
          <View className="gap-4">
            {/* Display fonts */}
            <View className="bg-cream-100 rounded-lg p-4">
              <Label>Fraunces - Display</Label>
              <Text
                style={{
                  fontFamily: "Fraunces_700Bold",
                  fontSize: 28,
                  color: colors.coffee[900],
                  marginTop: 8,
                }}
              >
                Ethiopian Yirgacheffe
              </Text>
              <Text
                style={{
                  fontFamily: "Fraunces_500Medium",
                  fontSize: 20,
                  color: colors.coffee[700],
                  marginTop: 4,
                }}
              >
                Single Origin, Washed Process
              </Text>
            </View>

            {/* Body fonts */}
            <View className="bg-cream-100 rounded-lg p-4">
              <Label>DM Sans - Body</Label>
              <Text
                style={{
                  fontFamily: "DMSans_700Bold",
                  fontSize: 17,
                  color: colors.coffee[900],
                  marginTop: 8,
                }}
              >
                Bold - Tasting Notes
              </Text>
              <Text
                style={{
                  fontFamily: "DMSans_500Medium",
                  fontSize: 15,
                  color: colors.coffee[700],
                  marginTop: 4,
                }}
              >
                Medium - Bright citrus acidity with floral aromatics
              </Text>
              <Text
                style={{
                  fontFamily: "DMSans_400Regular",
                  fontSize: 14,
                  color: colors.coffee[500],
                  marginTop: 4,
                }}
              >
                Regular - A delicate and complex cup with notes of bergamot,
                jasmine, and lemon zest.
              </Text>
            </View>

            {/* Mono fonts */}
            <View className="bg-cream-100 rounded-lg p-4">
              <Label>JetBrains Mono - Metrics</Label>
              <View className="flex-row gap-6 mt-2">
                <View>
                  <Text
                    style={{
                      fontFamily: "JetBrainsMono_500Medium",
                      fontSize: 24,
                      color: colors.accent.DEFAULT,
                    }}
                  >
                    92
                  </Text>
                  <Text
                    style={{
                      fontFamily: "DMSans_400Regular",
                      fontSize: 12,
                      color: colors.coffee[400],
                    }}
                  >
                    Rating
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontFamily: "JetBrainsMono_500Medium",
                      fontSize: 24,
                      color: colors.coffee[900],
                    }}
                  >
                    1:16
                  </Text>
                  <Text
                    style={{
                      fontFamily: "DMSans_400Regular",
                      fontSize: 12,
                      color: colors.coffee[400],
                    }}
                  >
                    Ratio
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontFamily: "JetBrainsMono_500Medium",
                      fontSize: 24,
                      color: colors.coffee[900],
                    }}
                  >
                    94°C
                  </Text>
                  <Text
                    style={{
                      fontFamily: "DMSans_400Regular",
                      fontSize: 12,
                      color: colors.coffee[400],
                    }}
                  >
                    Temp
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Section>

        {/* Colors Section */}
        <Section title="Color Palette">
          {/* Cream scale */}
          <View className="mb-4">
            <Label>Cream (Backgrounds)</Label>
            <View className="flex-row mt-2 rounded-lg overflow-hidden">
              {Object.entries(colors.cream).map(([key, value]) => (
                <View
                  key={key}
                  className="flex-1 h-16 items-center justify-end pb-2"
                  style={{ backgroundColor: value }}
                >
                  <Text
                    style={{
                      fontFamily: "JetBrainsMono_400Regular",
                      fontSize: 10,
                      color: colors.coffee[500],
                    }}
                  >
                    {key}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Coffee scale */}
          <View className="mb-4">
            <Label>Coffee (Text & UI)</Label>
            <View className="flex-row mt-2 rounded-lg overflow-hidden">
              {Object.entries(colors.coffee)
                .slice(0, 5)
                .map(([key, value]) => (
                  <View
                    key={key}
                    className="flex-1 h-16 items-center justify-end pb-2"
                    style={{ backgroundColor: value }}
                  >
                    <Text
                      style={{
                        fontFamily: "JetBrainsMono_400Regular",
                        fontSize: 10,
                        color:
                          parseInt(key) >= 500
                            ? colors.cream[50]
                            : colors.coffee[700],
                      }}
                    >
                      {key}
                    </Text>
                  </View>
                ))}
            </View>
            <View className="flex-row mt-1 rounded-lg overflow-hidden">
              {Object.entries(colors.coffee)
                .slice(5)
                .map(([key, value]) => (
                  <View
                    key={key}
                    className="flex-1 h-16 items-center justify-end pb-2"
                    style={{ backgroundColor: value }}
                  >
                    <Text
                      style={{
                        fontFamily: "JetBrainsMono_400Regular",
                        fontSize: 10,
                        color: colors.cream[50],
                      }}
                    >
                      {key}
                    </Text>
                  </View>
                ))}
            </View>
          </View>

          {/* Accent */}
          <View className="mb-4">
            <Label>Accent (Brand)</Label>
            <View className="flex-row mt-2 rounded-lg overflow-hidden">
              <View
                className="flex-1 h-16 items-center justify-end pb-2"
                style={{ backgroundColor: colors.accent.light }}
              >
                <Text
                  style={{
                    fontFamily: "JetBrainsMono_400Regular",
                    fontSize: 10,
                    color: colors.coffee[800],
                  }}
                >
                  light
                </Text>
              </View>
              <View
                className="flex-1 h-16 items-center justify-end pb-2"
                style={{ backgroundColor: colors.accent.DEFAULT }}
              >
                <Text
                  style={{
                    fontFamily: "JetBrainsMono_400Regular",
                    fontSize: 10,
                    color: colors.cream[50],
                  }}
                >
                  default
                </Text>
              </View>
              <View
                className="flex-1 h-16 items-center justify-end pb-2"
                style={{ backgroundColor: colors.accent.dark }}
              >
                <Text
                  style={{
                    fontFamily: "JetBrainsMono_400Regular",
                    fontSize: 10,
                    color: colors.cream[50],
                  }}
                >
                  dark
                </Text>
              </View>
            </View>
          </View>

          {/* Roast levels */}
          <View className="mb-4">
            <Label>Roast Levels</Label>
            <View className="flex-row mt-2 rounded-lg overflow-hidden">
              {Object.entries(colors.roast).map(([key, value]) => (
                <View
                  key={key}
                  className="flex-1 h-16 items-center justify-end pb-2"
                  style={{ backgroundColor: value }}
                >
                  <Text
                    style={{
                      fontFamily: "JetBrainsMono_400Regular",
                      fontSize: 9,
                      color:
                        key === "light" ? colors.coffee[700] : colors.cream[50],
                    }}
                  >
                    {key}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Origin colors */}
          <View>
            <Label>Origin Regions</Label>
            <View className="flex-row mt-2 gap-2">
              {Object.entries(colors.origin).map(([key, value]) => (
                <View
                  key={key}
                  className="flex-1 h-12 rounded-lg items-center justify-center"
                  style={{ backgroundColor: value }}
                >
                  <Text
                    style={{
                      fontFamily: "DMSans_500Medium",
                      fontSize: 10,
                      color: colors.cream[50],
                    }}
                  >
                    {key.replace("-", " ")}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </Section>

        {/* Buttons Section */}
        <Section title="Buttons">
          <View className="gap-3">
            <Button className="w-full">
              <Text className="text-primary-foreground font-medium">
                Primary Button
              </Text>
            </Button>

            <Button variant="secondary" className="w-full">
              <Text className="text-secondary-foreground font-medium">
                Secondary Button
              </Text>
            </Button>

            <Button variant="outline" className="w-full">
              <Text className="text-foreground font-medium">
                Outline Button
              </Text>
            </Button>

            <Button variant="ghost" className="w-full">
              <Text className="text-foreground font-medium">Ghost Button</Text>
            </Button>

            <View className="flex-row gap-3">
              <Button size="sm">
                <Text className="text-primary-foreground text-sm">Small</Text>
              </Button>
              <Button>
                <Text className="text-primary-foreground">Default</Text>
              </Button>
              <Button size="lg">
                <Text className="text-primary-foreground text-lg">Large</Text>
              </Button>
            </View>

            {/* Icon buttons */}
            <View className="flex-row gap-3 mt-2">
              <Button className="flex-row gap-2">
                <Scan size={18} color={colors.cream[50]} />
                <Text className="text-primary-foreground font-medium">
                  Scan Coffee
                </Text>
              </Button>
              <Button variant="outline" className="flex-row gap-2">
                <Heart size={18} color={colors.coffee[900]} />
                <Text className="text-foreground font-medium">Save</Text>
              </Button>
            </View>
          </View>
        </Section>

        {/* Badges Section */}
        <Section title="Badges">
          <View className="flex-row flex-wrap gap-2">
            <Badge>
              <Text className="text-primary-foreground text-xs">Default</Text>
            </Badge>
            <Badge variant="secondary">
              <Text className="text-secondary-foreground text-xs">
                Secondary
              </Text>
            </Badge>
            <Badge variant="outline">
              <Text className="text-foreground text-xs">Outline</Text>
            </Badge>
            <Badge variant="destructive">
              <Text className="text-destructive-foreground text-xs">
                Destructive
              </Text>
            </Badge>
          </View>

          <View className="flex-row flex-wrap gap-2 mt-4">
            <Badge
              style={{ backgroundColor: colors.roast.light }}
              className="border-0"
            >
              <Text style={{ color: colors.coffee[800] }} className="text-xs">
                Light Roast
              </Text>
            </Badge>
            <Badge
              style={{ backgroundColor: colors.roast.medium }}
              className="border-0"
            >
              <Text style={{ color: colors.cream[50] }} className="text-xs">
                Medium Roast
              </Text>
            </Badge>
            <Badge
              style={{ backgroundColor: colors.roast.dark }}
              className="border-0"
            >
              <Text style={{ color: colors.cream[50] }} className="text-xs">
                Dark Roast
              </Text>
            </Badge>
          </View>

          <View className="flex-row flex-wrap gap-2 mt-4">
            <Badge
              style={{ backgroundColor: colors.origin.africa }}
              className="border-0"
            >
              <Text style={{ color: colors.cream[50] }} className="text-xs">
                Africa
              </Text>
            </Badge>
            <Badge
              style={{ backgroundColor: colors.origin.centralAmerica }}
              className="border-0"
            >
              <Text style={{ color: colors.cream[50] }} className="text-xs">
                Central America
              </Text>
            </Badge>
            <Badge
              style={{ backgroundColor: colors.origin.southAmerica }}
              className="border-0"
            >
              <Text style={{ color: colors.cream[50] }} className="text-xs">
                South America
              </Text>
            </Badge>
            <Badge
              style={{ backgroundColor: colors.origin.asia }}
              className="border-0"
            >
              <Text style={{ color: colors.cream[50] }} className="text-xs">
                Asia
              </Text>
            </Badge>
          </View>
        </Section>

        {/* Cards Section */}
        <Section title="Cards">
          {/* Basic Card */}
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Basic Card</CardTitle>
            </CardHeader>
            <CardContent>
              <Text className="text-muted-foreground">
                A simple card with header and content. Great for displaying
                grouped information.
              </Text>
            </CardContent>
          </Card>

          {/* Coffee Preview Card */}
          <Card className="mb-4 overflow-hidden">
            <View
              className="h-32 w-full"
              style={{ backgroundColor: colors.coffee[200] }}
            >
              <View className="absolute bottom-2 left-2">
                <Badge
                  style={{ backgroundColor: colors.origin.africa }}
                  className="border-0"
                >
                  <Text
                    style={{ color: colors.cream[50] }}
                    className="text-xs font-medium"
                  >
                    Ethiopia
                  </Text>
                </Badge>
              </View>
            </View>
            <CardContent className="pt-3">
              <Text
                style={{
                  fontFamily: "Fraunces_600SemiBold",
                  fontSize: 18,
                  color: colors.coffee[900],
                }}
              >
                Yirgacheffe Natural
              </Text>
              <Text
                style={{
                  fontFamily: "DMSans_400Regular",
                  fontSize: 14,
                  color: colors.coffee[500],
                  marginTop: 2,
                }}
              >
                Nomad Coffee
              </Text>
              <View className="flex-row items-center mt-3 gap-4">
                <View className="flex-row items-center gap-1">
                  <Star
                    size={16}
                    color={colors.accent.DEFAULT}
                    fill={colors.accent.DEFAULT}
                  />
                  <Text
                    style={{
                      fontFamily: "JetBrainsMono_500Medium",
                      fontSize: 14,
                      color: colors.coffee[900],
                    }}
                  >
                    4.8
                  </Text>
                </View>
                <Text
                  style={{
                    fontFamily: "DMSans_400Regular",
                    fontSize: 13,
                    color: colors.coffee[400],
                  }}
                >
                  128 reviews
                </Text>
              </View>
            </CardContent>
          </Card>

          {/* Card with shadow */}
          <View style={shadows.lg}>
            <Card className="border-0">
              <CardContent>
                <Text
                  style={{
                    fontFamily: "DMSans_600SemiBold",
                    fontSize: 15,
                    color: colors.coffee[900],
                  }}
                >
                  Elevated Card
                </Text>
                <Text
                  style={{
                    fontFamily: "DMSans_400Regular",
                    fontSize: 14,
                    color: colors.coffee[500],
                    marginTop: 4,
                  }}
                >
                  Using the large shadow for emphasis
                </Text>
              </CardContent>
            </Card>
          </View>
        </Section>

        {/* Inputs Section */}
        <Section title="Inputs">
          <View className="gap-4">
            <View>
              <Label>Default Input</Label>
              <Input placeholder="Search coffees..." className="mt-2" />
            </View>

            <View>
              <Label>With Value</Label>
              <Input value="Ethiopian Yirgacheffe" className="mt-2" />
            </View>
          </View>
        </Section>

        {/* Gradients Section */}
        <Section title="Gradients">
          <View className="gap-3">
            <View>
              <Label>Cream Fade (Backgrounds)</Label>
              <LinearGradient
                colors={[...gradients.creamFade]}
                style={{ height: 80, borderRadius: 8, marginTop: 8 }}
              />
            </View>

            <View>
              <Label>Coffee Depth (Hero sections)</Label>
              <LinearGradient
                colors={[...gradients.coffeeDepth]}
                style={{ height: 80, borderRadius: 8, marginTop: 8 }}
              />
            </View>

            <View>
              <Label>Accent Glow</Label>
              <LinearGradient
                colors={[...gradients.accentGlow]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ height: 80, borderRadius: 8, marginTop: 8 }}
              />
            </View>

            <View>
              <Label>Roast Spectrum</Label>
              <LinearGradient
                colors={[...gradients.roastSpectrum]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ height: 80, borderRadius: 8, marginTop: 8 }}
              />
            </View>
          </View>
        </Section>

        {/* Shadows Section */}
        <Section title="Shadows">
          <View className="flex-row gap-4">
            <View className="flex-1 items-center">
              <View
                style={shadows.sm}
                className="w-20 h-20 bg-cream-50 rounded-lg"
              />
              <Text
                style={{
                  fontFamily: "DMSans_400Regular",
                  fontSize: 12,
                  color: colors.coffee[500],
                  marginTop: 8,
                }}
              >
                Small
              </Text>
            </View>
            <View className="flex-1 items-center">
              <View
                style={shadows.md}
                className="w-20 h-20 bg-cream-50 rounded-lg"
              />
              <Text
                style={{
                  fontFamily: "DMSans_400Regular",
                  fontSize: 12,
                  color: colors.coffee[500],
                  marginTop: 8,
                }}
              >
                Medium
              </Text>
            </View>
            <View className="flex-1 items-center">
              <View
                style={shadows.lg}
                className="w-20 h-20 bg-cream-50 rounded-lg"
              />
              <Text
                style={{
                  fontFamily: "DMSans_400Regular",
                  fontSize: 12,
                  color: colors.coffee[500],
                  marginTop: 8,
                }}
              >
                Large
              </Text>
            </View>
            <View className="flex-1 items-center">
              <View
                style={shadows.warmGlow}
                className="w-20 h-20 bg-cream-50 rounded-lg"
              />
              <Text
                style={{
                  fontFamily: "DMSans_400Regular",
                  fontSize: 12,
                  color: colors.coffee[500],
                  marginTop: 8,
                }}
              >
                Warm
              </Text>
            </View>
          </View>
        </Section>

        {/* Spacing Section */}
        <Section title="Spacing Scale">
          <View className="gap-2">
            {[
              ["xs", spacing.xs],
              ["sm", spacing.sm],
              ["md", spacing.md],
              ["lg", spacing.lg],
              ["xl", spacing.xl],
              ["xxl", spacing.xxl],
            ].map(([name, value]) => (
              <View key={name} className="flex-row items-center gap-3">
                <View
                  style={{
                    width: value as number,
                    height: 24,
                    backgroundColor: colors.accent.DEFAULT,
                    borderRadius: 4,
                  }}
                />
                <Text
                  style={{
                    fontFamily: "JetBrainsMono_400Regular",
                    fontSize: 12,
                    color: colors.coffee[600],
                  }}
                >
                  {name} = {value}px
                </Text>
              </View>
            ))}
          </View>
        </Section>

        {/* Back to app */}
        <View className="px-5 mt-8">
          <Button
            variant="outline"
            className="w-full"
            onPress={() => router.back()}
          >
            <Text className="text-foreground font-medium">Back to App</Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Helper components
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View className="px-5 mb-8">
      <Text
        style={{
          fontFamily: "Fraunces_600SemiBold",
          fontSize: 20,
          color: colors.coffee[900],
          marginBottom: 12,
        }}
      >
        {title}
      </Text>
      {children}
    </View>
  );
}

function Label({ children }: { children: string }) {
  return (
    <Text
      style={{
        fontFamily: "DMSans_500Medium",
        fontSize: 12,
        color: colors.coffee[400],
        textTransform: "uppercase",
        letterSpacing: 0.5,
      }}
    >
      {children}
    </Text>
  );
}
