import clsx from "clsx";
import type { CSSProperties, ComponentPropsWithRef } from "react";
import styles from "./Skeleton.module.scss";

export type SkeletonProps = Omit<ComponentPropsWithRef<"span">, "children"> & {
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
};

const Skeleton = ({
  className,
  height,
  style,
  width,
  ...rest
}: SkeletonProps) => {
  return (
    <span
      aria-hidden
      className={clsx(styles.skeleton, className)}
      style={{ ...style, height, width }}
      {...rest}
    />
  );
};

export default Skeleton;
