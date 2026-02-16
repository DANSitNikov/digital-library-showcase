"use client";

import { useLocale, useTranslations } from "next-intl";
import { List } from "react-window";
import Loader from "@/app/components/ui/Loader";
import Text from "@/app/components/ui/Text";
import { useGetBooks } from "@/app/[locale]/(books)/hooks/useGetBooks";
import styles from "./BookList.module.scss";
import BookRow from "./BookRow";
import type { BookListLabels } from "./BookRow";
import BookCardSkeleton from "../BookCard/BookCardSkeleton";

type BookListProps = {
  query: string;
  listHeight: number;
};

const ROW_HEIGHT = 212;

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
    query,
  });
  const bookListLabels: BookListLabels = {
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
      {isError ? (
        <div className={styles.status}>
          <Text component="p">
            {(error as Error)?.message || tList("error")}
          </Text>
        </div>
      ) : null}
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
          rowProps={{ books, bookListLabels, locale }}
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
