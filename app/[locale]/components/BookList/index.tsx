"use client";

import { useLocale } from "next-intl";
import { List } from "react-window";
import type { RowComponentProps } from "react-window";
import BookCard from "@/app/[locale]/components/BookCard";
import Text from "@/app/component/ui/Text";
import { useGetBooks } from "@/app/hooks/useGetBooks";

type BookDoc = {
  key: string;
  title: string;
  cover_i?: number;
  author_name?: string[];
  first_publish_year?: number;
  subject?: string[];
  number_of_pages_median?: number;
};

type BookRowProps = {
  books: BookDoc[];
  locale: string;
};

type BookListProps = {
  query: string;
  listHeight: number;
};

const ROW_HEIGHT = 440;

const BookRow = ({
  index,
  style,
  books,
  locale,
}: RowComponentProps<BookRowProps>) => {
  const book = books[index];
  const bookId = book.key.split("/").filter(Boolean).pop() ?? "unknown";
  const coverImage = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : "/window.svg";

  return (
    <div style={{ ...style, display: "flex", justifyContent: "center" }}>
      <div style={{ paddingBottom: "1rem", width: "min(100%, 340px)" }}>
        <BookCard
          author={book.author_name?.[0] ?? "Unknown author"}
          blurb={`First published: ${book.first_publish_year ?? "Unknown"}`}
          coverImage={coverImage}
          genre={book.subject?.[0] ?? "General"}
          href={`/${locale}/book/${bookId}`}
          pages={book.number_of_pages_median ?? 0}
          title={book.title}
        />
      </div>
    </div>
  );
};

const BookList = ({ listHeight, query }: BookListProps) => {
  const locale = useLocale();
  const { data, error, isError, isFetching, isLoading } = useGetBooks({
    enabled: query.length > 0,
    limit: 50,
    q: query,
  });

  const books = (data?.docs ?? []) as BookDoc[];

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

      <List
        defaultHeight={listHeight}
        overscanCount={3}
        rowComponent={BookRow}
        rowCount={books.length}
        rowHeight={ROW_HEIGHT}
        rowProps={{ books, locale }}
        style={{ height: listHeight, marginTop: "1rem" }}
      />
    </>
  );
};

export default BookList;
