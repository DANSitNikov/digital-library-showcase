import clsx from "clsx";
import Link from "next/link";
import Button from "@/app/components/ui/Button";
import type { ButtonProps } from "@/app/components/ui/Button";
import ArrowBack from "@/app/components/ui/icons/ArrowBack";
import styles from "./BackButton.module.scss";

export type BackButtonProps = Omit<ButtonProps, "children" | "type"> & {
  href?: string;
};

const BackButton = ({ className, href = "/", ...rest }: BackButtonProps) => {
  return (
    <Link href={href}>
      <Button
        aria-label="Back"
        className={clsx(styles.backButton, className)}
        type="button"
        {...rest}
      >
        <ArrowBack className={styles.icon} decorative size={20} />
      </Button>
    </Link>
  );
};

export default BackButton;
