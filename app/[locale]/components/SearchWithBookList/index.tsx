"use client";

import { useState } from "react";
import BookList from "@/app/[locale]/components/BookList";
import Search from "@/app/[locale]/components/Search";

const SearchWithBookList = () => {
  const [query, setQuery] = useState("programming");

  return (
    <>
      <Search onQueryChange={setQuery} query={query} />
      <BookList query={query} />
    </>
  );
};

export default SearchWithBookList;
