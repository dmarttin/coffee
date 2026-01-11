import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { View } from "react-native";
import { cn } from "../lib/utils";
import CoffeeRating, { type RatingBreakdown } from "./CoffeeRating";
import { Badge } from "./ui/Badge";
import { Text } from "./ui/Text";

const reviewSummaryVariants = cva("w-full", {
  variants: {
    layout: {
      stack: "gap-4",
      split: "gap-3",
    },
  },
  defaultVariants: {
    layout: "stack",
  },
});

export type ReviewSummaryProps = React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof reviewSummaryVariants> & {
    rating: number;
    reviewCount: number;
    breakdown?: RatingBreakdown[];
    summary?: string;
    tags?: string[];
  };

const ReviewSummary = React.forwardRef<
  React.ElementRef<typeof View>,
  ReviewSummaryProps
>(
  (
    {
      className,
      layout,
      rating,
      reviewCount,
      breakdown,
      summary,
      tags,
      ...props
    },
    ref
  ) => {
    return (
      <View
        ref={ref}
        className={cn(reviewSummaryVariants({ layout, className }))}
        {...props}
      >
        <CoffeeRating
          rating={rating}
          reviewCount={reviewCount}
          breakdown={breakdown}
        />
        {summary ? (
          <Text className="text-sm text-muted-foreground">{summary}</Text>
        ) : null}
        {tags && tags.length > 0 ? (
          <View className="flex-row flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                <Text>{tag}</Text>
              </Badge>
            ))}
          </View>
        ) : null}
      </View>
    );
  }
);

ReviewSummary.displayName = "ReviewSummary";

export default ReviewSummary;
export { reviewSummaryVariants };
