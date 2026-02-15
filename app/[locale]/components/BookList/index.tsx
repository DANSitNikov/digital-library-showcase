"use client";

import { useLocale, useTranslations } from "next-intl";
import { List } from "react-window";
import type { RowComponentProps } from "react-window";
import BookCard from "@/app/[locale]/components/BookCard";
import Text from "@/app/component/Text";
import { useGetBooks } from "@/app/hooks/useGetBooks";
import type { GoogleBooksVolume } from "@/lib/api/googleBooks";
import { getGoogleBooksCover } from "@/lib/api/googleBooks";

type BookRowProps = {
  books: GoogleBooksVolume[];
  cardLabels: {
    author: string;
    genre: string;
    pages: string;
  };
  locale: string;
  listCopy: {
    general: string;
    publishedPattern: string;
    unknown: string;
    unknownAuthor: string;
  };
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
  cardLabels,
  locale,
  listCopy,
}: RowComponentProps<BookRowProps>) => {
  const book = books[index];
  const info = book.volumeInfo;
  const coverImage = getGoogleBooksCover(info.imageLinks) ?? "/bookPlaceholder.svg";
  const publishedValue = info.publishedDate ?? listCopy.unknown;

  return (
    <div style={{ ...style, display: "flex", justifyContent: "center" }}>
      <div style={{ paddingBottom: "1rem", width: "100%" }}>
        <BookCard
          author={info.authors?.[0] ?? listCopy.unknownAuthor}
          authorLabel={cardLabels.author}
          blurb={listCopy.publishedPattern.replace("{value}", publishedValue)}
          coverImage={coverImage}
          genre={info.categories?.[0] ?? listCopy.general}
          genreLabel={cardLabels.genre}
          href={`/${locale}/book/${book.id}`}
          pages={info.pageCount ?? 0}
          pagesLabel={cardLabels.pages}
          title={info.title}
        />
      </div>
    </div>
  );
};

const BookList = ({ listHeight, query }: BookListProps) => {
  const locale = useLocale();
  const tList = useTranslations("HomePage.list");
  const tCard = useTranslations("HomePage.card");
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
  const listCopy = {
    general: tList("general"),
    publishedPattern: tList("published", { value: "{value}" }),
    unknown: tList("unknown"),
    unknownAuthor: tList("unknownAuthor"),
  };
  const cardLabels = {
    author: tCard("authorLabel"),
    genre: tCard("genreLabel"),
    pages: tCard("pagesLabel"),
  };

  const books = data?.pages.flatMap((page) => page.items ?? []) ?? [];
  const handleRowsRendered = (visibleRows: {
    startIndex: number;
    stopIndex: number;
  }) => {
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
          <Text component="p">{tList("loading")}</Text>
        ) : null}
        {isError ? (
          <Text component="p">
            {(error as Error)?.message || tList("error")}
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
        rowProps={{ books, cardLabels, listCopy, locale }}
        style={{ height: listHeight, marginTop: "1rem" }}
      />
      {isFetchingNextPage ? (
        <div style={{ marginTop: "0.5rem" }}>
          <Text component="p" size="text-sm">
            {tList("loadingMore")}
          </Text>
        </div>
      ) : null}
    </>
  );
};

export default BookList;
