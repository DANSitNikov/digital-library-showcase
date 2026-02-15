"use client";

import { useState } from "react";
import BookList from "@/app/[locale]/components/BookList";
import Search from "@/app/[locale]/components/Search";
import { useListHeight } from "./useListHeight";

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
