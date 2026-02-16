import type { RowComponentProps } from "react-window";
import type { GoogleBooksVolume } from "@/lib/api/googleBooks";
import { getGoogleBooksCover } from "@/lib/api/googleBooks";
import styles from "./BookList.module.scss";
import BookCard from "../BookCard";

export type BookListLabels = {
  general: string;
  publishedPattern: string;
  unknown: string;
  unknownAuthor: string;
};

export type BookRowData = {
  books: GoogleBooksVolume[];
  locale: string;
  bookListLabels: BookListLabels;
};

const BookRow = ({
  index,
  style,
  books,
  locale,
  bookListLabels,
}: RowComponentProps<BookRowData>) => {
  const book = books[index];
  const info = book.volumeInfo;
  const coverImage =
    getGoogleBooksCover(info.imageLinks) ?? "/bookPlaceholder.svg";
  const publishedValue = info.publishedDate ?? bookListLabels.unknown;

  return (
    <div className={styles.row} style={style}>
      <div className={styles.rowInner}>
        <BookCard
          author={info.authors?.[0] ?? bookListLabels.unknownAuthor}
          blurb={bookListLabels.publishedPattern.replace("{value}", publishedValue)}
          coverImage={coverImage}
          genre={info.categories?.[0] ?? bookListLabels.general}
          href={`/${locale}/${book.id}`}
          pages={info.pageCount ?? 0}
          title={info.title}
        />
      </div>
    </div>
  );
};

export default BookRow;
