import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Text from "@/app/component/Text";
import { fetchBookById, getGoogleBooksCover } from "@/lib/api/googleBooks";

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
  const ogImage = getGoogleBooksCover(info.imageLinks) ?? "/window.svg";
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
  const coverImage = getGoogleBooksCover(info.imageLinks) ?? "/window.svg";

  return (
    <main style={{ margin: "0 auto", maxWidth: "960px", padding: "2rem" }}>
      <div style={{ display: "grid", gap: "2rem", gridTemplateColumns: "240px 1fr" }}>
        <Image
          alt={`Cover of ${info.title}`}
          height={360}
          src={coverImage}
          style={{ objectFit: "cover" }}
          width={240}
        />
        <section>
          <Text component="h1" size="text-3xl" weight="bold">
            {info.title}
          </Text>
          <Text component="p" size="text-base" style={{ marginTop: "1rem" }}>
            {info.description ?? "No description available."}
          </Text>
          <Text
            component="p"
            size="text-sm"
            style={{ marginTop: "1rem" }}
            weight="medium"
          >
            {info.categories?.slice(0, 6).join(", ") || "No categories available."}
          </Text>
        </section>
      </div>
    </main>
  );
};

export default BookPage;
