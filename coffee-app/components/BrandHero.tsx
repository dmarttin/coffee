import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Image, View } from "react-native";
import { cn } from "../lib/utils";
import RatingStars from "./RatingStars";
import { Badge } from "./ui/Badge";
import { Text } from "./ui/Text";

const brandHeroVariants = cva("w-full rounded-2xl border border-border bg-card p-4", {
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

export type BrandHeroProps = React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof brandHeroVariants> & {
    name: string;
    logoUrl?: string;
    description?: string;
    founded?: string;
    location?: string;
    rating?: number;
    reviewCount?: number;
  };

const BrandHero = React.forwardRef<React.ElementRef<typeof View>, BrandHeroProps>(
  (
    {
      className,
      layout,
      name,
      logoUrl,
      description,
      founded,
      location,
      rating,
      reviewCount,
      ...props
    },
    ref
  ) => {
    return (
      <View
        ref={ref}
        className={cn(brandHeroVariants({ layout, className }))}
        {...props}
      >
        <View className={cn("gap-4", layout === "split" ? "flex-row" : "flex-col")}>
          <View className="h-20 w-20 overflow-hidden rounded-2xl bg-secondary">
            {logoUrl ? (
              <Image source={{ uri: logoUrl }} className="h-full w-full" resizeMode="cover" />
            ) : (
              <View className="h-full w-full items-center justify-center">
                <View className="h-10 w-10 rounded-full bg-border" />
              </View>
            )}
          </View>
          <View className="flex-1">
            <Text className="text-display-sm font-display text-foreground">
              {name}
            </Text>
            {description ? (
              <Text className="mt-2 text-sm text-muted-foreground">
                {description}
              </Text>
            ) : null}
            <View className="mt-3 flex-row flex-wrap gap-2">
              {founded ? (
                <Badge variant="secondary">
                  <Text>Founded {founded}</Text>
                </Badge>
              ) : null}
              {location ? (
                <Badge variant="secondary">
                  <Text>{location}</Text>
                </Badge>
              ) : null}
            </View>
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
      </View>
    );
  }
);

BrandHero.displayName = "BrandHero";

export default BrandHero;
export { brandHeroVariants };
