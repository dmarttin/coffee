import {
  TextInput,
  View,
  Text,
  TextInputProps,
  StyleSheet,
  ViewStyle,
} from "react-native";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
}

export default function Input({
  label,
  error,
  containerStyle,
  style,
  ...props
}: InputProps) {
  return (
    <View style={containerStyle}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, error && styles.inputError, style]}
        placeholderTextColor="#878580"
        {...props}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1C1B1A",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#FFFCF0",
    borderWidth: 1,
    borderColor: "#CECDC3",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#1C1B1A",
    fontSize: 16,
  },
  inputError: {
    borderColor: "#AF3029",
  },
  error: {
    fontSize: 14,
    color: "#AF3029",
    marginTop: 4,
  },
});
