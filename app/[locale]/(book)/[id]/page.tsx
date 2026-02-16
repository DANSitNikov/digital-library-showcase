import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Text from "@/app/components/Text";
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
  const { id, locale } = await params;
  const tBook = await getTranslations({ locale, namespace: "BookPage" });
  const book = await fetchBookById(id);

  if (!book) {
    return {
      title: tBook("metadata.notFoundTitle"),
    };
  }

  const info = book.volumeInfo;
  const description = info.description ?? tBook("fallback.noDescription");
  const ogImage =
    getGoogleBooksCover(info.imageLinks) ?? "/bookPlaceholder.svg";
  const ogTitle = tBook("metadata.title", { title: info.title });

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
  const { id, locale } = await params;
  const tBook = await getTranslations({ locale, namespace: "BookPage" });
  const book = await fetchBookById(id);

  if (!book) {
    notFound();
  }

  const info = book.volumeInfo;
  const coverImage =
    getGoogleBooksCover(info.imageLinks) ?? "/bookPlaceholder.svg";
  const categories =
    info.categories?.slice(0, 6).join(", ") ?? tBook("fallback.noCategories");
  const authors = info.authors?.join(", ") ?? tBook("fallback.unknownAuthor");
  const publisher = info.publisher ?? tBook("fallback.unknownPublisher");
  const publishedDate = info.publishedDate ?? tBook("fallback.unknown");
  const pageCount = info.pageCount ?? tBook("fallback.unknown");
  const language = info.language?.toUpperCase() ?? tBook("fallback.unknown");
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
              {tBook("labels.author")}: {authors}
            </Text>
            <Text
              className={styles.meta}
              component="p"
              size="text-sm"
              weight="medium"
            >
              {tBook("labels.publisher")}: {publisher}
            </Text>
            <Text
              className={styles.meta}
              component="p"
              size="text-sm"
              weight="medium"
            >
              {tBook("labels.publishedDate")}: {publishedDate}
            </Text>
            <Text
              className={styles.meta}
              component="p"
              size="text-sm"
              weight="medium"
            >
              {tBook("labels.pages")}: {pageCount}
            </Text>
            <Text
              className={styles.meta}
              component="p"
              size="text-sm"
              weight="medium"
            >
              {tBook("labels.language")}: {language}
            </Text>
            <Text
              className={styles.meta}
              component="p"
              size="text-sm"
              weight="medium"
            >
              {tBook("labels.genre")}: {categories}
            </Text>
          </div>
        </section>
        <section className={styles.secondary}>
          <Text className={styles.description} component="p" size="text-base">
            {info.description ?? tBook("fallback.noDescription")}
          </Text>
          <div className={styles.links}>
            {previewLink ? (
              <a
                className={styles.link}
                href={previewLink}
                rel="noreferrer noopener"
                target="_blank"
              >
                {tBook("actions.preview")}
              </a>
            ) : null}
            {previewLink && pdfDownloadLink ? (
              <Text
                aria-hidden="true"
                className={styles.separator}
                component="span"
                size="text-sm"
              >
                /
              </Text>
            ) : null}
            {pdfDownloadLink ? (
              <a
                className={styles.link}
                href={pdfDownloadLink}
                rel="noreferrer noopener"
                target="_blank"
              >
                {tBook("actions.downloadPdf")}
              </a>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
};

export default BookPage;
