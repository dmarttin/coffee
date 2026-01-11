import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { View } from "react-native";
import type { LucideIcon } from "lucide-react-native";
import { colors } from "../../lib/theme";
import { cn } from "../../lib/utils";

const iconContainerVariants = cva("items-center justify-center", {
  variants: {
    size: {
      sm: "h-6 w-6",
      md: "h-8 w-8",
      lg: "h-10 w-10",
      xl: "h-12 w-12",
    },
    shape: {
      none: "",
      soft: "rounded-lg bg-secondary/70",
      pill: "rounded-full bg-secondary/70",
    },
    tone: {
      default: "",
      muted: "",
      accent: "",
      success: "",
      warning: "",
      destructive: "",
      inverse: "",
    },
  },
  defaultVariants: {
    size: "md",
    shape: "none",
    tone: "default",
  },
});

const iconSizeMap = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
} as const;

const iconToneColors = {
  default: colors.coffee[900],
  muted: colors.coffee[400],
  accent: colors.accent.DEFAULT,
  success: colors.success,
  warning: colors.warning,
  destructive: colors.error,
  inverse: colors.cream[50],
} as const;

export type IconProps = React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof iconContainerVariants> & {
    icon: LucideIcon;
    iconSize?: number;
    color?: string;
    strokeWidth?: number;
  };

const Icon = React.forwardRef<React.ElementRef<typeof View>, IconProps>(
  (
    {
      icon: IconComponent,
      size,
      tone,
      shape,
      iconSize,
      color,
      strokeWidth = 2,
      className,
      ...props
    },
    ref
  ) => {
    const resolvedSize = iconSize ?? iconSizeMap[size ?? "md"];
    const resolvedColor = color ?? iconToneColors[tone ?? "default"];

    return (
      <View
        ref={ref}
        className={cn(iconContainerVariants({ size, tone, shape }), className)}
        {...props}
      >
        <IconComponent
          size={resolvedSize}
          color={resolvedColor}
          strokeWidth={strokeWidth}
        />
      </View>
    );
  }
);

Icon.displayName = "Icon";

export { Icon, iconContainerVariants };
