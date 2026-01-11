import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { View } from "react-native";
import { cn } from "../lib/utils";
import CoffeeCard from "./CoffeeCard";
import { Text } from "./ui/Text";

const availableCoffeesVariants = cva("w-full", {
  variants: {
    layout: {
      list: "gap-3",
      grid: "flex-row flex-wrap gap-3",
    },
  },
  defaultVariants: {
    layout: "list",
  },
});

export type AvailableCoffee = {
  id: string;
  name: string;
  roasterName: string;
  roasterLogoUrl?: string;
  origin?: string;
  process?: string;
  bagImageUrl?: string;
  averageRating?: number;
  reviewCount?: number;
  tastingNotes?: string[];
};

export type AvailableCoffeesProps = React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof availableCoffeesVariants> & {
    coffees: AvailableCoffee[];
  };

const AvailableCoffees = React.forwardRef<
  React.ElementRef<typeof View>,
  AvailableCoffeesProps
>(({ className, layout, coffees, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn(availableCoffeesVariants({ layout, className }))}
      {...props}
    >
      {coffees.length === 0 ? (
        <Text className="text-sm text-muted-foreground">
          No coffees listed yet.
        </Text>
      ) : (
        coffees.map((coffee) => (
          <View
            key={coffee.id}
            className={cn(layout === "grid" ? "w-full" : "w-full")}
          >
            <CoffeeCard
              id={coffee.id}
              name={coffee.name}
              roasterName={coffee.roasterName}
              roasterLogoUrl={coffee.roasterLogoUrl}
              origin={coffee.origin}
              process={coffee.process}
              bagImageUrl={coffee.bagImageUrl}
              averageRating={coffee.averageRating}
              reviewCount={coffee.reviewCount}
              tastingNotes={coffee.tastingNotes}
            />
          </View>
        ))
      )}
    </View>
  );
});

AvailableCoffees.displayName = "AvailableCoffees";

export default AvailableCoffees;
export { availableCoffeesVariants };
