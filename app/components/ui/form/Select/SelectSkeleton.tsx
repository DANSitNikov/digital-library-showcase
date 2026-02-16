import type { CSSProperties } from "react";
import Skeleton from "../../Skeleton";
import type { SelectSize } from "./index";

export type SelectSkeletonProps = {
  showLabel?: boolean;
  size?: SelectSize;
  width?: CSSProperties["width"];
};

const selectHeightBySize: Record<SelectSize, CSSProperties["height"]> = {
  lg: "var(--space-12)",
  md: "var(--space-10)",
  sm: "var(--space-8)",
  xl: "var(--space-16)",
};

const SelectSkeleton = ({
  showLabel = true,
  size = "md",
  width = "100%",
}: SelectSkeletonProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-1)",
        width,
      }}
    >
      {showLabel ? (
        <Skeleton
          height="1rem"
          style={{ borderRadius: "var(--radius-sm)" }}
          width="35%"
        />
      ) : null}
      <Skeleton
        height={selectHeightBySize[size]}
        style={{ borderRadius: "var(--radius-md)" }}
        width="100%"
      />
    </div>
  );
};

export default SelectSkeleton;
