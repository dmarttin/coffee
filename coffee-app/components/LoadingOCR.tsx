import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { ActivityIndicator, View } from "react-native";
import { colors } from "../lib/theme";
import { cn } from "../lib/utils";
import { Text } from "./ui/Text";

const loadingOCRVariants = cva(
  "items-center justify-center rounded-xl border border-border bg-card",
  {
    variants: {
      size: {
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export type LoadingOCRProps = React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof loadingOCRVariants> & {
    message?: string;
    progress?: number;
  };

const LoadingOCR = React.forwardRef<
  React.ElementRef<typeof View>,
  LoadingOCRProps
>(({ className, size, message = "Processing label", progress, ...props }, ref) => {
  const clampedProgress =
    typeof progress === "number" ? Math.min(Math.max(progress, 0), 1) : null;

  return (
    <View
      ref={ref}
      className={cn(loadingOCRVariants({ size, className }))}
      {...props}
    >
      <ActivityIndicator size="large" color={colors.accent.DEFAULT} />
      <Text className="mt-3 text-sm text-foreground">{message}</Text>
      {clampedProgress !== null ? (
        <View className="mt-4 w-full">
          <View className="h-2 w-full rounded-full bg-muted">
            <View
              className="h-2 rounded-full bg-amber"
              style={{ width: `${clampedProgress * 100}%` }}
            />
          </View>
          <Text className="mt-2 text-xs text-muted-foreground">
            {Math.round(clampedProgress * 100)}% complete
          </Text>
        </View>
      ) : null}
    </View>
  );
});

LoadingOCR.displayName = "LoadingOCR";

export default LoadingOCR;
export { loadingOCRVariants };
