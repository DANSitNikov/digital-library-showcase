import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Text from "@/app/component/Text";
import { fetchBookById, getGoogleBooksCover } from "@/lib/api/googleBooks";
import styles from "./page.module.scss";

type BookPageProps = {
  params: Promise<{
    id: string;
    locale: string;
  }>;
};

export const revalidate = 3600;

export const generateMetadata = async ({
  params,
}: BookPageProps): Promise<Metadata> => {
  const { id } = await params;
  const book = await fetchBookById(id);

  if (!book) {
    return {
      title: "Book not found | Digital Library",
    };
  }

  const info = book.volumeInfo;
  const description = info.description ?? "No description available.";
  const ogImage = getGoogleBooksCover(info.imageLinks) ?? "/bookPlaceholder.svg";
  const ogTitle = `${info.title} | Digital Library`;

  return {
    description,
    openGraph: {
      description,
      images: [
        {
          alt: `Cover of ${info.title}`,
          url: ogImage,
        },
      ],
      title: ogTitle,
    },
    title: ogTitle,
  };
};

const BookPage = async ({ params }: BookPageProps) => {
  const { id } = await params;
  const book = await fetchBookById(id);

  if (!book) {
    notFound();
  }

  const info = book.volumeInfo;
  const coverImage = getGoogleBooksCover(info.imageLinks) ?? "/bookPlaceholder.svg";
  const categories =
    info.categories?.slice(0, 6).join(", ") ?? "No categories available.";
  const authors = info.authors?.join(", ") ?? "Unknown author";
  const publisher = info.publisher ?? "Unknown publisher";
  const publishedDate = info.publishedDate ?? "Unknown";
  const pageCount = info.pageCount ?? "Unknown";
  const language = (info.language ?? "Unknown").toUpperCase();
  const previewLink = info.previewLink;
  const pdfDownloadLink = book.accessInfo?.pdf?.downloadLink;

  return (
    <main className={styles.main}>
      <div className={styles.layout}>
        <div className={styles.coverWrap}>
          <Image
            alt={`Cover of ${info.title}`}
            className={styles.cover}
            fill
            src={coverImage}
          />
        </div>
        <section>
          <div className={styles.content}>
            <Text
              className={styles.title}
              component="h1"
              size="text-3xl"
              weight="bold"
            >
              {info.title}
            </Text>
            <Text
              className={styles.meta}
              component="p"
              size="text-sm"
              weight="medium"
            >
              Author: {authors}
            </Text>
            <Text
              className={styles.meta}
              component="p"
              size="text-sm"
              weight="medium"
            >
              Publisher: {publisher}
            </Text>
            <Text
              className={styles.meta}
              component="p"
              size="text-sm"
              weight="medium"
            >
              Published date: {publishedDate}
            </Text>
            <Text
              className={styles.meta}
              component="p"
              size="text-sm"
              weight="medium"
            >
              Number of pages: {pageCount}
            </Text>
            <Text
              className={styles.meta}
              component="p"
              size="text-sm"
              weight="medium"
            >
              Language: {language}
            </Text>
            <Text className={styles.description} component="p" size="text-base">
              {info.description ?? "No description available."}
            </Text>
            <Text
              className={styles.meta}
              component="p"
              size="text-sm"
              weight="medium"
            >
              Genre: {categories}
            </Text>
            {previewLink ? (
              <a
                className={styles.link}
                href={previewLink}
                rel="noreferrer noopener"
                target="_blank"
              >
                Preview
              </a>
            ) : null}
            {pdfDownloadLink ? (
              <a
                className={styles.link}
                href={pdfDownloadLink}
                rel="noreferrer noopener"
                target="_blank"
              >
                Download PDF
              </a>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
};

export default BookPage;
