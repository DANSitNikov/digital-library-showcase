import clsx from "clsx";
import Link from "next/link";
import Button from "@/app/components/ui/Button";
import type { ButtonProps } from "@/app/components/ui/Button";
import ArrowBack from "@/app/components/ui/icons/ArrowBack";
import styles from "./BackButton.module.scss";

export type BackButtonProps = Omit<ButtonProps, "children" | "type"> & {
  fallbackHref?: string;
  iconSize?: number | string;
  label?: string;
};

const BackButton = ({
  className,
  fallbackHref = "/",
  iconSize = 20,
  label = "Back",
  ...rest
}: BackButtonProps) => {
  return (
    <Link href={fallbackHref}>
      <Button className={clsx(styles.backButton, className)} type="button" {...rest}>
        <ArrowBack className={styles.icon} decorative size={iconSize} />
        <span className={styles.label}>{label}</span>
      </Button>
    </Link>
  );
};

export default BackButton;
