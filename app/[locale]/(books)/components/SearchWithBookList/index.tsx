"use client";

import { useState } from "react";
import { useListHeight } from "./useListHeight";
import Search from "../Search";
import BookList from "../BookList";

const QUERY_STORAGE_KEY = "book-search-query";
const DEFAULT_QUERY = "programming";

const SearchWithBookList = () => {
  const [query, setQuery] = useState(() => {
    if (typeof window === "undefined") {
      return DEFAULT_QUERY;
    }

    const storedQuery = window.localStorage.getItem(QUERY_STORAGE_KEY);

    return storedQuery?.trim() || DEFAULT_QUERY;
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
