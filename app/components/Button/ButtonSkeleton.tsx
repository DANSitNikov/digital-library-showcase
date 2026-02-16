import type { CSSProperties } from "react";
import Skeleton from "../Skeleton";
import type { ButtonSize } from "./index";

export type ButtonSkeletonProps = {
  size?: ButtonSize;
  fullWidth?: boolean;
  width?: CSSProperties["width"];
};

const buttonHeightBySize: Record<ButtonSize, CSSProperties["height"]> = {
  lg: "var(--space-12)",
  md: "var(--space-10)",
  sm: "var(--space-8)",
  xl: "var(--space-16)",
};

const ButtonSkeleton = ({
  fullWidth = false,
  size = "md",
  width = "8rem",
}: ButtonSkeletonProps) => {
  return (
    <Skeleton
      height={buttonHeightBySize[size]}
      style={{ borderRadius: "var(--radius-lg)" }}
      width={fullWidth ? "100%" : width}
    />
  );
};

export default ButtonSkeleton;
