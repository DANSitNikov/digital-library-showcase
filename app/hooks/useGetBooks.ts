"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchBooks } from "@/lib/api/openLibrary";

type UseGetBooksParams = {
  q?: string;
  limit?: number;
  enabled?: boolean;
};

export const useGetBooks = ({
  enabled = true,
  limit = 50,
  q = "programming",
}: UseGetBooksParams = {}) => {
  return useQuery({
    enabled,
    queryFn: ({ signal }) => fetchBooks({ limit: 50, q, signal }),
    queryKey: ["books", q],
  });
};
