import * as React from "react";
import { TextInput, View } from "react-native";
import { cn } from "../../lib/utils";
import { Text } from "./Text";

export interface InputProps
  extends React.ComponentPropsWithoutRef<typeof TextInput> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  ({ className, label, error, placeholderClassName, ...props }, ref) => {
    return (
      <View className="w-full">
        {label && (
          <Text className="mb-1.5 text-sm font-medium text-foreground">
            {label}
          </Text>
        )}
        <TextInput
          ref={ref}
          className={cn(
            "web:flex h-10 native:h-12 w-full rounded-md border border-input bg-background px-3 web:py-2 text-base native:text-lg native:leading-[1.25] text-foreground placeholder:text-muted-foreground web:ring-offset-background file:border-0 file:bg-transparent file:font-medium web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2",
            error && "border-destructive",
            props.editable === false && "opacity-50 web:cursor-not-allowed",
            className
          )}
          placeholderClassName={cn("text-muted-foreground", placeholderClassName)}
          {...props}
        />
        {error && (
          <Text className="mt-1 text-sm text-destructive">{error}</Text>
        )}
      </View>
    );
  }
);

Input.displayName = "Input";

export { Input };
