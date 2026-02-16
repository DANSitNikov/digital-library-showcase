"use client";

import Image from "next/image";
import type { ImageProps } from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { memo } from "react";
import Text from "@/app/components/ui/Text";
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
  href,
  pages,
  title,
}: BookCardProps) => {
  const tCard = useTranslations("HomePage.card");

  const card = (
    <article className={styles.card}>
      <div className={styles.coverWrap}>
        <Image
          alt={`Cover of ${title}`}
          className={styles.cover}
          fill
          loading="lazy"
          sizes="(max-width: 600px) 120px, 180px"
          src={coverImage}
        />
      </div>
      <div className={styles.content}>
        <Text
          className={styles.title}
          component="h3"
          size="text-lg"
          weight="bold"
        >
          {title}
        </Text>
        <Text
          className={styles.author}
          component="p"
          size="text-sm"
          weight="medium"
        >
          {tCard("authorLabel")}: {author}
        </Text>
        <Text className={styles.meta} component="p" size="text-sm">
          {blurb}
        </Text>
        <Text className={styles.meta} component="p" size="text-sm">
          {tCard("genreLabel")}: {genre}
        </Text>
        <Text className={styles.meta} component="p" size="text-sm">
          {tCard("pagesLabel")}: {pages}
        </Text>
      </div>
    </article>
  );

  if (!href) {
    return card;
  }

  return (
    <Link className={styles.link} href={href}>
      {card}
    </Link>
  );
};

export default memo(BookCard);
