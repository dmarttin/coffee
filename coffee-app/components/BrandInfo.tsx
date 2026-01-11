import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { View } from "react-native";
import { Building2, Globe2, Leaf, type LucideIcon } from "lucide-react-native";
import { cn } from "../lib/utils";
import { Icon } from "./ui/Icon";
import { Separator } from "./ui/Separator";
import { Text } from "./ui/Text";

const brandInfoVariants = cva(
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

export type BrandInfoProps = React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof brandInfoVariants> & {
    founded?: string;
    location?: string;
    story?: string;
    certifications?: string[];
  };

const BrandInfo = React.forwardRef<React.ElementRef<typeof View>, BrandInfoProps>(
  (
    { className, layout, founded, location, story, certifications, ...props },
    ref
  ) => {
    const rows = [
      founded ? { label: "Founded", value: founded, icon: Building2 } : null,
      location ? { label: "Location", value: location, icon: Globe2 } : null,
    ].filter(Boolean) as Array<{ label: string; value: string; icon: LucideIcon }>;

    return (
      <View
        ref={ref}
        className={cn(brandInfoVariants({ layout, className }))}
        {...props}
      >
        <Text className="mb-3 text-sm font-semibold text-foreground">
          Brand story
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
        {story ? (
          <Text className="mt-3 text-sm text-muted-foreground">{story}</Text>
        ) : null}
        {certifications && certifications.length > 0 ? (
          <View className="mt-3 flex-row flex-wrap gap-2">
            {certifications.map((item) => (
              <View key={item} className="flex-row items-center gap-1">
                <Icon icon={Leaf} tone="muted" iconSize={14} />
                <Text className="text-xs text-muted-foreground">{item}</Text>
              </View>
            ))}
          </View>
        ) : null}
      </View>
    );
  }
);

BrandInfo.displayName = "BrandInfo";

export default BrandInfo;
export { brandInfoVariants };
