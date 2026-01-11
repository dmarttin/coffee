import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { View } from "react-native";
import { cn } from "../lib/utils";
import CoffeeCarousel from "./CoffeeCarousel";
import { Text } from "./ui/Text";

const similarCoffeesVariants = cva("w-full gap-3", {
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

export type SimilarCoffee = {
  id: string;
  name: string;
  roasterName: string;
  imageUrl?: string;
  rating: number;
  price?: string;
};

export type SimilarCoffeesProps = React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof similarCoffeesVariants> & {
    coffees: SimilarCoffee[];
    title?: string;
  };

const SimilarCoffees = React.forwardRef<
  React.ElementRef<typeof View>,
  SimilarCoffeesProps
>(({ className, tone, title = "Similar coffees", coffees, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn(similarCoffeesVariants({ tone, className }))}
      {...props}
    >
      <Text className="text-sm font-semibold text-foreground">{title}</Text>
      <CoffeeCarousel coffees={coffees} />
    </View>
  );
});

SimilarCoffees.displayName = "SimilarCoffees";

export default SimilarCoffees;
export { similarCoffeesVariants };
