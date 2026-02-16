"use client";

import { useLocale, useTranslations } from "next-intl";
import { List } from "react-window";
import type { RowComponentProps } from "react-window";
import Loader from "@/app/components/ui/Loader";
import Text from "@/app/components/ui/Text";
import { useGetBooks } from "@/app/hooks/useGetBooks";
import type { GoogleBooksVolume } from "@/lib/api/googleBooks";
import { getGoogleBooksCover } from "@/lib/api/googleBooks";
import styles from "./BookList.module.scss";
import BookCard from "../BookCard";
import BookCardSkeleton from "../BookCard/BookCardSkeleton";

type BookRowProps = {
  books: GoogleBooksVolume[];
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
  locale,
  listCopy,
}: RowComponentProps<BookRowProps>) => {
  const book = books[index];
  const info = book.volumeInfo;
  const coverImage =
    getGoogleBooksCover(info.imageLinks) ?? "/bookPlaceholder.svg";
  const publishedValue = info.publishedDate ?? listCopy.unknown;

  return (
    <div className={styles.row} style={style}>
      <div className={styles.rowInner}>
        <BookCard
          author={info.authors?.[0] ?? listCopy.unknownAuthor}
          blurb={listCopy.publishedPattern.replace("{value}", publishedValue)}
          coverImage={coverImage}
          genre={info.categories?.[0] ?? listCopy.general}
          href={`/${locale}/${book.id}`}
          pages={info.pageCount ?? 0}
          title={info.title}
        />
      </div>
    </div>
  );
};

const BookList = ({ listHeight, query }: BookListProps) => {
  const locale = useLocale();
  const tList = useTranslations("HomePage.list");
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

  const books = data?.pages.flatMap((page) => page.items ?? []) ?? [];
  const showInitialSkeletons =
    !isError && books.length === 0 && (isLoading || isFetching);
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
      <div className={styles.status}>
        {isError ? (
          <Text component="p">
            {(error as Error)?.message || tList("error")}
          </Text>
        ) : null}
      </div>
      {showInitialSkeletons ? (
        <div className={styles.skeletons}>
          <BookCardSkeleton />
          <BookCardSkeleton />
          <BookCardSkeleton />
        </div>
      ) : null}

      {books.length > 0 ? (
        <List
          defaultHeight={listHeight}
          onRowsRendered={handleRowsRendered}
          overscanCount={3}
          rowComponent={BookRow}
          rowCount={books.length}
          rowHeight={ROW_HEIGHT}
          rowProps={{ books, listCopy, locale }}
          className={styles.list}
          style={{ height: listHeight }}
        />
      ) : null}
      {isFetchingNextPage ? (
        <div className={styles.loadingMore}>
          <Loader />
        </div>
      ) : null}
    </>
  );
};

export default BookList;
