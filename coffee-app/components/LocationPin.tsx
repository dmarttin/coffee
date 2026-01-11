import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { View } from "react-native";
import { MapPin } from "lucide-react-native";
import { cn } from "../lib/utils";
import { Icon } from "./ui/Icon";
import { Text } from "./ui/Text";

const locationPinVariants = cva(
  "items-center justify-center rounded-full border border-border",
  {
    variants: {
      size: {
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12",
      },
      variant: {
        default: "bg-card",
        accent: "bg-amber",
        muted: "bg-secondary",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
);

export type LocationPinProps = React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof locationPinVariants> & {
    label?: string;
  };

const LocationPin = React.forwardRef<
  React.ElementRef<typeof View>,
  LocationPinProps
>(({ className, size, variant, label, ...props }, ref) => {
  const tone = variant === "accent" ? "inverse" : "muted";

  return (
    <View
      ref={ref}
      className={cn(locationPinVariants({ size, variant, className }))}
      {...props}
    >
      <Icon icon={MapPin} tone={tone} iconSize={16} />
      {label ? (
        <Text className="mt-1 text-[10px] text-muted-foreground">
          {label}
        </Text>
      ) : null}
    </View>
  );
});

LocationPin.displayName = "LocationPin";

export default LocationPin;
export { locationPinVariants };
