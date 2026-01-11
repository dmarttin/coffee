import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Pressable, Switch, View } from "react-native";
import { ChevronRight, type LucideIcon } from "lucide-react-native";
import { cn } from "../lib/utils";
import { Icon } from "./ui/Icon";
import { Text } from "./ui/Text";

const settingsRowVariants = cva(
  "w-full flex-row items-center justify-between rounded-xl border border-border bg-card px-4 py-3",
  {
    variants: {
      density: {
        cozy: "",
        tight: "py-2",
      },
    },
    defaultVariants: {
      density: "cozy",
    },
  }
);

export type SettingsRowProps = React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof settingsRowVariants> & {
    label: string;
    description?: string;
    icon?: LucideIcon;
    value?: string;
    onPress?: () => void;
    rightAccessory?: React.ReactNode;
    showChevron?: boolean;
    switchValue?: boolean;
    onToggle?: (value: boolean) => void;
  };

const SettingsRow = React.forwardRef<
  React.ElementRef<typeof View>,
  SettingsRowProps
>(
  (
    {
      className,
      density,
      label,
      description,
      icon,
      value,
      onPress,
      rightAccessory,
      showChevron,
      switchValue,
      onToggle,
      ...props
    },
    ref
  ) => {
    const content = (
      <View
        ref={ref}
        className={cn(settingsRowVariants({ density, className }))}
        {...props}
      >
        <View className="flex-row items-center gap-3 flex-1">
          {icon ? (
            <View className="h-8 w-8 items-center justify-center rounded-full bg-secondary">
              <Icon icon={icon} tone="muted" iconSize={16} />
            </View>
          ) : null}
          <View className="flex-1">
            <Text className="text-sm font-semibold text-foreground">
              {label}
            </Text>
            {description ? (
              <Text className="mt-1 text-xs text-muted-foreground">
                {description}
              </Text>
            ) : null}
          </View>
        </View>

        <View className="flex-row items-center gap-2">
          {value ? (
            <Text className="text-xs text-muted-foreground">{value}</Text>
          ) : null}
          {typeof switchValue === "boolean" ? (
            <Switch value={switchValue} onValueChange={onToggle} />
          ) : null}
          {rightAccessory ? rightAccessory : null}
          {showChevron ? (
            <Icon icon={ChevronRight} tone="muted" iconSize={16} />
          ) : null}
        </View>
      </View>
    );

    if (onPress) {
      return <Pressable onPress={onPress}>{content}</Pressable>;
    }

    return content;
  }
);

SettingsRow.displayName = "SettingsRow";

export default SettingsRow;
export { settingsRowVariants };
