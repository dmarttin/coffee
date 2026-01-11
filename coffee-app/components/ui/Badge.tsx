import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { View } from "react-native";
import { cn } from "../../lib/utils";
import { TextClassContext } from "./Text";

const badgeVariants = cva(
  "flex flex-row items-center rounded-full px-2.5 py-0.5 web:transition-colors web:focus:outline-none web:focus:ring-2 web:focus:ring-ring web:focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary web:hover:opacity-80 active:opacity-80",
        secondary: "bg-secondary web:hover:opacity-80 active:opacity-80",
        destructive: "bg-destructive web:hover:opacity-80 active:opacity-80",
        outline: "border border-border",
        orange: "bg-orange-100",
        yellow: "bg-yellow-100",
        green: "bg-green-100",
        blue: "bg-blue-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const badgeTextVariants = cva("text-xs font-semibold", {
  variants: {
    variant: {
      default: "text-primary-foreground",
      secondary: "text-secondary-foreground",
      destructive: "text-destructive-foreground",
      outline: "text-foreground",
      orange: "text-orange-700",
      yellow: "text-yellow-700",
      green: "text-green-700",
      blue: "text-blue-700",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface BadgeProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <TextClassContext.Provider value={badgeTextVariants({ variant })}>
      <View className={cn(badgeVariants({ variant }), className)} {...props} />
    </TextClassContext.Provider>
  );
}

export { Badge, badgeTextVariants, badgeVariants };
