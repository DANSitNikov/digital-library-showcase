import { env } from "@/lib/env";

type GoogleBooksImageLinks = {
  smallThumbnail?: string;
  thumbnail?: string;
  small?: string;
  medium?: string;
  large?: string;
  extraLarge?: string;
};

type GoogleBooksVolumeInfo = {
  title: string;
  authors?: string[];
  categories?: string[];
  description?: string;
  imageLinks?: GoogleBooksImageLinks;
  pageCount?: number;
  language?: string;
  previewLink?: string;
  publisher?: string;
  publishedDate?: string;
};

type GoogleBooksPdfAccess = {
  downloadLink?: string;
  isAvailable?: boolean;
};

type GoogleBooksAccessInfo = {
  pdf?: GoogleBooksPdfAccess;
};

export type GoogleBooksVolume = {
  accessInfo?: GoogleBooksAccessInfo;
  id: string;
  volumeInfo: GoogleBooksVolumeInfo;
};

export type GoogleBooksSearchResponse = {
  items?: GoogleBooksVolume[];
  kind: string;
  totalItems: number;
};

export type FetchBooksParams = {
  query: string;
  startIndex?: number;
  signal?: AbortSignal;
};

const PAGE_SIZE = 20;

export const getGoogleBooksCover = (
  imageLinks?: GoogleBooksImageLinks,
): string | undefined => {
  const raw =
    imageLinks?.medium ??
    imageLinks?.large ??
    imageLinks?.extraLarge ??
    imageLinks?.thumbnail ??
    imageLinks?.small ??
    imageLinks?.smallThumbnail;

  if (!raw) {
    return undefined;
  }

  return raw.replace("http://", "https://");
};

export const fetchBooks = async ({
  query,
  startIndex = 0,
  signal,
}: FetchBooksParams): Promise<GoogleBooksSearchResponse> => {
  const params = new URLSearchParams({
    maxResults: String(PAGE_SIZE),
    q: query,
    startIndex: String(startIndex),
  });

  const response = await fetch(
    `${env.NEXT_PUBLIC_GOOGLE_BOOKS_API_URL}/volumes?${params.toString()}`,
    {
      method: "GET",
      signal,
    },
  );

  if (!response.ok) {
    throw new Error(
      `Google Books request failed with status ${response.status}`,
    );
  }

  const data = (await response.json()) as GoogleBooksSearchResponse;

  return {
    ...data,
    items: data.items ?? [],
  };
};

export const fetchBookById = async (
  id: string,
): Promise<GoogleBooksVolume | null> => {
  const encodedId = encodeURIComponent(id);
  const response = await fetch(
    `${env.NEXT_PUBLIC_GOOGLE_BOOKS_API_URL}/volumes/${encodedId}`,
    {
      next: { revalidate: 3600 },
    },
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(
      `Google Books request failed with status ${response.status}`,
    );
  }

  return (await response.json()) as GoogleBooksVolume;
};
