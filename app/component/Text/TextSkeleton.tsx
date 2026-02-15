import type { CSSProperties } from "react";
import Skeleton from "../Skeleton";
import type { TextSize } from "./index";

export type TextSkeletonProps = {
  size?: TextSize;
  width?: CSSProperties["width"];
};

const textSkeletonHeightBySize: Record<TextSize, CSSProperties["height"]> = {
  "text-2xl": "2rem",
  "text-3xl": "2.25rem",
  "text-4xl": "2.5rem",
  "text-5xl": "3rem",
  "text-6xl": "3.75rem",
  "text-7xl": "4.5rem",
  "text-base": "1.5rem",
  "text-lg": "1.75rem",
  "text-sm": "1.25rem",
  "text-xl": "1.75rem",
  "text-xs": "1rem",
};

const TextSkeleton = ({ size = "text-base", width = "100%" }: TextSkeletonProps) => {
  return (
    <Skeleton
      height={textSkeletonHeightBySize[size]}
      style={{ borderRadius: "var(--radius-sm)" }}
      width={width}
    />
  );
};

export default TextSkeleton;
