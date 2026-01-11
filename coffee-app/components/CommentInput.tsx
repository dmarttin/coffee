import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { TextInput, View } from "react-native";
import { Send } from "lucide-react-native";
import { colors } from "../lib/theme";
import { cn } from "../lib/utils";
import { Button } from "./ui/Button";
import { Icon } from "./ui/Icon";

const commentInputVariants = cva(
  "w-full flex-row items-center gap-2 rounded-xl border border-border bg-card px-3 py-2",
  {
    variants: {
      size: {
        sm: "",
        md: "",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export type CommentInputProps = React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof commentInputVariants> & {
    value: string;
    onChangeText: (text: string) => void;
    onSend?: () => void;
    placeholder?: string;
    disabled?: boolean;
  };

const CommentInput = React.forwardRef<
  React.ElementRef<typeof View>,
  CommentInputProps
>(
  (
    {
      className,
      size,
      value,
      onChangeText,
      onSend,
      placeholder = "Write a comment",
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <View
        ref={ref}
        className={cn(commentInputVariants({ size, className }))}
        {...props}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          className="flex-1 text-sm text-foreground"
          placeholderTextColor={colors.coffee[400]}
          editable={!disabled}
        />
        <Button
          variant="default"
          size="icon"
          onPress={onSend}
          disabled={disabled}
          accessibilityLabel="Send comment"
        >
          <Icon icon={Send} tone="inverse" iconSize={16} />
        </Button>
      </View>
    );
  }
);

CommentInput.displayName = "CommentInput";

export default CommentInput;
export { commentInputVariants };
