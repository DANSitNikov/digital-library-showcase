 "use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Button from "@/app/components/ui/Button";
import type { ButtonProps } from "@/app/components/ui/Button";
import ArrowBack from "@/app/components/ui/icons/ArrowBack";
import styles from "./BackButton.module.scss";

export type BackButtonProps = Omit<ButtonProps, "children" | "onClick" | "type"> & {
  href?: string;
};

const BackButton = ({ className, href = "/", ...rest }: BackButtonProps) => {
  const router = useRouter();
  const tCommon = useTranslations("Common");

  return (
    <Button
      aria-label={tCommon("back")}
      className={clsx(styles.backButton, className)}
      onClick={() => router.push(href)}
      type="button"
      {...rest}
    >
      <ArrowBack className={styles.icon} decorative size={20} />
    </Button>
  );
};

export default BackButton;
