"use client";

import { useTranslations } from "next-intl";

type BookErrorPageProps = {
  error: Error;
  reset: () => void;
};

const BookErrorPage = ({ error, reset }: BookErrorPageProps) => {
  const tError = useTranslations("ErrorPage");

  return (
    <main style={{ margin: "0 auto", maxWidth: "960px", padding: "2rem" }}>
      <h2>{tError("bookTitle")}</h2>
      <p style={{ marginTop: "0.5rem" }}>
        {error.message || tError("unknownError")}
      </p>
      <button onClick={reset} style={{ marginTop: "1rem" }} type="button">
        {tError("retry")}
      </button>
    </main>
  );
};

export default BookErrorPage;
