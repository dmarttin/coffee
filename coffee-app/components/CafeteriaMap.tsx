import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { View } from "react-native";
import { cn } from "../lib/utils";
import MapView from "./MapView";
import { Text } from "./ui/Text";

const cafeteriaMapVariants = cva("w-full", {
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

export type CafeteriaMapProps = React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof cafeteriaMapVariants> & {
    latitude: number;
    longitude: number;
    label?: string;
  };

const CafeteriaMap = React.forwardRef<
  React.ElementRef<typeof View>,
  CafeteriaMapProps
>(({ className, size, latitude, longitude, label, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn(cafeteriaMapVariants({ size, className }))}
      {...props}
    >
      <Text className="mb-3 text-sm font-semibold text-foreground">
        Location
      </Text>
      <MapView
        size={size === "sm" ? "sm" : "md"}
        markers={[{ id: "cafe", latitude, longitude, label }]}
      />
    </View>
  );
});

CafeteriaMap.displayName = "CafeteriaMap";

export default CafeteriaMap;
export { cafeteriaMapVariants };
