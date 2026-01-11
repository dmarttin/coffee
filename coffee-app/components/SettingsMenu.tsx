import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { View } from "react-native";
import { cn } from "../lib/utils";
import { type LucideIcon } from "lucide-react-native";
import SettingsRow from "./SettingsRow";
import { Text } from "./ui/Text";

const settingsMenuVariants = cva("w-full", {
  variants: {
    density: {
      cozy: "gap-3",
      tight: "gap-2",
    },
  },
  defaultVariants: {
    density: "cozy",
  },
});

export type SettingsMenuItem = {
  id: string;
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

export type SettingsMenuProps = React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof settingsMenuVariants> & {
    title?: string;
    items: SettingsMenuItem[];
  };

const SettingsMenu = React.forwardRef<
  React.ElementRef<typeof View>,
  SettingsMenuProps
>(({ className, density, title, items, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn(settingsMenuVariants({ density, className }))}
      {...props}
    >
      {title ? (
        <Text className="text-sm font-semibold text-foreground">{title}</Text>
      ) : null}
      {items.map((item) => (
        <SettingsRow
          key={item.id}
          label={item.label}
          description={item.description}
          icon={item.icon}
          value={item.value}
          onPress={item.onPress}
          rightAccessory={item.rightAccessory}
          showChevron={item.showChevron}
          switchValue={item.switchValue}
          onToggle={item.onToggle}
        />
      ))}
    </View>
  );
});

SettingsMenu.displayName = "SettingsMenu";

export default SettingsMenu;
export { settingsMenuVariants };
