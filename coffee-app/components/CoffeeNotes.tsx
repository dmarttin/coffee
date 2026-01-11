import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Pressable, TextInput, View } from "react-native";
import { Pencil, Trash2 } from "lucide-react-native";
import { colors } from "../lib/theme";
import { cn } from "../lib/utils";
import { Badge } from "./ui/Badge";
import { Icon } from "./ui/Icon";
import { Text } from "./ui/Text";

const coffeeNotesVariants = cva(
  "w-full rounded-xl border border-border bg-card p-4",
  {
    variants: {
      state: {
        empty: "",
        filled: "",
      },
    },
    defaultVariants: {
      state: "empty",
    },
  }
);

export type CoffeeNotesProps = React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof coffeeNotesVariants> & {
    note?: string;
    updatedAt?: string | Date;
    flavorTags?: string[];
    editable?: boolean;
    placeholder?: string;
    onChangeText?: (text: string) => void;
    onEdit?: () => void;
    onDelete?: () => void;
  };

const CoffeeNotes = React.forwardRef<
  React.ElementRef<typeof View>,
  CoffeeNotesProps
>(
  (
    {
      className,
      note,
      updatedAt,
      flavorTags,
      editable,
      placeholder = "Add your tasting notes",
      onChangeText,
      onEdit,
      onDelete,
      ...props
    },
    ref
  ) => {
    const state = note ? "filled" : "empty";
    const formattedDate = updatedAt
      ? new Date(updatedAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : undefined;

    return (
      <View
        ref={ref}
        className={cn(coffeeNotesVariants({ state, className }))}
        {...props}
      >
        <View className="flex-row items-center justify-between">
          <Text className="text-sm font-semibold text-foreground">Notes</Text>
          <View className="flex-row gap-2">
            {onEdit ? (
              <Pressable
                onPress={onEdit}
                className="h-8 w-8 items-center justify-center rounded-full border border-border"
              >
                <Icon icon={Pencil} tone="muted" iconSize={14} />
              </Pressable>
            ) : null}
            {onDelete ? (
              <Pressable
                onPress={onDelete}
                className="h-8 w-8 items-center justify-center rounded-full border border-border"
              >
                <Icon icon={Trash2} tone="muted" iconSize={14} />
              </Pressable>
            ) : null}
          </View>
        </View>

        {editable ? (
          <TextInput
            multiline
            value={note}
            onChangeText={onChangeText}
            placeholder={placeholder}
            className="mt-3 min-h-[96px] rounded-lg border border-border bg-background p-3 text-sm text-foreground"
            placeholderTextColor={colors.coffee[400]}
          />
        ) : (
          <Text
            className={cn(
              "mt-3 text-sm",
              note ? "text-foreground" : "text-muted-foreground"
            )}
          >
            {note || placeholder}
          </Text>
        )}

        <View className="mt-3 flex-row items-center justify-between">
          {formattedDate ? (
            <Text className="text-xs text-muted-foreground">
              Updated {formattedDate}
            </Text>
          ) : (
            <Text className="text-xs text-muted-foreground">
              Not saved yet
            </Text>
          )}
        </View>

        {flavorTags && flavorTags.length > 0 ? (
          <View className="mt-3 flex-row flex-wrap gap-2">
            {flavorTags.map((tag) => (
              <Badge key={tag} variant="secondary">
                <Text>{tag}</Text>
              </Badge>
            ))}
          </View>
        ) : null}
      </View>
    );
  }
);

CoffeeNotes.displayName = "CoffeeNotes";

export default CoffeeNotes;
export { coffeeNotesVariants };
