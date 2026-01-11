import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { View } from "react-native";
import { cn } from "../lib/utils";
import AvailableCoffees, { type AvailableCoffee } from "./AvailableCoffees";
import { Text } from "./ui/Text";

const brandCoffeesVariants = cva("w-full", {
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

export type BrandCoffeesProps = React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof brandCoffeesVariants> & {
    coffees: AvailableCoffee[];
  };

const BrandCoffees = React.forwardRef<
  React.ElementRef<typeof View>,
  BrandCoffeesProps
>(({ className, layout, coffees, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn(brandCoffeesVariants({ layout, className }))}
      {...props}
    >
      <Text className="text-sm font-semibold text-foreground">
        Coffees from this roaster
      </Text>
      <AvailableCoffees coffees={coffees} layout={layout} />
    </View>
  );
});

BrandCoffees.displayName = "BrandCoffees";

export default BrandCoffees;
export { brandCoffeesVariants };
