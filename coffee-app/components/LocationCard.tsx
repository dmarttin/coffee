import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Pressable, View } from "react-native";
import { MapPin } from "lucide-react-native";
import { cn } from "../lib/utils";
import { Badge } from "./ui/Badge";
import { Card } from "./ui/Card";
import { Icon } from "./ui/Icon";
import { Text } from "./ui/Text";

const locationCardVariants = cva("", {
  variants: {
    density: {
      cozy: "",
      tight: "",
    },
  },
  defaultVariants: {
    density: "cozy",
  },
});

export type LocationCardProps = React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof locationCardVariants> & {
    name: string;
    address?: string;
    city?: string;
    distance?: string;
    isOpen?: boolean;
    isPrimary?: boolean;
    onPress?: () => void;
  };

const LocationCard = React.forwardRef<
  React.ElementRef<typeof View>,
  LocationCardProps
>(
  (
    {
      className,
      density,
      name,
      address,
      city,
      distance,
      isOpen,
      isPrimary,
      onPress,
      ...props
    },
    ref
  ) => {
    return (
      <Pressable onPress={onPress}>
        <Card
          ref={ref}
          className={cn("p-4", locationCardVariants({ density, className }))}
          {...props}
        >
          <View className="flex-row items-start justify-between">
            <View className="flex-1 pr-3">
              <Text className="text-sm font-semibold text-foreground">
                {name}
              </Text>
              {address ? (
                <Text className="mt-1 text-xs text-muted-foreground">
                  {address}
                </Text>
              ) : null}
              {city ? (
                <Text className="text-xs text-muted-foreground">{city}</Text>
              ) : null}
            </View>
            {distance ? (
              <View className="flex-row items-center gap-1">
                <Icon icon={MapPin} tone="muted" iconSize={14} />
                <Text className="text-xs text-muted-foreground">
                  {distance}
                </Text>
              </View>
            ) : null}
          </View>

          <View className="mt-3 flex-row items-center gap-2">
            {typeof isOpen === "boolean" ? (
              <Badge variant={isOpen ? "green" : "outline"}>
                <Text>{isOpen ? "Open" : "Closed"}</Text>
              </Badge>
            ) : null}
            {isPrimary ? (
              <Badge variant="yellow">
                <Text>Main</Text>
              </Badge>
            ) : null}
          </View>
        </Card>
      </Pressable>
    );
  }
);

LocationCard.displayName = "LocationCard";

export default LocationCard;
export { locationCardVariants };
