import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { View } from "react-native";
import { cn } from "../lib/utils";
import { Separator } from "./ui/Separator";
import { Text } from "./ui/Text";

const coffeeMetricsVariants = cva(
  "w-full rounded-xl border border-border bg-card p-4",
  {
    variants: {
      layout: {
        grid: "",
        stack: "",
      },
      density: {
        cozy: "",
        tight: "",
      },
    },
    defaultVariants: {
      layout: "grid",
      density: "cozy",
    },
  }
);

export type CoffeeMetric = {
  label: string;
  value: string;
  unit?: string;
};

export type CoffeeMetricsProps = React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof coffeeMetricsVariants> & {
    grindSize?: string;
    brewMethod?: string;
    ratio?: string;
    waterTemp?: string;
    brewTime?: string;
    metrics?: CoffeeMetric[];
  };

const CoffeeMetrics = React.forwardRef<
  React.ElementRef<typeof View>,
  CoffeeMetricsProps
>(
  (
    {
      className,
      layout,
      density,
      grindSize,
      brewMethod,
      ratio,
      waterTemp,
      brewTime,
      metrics,
      ...props
    },
    ref
  ) => {
    const resolvedMetrics: CoffeeMetric[] =
      metrics ??
      [
        grindSize ? { label: "Grind", value: grindSize } : null,
        brewMethod ? { label: "Method", value: brewMethod } : null,
        ratio ? { label: "Ratio", value: ratio } : null,
        waterTemp ? { label: "Water", value: waterTemp, unit: "C" } : null,
        brewTime ? { label: "Brew time", value: brewTime } : null,
      ].filter(Boolean) as CoffeeMetric[];

    return (
      <View
        ref={ref}
        className={cn(coffeeMetricsVariants({ layout, density, className }))}
        {...props}
      >
        <Text className="mb-3 text-sm font-semibold text-foreground">
          Recipe metrics
        </Text>
        {layout === "grid" ? (
          <View className="flex-row flex-wrap">
            {resolvedMetrics.map((metric) => (
              <View key={metric.label} className="w-1/2 pr-3 pb-4">
                <Text className="text-xs uppercase text-muted-foreground">
                  {metric.label}
                </Text>
                <View className="mt-1 flex-row items-baseline">
                  <Text className="text-base font-mono text-foreground">
                    {metric.value}
                  </Text>
                  {metric.unit ? (
                    <Text className="ml-1 text-xs text-muted-foreground">
                      {metric.unit}
                    </Text>
                  ) : null}
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View>
            {resolvedMetrics.map((metric, index) => (
              <View key={metric.label}>
                <View className="flex-row items-center justify-between py-3">
                  <Text className="text-xs uppercase text-muted-foreground">
                    {metric.label}
                  </Text>
                  <View className="flex-row items-baseline">
                    <Text className="text-base font-mono text-foreground">
                      {metric.value}
                    </Text>
                    {metric.unit ? (
                      <Text className="ml-1 text-xs text-muted-foreground">
                        {metric.unit}
                      </Text>
                    ) : null}
                  </View>
                </View>
                {index !== resolvedMetrics.length - 1 ? (
                  <Separator />
                ) : null}
              </View>
            ))}
          </View>
        )}
        {resolvedMetrics.length === 0 ? (
          <Text className="text-sm text-muted-foreground">
            Add a recipe to track your brew.
          </Text>
        ) : null}
      </View>
    );
  }
);

CoffeeMetrics.displayName = "CoffeeMetrics";

export default CoffeeMetrics;
export { coffeeMetricsVariants };
