import Image from "next/image";
import type { ImageProps } from "next/image";
import Link from "next/link";
import { memo } from "react";

export type CardProps = {
  title: string;
  author: string;
  blurb: string;
  coverImage: ImageProps["src"];
  pages: number;
  genre: string;
  href?: string;
};

const Card = ({
  author,
  blurb,
  coverImage,
  genre,
  href = "/books/mock-book",
  pages,
  title,
}: CardProps) => {
  return (
    <Link href={href}>
      <article>
        <Image
          alt={`Cover of ${title}`}
          height={360}
          loading="lazy"
          src={coverImage}
          style={{ display: "block", objectFit: "cover" }}
          width={240}
        />
        <h3>{title}</h3>
        <p>{author}</p>
        <p>{blurb}</p>
        <p>{genre}</p>
        <p>{pages} pages</p>
      </article>
    </Link>
  );
};

export default memo(Card);
