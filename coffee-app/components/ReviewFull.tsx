import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Image, Pressable, View } from "react-native";
import { Heart, MessageCircle } from "lucide-react-native";
import { cn } from "../lib/utils";
import RatingStars from "./RatingStars";
import { Badge } from "./ui/Badge";
import { Card } from "./ui/Card";
import { Icon } from "./ui/Icon";
import { Text } from "./ui/Text";

const reviewFullVariants = cva("", {
  variants: {
    density: {
      cozy: "",
      tight: "",
    },
  },
  defaultVariants: {
    density: "cozy",
  },
});

export type ReviewFullProps = React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof reviewFullVariants> & {
    username: string;
    displayName?: string;
    avatarUrl?: string;
    rating: number;
    reviewText?: string;
    createdAt: string | Date;
    brewMethod?: string;
    brewDate?: string | Date;
    tags?: string[];
    likes?: number;
    onLike?: () => void;
    onReply?: () => void;
  };

const ReviewFull = React.forwardRef<
  React.ElementRef<typeof View>,
  ReviewFullProps
>(
  (
    {
      className,
      density,
      username,
      displayName,
      avatarUrl,
      rating,
      reviewText,
      createdAt,
      brewMethod,
      brewDate,
      tags,
      likes,
      onLike,
      onReply,
      ...props
    },
    ref
  ) => {
    const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    return (
      <Card
        ref={ref}
        className={cn("p-4", reviewFullVariants({ density, className }))}
        {...props}
      >
        <View className="flex-row items-center gap-3">
          <View className="h-12 w-12 overflow-hidden rounded-full bg-secondary">
            {avatarUrl ? (
              <Image source={{ uri: avatarUrl }} className="h-full w-full" />
            ) : (
              <View className="h-full w-full items-center justify-center">
                <Text className="text-sm text-muted-foreground">User</Text>
              </View>
            )}
          </View>
          <View className="flex-1">
            <Text className="text-sm font-semibold text-foreground">
              {displayName || username}
            </Text>
            <Text className="text-xs text-muted-foreground">
              {formattedDate}
            </Text>
          </View>
        </View>

        <View className="mt-3 flex-row items-center justify-between">
          <RatingStars rating={rating} size="sm" />
          {brewMethod ? (
            <Badge variant="secondary">
              <Text>{brewMethod}</Text>
            </Badge>
          ) : null}
        </View>

        {reviewText ? (
          <Text className="mt-3 text-sm text-foreground">{reviewText}</Text>
        ) : null}

        {brewDate ? (
          <Text className="mt-2 text-xs text-muted-foreground">
            Brewed {new Date(brewDate).toLocaleDateString("en-US")}
          </Text>
        ) : null}

        {tags && tags.length > 0 ? (
          <View className="mt-3 flex-row flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline">
                <Text>{tag}</Text>
              </Badge>
            ))}
          </View>
        ) : null}

        <View className="mt-4 flex-row items-center gap-4">
          {onLike ? (
            <Pressable onPress={onLike} className="flex-row items-center gap-2">
              <Icon icon={Heart} tone="muted" iconSize={16} />
              <Text className="text-xs text-muted-foreground">
                {likes ?? 0}
              </Text>
            </Pressable>
          ) : null}
          {onReply ? (
            <Pressable onPress={onReply} className="flex-row items-center gap-2">
              <Icon icon={MessageCircle} tone="muted" iconSize={16} />
              <Text className="text-xs text-muted-foreground">Reply</Text>
            </Pressable>
          ) : null}
        </View>
      </Card>
    );
  }
);

ReviewFull.displayName = "ReviewFull";

export default ReviewFull;
export { reviewFullVariants };
