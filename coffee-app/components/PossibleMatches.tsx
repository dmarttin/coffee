import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Image, Pressable, View } from "react-native";
import { cn } from "../lib/utils";
import { Badge } from "./ui/Badge";
import { Card } from "./ui/Card";
import { Text } from "./ui/Text";

const possibleMatchesVariants = cva("w-full", {
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

export type PossibleMatch = {
  id: string;
  name: string;
  roasterName?: string;
  origin?: string;
  imageUrl?: string;
  score?: number;
};

export type PossibleMatchesProps = React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof possibleMatchesVariants> & {
    matches: PossibleMatch[];
    onSelect?: (match: PossibleMatch) => void;
  };

const PossibleMatches = React.forwardRef<
  React.ElementRef<typeof View>,
  PossibleMatchesProps
>(({ className, density, matches, onSelect, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn("w-full", className)}
      {...props}
    >
      <Text className="mb-3 text-sm font-semibold text-foreground">
        Possible matches
      </Text>
      <View className={cn("w-full", possibleMatchesVariants({ density }))}>
        {matches.length === 0 ? (
          <Card className="p-4">
            <Text className="text-sm text-muted-foreground">
              No matches found. Try another label.
            </Text>
          </Card>
        ) : (
          matches.map((match) => {
            const scoreLabel =
              typeof match.score === "number"
                ? `${Math.round(match.score * 100)}% match`
                : undefined;

            return (
              <Pressable
                key={match.id}
                onPress={() => onSelect?.(match)}
              >
                <Card className="flex-row items-center gap-3 p-3">
                  <View className="h-14 w-14 rounded-lg bg-secondary items-center justify-center overflow-hidden">
                    {match.imageUrl ? (
                      <Image
                        source={{ uri: match.imageUrl }}
                        className="h-full w-full"
                        resizeMode="cover"
                      />
                    ) : (
                      <View className="h-8 w-8 rounded-full bg-border" />
                    )}
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm font-semibold text-foreground">
                      {match.name}
                    </Text>
                    {match.roasterName ? (
                      <Text className="text-xs text-muted-foreground">
                        {match.roasterName}
                      </Text>
                    ) : null}
                    {match.origin ? (
                      <Text className="text-xs text-muted-foreground">
                        {match.origin}
                      </Text>
                    ) : null}
                  </View>
                  {scoreLabel ? (
                    <Badge variant="secondary">
                      <Text>{scoreLabel}</Text>
                    </Badge>
                  ) : null}
                </Card>
              </Pressable>
            );
          })
        )}
      </View>
    </View>
  );
});

PossibleMatches.displayName = "PossibleMatches";

export default PossibleMatches;
export { possibleMatchesVariants };
