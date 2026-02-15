import Image from "next/image";
import type { ImageProps } from "next/image";
import Link from "next/link";
import { memo } from "react";
import Text from "@/app/component/Text";
import styles from "./BookCard.module.scss";

export type BookCardProps = {
  title: string;
  author: string;
  blurb: string;
  coverImage: ImageProps["src"];
  pages: number;
  genre: string;
  href?: string;
};

const BookCard = ({
  author,
  blurb,
  coverImage,
  genre,
  href = "/books/mock-book",
  pages,
  title,
}: BookCardProps) => {
  return (
    <Link className={styles.link} href={href}>
      <article className={styles.card}>
        <div className={styles.coverWrap}>
          <Image
            alt={`Cover of ${title}`}
            className={styles.cover}
            fill
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            src={coverImage}
          />
        </div>
        <div className={styles.content}>
          <Text className={styles.title} component="h3" size="text-lg" weight="bold">
            {title}
          </Text>
          <Text className={styles.author} component="p" size="text-sm" weight="medium">
            {author}
          </Text>
          <Text className={styles.meta} component="p" size="text-sm">
            {blurb}
          </Text>
          <Text className={styles.meta} component="p" size="text-sm">
            {genre}
          </Text>
          <Text className={styles.meta} component="p" size="text-sm">
            {pages} pages
          </Text>
        </div>
      </article>
    </Link>
  );
};

export default memo(BookCard);
