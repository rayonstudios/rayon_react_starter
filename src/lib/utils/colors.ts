import { stringToNumberInRange } from "./string.utils";

export const colors = [
  "#FF5733",
  "#00AABB",
  "#FFC300",
  "#FF0066",
  "#22DD55",
  "#FF3399",
  "#FF9900",
  "#44FFAA",
  "#FF3366",
  "#0088FF",
  "#FFCC00",
  "#DD33FF",
  "#33FF99",
  "#FF0033",
  "#55AAFF",
  "#FF6600",
  "#FF00CC",
  "#11FF44",
  "#FF9933",
  "#0099FF",
];

export const getColorFromStr = (value: string) => {
  return colors[stringToNumberInRange(value, 0, colors.length - 1)];
};

export const fadeColor = (hex: string, opacity: number) => {
  // Remove the '#' character if present
  hex = hex.replace(/^#/, "");

  // Parse the hex value into individual RGB components
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  // Create the faded color in RGBA format
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const getRandomColor = () =>
  colors[Math.floor(Math.random() * colors.length)];
