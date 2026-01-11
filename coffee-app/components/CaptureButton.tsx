import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { ActivityIndicator, Pressable, View } from "react-native";
import { Camera } from "lucide-react-native";
import { colors } from "../lib/theme";
import { cn } from "../lib/utils";
import { Text, TextClassContext } from "./ui/Text";
import { Icon } from "./ui/Icon";

const captureButtonVariants = cva(
  "items-center justify-center rounded-full shadow-lg shadow-foreground/20",
  {
    variants: {
      size: {
        sm: "h-12 w-12",
        md: "h-16 w-16",
        lg: "h-20 w-20",
      },
      variant: {
        default: "bg-primary",
        outline: "border-2 border-primary bg-background",
        soft: "bg-secondary",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
);

const captureButtonTextVariants = cva("text-xs font-semibold", {
  variants: {
    variant: {
      default: "text-primary-foreground",
      outline: "text-foreground",
      soft: "text-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type CaptureButtonProps = React.ComponentPropsWithoutRef<
  typeof Pressable
> &
  VariantProps<typeof captureButtonVariants> & {
    label?: string;
    loading?: boolean;
  };

const CaptureButton = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  CaptureButtonProps
>(({ className, size, variant, label, loading, disabled, ...props }, ref) => {
  const iconTone = variant === "default" ? "inverse" : "default";

  return (
    <View className="items-center">
      <TextClassContext.Provider value={captureButtonTextVariants({ variant })}>
        <Pressable
          ref={ref}
          className={cn(
            captureButtonVariants({ size, variant, className }),
            (disabled || loading) && "opacity-60"
          )}
          disabled={disabled || loading}
          {...props}
        >
          {loading ? (
            <ActivityIndicator
              size="small"
              color={
                variant === "default"
                  ? colors.cream[50]
                  : colors.coffee[900]
              }
            />
          ) : (
            <Icon icon={Camera} tone={iconTone} />
          )}
        </Pressable>
      </TextClassContext.Provider>
      {label ? (
        <Text className="mt-2 text-xs text-muted-foreground">{label}</Text>
      ) : null}
    </View>
  );
});

CaptureButton.displayName = "CaptureButton";

export default CaptureButton;
export { captureButtonVariants };
