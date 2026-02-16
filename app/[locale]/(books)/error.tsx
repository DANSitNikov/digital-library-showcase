"use client";

import { useTranslations } from "next-intl";

type LocaleErrorPageProps = {
  error: Error;
  reset: () => void;
};

const LocaleErrorPage = ({ error, reset }: LocaleErrorPageProps) => {
  const tError = useTranslations("ErrorPage");

  return (
    <main style={{ margin: "0 auto", maxWidth: "960px", padding: "2rem" }}>
      <h2>{tError("pageTitle")}</h2>
      <p style={{ marginTop: "0.5rem" }}>
        {error.message || tError("unknownError")}
      </p>
      <button onClick={reset} style={{ marginTop: "1rem" }} type="button">
        {tError("retry")}
      </button>
    </main>
  );
};

export default LocaleErrorPage;
