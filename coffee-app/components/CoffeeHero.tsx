import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Image, Pressable, View } from "react-native";
import { Share2, ShoppingCart } from "lucide-react-native";
import { cn } from "../lib/utils";
import RatingStars from "./RatingStars";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { Icon } from "./ui/Icon";
import { Text } from "./ui/Text";

const coffeeHeroVariants = cva("w-full", {
  variants: {
    variant: {
      default: "bg-background",
      elevated: "bg-card",
    },
    layout: {
      split: "flex-row gap-4",
      stacked: "flex-col gap-4",
    },
  },
  defaultVariants: {
    variant: "default",
    layout: "split",
  },
});

export type CoffeeHeroProps = React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof coffeeHeroVariants> & {
    name: string;
    roasterName?: string;
    origin?: string;
    imageUrl?: string;
    rating?: number;
    reviewCount?: number;
    onShare?: () => void;
    onRate?: () => void;
    onAddToCart?: () => void;
  };

const CoffeeHero = React.forwardRef<React.ElementRef<typeof View>, CoffeeHeroProps>(
  (
    {
      className,
      variant,
      layout,
      name,
      roasterName,
      origin,
      imageUrl,
      rating,
      reviewCount,
      onShare,
      onRate,
      onAddToCart,
      ...props
    },
    ref
  ) => {
    return (
      <View
        ref={ref}
        className={cn(
          "rounded-2xl border border-border p-4",
          coffeeHeroVariants({ variant, layout, className })
        )}
        {...props}
      >
        <View className={cn("gap-4", layout === "split" ? "flex-row" : "flex-col")}>
          <View className="relative h-44 w-32 overflow-hidden rounded-xl bg-secondary items-center justify-center">
            {imageUrl ? (
              <Image
                source={{ uri: imageUrl }}
                className="h-full w-full"
                resizeMode="cover"
              />
            ) : (
              <View className="h-16 w-16 rounded-full bg-border" />
            )}
            <View className="absolute inset-0 bg-coffee-900/20" />
          </View>

          <View className="flex-1 justify-between">
            <View>
              {origin ? (
                <Badge variant="secondary" className="self-start">
                  <Text>{origin}</Text>
                </Badge>
              ) : null}
              <Text className="mt-2 text-display-sm font-display text-foreground">
                {name}
              </Text>
              {roasterName ? (
                <Text className="mt-1 text-sm text-muted-foreground">
                  {roasterName}
                </Text>
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

        <View className="mt-4 flex-row items-center gap-2">
          {onRate ? (
            <Button variant="outline" size="sm" onPress={onRate}>
              <Text>Rate</Text>
            </Button>
          ) : null}
          {onShare ? (
            <Pressable
              onPress={onShare}
              className="h-10 w-10 items-center justify-center rounded-full border border-border"
            >
              <Icon icon={Share2} tone="muted" iconSize={18} />
            </Pressable>
          ) : null}
          {onAddToCart ? (
            <Pressable
              onPress={onAddToCart}
              className="h-10 w-10 items-center justify-center rounded-full border border-border"
            >
              <Icon icon={ShoppingCart} tone="muted" iconSize={18} />
            </Pressable>
          ) : null}
          {!onRate && !onShare && !onAddToCart ? (
            <View className="h-10" />
          ) : null}
        </View>
      </View>
    );
  }
);

CoffeeHero.displayName = "CoffeeHero";

export default CoffeeHero;
export { coffeeHeroVariants };
