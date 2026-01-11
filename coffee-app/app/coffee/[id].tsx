import {
  ScrollView,
  View,
  Pressable,
  ActivityIndicator,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  useCoffee,
  useCoffeeLocations,
  useCoffeeReviews,
  useCreateReview,
  useCoffees,
  useSession,
} from "../../lib/queries";
import CoffeeHero from "../../components/CoffeeHero";
import CoffeeRating from "../../components/CoffeeRating";
import CoffeeInfo from "../../components/CoffeeInfo";
import CoffeeNotes from "../../components/CoffeeNotes";
import CoffeeMetrics from "../../components/CoffeeMetrics";
import ReviewSummary from "../../components/ReviewSummary";
import ReviewFull from "../../components/ReviewFull";
import CommentList, { type CommentListItem } from "../../components/CommentList";
import CommentInput from "../../components/CommentInput";
import SimilarCoffees from "../../components/SimilarCoffees";
import RatingStars from "../../components/RatingStars";
import TasteSlider from "../../components/TasteSlider";
import RoasterMapPreview from "../../components/RoasterMapPreview";
import WhereToFindPreview from "../../components/WhereToFindPreview";
import { Text } from "../../components/ui/Text";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Pencil } from "lucide-react-native";

export default function CoffeeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  // State
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [newReviewText, setNewReviewText] = useState("");
  const [notes, setNotes] = useState("");
  const [notesUpdatedAt, setNotesUpdatedAt] = useState<Date | null>(null);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<CommentListItem[]>([]);

  // Queries
  const { data: session } = useSession();
  const { data: coffee, isLoading } = useCoffee(id!);
  const { data: allCoffees } = useCoffees();
  const { data: reviews, isLoading: isLoadingReviews } = useCoffeeReviews(id!);
  const { data: coffeeLocations = [] } = useCoffeeLocations(id!);
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
        coffee_id: id!,
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

  const handleToggleNotesEdit = () => {
    setIsEditingNotes((prev) => {
      if (prev) {
        setNotesUpdatedAt(new Date());
      }
      return !prev;
    });
  };

  const handleDeleteNotes = () => {
    setNotes("");
    setNotesUpdatedAt(null);
  };

  const handleSendComment = () => {
    if (!commentText.trim()) return;
    setComments((prev) => [
      {
        id: `${Date.now()}`,
        username: session?.user?.email?.split("@")[0] || "guest",
        displayName: "You",
        text: commentText.trim(),
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
    setCommentText("");
  };

  // Calculate stats
  const avgRating =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  const reviewCount = reviews?.length || 0;

  const ratingBreakdown = useMemo(() => {
    if (!reviews || reviews.length === 0) return [];
    return [5, 4, 3, 2, 1].map((star) => ({
      label: `${star}★`,
      value: reviews.filter((review) => review.rating === star).length,
    }));
  }, [reviews]);

  const similarCoffees = useMemo(() => {
    if (!allCoffees || !coffee) return [];
    const related = allCoffees.filter(
      (item) =>
        item.id !== coffee.id &&
        (item.origin === coffee.origin || item.roaster_id === coffee.roaster_id)
    );
    const fallback = allCoffees.filter((item) => item.id !== coffee.id);
    const list = (related.length > 0 ? related : fallback).slice(0, 6);

    return list.map((item) => ({
      id: item.id,
      name: item.name,
      roasterName: item.roasters?.name || "Unknown Roaster",
      imageUrl: item.bag_image_url || undefined,
      rating: 0,
    }));
  }, [allCoffees, coffee]);

  // Loading state
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color="hsl(24, 87%, 41%)" />
      </View>
    );
  }

  // Error state
  if (!coffee) {
    return (
      <View className="flex-1 items-center justify-center bg-background p-8">
        <Text className="text-xl font-semibold text-foreground mb-2">
          Coffee not found
        </Text>
        <Button variant="default" onPress={() => router.back()} className="mt-4">
          <Text>Go Back</Text>
        </Button>
      </View>
    );
  }

  return (
    <>
      <ScrollView className="flex-1 bg-background">
        <View className="px-4 pt-6 pb-6">
          <CoffeeHero
            name={coffee.name}
            roasterName={coffee.roasters?.name || "Unknown Roaster"}
            origin={coffee.origin || "Origin unknown"}
            imageUrl={coffee.bag_image_url || undefined}
            rating={avgRating}
            reviewCount={reviewCount}
            onRate={() => setShowRatingModal(true)}
          />
        </View>

        <View className="px-4 pb-6">
          <CoffeeRating
            rating={avgRating}
            reviewCount={reviewCount}
            breakdown={ratingBreakdown}
          />
        </View>

        <View className="px-4 pb-6">
          <CoffeeInfo
            origin={coffee.origin || undefined}
            process={coffee.process || undefined}
            altitude={coffee.altitude || undefined}
            varietal={coffee.varietal || undefined}
            harvestDate={coffee.harvest_year || undefined}
          />
        </View>

        <View className="px-4 pb-6">
          <CoffeeMetrics metrics={[]} />
        </View>

        <View className="px-4 pb-6">
          <CoffeeNotes
            note={notes}
            updatedAt={notesUpdatedAt || undefined}
            flavorTags={coffee.tasting_notes || undefined}
            editable={isEditingNotes}
            onChangeText={setNotes}
            onEdit={handleToggleNotesEdit}
            onDelete={handleDeleteNotes}
          />
        </View>

        {/* Purchase Module */}
        {coffee.price && (
          <View className="px-4 py-6 bg-card border-y border-border">
            <View className="flex-row items-baseline mb-3">
              <Text className="text-3xl font-bold text-foreground">
                {coffee.price_currency === "EUR" ? "€" : "$"}
                {coffee.price.toFixed(2)}
              </Text>
              <Text className="text-sm text-muted-foreground ml-2">
                /{coffee.weight || 250}gr
              </Text>
            </View>
            <Button
              variant="default"
              onPress={() => {
                if (coffee.product_url) {
                  Alert.alert("Buy Coffee", `This will open: ${coffee.product_url}`);
                }
              }}
            >
              <Text>Buy now</Text>
            </Button>
          </View>
        )}

        {/* Taste Characteristics */}
        <View className="px-4 py-6 bg-card">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-xl font-bold text-foreground">
              Taste characteristics
            </Text>
            <Pencil size={18} color="hsl(24, 87%, 41%)" />
          </View>
          <Text className="text-sm text-muted-foreground mb-4">
            Based on {reviewCount} user reviews
          </Text>

          {coffee.taste_body !== null && coffee.taste_body !== undefined && (
            <TasteSlider leftLabel="Light" rightLabel="Bold" value={coffee.taste_body} />
          )}
          {coffee.taste_sweetness !== null && coffee.taste_sweetness !== undefined && (
            <TasteSlider leftLabel="Dry" rightLabel="Sweet" value={coffee.taste_sweetness} />
          )}
          {coffee.taste_acidity !== null && coffee.taste_acidity !== undefined && (
            <TasteSlider leftLabel="Soft" rightLabel="Acidic" value={coffee.taste_acidity} />
          )}

          {coffee.flavor_description && (
            <Card className="mt-4 p-4">
              <Text className="text-sm text-muted-foreground leading-6">
                {coffee.flavor_description}
              </Text>
            </Card>
          )}
        </View>

        {/* Reviews */}
        <View className="px-4 py-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-foreground">Reviews</Text>
            <Pressable onPress={() => setShowRatingModal(true)}>
              <Text className="text-primary font-semibold">Add a new review</Text>
            </Pressable>
          </View>

          <ReviewSummary
            rating={avgRating}
            reviewCount={reviewCount}
            breakdown={ratingBreakdown}
            summary={
              reviewCount > 0
                ? `Based on ${reviewCount} ratings`
                : "No reviews yet"
            }
            tags={coffee.tasting_notes || undefined}
          />

          <View className="mt-4">
            {isLoadingReviews ? (
              <ActivityIndicator color="hsl(24, 87%, 41%)" />
            ) : reviews && reviews.length > 0 ? (
              reviews.map((review) => (
                <ReviewFull
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
              <Card className="p-6">
                <Text className="text-muted-foreground text-center">
                  No reviews yet.
                </Text>
                <Text className="text-muted-foreground text-center mt-1">
                  Be the first to review this coffee!
                </Text>
              </Card>
            )}
          </View>

          <View className="mt-6">
            <Text className="text-lg font-semibold text-foreground mb-3">
              Comments
            </Text>
            <CommentInput
              value={commentText}
              onChangeText={setCommentText}
              onSend={handleSendComment}
            />
            <View className="mt-4">
              <CommentList comments={comments} />
            </View>
          </View>
        </View>

        <View className="px-4 pb-6">
          <WhereToFindPreview
            coffeeId={coffee.id}
            coffeeName={coffee.name}
            locations={coffeeLocations}
          />
        </View>

        {/* Roaster Info */}
        <View className="px-4 py-6">
          <Text className="text-xl font-bold text-foreground mb-4">
            About {coffee.roasters?.name || "this roaster"}
          </Text>

          <Card className="p-4 mb-4">
            <View className="flex-row items-center">
              <Text className="text-muted-foreground mr-3">Roaster</Text>
              <Badge variant="yellow">
                <Text>{avgRating.toFixed(1)}</Text>
              </Badge>
              <Text className="text-muted-foreground text-xs ml-3">
                {reviewCount} ratings
              </Text>
            </View>
          </Card>

          <RoasterMapPreview
            location={coffee.roasters?.location || "Location unknown"}
          />
        </View>

        {similarCoffees.length > 0 ? (
          <View className="px-4 pb-8">
            <SimilarCoffees coffees={similarCoffees} tone="elevated" />
          </View>
        ) : null}

        <View className="h-8" />
      </ScrollView>

      {/* Rating Modal */}
      <Modal
        visible={showRatingModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowRatingModal(false)}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-background rounded-t-3xl p-6">
            <Text className="text-2xl font-bold text-foreground mb-4">
              Rate {coffee.name}
            </Text>

            <Text className="text-muted-foreground mb-2">Your Rating:</Text>
            <View className="mb-4">
              <RatingStars
                rating={newRating}
                onRatingChange={setNewRating}
                size="lg"
                interactive={true}
              />
            </View>

            <Text className="text-muted-foreground mb-2">Review (optional):</Text>
            <TextInput
              className="bg-card p-3 rounded-lg mb-4 min-h-24 border border-border text-foreground"
              placeholder="Share your thoughts about this coffee..."
              placeholderTextColor="hsl(30, 4%, 51%)"
              multiline
              value={newReviewText}
              onChangeText={setNewReviewText}
              textAlignVertical="top"
            />

            <View className="flex-row gap-3">
              <Button
                variant="secondary"
                className="flex-1"
                onPress={() => {
                  setShowRatingModal(false);
                  setNewRating(0);
                  setNewReviewText("");
                }}
              >
                <Text>Cancel</Text>
              </Button>
              <Button
                variant="default"
                className="flex-1"
                onPress={handleSubmitReview}
                loading={createReview.isPending}
              >
                <Text>Submit</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
