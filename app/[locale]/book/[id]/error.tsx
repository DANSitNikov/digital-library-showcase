"use client";

type BookErrorPageProps = {
  error: Error;
  reset: () => void;
};

const BookErrorPage = ({ error, reset }: BookErrorPageProps) => {
  return (
    <main style={{ margin: "0 auto", maxWidth: "960px", padding: "2rem" }}>
      <h2>Failed to load this book.</h2>
      <p style={{ marginTop: "0.5rem" }}>{error.message || "Unknown error"}</p>
      <button onClick={reset} style={{ marginTop: "1rem" }} type="button">
        Try again
      </button>
    </main>
  );
};

export default BookErrorPage;
