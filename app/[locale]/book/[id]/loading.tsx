"use client";

import { useTranslations } from "next-intl";

const BookLoadingPage = () => {
  const tBook = useTranslations("BookPage");

  return (
    <main style={{ margin: "0 auto", maxWidth: "960px", padding: "2rem" }}>
      <p>{tBook("loading.details")}</p>
    </main>
  );
};

export default BookLoadingPage;
