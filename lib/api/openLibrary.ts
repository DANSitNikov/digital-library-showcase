import { env } from "@/lib/env";

export type OpenLibraryBook = {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
  number_of_pages_median?: number;
  subject?: string[];
};

export type OpenLibrarySearchResponse = {
  docs: OpenLibraryBook[];
  numFound: number;
  start: number;
};

type FetchBooksParams = {
  q?: string;
  limit?: number;
  signal?: AbortSignal;
};

export const fetchBooks = async ({
  limit = 50,
  q = "programming",
  signal,
}: FetchBooksParams): Promise<OpenLibrarySearchResponse> => {
  const params = new URLSearchParams({
    limit: String(limit),
    q,
  });

  const response = await fetch(
    `${env.NEXT_PUBLIC_OPEN_LIBRARY_API_URL}/search.json?${params.toString()}`,
    {
      method: "GET",
      signal,
    },
  );

  if (!response.ok) {
    throw new Error(`OpenLibrary request failed with status ${response.status}`);
  }

  return (await response.json()) as OpenLibrarySearchResponse;
};
