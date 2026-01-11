import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Pressable, View } from "react-native";
import { ChevronDown } from "lucide-react-native";
import { cn } from "../lib/utils";
import { Icon } from "./ui/Icon";
import { Text } from "./ui/Text";

const sortDropdownVariants = cva("w-full", {
  variants: {
    size: {
      sm: "",
      md: "",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const sortTriggerVariants = cva(
  "flex-row items-center justify-between rounded-lg border border-border bg-card px-3 py-2",
  {
    variants: {
      state: {
        open: "border-primary",
        closed: "",
      },
    },
    defaultVariants: {
      state: "closed",
    },
  }
);

export type SortOption = {
  label: string;
  value: string;
};

export type SortDropdownProps = React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof sortDropdownVariants> & {
    label?: string;
    value?: string;
    options: SortOption[];
    placeholder?: string;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    onValueChange?: (value: string) => void;
  };

const SortDropdown = React.forwardRef<
  React.ElementRef<typeof View>,
  SortDropdownProps
>(
  (
    {
      className,
      size,
      label,
      value,
      options,
      placeholder = "Sort",
      open,
      onOpenChange,
      onValueChange,
      ...props
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = React.useState(false);
    const isOpen = open ?? internalOpen;
    const setOpen = onOpenChange ?? setInternalOpen;
    const selected = options.find((option) => option.value === value);

    return (
      <View
        ref={ref}
        className={cn(sortDropdownVariants({ size, className }))}
        {...props}
      >
        {label ? (
          <Text className="mb-1.5 text-xs uppercase text-muted-foreground">
            {label}
          </Text>
        ) : null}
        <Pressable
          onPress={() => setOpen(!isOpen)}
          className={cn(sortTriggerVariants({ state: isOpen ? "open" : "closed" }))}
        >
          <Text className="text-sm text-foreground">
            {selected?.label ?? placeholder}
          </Text>
          <Icon icon={ChevronDown} tone="muted" iconSize={18} />
        </Pressable>
        {isOpen ? (
          <View className="mt-2 rounded-lg border border-border bg-card shadow-sm shadow-foreground/10">
            {options.map((option, index) => {
              const isSelected = option.value === value;
              return (
                <Pressable
                  key={option.value}
                  onPress={() => {
                    onValueChange?.(option.value);
                    setOpen(false);
                  }}
                  className={cn(
                    "px-3 py-2",
                    index !== options.length - 1 && "border-b border-border",
                    isSelected && "bg-secondary"
                  )}
                >
                  <Text
                    className={cn(
                      "text-sm",
                      isSelected ? "text-foreground font-semibold" : "text-muted-foreground"
                    )}
                  >
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        ) : null}
      </View>
    );
  }
);

SortDropdown.displayName = "SortDropdown";

export default SortDropdown;
export { sortDropdownVariants, sortTriggerVariants };
