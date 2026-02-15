"use client";

import { useLocale } from "next-intl";
import { List } from "react-window";
import type { RowComponentProps } from "react-window";
import BookCard from "@/app/[locale]/components/BookCard";
import Text from "@/app/component/Text";
import { useGetBooks } from "@/app/hooks/useGetBooks";
import type { GoogleBooksVolume } from "@/lib/api/googleBooks";
import { getGoogleBooksCover } from "@/lib/api/googleBooks";

type BookRowProps = {
  books: GoogleBooksVolume[];
  locale: string;
};

type BookListProps = {
  query: string;
  listHeight: number;
};

const ROW_HEIGHT = 212;

const BookRow = ({
  index,
  style,
  books,
  locale,
}: RowComponentProps<BookRowProps>) => {
  const book = books[index];
  const info = book.volumeInfo;
  const coverImage = getGoogleBooksCover(info.imageLinks) ?? "/window.svg";

  return (
    <div style={{ ...style, display: "flex", justifyContent: "center" }}>
      <div style={{ paddingBottom: "1rem", width: "100%" }}>
        <BookCard
          author={info.authors?.[0] ?? "Unknown author"}
          blurb={`Published: ${info.publishedDate ?? "Unknown"}`}
          coverImage={coverImage}
          genre={info.categories?.[0] ?? "General"}
          href={`/${locale}/book/${book.id}`}
          pages={info.pageCount ?? 0}
          title={info.title}
        />
      </div>
    </div>
  );
};

const BookList = ({ listHeight, query }: BookListProps) => {
  const locale = useLocale();
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetching,
    isFetchingNextPage,
    isLoading,
  } = useGetBooks({
    enabled: query.length > 0,
    q: query,
  });

  const books =
    data?.pages.flatMap((page) => page.items ?? []) ?? [];
  const handleRowsRendered = (
    visibleRows: { startIndex: number; stopIndex: number },
  ) => {
    const isNearBottom = visibleRows.stopIndex >= books.length - 5;

    if (!isNearBottom || !hasNextPage || isFetchingNextPage) {
      return;
    }

    void fetchNextPage();
  };

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
        onRowsRendered={handleRowsRendered}
        overscanCount={3}
        rowComponent={BookRow}
        rowCount={books.length}
        rowHeight={ROW_HEIGHT}
        rowProps={{ books, locale }}
        style={{ height: listHeight, marginTop: "1rem" }}
      />
      {isFetchingNextPage ? (
        <div style={{ marginTop: "0.5rem" }}>
          <Text component="p" size="text-sm">
            Loading more books...
          </Text>
        </div>
      ) : null}
    </>
  );
};

export default BookList;
