"use client";

import { useTranslations } from "next-intl";
import Button from "@/app/components/ui/Button";
import Text from "@/app/components/ui/Text";
import styles from "./error.module.scss";

type LocaleErrorPageProps = {
  error: Error;
  reset: () => void;
};

const LocaleErrorPage = ({ error, reset }: LocaleErrorPageProps) => {
  const tError = useTranslations("ErrorPage");

  return (
    <section className={styles.main}>
      <Text component="h2" size="text-2xl" weight="bold">
        {tError("pageTitle")}
      </Text>
      <Text className={styles.message} component="p" size="text-base">
        {error.message || tError("unknownError")}
      </Text>
      <Button onClick={reset} type="button">
        {tError("retry")}
      </Button>
    </section>
  );
};

export default LocaleErrorPage;
