"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import BackButton from "@/app/components/features/BackButton";
import Button from "@/app/components/ui/Button";
import Text from "@/app/components/ui/Text";
import styles from "./error.module.scss";

type BookErrorPageProps = {
  error: Error;
  reset: () => void;
};

const BookErrorPage = ({ error, reset }: BookErrorPageProps) => {
  const tError = useTranslations("ErrorPage");
  const params = useParams<{ locale?: string }>();
  const locale = params?.locale ?? "en";

  return (
    <section className={styles.main}>
      <Text component="h2" size="text-2xl" weight="bold">
        {tError("bookTitle")}
      </Text>
      <Text className={styles.message} component="p" size="text-base">
        {error.message || tError("unknownError")}
      </Text>
      <div className={styles.actions}>
        <BackButton href={`/${locale}`} />
        <Button onClick={reset} type="button">
          {tError("retry")}
        </Button>
      </div>
    </section>
  );
};

export default BookErrorPage;
