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
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  useCoffee,
  useCoffeeReviews,
  useCreateReview,
  useToggleFavorite,
  useSession,
} from "../../lib/queries";
import RatingStars from "../../components/RatingStars";
import ReviewCard from "../../components/ReviewCard";

export default function CoffeeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [newReviewText, setNewReviewText] = useState("");

  const { data: session } = useSession();
  const { data: coffee, isLoading } = useCoffee(id);
  const { data: reviews, isLoading: isLoadingReviews } = useCoffeeReviews(id);
  const createReview = useCreateReview();
  const toggleFavorite = useToggleFavorite();

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

  const avgRating =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#8B4513" />
      </View>
    );
  }

  if (!coffee) {
    return (
      <View className="flex-1 items-center justify-center bg-white p-8">
        <Text className="text-xl font-semibold text-gray-800 mb-2">
          Coffee not found
        </Text>
        <TouchableOpacity
          className="bg-amber-700 px-6 py-3 rounded-lg mt-4"
          onPress={() => router.back()}
        >
          <Text className="text-white font-semibold">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      <ScrollView className="flex-1 bg-white">
        <View className="p-4">
          {/* Coffee Image */}
          <View className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden items-center justify-center mb-4">
            {coffee.bag_image_url ? (
              <Image
                source={{ uri: coffee.bag_image_url }}
                className="w-full h-full"
                resizeMode="cover"
              />
            ) : (
              <>
                <Text className="text-6xl">📷</Text>
                <Text className="text-gray-500 mt-2">No Image</Text>
              </>
            )}
          </View>

          {/* Coffee Name & Roaster */}
          <Text className="text-2xl font-bold text-gray-800 mb-2">
            {coffee.name}
          </Text>
          <TouchableOpacity
            onPress={() => router.push(`/roaster/${coffee.roaster_id}`)}
          >
            <Text className="text-lg text-amber-700 mb-4">
              {coffee.roasters?.name || "Unknown Roaster"}
            </Text>
          </TouchableOpacity>

          {/* Rating */}
          <View className="flex-row items-center mb-4">
            <RatingStars rating={avgRating} size="md" />
            <Text className="ml-2 text-gray-600">
              {avgRating.toFixed(1)} ({reviews?.length || 0}{" "}
              {reviews?.length === 1 ? "review" : "reviews"})
            </Text>
          </View>

          {/* Details */}
          {(coffee.origin ||
            coffee.region ||
            coffee.process ||
            coffee.roast_level ||
            coffee.varietal ||
            coffee.altitude) && (
            <View className="bg-gray-50 p-4 rounded-lg mb-4">
              {coffee.origin && <DetailRow label="Origin" value={coffee.origin} />}
              {coffee.region && <DetailRow label="Region" value={coffee.region} />}
              {coffee.process && <DetailRow label="Process" value={coffee.process} />}
              {coffee.roast_level && (
                <DetailRow label="Roast Level" value={coffee.roast_level} />
              )}
              {coffee.varietal && (
                <DetailRow label="Varietal" value={coffee.varietal} />
              )}
              {coffee.altitude && (
                <DetailRow label="Altitude" value={coffee.altitude} />
              )}
            </View>
          )}

          {/* Tasting Notes */}
          {coffee.tasting_notes && coffee.tasting_notes.length > 0 && (
            <>
              <Text className="text-xl font-bold text-gray-800 mb-3">
                Tasting Notes
              </Text>
              <View className="flex-row flex-wrap gap-2 mb-6">
                {coffee.tasting_notes.map((note) => (
                  <View key={note} className="bg-amber-100 px-3 py-2 rounded-full">
                    <Text className="text-amber-900">{note}</Text>
                  </View>
                ))}
              </View>
            </>
          )}

          {/* Actions */}
          <View className="flex-row gap-3 mb-6">
            <TouchableOpacity
              className="flex-1 bg-amber-700 px-6 py-3 rounded-lg"
              onPress={() => setShowRatingModal(true)}
            >
              <Text className="text-white font-semibold text-center">
                Add Review
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-gray-200 px-6 py-3 rounded-lg">
              <Text className="text-gray-800 font-semibold text-center">
                Favorite
              </Text>
            </TouchableOpacity>
          </View>

          {/* Reviews Section */}
          <Text className="text-xl font-bold text-gray-800 mb-3">Reviews</Text>
          {isLoadingReviews ? (
            <ActivityIndicator color="#8B4513" />
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
            <View className="p-6 bg-gray-50 rounded-lg">
              <Text className="text-gray-600 text-center">No reviews yet.</Text>
              <Text className="text-gray-500 text-center mt-1">
                Be the first to review this coffee!
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Rating Modal */}
      <Modal
        visible={showRatingModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowRatingModal(false)}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-3xl p-6">
            <Text className="text-2xl font-bold text-gray-800 mb-4">
              Rate {coffee.name}
            </Text>

            <Text className="text-gray-700 mb-2">Your Rating:</Text>
            <View className="mb-4">
              <RatingStars
                rating={newRating}
                onRatingChange={setNewRating}
                size="lg"
                interactive={true}
              />
            </View>

            <Text className="text-gray-700 mb-2">Review (optional):</Text>
            <TextInput
              className="bg-gray-100 p-3 rounded-lg mb-4 min-h-24"
              placeholder="Share your thoughts about this coffee..."
              multiline
              value={newReviewText}
              onChangeText={setNewReviewText}
              textAlignVertical="top"
            />

            <View className="flex-row gap-3">
              <TouchableOpacity
                className="flex-1 bg-gray-200 px-6 py-3 rounded-lg"
                onPress={() => {
                  setShowRatingModal(false);
                  setNewRating(0);
                  setNewReviewText("");
                }}
              >
                <Text className="text-gray-800 font-semibold text-center">
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 bg-amber-700 px-6 py-3 rounded-lg"
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

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row justify-between py-2 border-b border-gray-200">
      <Text className="text-gray-600">{label}</Text>
      <Text className="text-gray-800 font-semibold">{value}</Text>
    </View>
  );
}
