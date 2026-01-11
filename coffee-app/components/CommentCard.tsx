import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Image, Pressable, View } from "react-native";
import { Heart } from "lucide-react-native";
import { cn } from "../lib/utils";
import { Icon } from "./ui/Icon";
import { Text } from "./ui/Text";

const commentCardVariants = cva("w-full", {
  variants: {
    density: {
      cozy: "",
      tight: "",
    },
  },
  defaultVariants: {
    density: "cozy",
  },
});

export type CommentCardProps = React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof commentCardVariants> & {
    username: string;
    displayName?: string;
    avatarUrl?: string;
    text: string;
    createdAt: string | Date;
    likes?: number;
    onLike?: () => void;
  };

const CommentCard = React.forwardRef<
  React.ElementRef<typeof View>,
  CommentCardProps
>(
  (
    {
      className,
      density,
      username,
      displayName,
      avatarUrl,
      text,
      createdAt,
      likes,
      onLike,
      ...props
    },
    ref
  ) => {
    const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    return (
      <View
        ref={ref}
        className={cn("flex-row gap-3", commentCardVariants({ density, className }))}
        {...props}
      >
        <View className="h-10 w-10 overflow-hidden rounded-full bg-secondary">
          {avatarUrl ? (
            <Image source={{ uri: avatarUrl }} className="h-full w-full" />
          ) : (
            <View className="h-full w-full items-center justify-center">
              <Text className="text-[10px] text-muted-foreground">User</Text>
            </View>
          )}
        </View>
        <View className="flex-1">
          <View className="flex-row items-center justify-between">
            <Text className="text-xs font-semibold text-foreground">
              {displayName || username}
            </Text>
            <Text className="text-[10px] text-muted-foreground">
              {formattedDate}
            </Text>
          </View>
          <Text className="mt-1 text-sm text-foreground">{text}</Text>
          {onLike ? (
            <Pressable onPress={onLike} className="mt-2 flex-row items-center gap-1">
              <Icon icon={Heart} tone="muted" iconSize={14} />
              <Text className="text-[10px] text-muted-foreground">
                {likes ?? 0}
              </Text>
            </Pressable>
          ) : null}
        </View>
      </View>
    );
  }
);

CommentCard.displayName = "CommentCard";

export default CommentCard;
export { commentCardVariants };
