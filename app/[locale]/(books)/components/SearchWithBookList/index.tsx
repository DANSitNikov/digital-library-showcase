"use client";

import { useState } from "react";
import { useListHeight } from "./useListHeight";
import Search from "../Search";
import BookList from "../BookList";

const SearchWithBookList = () => {
  const [query, setQuery] = useState("programming");
  const { listHeight } = useListHeight();

  return (
    <>
      <div data-search-container>
        <Search onQueryChange={setQuery} query={query} />
      </div>
      <BookList listHeight={listHeight} query={query} />
    </>
  );
};

export default SearchWithBookList;
