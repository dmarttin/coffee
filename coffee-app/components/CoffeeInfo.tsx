import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { View } from "react-native";
import { Calendar, FlaskConical, MapPin, Mountain, Sprout } from "lucide-react-native";
import { cn } from "../lib/utils";
import { Icon } from "./ui/Icon";
import { Separator } from "./ui/Separator";
import { Text } from "./ui/Text";

const coffeeInfoVariants = cva("w-full rounded-xl border border-border bg-card", {
  variants: {
    layout: {
      grid: "",
      stack: "",
    },
  },
  defaultVariants: {
    layout: "grid",
  },
});

export type CoffeeInfoItem = {
  label: string;
  value: string;
  icon?: React.ReactNode;
};

export type CoffeeInfoProps = React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof coffeeInfoVariants> & {
    origin?: string;
    process?: string;
    altitude?: string;
    varietal?: string;
    harvestDate?: string;
    items?: CoffeeInfoItem[];
  };

const CoffeeInfo = React.forwardRef<React.ElementRef<typeof View>, CoffeeInfoProps>(
  (
    {
      className,
      layout,
      origin,
      process,
      altitude,
      varietal,
      harvestDate,
      items,
      ...props
    },
    ref
  ) => {
    const resolvedItems: CoffeeInfoItem[] =
      items ??
      [
        origin ? { label: "Origin", value: origin, icon: <Icon icon={MapPin} tone="muted" /> } : null,
        process ? { label: "Process", value: process, icon: <Icon icon={FlaskConical} tone="muted" /> } : null,
        altitude ? { label: "Altitude", value: altitude, icon: <Icon icon={Mountain} tone="muted" /> } : null,
        varietal ? { label: "Varietal", value: varietal, icon: <Icon icon={Sprout} tone="muted" /> } : null,
        harvestDate ? { label: "Harvest", value: harvestDate, icon: <Icon icon={Calendar} tone="muted" /> } : null,
      ].filter(Boolean) as CoffeeInfoItem[];

    return (
      <View
        ref={ref}
        className={cn("p-4", coffeeInfoVariants({ layout, className }))}
        {...props}
      >
        <Text className="mb-3 text-sm font-semibold text-foreground">
          Coffee details
        </Text>
        {layout === "grid" ? (
          <View className="flex-row flex-wrap">
            {resolvedItems.map((item) => (
              <View key={item.label} className="w-1/2 pr-3 pb-4">
                <View className="flex-row items-center gap-2">
                  {item.icon}
                  <Text className="text-xs uppercase text-muted-foreground">
                    {item.label}
                  </Text>
                </View>
                <Text className="mt-1 text-sm text-foreground">
                  {item.value}
                </Text>
              </View>
            ))}
          </View>
        ) : (
          <View>
            {resolvedItems.map((item, index) => (
              <View key={item.label}>
                <View className="flex-row items-center justify-between py-3">
                  <View className="flex-row items-center gap-2">
                    {item.icon}
                    <Text className="text-xs uppercase text-muted-foreground">
                      {item.label}
                    </Text>
                  </View>
                  <Text className="text-sm text-foreground">{item.value}</Text>
                </View>
                {index !== resolvedItems.length - 1 ? (
                  <Separator />
                ) : null}
              </View>
            ))}
          </View>
        )}
        {resolvedItems.length === 0 ? (
          <Text className="text-sm text-muted-foreground">
            Coffee details will appear here.
          </Text>
        ) : null}
      </View>
    );
  }
);

CoffeeInfo.displayName = "CoffeeInfo";

export default CoffeeInfo;
export { coffeeInfoVariants };
