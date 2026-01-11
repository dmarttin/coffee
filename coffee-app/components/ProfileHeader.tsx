import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Image, View } from "react-native";
import { cn } from "../lib/utils";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { Text } from "./ui/Text";

const profileHeaderVariants = cva(
  "w-full rounded-2xl border border-border bg-card p-4",
  {
    variants: {
      layout: {
        split: "flex-row",
        stacked: "flex-col",
      },
    },
    defaultVariants: {
      layout: "split",
    },
  }
);

export type ProfileStat = {
  label: string;
  value: string | number;
};

export type ProfileHeaderProps = React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof profileHeaderVariants> & {
    name: string;
    username?: string;
    avatarUrl?: string;
    bio?: string;
    badges?: string[];
    stats?: ProfileStat[];
    onEdit?: () => void;
  };

const ProfileHeader = React.forwardRef<
  React.ElementRef<typeof View>,
  ProfileHeaderProps
>(
  (
    {
      className,
      layout,
      name,
      username,
      avatarUrl,
      bio,
      badges,
      stats,
      onEdit,
      ...props
    },
    ref
  ) => {
    return (
      <View
        ref={ref}
        className={cn(profileHeaderVariants({ layout, className }))}
        {...props}
      >
        <View className={cn("gap-4", layout === "split" ? "flex-row" : "flex-col")}>
          <View className="h-20 w-20 overflow-hidden rounded-full bg-secondary">
            {avatarUrl ? (
              <Image source={{ uri: avatarUrl }} className="h-full w-full" />
            ) : (
              <View className="h-full w-full items-center justify-center">
                <View className="h-10 w-10 rounded-full bg-border" />
              </View>
            )}
          </View>
          <View className="flex-1">
            <View className="flex-row items-start justify-between">
              <View className="flex-1 pr-3">
                <Text className="text-display-sm font-display text-foreground">
                  {name}
                </Text>
                {username ? (
                  <Text className="text-xs text-muted-foreground">
                    @{username}
                  </Text>
                ) : null}
              </View>
              {onEdit ? (
                <Button variant="outline" size="sm" onPress={onEdit}>
                  <Text>Edit</Text>
                </Button>
              ) : null}
            </View>
            {bio ? (
              <Text className="mt-2 text-sm text-muted-foreground">{bio}</Text>
            ) : null}
            {badges && badges.length > 0 ? (
              <View className="mt-3 flex-row flex-wrap gap-2">
                {badges.map((badge) => (
                  <Badge key={badge} variant="secondary">
                    <Text>{badge}</Text>
                  </Badge>
                ))}
              </View>
            ) : null}
          </View>
        </View>

        {stats && stats.length > 0 ? (
          <View className="mt-4 flex-row justify-between">
            {stats.map((stat) => (
              <View key={stat.label} className="items-center">
                <Text className="text-sm font-semibold text-foreground">
                  {stat.value}
                </Text>
                <Text className="text-xs text-muted-foreground">
                  {stat.label}
                </Text>
              </View>
            ))}
          </View>
        ) : null}
      </View>
    );
  }
);

ProfileHeader.displayName = "ProfileHeader";

export default ProfileHeader;
export { profileHeaderVariants };
