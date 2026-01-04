import { View, Text } from "react-native";
import { ReactNode, isValidElement } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "orange"
    | "yellow"
    | "green"
    | "blue";
  size?: "default" | "sm";
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  size = "default",
  className = "",
}: BadgeProps) {
  const variantStyles = {
    default: {
      bg: { backgroundColor: "#1C1B1A" },
      text: { color: "#FFFCF0" },
    },
    secondary: {
      bg: { backgroundColor: "#E6E4D9" },
      text: { color: "#1C1B1A" },
    },
    outline: {
      bg: { backgroundColor: "transparent", borderWidth: 1, borderColor: "#B7B5AC" },
      text: { color: "#1C1B1A" },
    },
    orange: {
      bg: { backgroundColor: "rgba(218, 112, 44, 0.1)" },
      text: { color: "#BC5215" },
    },
    yellow: {
      bg: { backgroundColor: "rgba(208, 162, 21, 0.1)" },
      text: { color: "#AD8301" },
    },
    green: {
      bg: { backgroundColor: "rgba(135, 154, 57, 0.1)" },
      text: { color: "#66800B" },
    },
    blue: {
      bg: { backgroundColor: "rgba(67, 133, 190, 0.1)" },
      text: { color: "#205EA6" },
    },
  };

  const sizeStyles = {
    default: {
      container: { paddingHorizontal: 10, paddingVertical: 4 },
      text: { fontSize: 12 },
    },
    sm: {
      container: { paddingHorizontal: 8, paddingVertical: 2 },
      text: { fontSize: 12 },
    },
  };

  const styles = variantStyles[variant];
  const sizes = sizeStyles[size];

  return (
    <View
      style={[
        {
          borderRadius: 9999,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        },
        styles.bg,
        sizes.container,
      ]}
    >
      {isValidElement(children) ? (
        children
      ) : (
        <Text style={[{ fontWeight: "500" }, styles.text, sizes.text]}>
          {children}
        </Text>
      )}
    </View>
  );
}
