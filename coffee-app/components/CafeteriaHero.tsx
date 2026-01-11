import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Image, View } from "react-native";
import { cn } from "../lib/utils";
import RatingStars from "./RatingStars";
import { Badge } from "./ui/Badge";
import { Text } from "./ui/Text";

const cafeteriaHeroVariants = cva("w-full rounded-2xl border border-border bg-card", {
  variants: {
    layout: {
      split: "flex-row",
      stacked: "flex-col",
    },
  },
  defaultVariants: {
    layout: "split",
  },
});

export type CafeteriaHeroProps = React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof cafeteriaHeroVariants> & {
    name: string;
    imageUrl?: string;
    hours?: string;
    address?: string;
    rating?: number;
    reviewCount?: number;
    tags?: string[];
  };

const CafeteriaHero = React.forwardRef<
  React.ElementRef<typeof View>,
  CafeteriaHeroProps
>(
  (
    {
      className,
      layout,
      name,
      imageUrl,
      hours,
      address,
      rating,
      reviewCount,
      tags,
      ...props
    },
    ref
  ) => {
    return (
      <View
        ref={ref}
        className={cn("p-4", cafeteriaHeroVariants({ layout, className }))}
        {...props}
      >
        <View className={cn("gap-4", layout === "split" ? "flex-row" : "flex-col")}>
          <View className="h-36 w-36 overflow-hidden rounded-xl bg-secondary">
            {imageUrl ? (
              <Image
                source={{ uri: imageUrl }}
                className="h-full w-full"
                resizeMode="cover"
              />
            ) : (
              <View className="h-full w-full items-center justify-center">
                <View className="h-12 w-12 rounded-full bg-border" />
              </View>
            )}
          </View>

          <View className="flex-1">
            <Text className="text-display-sm font-display text-foreground">
              {name}
            </Text>
            {address ? (
              <Text className="mt-1 text-sm text-muted-foreground">
                {address}
              </Text>
            ) : null}
            {hours ? (
              <Text className="mt-1 text-xs text-muted-foreground">
                {hours}
              </Text>
            ) : null}

            {typeof rating === "number" ? (
              <View className="mt-3">
                <RatingStars rating={rating} size="sm" />
                <Text className="mt-1 text-xs text-muted-foreground">
                  {rating.toFixed(1)}
                  {typeof reviewCount === "number"
                    ? ` - ${reviewCount} reviews`
                    : ""}
                </Text>
              </View>
            ) : null}
          </View>
        </View>

        {tags && tags.length > 0 ? (
          <View className="mt-4 flex-row flex-wrap gap-2">
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

CafeteriaHero.displayName = "CafeteriaHero";

export default CafeteriaHero;
export { cafeteriaHeroVariants };
