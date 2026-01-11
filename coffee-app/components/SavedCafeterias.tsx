import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { View } from "react-native";
import { cn } from "../lib/utils";
import LocationList, { type LocationListItem } from "./LocationList";
import { Text } from "./ui/Text";

const savedCafeteriasVariants = cva("w-full", {
  variants: {
    density: {
      cozy: "gap-3",
      tight: "gap-2",
    },
  },
  defaultVariants: {
    density: "cozy",
  },
});

export type SavedCafeteriasProps = React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof savedCafeteriasVariants> & {
    cafeterias: LocationListItem[];
    onSelect?: (cafeteria: LocationListItem) => void;
  };

const SavedCafeterias = React.forwardRef<
  React.ElementRef<typeof View>,
  SavedCafeteriasProps
>(({ className, density, cafeterias, onSelect, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn(savedCafeteriasVariants({ density, className }))}
      {...props}
    >
      {cafeterias.length === 0 ? (
        <Text className="text-sm text-muted-foreground">
          No cafeterias saved yet.
        </Text>
      ) : (
        <LocationList locations={cafeterias} onSelect={onSelect} />
      )}
    </View>
  );
});

SavedCafeterias.displayName = "SavedCafeterias";

export default SavedCafeterias;
export { savedCafeteriasVariants };
