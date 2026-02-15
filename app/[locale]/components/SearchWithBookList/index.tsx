"use client";

import { useState } from "react";
import BookList from "@/app/[locale]/components/BookList";
import Search from "@/app/[locale]/components/Search";
import { useListHeight } from "./useListHeight";

const QUERY_STORAGE_KEY = "book-search-query";

const SearchWithBookList = () => {
  const [query, setQuery] = useState(() => {
    if (typeof window === "undefined") {
      return "programming";
    }

    const storedQuery = window.localStorage.getItem(QUERY_STORAGE_KEY);
    return storedQuery?.trim() || "programming";
  });
  const { listHeight } = useListHeight();
  const handleQueryChange = (nextQuery: string) => {
    setQuery(nextQuery);

    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(QUERY_STORAGE_KEY, nextQuery);
  };

  return (
    <>
      <div data-search-container>
        <Search onQueryChange={handleQueryChange} query={query} />
      </div>
      <BookList listHeight={listHeight} query={query} />
    </>
  );
};

export default SearchWithBookList;
