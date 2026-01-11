import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Pressable, View } from "react-native";
import { cn } from "../lib/utils";
import { Text } from "./ui/Text";

const cafeteriaMapFiltersVariants = cva("w-full flex-row flex-wrap gap-2", {
  variants: {
    size: {
      sm: "",
      md: "",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const filterChipVariants = cva("rounded-full border px-3 py-1.5", {
  variants: {
    state: {
      selected: "bg-primary border-primary",
      default: "bg-secondary border-border",
    },
  },
  defaultVariants: {
    state: "default",
  },
});

export type CafeteriaMapFilter = {
  id: string;
  label: string;
  selected?: boolean;
};

export type CafeteriaMapFiltersProps = React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof cafeteriaMapFiltersVariants> & {
    filters: CafeteriaMapFilter[];
    onToggle?: (id: string) => void;
  };

const CafeteriaMapFilters = React.forwardRef<
  React.ElementRef<typeof View>,
  CafeteriaMapFiltersProps
>(({ className, size, filters, onToggle, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn(cafeteriaMapFiltersVariants({ size, className }))}
      {...props}
    >
      {filters.map((filter) => {
        const state = filter.selected ? "selected" : "default";
        return (
          <Pressable
            key={filter.id}
            onPress={() => onToggle?.(filter.id)}
            className={cn(filterChipVariants({ state }))}
          >
            <Text
              className={cn(
                "text-xs font-semibold",
                state === "selected" ? "text-primary-foreground" : "text-foreground"
              )}
            >
              {filter.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
});

CafeteriaMapFilters.displayName = "CafeteriaMapFilters";

export default CafeteriaMapFilters;
export { cafeteriaMapFiltersVariants };
