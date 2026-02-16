/* @vitest-environment jsdom */

import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import SearchWithBookList from "./index";

const mockUseGetBooks = vi.fn();

vi.mock("next-intl", () => ({
  useLocale: () => "en",
  useTranslations:
    (namespace: string) =>
    (key: string, values?: Record<string, string>): string => {
      if (namespace === "HomePage.search") {
        const searchMessages: Record<string, string> = {
          label: "Search for books",
          placeholder: "Harry Potter",
          validationMin: "Enter at least 3 characters",
        };

        return searchMessages[key] ?? key;
      }

      if (namespace === "HomePage.list") {
        const listMessages: Record<string, string> = {
          empty: "No books found.",
          error: "Something went wrong",
          general: "General",
          loadingMore: "Loading more books...",
          unknown: "Unknown",
          unknownAuthor: "Unknown author",
        };

        if (key === "published") {
          return `Published: ${values?.value ?? ""}`;
        }

        return listMessages[key] ?? key;
      }

      if (namespace === "HomePages.card") {
        const cardMessages: Record<string, string> = {
          authorLabel: "Author",
          genreLabel: "Genre",
          pagesLabel: "Number of pages",
        };

        return cardMessages[key] ?? key;
      }

      return key;
    },
}));

vi.mock("next/image", () => ({
  default: ({
    alt,
    fill: _fill,
    ...props
  }: { alt: string; fill?: boolean } & Record<string, unknown>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} {...props} />
  ),
}));

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: ReactNode;
    href: string;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("@/lib/api/googleBooks", () => ({
  getGoogleBooksCover: () => "/bookPlaceholder.svg",
}));

vi.mock("./useListHeight", () => ({
  useListHeight: () => ({ listHeight: 720 }),
}));

vi.mock("@/app/[locale]/(books)/hooks/useGetBooks", () => ({
  useGetBooks: (params: unknown) => mockUseGetBooks(params),
}));

describe("SearchWithBookList integration", () => {
  beforeEach(() => {
    vi.useRealTimers();
    localStorage.clear();
    localStorage.setItem("book-search-query", "Harry Potter");

    mockUseGetBooks.mockImplementation(({ query }: { query: string }) => {
      const normalized = query.toLowerCase();

      if (normalized.includes("harry")) {
        return {
          data: {
            pages: [
              {
                items: [
                  {
                    id: "hp-1",
                    volumeInfo: {
                      authors: ["J. K. Rowling"],
                      categories: ["Fantasy"],
                      pageCount: 320,
                      publishedDate: "1998",
                      title: "Harry Potter and the Sorcerer's Stone",
                    },
                  },
                ],
                kind: "books#volumes",
                totalItems: 1,
              },
            ],
          },
          error: null,
          fetchNextPage: vi.fn(),
          hasNextPage: false,
          isError: false,
          isFetching: false,
          isFetchingNextPage: false,
          isLoading: false,
        };
      }

      return {
        data: {
          pages: [{ items: [], kind: "books#volumes", totalItems: 0 }],
        },
        error: null,
        fetchNextPage: vi.fn(),
        hasNextPage: false,
        isError: false,
        isFetching: false,
        isFetchingNextPage: false,
        isLoading: false,
      };
    });
  });

  it("shows empty state when search query returns no books", async () => {
    render(<SearchWithBookList />);

    const input = screen.getByLabelText("Search for books");
    fireEvent.change(input, { target: { value: "noresults" } });

    await waitFor(() => {
      expect(screen.getByText("No books found.")).toBeInTheDocument();
    });
  });
});
