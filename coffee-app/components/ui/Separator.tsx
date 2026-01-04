import { View } from "react-native";

interface SeparatorProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export default function Separator({
  orientation = "horizontal",
  className = "",
}: SeparatorProps) {
  return (
    <View
      className={`bg-flexoki-base-200 ${
        orientation === "horizontal" ? "h-px w-full" : "w-px h-full"
      } ${className}`}
    />
  );
}
