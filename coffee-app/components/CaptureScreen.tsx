import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Pressable, View } from "react-native";
import { X, Zap, ZapOff } from "lucide-react-native";
import { cn } from "../lib/utils";
import CaptureButton from "./CaptureButton";
import { Icon } from "./ui/Icon";
import { Text } from "./ui/Text";

const captureScreenVariants = cva("flex-1 bg-coffee-900", {
  variants: {
    tone: {
      dark: "bg-coffee-900",
      neutral: "bg-background",
    },
  },
  defaultVariants: {
    tone: "dark",
  },
});

export type CaptureScreenProps = React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof captureScreenVariants> & {
    onCapture?: () => void;
    onClose?: () => void;
    onToggleFlash?: () => void;
    flashEnabled?: boolean;
    hint?: string;
    isProcessing?: boolean;
  };

const CaptureScreen = React.forwardRef<
  React.ElementRef<typeof View>,
  CaptureScreenProps
>(
  (
    {
      className,
      tone,
      onCapture,
      onClose,
      onToggleFlash,
      flashEnabled,
      hint,
      isProcessing,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <View
        ref={ref}
        className={cn(captureScreenVariants({ tone, className }))}
        {...props}
      >
        <View className="flex-1">{children}</View>

        <View className="absolute top-0 left-0 right-0 flex-row items-center justify-between px-5 pt-6">
          {onClose ? (
            <Pressable onPress={onClose} className="h-10 w-10 items-center justify-center rounded-full bg-black/40">
              <Icon icon={X} tone="inverse" iconSize={18} />
            </Pressable>
          ) : (
            <View className="h-10 w-10" />
          )}
          {onToggleFlash ? (
            <Pressable onPress={onToggleFlash} className="h-10 w-10 items-center justify-center rounded-full bg-black/40">
              <Icon icon={flashEnabled ? Zap : ZapOff} tone="inverse" iconSize={18} />
            </Pressable>
          ) : (
            <View className="h-10 w-10" />
          )}
        </View>

        {hint ? (
          <View className="absolute bottom-28 left-0 right-0 items-center px-6">
            <Text className="text-center text-xs text-cream-100">
              {hint}
            </Text>
          </View>
        ) : null}

        <View className="absolute bottom-6 left-0 right-0 items-center">
          <CaptureButton
            onPress={onCapture}
            loading={isProcessing}
            disabled={isProcessing}
          />
        </View>
      </View>
    );
  }
);

CaptureScreen.displayName = "CaptureScreen";

export default CaptureScreen;
export { captureScreenVariants };
