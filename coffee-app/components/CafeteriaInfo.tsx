import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { View } from "react-native";
import { Clock, Globe, MapPin, Phone, type LucideIcon } from "lucide-react-native";
import { cn } from "../lib/utils";
import { Icon } from "./ui/Icon";
import { Separator } from "./ui/Separator";
import { Text } from "./ui/Text";

const cafeteriaInfoVariants = cva(
  "w-full rounded-xl border border-border bg-card p-4",
  {
    variants: {
      layout: {
        stack: "",
        compact: "",
      },
    },
    defaultVariants: {
      layout: "stack",
    },
  }
);

export type CafeteriaInfoProps = React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof cafeteriaInfoVariants> & {
    address?: string;
    hours?: string;
    phone?: string;
    website?: string;
    services?: string[];
  };

const CafeteriaInfo = React.forwardRef<
  React.ElementRef<typeof View>,
  CafeteriaInfoProps
>(
  (
    { className, layout, address, hours, phone, website, services, ...props }, ref) => {
      const rows = [
        address ? { label: "Address", value: address, icon: MapPin } : null,
        hours ? { label: "Hours", value: hours, icon: Clock } : null,
        phone ? { label: "Phone", value: phone, icon: Phone } : null,
        website ? { label: "Website", value: website, icon: Globe } : null,
      ].filter(Boolean) as Array<{ label: string; value: string; icon: LucideIcon }>;

      return (
        <View
          ref={ref}
          className={cn(cafeteriaInfoVariants({ layout, className }))}
          {...props}
        >
          <Text className="mb-3 text-sm font-semibold text-foreground">
            Cafe details
          </Text>
          {rows.map((row, index) => (
            <View key={row.label}>
              <View className="flex-row items-start gap-3 py-3">
                <Icon icon={row.icon} tone="muted" iconSize={16} />
                <View className="flex-1">
                  <Text className="text-xs uppercase text-muted-foreground">
                    {row.label}
                  </Text>
                  <Text className="mt-1 text-sm text-foreground">
                    {row.value}
                  </Text>
                </View>
              </View>
              {index !== rows.length - 1 ? <Separator /> : null}
            </View>
          ))}
          {services && services.length > 0 ? (
            <View className="mt-3">
              <Text className="text-xs uppercase text-muted-foreground">
                Services
              </Text>
              <Text className="mt-1 text-sm text-foreground">
                {services.join(" / ")}
              </Text>
            </View>
          ) : null}
        </View>
      );
    }
  )
);

CafeteriaInfo.displayName = "CafeteriaInfo";

export default CafeteriaInfo;
export { cafeteriaInfoVariants };
