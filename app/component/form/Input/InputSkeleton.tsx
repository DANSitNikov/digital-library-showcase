import type { CSSProperties } from "react";
import Skeleton from "../../Skeleton";
import type { InputSize } from "./index";

export type InputSkeletonProps = {
  size?: InputSize;
  width?: CSSProperties["width"];
};

const inputHeightBySize: Record<InputSize, CSSProperties["height"]> = {
  lg: "var(--space-12)",
  md: "var(--space-10)",
  sm: "var(--space-8)",
  xl: "var(--space-16)",
};

const InputSkeleton = ({ size = "md", width = "100%" }: InputSkeletonProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-1)",
        width,
      }}
    >
      <Skeleton
        height="1rem"
        style={{ borderRadius: "var(--radius-sm)" }}
        width="35%"
      />
      <Skeleton
        height={inputHeightBySize[size]}
        style={{ borderRadius: "var(--radius-md)" }}
        width="100%"
      />
    </div>
  );
};

export default InputSkeleton;
