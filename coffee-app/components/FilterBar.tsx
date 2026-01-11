import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Pressable, ScrollView, View } from "react-native";
import { cn } from "../lib/utils";
import { Text } from "./ui/Text";

const filterBarVariants = cva("flex-row items-center", {
  variants: {
    size: {
      sm: "gap-2",
      md: "gap-3",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const filterChipVariants = cva(
  "px-3 py-1.5 rounded-full border flex-row items-center",
  {
    variants: {
      state: {
        default: "bg-secondary border-border",
        selected: "bg-primary border-primary",
      },
      density: {
        cozy: "",
        tight: "px-2.5 py-1",
      },
    },
    defaultVariants: {
      state: "default",
      density: "cozy",
    },
  }
);

const filterChipTextVariants = cva("text-xs font-semibold", {
  variants: {
    state: {
      default: "text-foreground",
      selected: "text-primary-foreground",
    },
  },
  defaultVariants: {
    state: "default",
  },
});

export type FilterOption = {
  id: string;
  label: string;
  selected?: boolean;
  count?: number;
  onPress?: (id: string) => void;
};

export type FilterBarProps = React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof filterBarVariants> & {
    filters: FilterOption[];
    onClear?: () => void;
  };

const FilterBar = React.forwardRef<
  React.ElementRef<typeof View>,
  FilterBarProps
>(({ className, size, filters, onClear, ...props }, ref) => {
  return (
    <View ref={ref} className={cn("w-full", className)} {...props}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="w-full"
        contentContainerClassName={cn("items-center", filterBarVariants({ size }))}
      >
        {filters.map((filter) => {
          const state = filter.selected ? "selected" : "default";
          return (
            <Pressable
              key={filter.id}
              onPress={() => filter.onPress?.(filter.id)}
              className={cn(filterChipVariants({ state }))}
            >
              <Text className={filterChipTextVariants({ state })}>
                {filter.label}
              </Text>
              {typeof filter.count === "number" ? (
                <Text
                  className={cn(
                    "ml-1 text-[10px]",
                    state === "selected"
                      ? "text-primary-foreground/80"
                      : "text-muted-foreground"
                  )}
                >
                  {filter.count}
                </Text>
              ) : null}
            </Pressable>
          );
        })}
        {onClear ? (
          <Pressable
            onPress={onClear}
            className="px-3 py-1.5 rounded-full border border-border"
          >
            <Text className="text-xs font-semibold text-muted-foreground">
              Clear
            </Text>
          </Pressable>
        ) : null}
      </ScrollView>
    </View>
  );
});

FilterBar.displayName = "FilterBar";

export default FilterBar;
export { filterBarVariants, filterChipVariants };
