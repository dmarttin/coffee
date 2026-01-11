import * as React from "react";
import { View, Pressable, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ChevronLeft, X } from "lucide-react-native";
import { cn } from "../../lib/utils";
import { colors, components } from "../../lib/theme";
import { Text } from "../ui/Text";

interface HeaderProps extends ViewProps {
  /** Header title */
  title?: string;
  /** Subtitle under the title */
  subtitle?: string;
  /** Show back button */
  showBack?: boolean;
  /** Show close button instead of back */
  showClose?: boolean;
  /** Custom back/close action */
  onBack?: () => void;
  /** Right side actions */
  rightAction?: React.ReactNode;
  /** Make header transparent (for hero overlays) */
  transparent?: boolean;
  /** Large title style */
  large?: boolean;
}

/**
 * Header - Custom header component
 *
 * Use for screens that need custom header behavior beyond expo-router's default.
 * For most screens, use the Stack.Screen options instead.
 *
 * @example
 * // Standard header with back
 * <Header title="Coffee Details" showBack />
 *
 * @example
 * // Modal header with close
 * <Header title="Add Review" showClose />
 *
 * @example
 * // Large title with action
 * <Header
 *   title="My Collection"
 *   large
 *   rightAction={<FilterButton />}
 * />
 */
export function Header({
  title,
  subtitle,
  showBack = false,
  showClose = false,
  onBack,
  rightAction,
  transparent = false,
  large = false,
  className,
  ...props
}: HeaderProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <View
      className={cn(
        "w-full",
        !transparent && "bg-cream-50 border-b border-cream-200",
        className
      )}
      style={{ paddingTop: insets.top }}
      {...props}
    >
      <View
        className="flex-row items-center justify-between px-screen"
        style={{ height: components.header.height }}
      >
        {/* Left side - Back/Close button */}
        <View className="w-12 items-start">
          {(showBack || showClose) && (
            <Pressable
              onPress={handleBack}
              className="w-10 h-10 items-center justify-center -ml-2 rounded-full active:bg-cream-200"
              hitSlop={8}
            >
              {showClose ? (
                <X size={24} color={colors.coffee[900]} strokeWidth={2} />
              ) : (
                <ChevronLeft
                  size={28}
                  color={colors.coffee[900]}
                  strokeWidth={2}
                />
              )}
            </Pressable>
          )}
        </View>

        {/* Center - Title */}
        <View className="flex-1 items-center">
          {title && !large && (
            <Text
              className="text-coffee-900 text-base"
              style={{ fontFamily: "DMSans_600SemiBold" }}
              numberOfLines={1}
            >
              {title}
            </Text>
          )}
          {subtitle && !large && (
            <Text
              className="text-coffee-400 text-xs"
              style={{ fontFamily: "DMSans_400Regular" }}
              numberOfLines={1}
            >
              {subtitle}
            </Text>
          )}
        </View>

        {/* Right side - Actions */}
        <View className="w-12 items-end">{rightAction}</View>
      </View>

      {/* Large title (below the nav row) */}
      {title && large && (
        <View className="px-screen pb-4">
          <Text
            className="text-coffee-900"
            style={{
              fontFamily: "Fraunces_700Bold",
              fontSize: 32,
              lineHeight: 40,
              letterSpacing: -0.5,
            }}
          >
            {title}
          </Text>
          {subtitle && (
            <Text
              className="text-coffee-400 mt-1"
              style={{ fontFamily: "DMSans_400Regular", fontSize: 15 }}
            >
              {subtitle}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}

/**
 * HeaderAction - Button for header right actions
 */
interface HeaderActionProps {
  icon: React.ReactNode;
  onPress: () => void;
  label?: string;
}

export function HeaderAction({ icon, onPress, label }: HeaderActionProps) {
  return (
    <Pressable
      onPress={onPress}
      className="w-10 h-10 items-center justify-center rounded-full active:bg-cream-200"
      hitSlop={8}
      accessibilityLabel={label}
    >
      {icon}
    </Pressable>
  );
}
