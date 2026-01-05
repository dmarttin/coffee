import { View, Text } from "react-native";
import Svg, { Polygon, Circle, Line, Text as SvgText } from "react-native-svg";

interface RecipeStarGraphProps {
  recipes: {
    coldBrew: number; // 0-100
    decaffeinated: number;
    espresso: number;
    filter: number;
  };
}

export default function RecipeStarGraph({ recipes }: RecipeStarGraphProps) {
  const size = 280;
  const center = size / 2;
  const maxRadius = size / 2 - 40;

  // Convert percentage to radius
  const getRadius = (percentage: number) => (percentage / 100) * maxRadius;

  // Calculate points for a 4-pointed star (diamond shape)
  const getPoint = (angle: number, radius: number) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: center + radius * Math.cos(rad),
      y: center + radius * Math.sin(rad),
    };
  };

  // Angles for each recipe type (starting from top, going clockwise)
  const angles = {
    filter: -90, // Top
    espresso: 0, // Right
    coldBrew: 90, // Bottom
    decaffeinated: 180, // Left
  };

  // Create points for the data polygon
  const dataPoints = [
    getPoint(angles.filter, getRadius(recipes.filter)),
    getPoint(angles.espresso, getRadius(recipes.espresso)),
    getPoint(angles.coldBrew, getRadius(recipes.coldBrew)),
    getPoint(angles.decaffeinated, getRadius(recipes.decaffeinated)),
  ];

  const dataPolygonPoints = dataPoints
    .map((p) => `${p.x},${p.y}`)
    .join(" ");

  // Create points for the background grid (max values)
  const gridPoints = [
    getPoint(angles.filter, maxRadius),
    getPoint(angles.espresso, maxRadius),
    getPoint(angles.coldBrew, maxRadius),
    getPoint(angles.decaffeinated, maxRadius),
  ];

  const gridPolygonPoints = gridPoints.map((p) => `${p.x},${p.y}`).join(" ");

  // Labels
  const labels = [
    { text: "Filter", angle: angles.filter, offset: 25 },
    { text: "Espresso", angle: angles.espresso, offset: 30 },
    { text: "Cold Brew", angle: angles.coldBrew, offset: 30 },
    { text: "Decaf", angle: angles.decaffeinated, offset: 25 },
  ];

  return (
    <View className="items-center">
      <Svg width={size} height={size}>
        {/* Background grid lines */}
        <Line
          x1={center}
          y1={center}
          x2={gridPoints[0].x}
          y2={gridPoints[0].y}
          stroke="#E6E4D9"
          strokeWidth="1"
        />
        <Line
          x1={center}
          y1={center}
          x2={gridPoints[1].x}
          y2={gridPoints[1].y}
          stroke="#E6E4D9"
          strokeWidth="1"
        />
        <Line
          x1={center}
          y1={center}
          x2={gridPoints[2].x}
          y2={gridPoints[2].y}
          stroke="#E6E4D9"
          strokeWidth="1"
        />
        <Line
          x1={center}
          y1={center}
          x2={gridPoints[3].x}
          y2={gridPoints[3].y}
          stroke="#E6E4D9"
          strokeWidth="1"
        />

        {/* Background grid polygon */}
        <Polygon
          points={gridPolygonPoints}
          fill="none"
          stroke="#E6E4D9"
          strokeWidth="2"
        />

        {/* Data polygon */}
        <Polygon
          points={dataPolygonPoints}
          fill="rgba(188, 82, 21, 0.2)"
          stroke="#BC5215"
          strokeWidth="3"
        />

        {/* Data points */}
        {dataPoints.map((point, index) => (
          <Circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="6"
            fill="#BC5215"
          />
        ))}

        {/* Labels */}
        {labels.map((label, index) => {
          const labelPoint = getPoint(label.angle, maxRadius + label.offset);
          return (
            <SvgText
              key={index}
              x={labelPoint.x}
              y={labelPoint.y}
              fontSize="14"
              fontWeight="600"
              fill="#6F6E69"
              textAnchor="middle"
              alignmentBaseline="middle"
            >
              {label.text}
            </SvgText>
          );
        })}
      </Svg>
    </View>
  );
}
