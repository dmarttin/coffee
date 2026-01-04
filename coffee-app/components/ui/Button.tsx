import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { ReactNode, isValidElement } from "react";

interface ButtonProps {
  children: ReactNode;
  onPress?: () => void;
  variant?: "default" | "secondary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}

export default function Button({
  children,
  onPress,
  variant = "default",
  size = "default",
  disabled = false,
  loading = false,
  style,
}: ButtonProps) {
  const variantStyles = {
    default: {
      button: { backgroundColor: "#1C1B1A" },
      text: { color: "#FFFCF0" },
    },
    secondary: {
      button: { backgroundColor: "#E6E4D9" },
      text: { color: "#1C1B1A" },
    },
    outline: {
      button: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "#B7B5AC",
      },
      text: { color: "#1C1B1A" },
    },
    ghost: {
      button: { backgroundColor: "transparent" },
      text: { color: "#1C1B1A" },
    },
  };

  const sizeStyles = {
    default: {
      button: { paddingHorizontal: 16, paddingVertical: 10 },
      text: { fontSize: 16 },
    },
    sm: {
      button: { paddingHorizontal: 12, paddingVertical: 6 },
      text: { fontSize: 14 },
    },
    lg: {
      button: { paddingHorizontal: 24, paddingVertical: 12 },
      text: { fontSize: 18 },
    },
  };

  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        variantStyle.button,
        sizeStyle.button,
        (disabled || loading) && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "default" ? "#FFFCF0" : "#100F0F"}
          size="small"
        />
      ) : isValidElement(children) ? (
        children
      ) : (
        <Text style={[styles.text, variantStyle.text, sizeStyle.text]}>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  text: {
    fontWeight: "500",
  },
  disabled: {
    opacity: 0.5,
  },
});
