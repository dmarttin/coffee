import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  TextInput,
  Alert,
  Animated,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useRef } from "react";
import {
  useCoffee,
  useCoffeeReviews,
  useCreateReview,
  useSession,
  useRecipeVotes,
  useRoasterLocations,
} from "../../lib/queries";
import RatingStars from "../../components/RatingStars";
import ReviewCard from "../../components/ReviewCard";
import TasteSlider from "../../components/TasteSlider";
import RecipeStarGraph from "../../components/RecipeStarGraph";
import RoasterMapPreview from "../../components/RoasterMapPreview";
import RoasterLocationsMap from "../../components/RoasterLocationsMap";
import CoffeeCarousel from "../../components/CoffeeCarousel";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function CoffeeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;

  // State
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [newReviewText, setNewReviewText] = useState("");
  const [summaryTab, setSummaryTab] = useState<"highlights" | "facts">(
    "highlights"
  );
  const [reviewFilter, setReviewFilter] = useState<"helpful" | "recent">(
    "recent"
  );

  // Queries
  const { data: session } = useSession();
  const { data: coffee, isLoading } = useCoffee(id);
  const { data: reviews, isLoading: isLoadingReviews } = useCoffeeReviews(id);
  const { data: recipeVotes } = useRecipeVotes(id);
  const { data: roasterLocations } = useRoasterLocations(
    coffee?.roaster_id || ""
  );
  const createReview = useCreateReview();

  // Handlers
  const handleSubmitReview = async () => {
    if (!session) {
      Alert.alert("Authentication Required", "Please sign in to rate coffees");
      setShowRatingModal(false);
      return;
    }

    if (newRating === 0) {
      Alert.alert("Rating Required", "Please select a rating");
      return;
    }

    try {
      await createReview.mutateAsync({
        coffee_id: id,
        rating: newRating,
        review_text: newReviewText || undefined,
      });
      setShowRatingModal(false);
      setNewRating(0);
      setNewReviewText("");
      Alert.alert("Success", "Your review has been submitted!");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to submit review");
    }
  };

  // Calculate stats
  const avgRating =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  const reviewCount = reviews?.length || 0;

  // Navigation bar animation
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  // Loading state
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#BC5215" />
      </View>
    );
  }

  // Error state
  if (!coffee) {
    return (
      <View className="flex-1 items-center justify-center bg-white p-8">
        <Text className="text-xl font-semibold text-[#1C1B1A] mb-2">
          Coffee not found
        </Text>
        <TouchableOpacity
          className="bg-[#BC5215] px-6 py-3 rounded-lg mt-4"
          onPress={() => router.back()}
        >
          <Text className="text-white font-semibold">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Convert recipe votes to graph data
  const recipeGraphData = {
    coldBrew:
      recipeVotes?.find((v) => v.recipe_type === "cold_brew")?.percentage || 0,
    decaffeinated:
      recipeVotes?.find((v) => v.recipe_type === "decaf")?.percentage || 0,
    espresso:
      recipeVotes?.find((v) => v.recipe_type === "espresso")?.percentage || 0,
    filter:
      recipeVotes?.find((v) => v.recipe_type === "filter")?.percentage || 0,
  };

  const placeholderSimilarCoffees = [
    {
      id: "1",
      name: "Similar Coffee 1",
      roasterName: "Unknown Roaster",
      rating: 4.2,
      price: "€12.50",
    },
    {
      id: "2",
      name: "Similar Coffee 2",
      roasterName: "Unknown Roaster",
      rating: 4.5,
      price: "€14.00",
    },
    {
      id: "3",
      name: "Similar Coffee 3",
      roasterName: "Unknown Roaster",
      rating: 4.0,
      price: "€11.00",
    },
  ];

  return (
    <>
      {/* Animated Navigation Bar */}
      <Animated.View
        className="absolute top-0 left-0 right-0 z-50 px-4 py-3 flex-row justify-between items-center"
        style={{
          backgroundColor: headerOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"],
          }),
          borderBottomWidth: headerOpacity,
          borderBottomColor: "#CECDC3",
        }}
      >
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <Ionicons name="arrow-back" size={24} color="#1C1B1A" />
        </TouchableOpacity>
        <View className="flex-row gap-4">
          <TouchableOpacity className="p-2">
            <Ionicons name="share-outline" size={24} color="#1C1B1A" />
          </TouchableOpacity>
          <TouchableOpacity className="p-2">
            <Ionicons name="cart-outline" size={24} color="#1C1B1A" />
          </TouchableOpacity>
        </View>
      </Animated.View>

      <Animated.ScrollView
        className="flex-1 bg-white"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* A. Hero Section */}
        <View className="px-4 pt-16 pb-6">
          <View className="flex-row gap-4">
            {/* Left Column - Image (40%) */}
            <View className="w-[40%]">
              <View className="bg-[#E6E4D9] rounded-lg overflow-hidden aspect-[3/4] items-center justify-center relative">
                {coffee.bag_image_url ? (
                  <Image
                    source={{ uri: coffee.bag_image_url }}
                    className="w-full h-full"
                    resizeMode="contain"
                  />
                ) : (
                  <Text className="text-6xl">☕</Text>
                )}
                {/* Scan overlay */}
                <View className="absolute bottom-2 left-2 bg-white/90 rounded px-2 py-1">
                  <Text className="text-xs text-[#6F6E69]">📷 Scan</Text>
                </View>
              </View>
            </View>

            {/* Right Column - Meta Data (60%) */}
            <View className="flex-1 justify-between">
              {/* Rating Block */}
              <View>
                <View className="bg-[#D0A215] px-3 py-1 rounded-full self-start mb-2">
                  <Text className="text-xs text-white font-semibold">
                    That's about average ↓
                  </Text>
                </View>
                <Text className="text-5xl font-bold text-[#1C1B1A] mb-2">
                  {avgRating.toFixed(1)}
                </Text>
                <RatingStars rating={avgRating} size="sm" />
                <Text className="text-xs text-[#878580] mt-1">
                  {reviewCount} ratings
                </Text>

                {/* Match Score */}
                <TouchableOpacity className="flex-row items-center mt-4 bg-[#FFFCF0] px-3 py-2 rounded-lg border border-[#CECDC3]">
                  <View className="w-6 h-6 rounded-full bg-[#BC5215] mr-2" />
                  <Text className="text-xs text-[#6F6E69]">
                    Calculate your personal match
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Action Row */}
              <View className="flex-row gap-2 mt-4">
                <TouchableOpacity
                  onPress={() => setShowRatingModal(true)}
                  className="flex-1 border border-[#BC5215] px-3 py-2 rounded-lg flex-row items-center justify-center"
                >
                  <Ionicons name="star" size={16} color="#BC5215" />
                  <Text className="text-[#BC5215] font-semibold text-xs ml-1">
                    Rate
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 border border-[#6F6E69] px-3 py-2 rounded-lg flex-row items-center justify-center">
                  <MaterialIcons name="list" size={16} color="#6F6E69" />
                  <Text className="text-[#6F6E69] font-semibold text-xs ml-1">
                    Actions
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Bottom Meta (Full Width) */}
          <View className="mt-4">
            <Text className="text-xs text-[#878580] uppercase mb-1">
              {coffee.roasters?.name || "Unknown Roaster"}
            </Text>
            <Text className="text-2xl font-bold text-[#1C1B1A] mb-2">
              {coffee.name}
            </Text>
            <View className="flex-row items-center mb-2">
              <Text className="text-2xl mr-2">🇸🇻</Text>
              <Text className="text-sm text-[#6F6E69]">
                {coffee.origin
                  ? `Collected in ${coffee.origin}`
                  : "Origin unknown"}
                {coffee.roasters?.location
                  ? `, roasted in ${coffee.roasters.location}`
                  : ""}
              </Text>
            </View>
            <TouchableOpacity className="flex-row items-center">
              <Ionicons name="pencil" size={14} color="#BC5215" />
              <Text className="text-sm text-[#BC5215] underline ml-1">
                Change coffee
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* B. Purchase Module */}
        {coffee.price && (
          <View className="px-4 py-6 bg-[#FFFCF0] border-y border-[#CECDC3]">
            <View className="flex-row items-baseline mb-3">
              <Text className="text-3xl font-bold text-[#1C1B1A]">
                {coffee.price_currency === "EUR" ? "€" : "$"}
                {coffee.price.toFixed(2)}
              </Text>
              <Text className="text-sm text-[#878580] ml-2">
                /{coffee.weight || 250}gr
              </Text>
            </View>
            <TouchableOpacity
              className="bg-[#BC5215] py-4 rounded-lg"
              onPress={() => {
                if (coffee.product_url) {
                  // Open URL in browser
                  Alert.alert(
                    "Buy Coffee",
                    `This will open: ${coffee.product_url}`
                  );
                }
              }}
            >
              <Text className="text-white font-bold text-center text-lg">
                Buy now
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* D. Summary Section */}
        <View className="px-4 py-6">
          <Text className="text-xl font-bold text-[#1C1B1A] mb-4">
            Summary
          </Text>

          {/* Tabs */}
          <View className="flex-row mb-4">
            <TouchableOpacity
              onPress={() => setSummaryTab("highlights")}
              className={`flex-1 py-3 rounded-full mr-2 ${
                summaryTab === "highlights"
                  ? "bg-[#1C1B1A]"
                  : "bg-white border border-[#CECDC3]"
              }`}
            >
              <Text
                className={`text-center font-semibold ${
                  summaryTab === "highlights" ? "text-white" : "text-[#1C1B1A]"
                }`}
              >
                Highlights
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSummaryTab("facts")}
              className={`flex-1 py-3 rounded-full ${
                summaryTab === "facts"
                  ? "bg-[#1C1B1A]"
                  : "bg-white border border-[#CECDC3]"
              }`}
            >
              <Text
                className={`text-center font-semibold ${
                  summaryTab === "facts" ? "text-white" : "text-[#1C1B1A]"
                }`}
              >
                Facts
              </Text>
            </TouchableOpacity>
          </View>

          {/* Tab Content */}
          {summaryTab === "highlights" ? (
            <View className="gap-3">
              <View className="flex-row items-start">
                <View className="w-8 h-8 rounded-full bg-pink-100 items-center justify-center mr-3">
                  <Text className="text-lg">🏆</Text>
                </View>
                <Text className="flex-1 text-[#6F6E69] leading-6">
                  Featured in <Text className="font-bold">Top 25 coffees</Text>{" "}
                  in the app
                </Text>
              </View>
              <View className="flex-row items-start">
                <View className="w-8 h-8 rounded-full bg-yellow-100 items-center justify-center mr-3">
                  <Text className="text-lg">⭐</Text>
                </View>
                <Text className="flex-1 text-[#6F6E69] leading-6">
                  Among top{" "}
                  <Text className="font-bold">9% of all coffees</Text> in the
                  world
                </Text>
              </View>
              <View className="flex-row items-start">
                <View className="w-8 h-8 rounded-full bg-orange-100 items-center justify-center mr-3">
                  <Text className="text-lg">☕</Text>
                </View>
                <Text className="flex-1 text-[#6F6E69] leading-6">
                  You haven't tried this style yet
                </Text>
              </View>
            </View>
          ) : (
            <View className="gap-2">
              {coffee.origin && (
                <FactRow label="Origin" value={coffee.origin} />
              )}
              {coffee.region && (
                <FactRow label="Region" value={coffee.region} />
              )}
              {coffee.process && (
                <FactRow label="Process" value={coffee.process} />
              )}
              {coffee.roast_level && (
                <FactRow label="Roast Level" value={coffee.roast_level} />
              )}
              {coffee.varietal && (
                <FactRow label="Varietal" value={coffee.varietal} />
              )}
              {coffee.altitude && (
                <FactRow label="Altitude" value={coffee.altitude} />
              )}
            </View>
          )}
        </View>

        {/* E. Taste Characteristics */}
        <View className="px-4 py-6 bg-[#FFFCF0]">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-xl font-bold text-[#1C1B1A]">
              Taste characteristics
            </Text>
            <Ionicons name="pencil" size={18} color="#BC5215" />
          </View>
          <Text className="text-sm text-[#878580] mb-4">
            Based on {reviewCount} user reviews
          </Text>

          {/* Sliders - Real values from database */}
          {coffee.taste_body !== null && (
            <TasteSlider
              leftLabel="Light"
              rightLabel="Bold"
              value={coffee.taste_body}
            />
          )}
          {coffee.taste_sweetness !== null && (
            <TasteSlider
              leftLabel="Dry"
              rightLabel="Sweet"
              value={coffee.taste_sweetness}
            />
          )}
          {coffee.taste_acidity !== null && (
            <TasteSlider
              leftLabel="Soft"
              rightLabel="Acidic"
              value={coffee.taste_acidity}
            />
          )}

          {/* Flavor Description */}
          {coffee.flavor_description && (
            <View className="mt-4 p-4 bg-white rounded-lg border border-[#CECDC3]">
              <Text className="text-sm text-[#6F6E69] leading-6">
                {coffee.flavor_description}
              </Text>
            </View>
          )}

          {/* Flavor Tags */}
          <View className="mt-6">
            <Text className="text-lg font-semibold text-[#1C1B1A] mb-3">
              What people talk about
            </Text>
            {coffee.tasting_notes && coffee.tasting_notes.length > 0 ? (
              coffee.tasting_notes.map((note, index) => (
                <View
                  key={index}
                  className="flex-row items-center py-3 border-b border-[#CECDC3]"
                >
                  <View className="w-10 h-10 rounded-full bg-[#BC5215]/10 items-center justify-center mr-3">
                    <Text className="text-xl">☕</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="font-semibold text-[#1C1B1A]">
                      {note}
                    </Text>
                    <Text className="text-xs text-[#878580]">
                      Placeholder mention count
                    </Text>
                  </View>
                </View>
              ))
            ) : (
              <View className="flex-row items-center py-3 border-b border-[#CECDC3]">
                <View className="w-10 h-10 rounded-full bg-[#BC5215]/10 items-center justify-center mr-3">
                  <Text className="text-xl">🍋</Text>
                </View>
                <View className="flex-1">
                  <Text className="font-semibold text-[#1C1B1A]">
                    Citrus, lemon, lime
                  </Text>
                  <Text className="text-xs text-[#878580]">
                    575 mentions of citrus fruit notes
                  </Text>
                </View>
              </View>
            )}
            <TouchableOpacity className="mt-3">
              <Text className="text-[#BC5215] font-semibold">Show more</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* F. Reviews Module */}
        <View className="px-4 py-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-[#1C1B1A]">Reviews</Text>
            <TouchableOpacity onPress={() => setShowRatingModal(true)}>
              <Text className="text-[#BC5215] font-semibold">
                Add a new review
              </Text>
            </TouchableOpacity>
          </View>

          {/* Filter Chips */}
          <View className="flex-row gap-2 mb-4">
            <TouchableOpacity
              onPress={() => setReviewFilter("helpful")}
              className={`px-4 py-2 rounded-full border ${
                reviewFilter === "helpful"
                  ? "bg-[#1C1B1A] border-[#1C1B1A]"
                  : "bg-white border-[#CECDC3]"
              }`}
            >
              <Text
                className={
                  reviewFilter === "helpful" ? "text-white" : "text-[#1C1B1A]"
                }
              >
                Helpful
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setReviewFilter("recent")}
              className={`px-4 py-2 rounded-full border ${
                reviewFilter === "recent"
                  ? "bg-[#1C1B1A] border-[#1C1B1A]"
                  : "bg-white border-[#CECDC3]"
              }`}
            >
              <Text
                className={
                  reviewFilter === "recent" ? "text-white" : "text-[#1C1B1A]"
                }
              >
                Recent
              </Text>
            </TouchableOpacity>
          </View>

          {/* Reviews List */}
          {isLoadingReviews ? (
            <ActivityIndicator color="#BC5215" />
          ) : reviews && reviews.length > 0 ? (
            reviews.map((review) => (
              <ReviewCard
                key={review.id}
                username={review.users?.username || "Unknown"}
                displayName={review.users?.display_name || undefined}
                avatarUrl={review.users?.avatar_url || undefined}
                rating={review.rating}
                reviewText={review.review_text || undefined}
                brewingMethod={review.brewing_method || undefined}
                brewDate={review.brew_date || undefined}
                createdAt={review.created_at}
              />
            ))
          ) : (
            <View className="p-6 bg-[#FFFCF0] rounded-lg border border-[#CECDC3]">
              <Text className="text-[#6F6E69] text-center">
                No reviews yet.
              </Text>
              <Text className="text-[#878580] text-center mt-1">
                Be the first to review this coffee!
              </Text>
            </View>
          )}
        </View>

        {/* H. Recipes */}
        <View className="px-4 py-6 bg-[#FFFCF0]">
          <Text className="text-xl font-bold text-[#1C1B1A] mb-4">
            Recommended Recipes
          </Text>
          <RecipeStarGraph recipes={recipeGraphData} />
          {recipeVotes && recipeVotes.length > 0 ? (
            <Text className="text-xs text-[#878580] text-center mt-3">
              Based on {recipeVotes.reduce((sum, v) => sum + (v.vote_count || 0), 0)} votes
            </Text>
          ) : (
            <Text className="text-xs text-[#878580] text-center mt-3">
              No votes yet. Be the first to vote!
            </Text>
          )}
        </View>

        {/* J. Coffee Shop Info */}
        <View className="px-4 py-6">
          <Text className="text-xl font-bold text-[#1C1B1A] mb-4">
            About {coffee.roasters?.name || "this roaster"}
          </Text>

          <View className="bg-[#FFFCF0] rounded-lg border border-[#CECDC3] p-4 mb-4">
            <View className="flex-row items-center mb-3">
              <Text className="text-[#6F6E69] mr-3">44 coffees</Text>
              <View className="flex-row items-center bg-[#D0A215] px-2 py-1 rounded-full mr-3">
                <Text className="text-white font-bold text-xs">
                  {avgRating.toFixed(1)}
                </Text>
              </View>
              <Text className="text-[#878580] text-xs">
                {reviewCount} ratings
              </Text>
            </View>
          </View>

          {/* Roaster Locations Map */}
          {roasterLocations && roasterLocations.length > 0 ? (
            <RoasterLocationsMap
              locations={roasterLocations}
              roasterName={coffee.roasters?.name}
            />
          ) : (
            <RoasterMapPreview
              location={coffee.roasters?.location || "Location unknown"}
            />
          )}
        </View>

        {/* L. Recommendations */}
        <View className="py-6">
          <Text className="text-xl font-bold text-[#1C1B1A] mb-4 px-4">
            Similar coffees you might like
          </Text>
          <CoffeeCarousel coffees={placeholderSimilarCoffees} />
          <Text className="text-xs text-[#878580] text-center mt-3 px-4">
            Placeholder recommendation data
          </Text>
        </View>

        {/* Bottom Spacing */}
        <View className="h-8" />
      </Animated.ScrollView>

      {/* Rating Modal */}
      <Modal
        visible={showRatingModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowRatingModal(false)}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-3xl p-6">
            <Text className="text-2xl font-bold text-[#1C1B1A] mb-4">
              Rate {coffee.name}
            </Text>

            <Text className="text-[#6F6E69] mb-2">Your Rating:</Text>
            <View className="mb-4">
              <RatingStars
                rating={newRating}
                onRatingChange={setNewRating}
                size="lg"
                interactive={true}
              />
            </View>

            <Text className="text-[#6F6E69] mb-2">Review (optional):</Text>
            <TextInput
              className="bg-[#FFFCF0] p-3 rounded-lg mb-4 min-h-24 border border-[#CECDC3]"
              placeholder="Share your thoughts about this coffee..."
              placeholderTextColor="#B7B5AC"
              multiline
              value={newReviewText}
              onChangeText={setNewReviewText}
              textAlignVertical="top"
            />

            <View className="flex-row gap-3">
              <TouchableOpacity
                className="flex-1 bg-[#E6E4D9] px-6 py-3 rounded-lg"
                onPress={() => {
                  setShowRatingModal(false);
                  setNewRating(0);
                  setNewReviewText("");
                }}
              >
                <Text className="text-[#1C1B1A] font-semibold text-center">
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 bg-[#BC5215] px-6 py-3 rounded-lg"
                onPress={handleSubmitReview}
                disabled={createReview.isPending}
              >
                <Text className="text-white font-semibold text-center">
                  {createReview.isPending ? "Submitting..." : "Submit"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

function FactRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row justify-between py-2 border-b border-[#CECDC3]">
      <Text className="text-[#878580]">{label}</Text>
      <Text className="text-[#1C1B1A] font-semibold">{value}</Text>
    </View>
  );
}
