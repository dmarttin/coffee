import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { View } from "react-native";
import { Coffee, Store, MapPin } from "lucide-react-native";
import { cn } from "../../lib/utils";
import { colors } from "../../lib/theme";
import type { Location } from "../../types/location";

const mapMarkerVariants = cva(
  "items-center justify-center rounded-full border-2 shadow-md",
  {
    variants: {
      type: {
        cafe: "bg-amber border-amber-dark",
        roastery: "bg-coffee-600 border-coffee-800",
        shop: "bg-secondary border-border",
      },
      state: {
        default: "",
        selected: "scale-110",
        closed: "opacity-60",
      },
      size: {
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12",
      },
    },
    defaultVariants: {
      type: "cafe",
      state: "default",
      size: "md",
    },
  }
);

interface MapMarkerProps extends VariantProps<typeof mapMarkerVariants> {
  type: Location["type"];
  isSelected?: boolean;
  isOpen?: boolean;
  className?: string;
}

const iconMap = {
  cafe: Coffee,
  roastery: Store,
  shop: MapPin,
} as const;

export default function MapMarker({
  type,
  isSelected,
  isOpen = true,
  size = "md",
  className,
}: MapMarkerProps) {
  const state = isSelected ? "selected" : isOpen ? "default" : "closed";
  const IconComponent = iconMap[type];
  const iconSize = size === "sm" ? 14 : size === "lg" ? 20 : 16;

  return (
    <View className={cn(mapMarkerVariants({ type, state, size }), className)}>
      <IconComponent size={iconSize} color={colors.cream[50]} strokeWidth={2} />
    </View>
  );
}

export { mapMarkerVariants };
