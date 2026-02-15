"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import type { GoogleBooksSearchResponse } from "@/lib/api/googleBooks";
import { fetchBooks } from "@/lib/api/googleBooks";

type UseGetBooksParams = {
  q?: string;
  enabled?: boolean;
};

const PAGE_SIZE = 20;

export const useGetBooks = ({
  enabled = true,
  q = "programming",
}: UseGetBooksParams = {}) => {
  return useInfiniteQuery<GoogleBooksSearchResponse, Error>({
    enabled,
    initialPageParam: 0,
    queryKey: ["books", q, PAGE_SIZE],
    queryFn: ({ pageParam, signal }) =>
      fetchBooks({
        q,
        signal,
        startIndex: Number(pageParam) || 0,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const loadedCount = allPages.reduce(
        (count, page) => count + (page.items?.length ?? 0),
        0,
      );
      const totalItems = lastPage.totalItems ?? 0;
      const hasMore = loadedCount < totalItems;

      if (!hasMore) {
        return undefined;
      }

      return loadedCount;
    },
  });
};
