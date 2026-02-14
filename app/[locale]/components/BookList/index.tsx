"use client";

import { useLocale } from "next-intl";
import BookCard from "@/app/[locale]/components/BookCard";
import Text from "@/app/component/ui/Text";
import { useGetBooks } from "@/app/hooks/useGetBooks";

type BookListProps = {
  query: string;
};

const BookList = ({ query }: BookListProps) => {
  const locale = useLocale();
  const { data, error, isError, isFetching, isLoading } = useGetBooks({
    enabled: query.length > 0,
    limit: 50,
    q: query,
  });

  const books = data?.docs ?? [];

  return (
    <>
      <div style={{ marginTop: "1rem" }}>
        {isLoading || isFetching ? (
          <Text component="p">Loading books...</Text>
        ) : null}
        {isError ? (
          <Text component="p">
            {(error as Error)?.message || "Something went wrong"}
          </Text>
        ) : null}
      </div>

      <div
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          marginTop: "1rem",
        }}
      >
        {books.map((book) => {
          const bookId = book.key.split("/").filter(Boolean).pop() ?? "unknown";
          const coverImage = book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
            : "/window.svg";

          return (
            <BookCard
              author={book.author_name?.[0] ?? "Unknown author"}
              blurb={`First published: ${book.first_publish_year ?? "Unknown"}`}
              coverImage={coverImage}
              genre={book.subject?.[0] ?? "General"}
              href={`/${locale}/book/${bookId}`}
              key={book.key}
              pages={book.number_of_pages_median ?? 0}
              title={book.title}
            />
          );
        })}
      </div>
    </>
  );
};

export default BookList;
