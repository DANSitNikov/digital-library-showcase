"use client";

type LocaleErrorPageProps = {
  error: Error;
  reset: () => void;
};

const LocaleErrorPage = ({ error, reset }: LocaleErrorPageProps) => {
  return (
    <main style={{ margin: "0 auto", maxWidth: "960px", padding: "2rem" }}>
      <h2>Failed to load this page.</h2>
      <p style={{ marginTop: "0.5rem" }}>{error.message || "Unknown error"}</p>
      <button onClick={reset} style={{ marginTop: "1rem" }} type="button">
        Try again
      </button>
    </main>
  );
};

export default LocaleErrorPage;
