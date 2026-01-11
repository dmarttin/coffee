import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { View } from "react-native";
import { cn } from "../lib/utils";
import CoffeeCarousel from "./CoffeeCarousel";
import { Text } from "./ui/Text";

const recommendationSectionVariants = cva("w-full gap-3", {
  variants: {
    tone: {
      default: "",
      elevated: "rounded-2xl border border-border bg-card p-4",
    },
  },
  defaultVariants: {
    tone: "default",
  },
});

export type RecommendationItem = {
  id: string;
  name: string;
  roasterName: string;
  imageUrl?: string;
  rating: number;
  price?: string;
};

export type RecommendationSectionProps = React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof recommendationSectionVariants> & {
    title?: string;
    description?: string;
    coffees: RecommendationItem[];
  };

const RecommendationSection = React.forwardRef<
  React.ElementRef<typeof View>,
  RecommendationSectionProps
>(
  (
    { className, tone, title = "You might like", description, coffees, ...props }, ref) => {
      return (
        <View
          ref={ref}
          className={cn(recommendationSectionVariants({ tone, className }))}
          {...props}
        >
          <View>
            <Text className="text-sm font-semibold text-foreground">{title}</Text>
            {description ? (
              <Text className="mt-1 text-xs text-muted-foreground">
                {description}
              </Text>
            ) : null}
          </View>
          <CoffeeCarousel coffees={coffees} />
        </View>
      );
    }
  )
);

RecommendationSection.displayName = "RecommendationSection";

export default RecommendationSection;
export { recommendationSectionVariants };
