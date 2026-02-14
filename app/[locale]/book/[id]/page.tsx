import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Text from "@/app/component/Text";
import { env } from "@/lib/env";

type WorkResponse = {
  title: string;
  description?: string | { value?: string };
  covers?: number[];
  subjects?: string[];
};

type BookPageProps = {
  params: Promise<{
    id: string;
    locale: string;
  }>;
};

export const revalidate = 3600;

const getDescription = (description: WorkResponse["description"]) => {
  if (typeof description === "string") {
    return description;
  }

  return description?.value ?? "No description available.";
};

const getWorkById = async (id: string): Promise<WorkResponse> => {
  const response = await fetch(`${env.NEXT_PUBLIC_OPEN_LIBRARY_API_URL}/works/${id}.json`, {
    cache: "force-cache",
  });

  if (!response.ok) {
    notFound();
  }

  return (await response.json()) as WorkResponse;
};

export const generateMetadata = async ({
  params,
}: BookPageProps): Promise<Metadata> => {
  const { id } = await params;
  const work = await getWorkById(id);
  const description = getDescription(work.description);
  const coverId = work.covers?.[0];
  const ogImage = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
    : "/window.svg";
  const ogTitle = `${work.title} | Digital Library`;

  return {
    description,
    openGraph: {
      description,
      images: [
        {
          alt: `Cover of ${work.title}`,
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
  const work = await getWorkById(id);
  const coverId = work.covers?.[0];
  const coverImage = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
    : "/window.svg";

  return (
    <main style={{ margin: "0 auto", maxWidth: "960px", padding: "2rem" }}>
      <div style={{ display: "grid", gap: "2rem", gridTemplateColumns: "240px 1fr" }}>
        <Image
          alt={`Cover of ${work.title}`}
          height={360}
          src={coverImage}
          style={{ objectFit: "cover" }}
          width={240}
        />
        <section>
          <Text component="h1" size="display-sm" weight="bold">
            {work.title}
          </Text>
          <Text component="p" size="md" style={{ marginTop: "1rem" }}>
            {getDescription(work.description)}
          </Text>
          <Text component="p" size="sm" style={{ marginTop: "1rem" }} weight="medium">
            {work.subjects?.slice(0, 6).join(", ") || "No subjects available."}
          </Text>
        </section>
      </div>
    </main>
  );
};

export default BookPage;
