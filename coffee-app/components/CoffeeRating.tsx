import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { View } from "react-native";
import { cn } from "../lib/utils";
import RatingStars from "./RatingStars";
import { Separator } from "./ui/Separator";
import { Text } from "./ui/Text";

const coffeeRatingVariants = cva(
  "w-full rounded-xl border border-border bg-card p-4",
  {
    variants: {
      layout: {
        stack: "flex-col",
        split: "flex-row gap-4",
      },
    },
    defaultVariants: {
      layout: "split",
    },
  }
);

export type RatingBreakdown = {
  label: string;
  value: number;
};

export type CoffeeRatingProps = React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof coffeeRatingVariants> & {
    rating: number;
    reviewCount: number;
    breakdown?: RatingBreakdown[];
  };

const CoffeeRating = React.forwardRef<
  React.ElementRef<typeof View>,
  CoffeeRatingProps
>(({ className, layout, rating, reviewCount, breakdown, ...props }, ref) => {
  const hasBreakdown = breakdown && breakdown.length > 0;
  const maxValue = hasBreakdown
    ? Math.max(...breakdown.map((item) => item.value), 1)
    : 1;

  return (
    <View
      ref={ref}
      className={cn(coffeeRatingVariants({ layout, className }))}
      {...props}
    >
      <View className="flex-1">
        <Text className="text-display-sm font-display text-foreground">
          {rating.toFixed(1)}
        </Text>
        <RatingStars rating={rating} size="sm" />
        <Text className="mt-2 text-xs text-muted-foreground">
          {reviewCount} reviews
        </Text>
      </View>

      {hasBreakdown ? (
        <>
          {layout === "split" ? (
            <Separator className="mx-1 h-full w-px" />
          ) : (
            <Separator className="my-4" />
          )}
          <View className={cn(layout === "split" ? "flex-1" : "w-full")}> 
            {breakdown.map((item) => (
              <View key={item.label} className="mb-2 flex-row items-center">
                <Text className="w-12 text-xs text-muted-foreground">
                  {item.label}
                </Text>
                <View className="mx-2 flex-1">
                  <View className="h-2 w-full rounded-full bg-muted">
                    <View
                      className="h-2 rounded-full bg-amber"
                      style={{ width: `${(item.value / maxValue) * 100}%` }}
                    />
                  </View>
                </View>
                <Text className="w-10 text-right text-xs text-muted-foreground">
                  {item.value}
                </Text>
              </View>
            ))}
          </View>
        </>
      ) : null}
    </View>
  );
});

CoffeeRating.displayName = "CoffeeRating";

export default CoffeeRating;
export { coffeeRatingVariants };
