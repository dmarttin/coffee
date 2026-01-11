import * as React from "react";
import { View, ScrollView, ViewProps, ScrollViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { cn } from "../../lib/utils";

interface ContainerProps extends ViewProps {
  /** Use SafeAreaView for proper insets */
  safe?: boolean;
  /** Make content scrollable */
  scroll?: boolean;
  /** Apply screen padding (20px horizontal) */
  padded?: boolean;
  /** Center content vertically */
  centered?: boolean;
  /** ScrollView props when scroll is true */
  scrollProps?: ScrollViewProps;
}

/**
 * Container - Base wrapper for screens and sections
 *
 * Provides consistent padding, safe area handling, and scroll behavior.
 * Use as the root wrapper for every screen.
 *
 * @example
 * // Basic screen
 * <Container safe padded scroll>
 *   <Text>Content here</Text>
 * </Container>
 *
 * @example
 * // Centered content (like login)
 * <Container safe padded centered>
 *   <LoginForm />
 * </Container>
 */
export function Container({
  safe = false,
  scroll = false,
  padded = false,
  centered = false,
  scrollProps,
  className,
  children,
  ...props
}: ContainerProps) {
  const Wrapper = safe ? SafeAreaView : View;

  const containerStyles = cn(
    "flex-1 bg-cream-50",
    padded && "px-screen",
    centered && "justify-center items-center",
    className
  );

  if (scroll) {
    return (
      <Wrapper className={cn("flex-1 bg-cream-50")} {...props}>
        <ScrollView
          className={cn(padded && "px-screen")}
          contentContainerClassName={cn(
            "pb-8",
            centered && "flex-1 justify-center items-center"
          )}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          {...scrollProps}
        >
          {children}
        </ScrollView>
      </Wrapper>
    );
  }

  return (
    <Wrapper className={containerStyles} {...props}>
      {children}
    </Wrapper>
  );
}

/**
 * Section - A content section within a screen
 *
 * Use to group related content with consistent vertical spacing.
 */
interface SectionProps extends ViewProps {
  /** Gap between this section and the next */
  gap?: "sm" | "md" | "lg";
}

export function Section({
  gap = "md",
  className,
  children,
  ...props
}: SectionProps) {
  const gapStyles = {
    sm: "mb-4",
    md: "mb-8",
    lg: "mb-12",
  };

  return (
    <View className={cn(gapStyles[gap], className)} {...props}>
      {children}
    </View>
  );
}
