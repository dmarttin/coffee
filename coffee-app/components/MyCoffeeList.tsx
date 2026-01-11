import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { View } from "react-native";
import { cn } from "../lib/utils";
import CoffeeCard from "./CoffeeCard";
import { Text } from "./ui/Text";

const myCoffeeListVariants = cva("w-full", {
  variants: {
    layout: {
      list: "gap-3",
      grid: "gap-3",
    },
  },
  defaultVariants: {
    layout: "list",
  },
});

export type MyCoffee = {
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

export type MyCoffeeListProps = React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof myCoffeeListVariants> & {
    coffees: MyCoffee[];
  };

const MyCoffeeList = React.forwardRef<
  React.ElementRef<typeof View>,
  MyCoffeeListProps
>(({ className, layout, coffees, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn(myCoffeeListVariants({ layout, className }))}
      {...props}
    >
      {coffees.length === 0 ? (
        <Text className="text-sm text-muted-foreground">
          No coffees yet.
        </Text>
      ) : (
        coffees.map((coffee) => (
          <CoffeeCard
            key={coffee.id}
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
        ))
      )}
    </View>
  );
});

MyCoffeeList.displayName = "MyCoffeeList";

export default MyCoffeeList;
export { myCoffeeListVariants };
