import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";
import Sync from "../icons/Sync";
import styles from "./Loader.module.scss";

export type LoaderProps = Omit<ComponentPropsWithRef<"span">, "children"> & {
  label?: string;
};

const Loader = ({
  className,
  label = "Loading",
  ...rest
}: LoaderProps) => {
  return (
    <span
      aria-label={label}
      className={clsx(styles.loader, className)}
      role="status"
      {...rest}
    >
      <Sync decorative className={styles.icon} size="100%" />
    </span>
  );
};

export default Loader;
