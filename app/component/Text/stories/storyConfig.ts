import type { TextSize, TextWeight } from "../index";

export const sizeOptions: TextSize[] = [
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "display-xs",
  "display-sm",
  "display-md",
  "display-lg",
  "display-xl",
  "display-2xl",
];

export const weightOptions: TextWeight[] = [
  "regular",
  "medium",
  "semibold",
  "bold",
];

export const centeredLayout = {
  layout: "centered" as const,
};
