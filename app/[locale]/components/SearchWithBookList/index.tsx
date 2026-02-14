"use client";

import { useEffect, useRef, useState } from "react";
import BookList from "@/app/[locale]/components/BookList";
import Search from "@/app/[locale]/components/Search";

const MIN_LIST_HEIGHT = 240;

const SearchWithBookList = () => {
  const [query, setQuery] = useState("programming");
  const [listHeight, setListHeight] = useState(720);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateListHeight = () => {
      const header = document.querySelector<HTMLElement>("[data-layout-header]");
      const footer = document.querySelector<HTMLElement>("[data-layout-footer]");
      const searchContainer = searchRef.current;

      const headerHeight = header?.getBoundingClientRect().height ?? 0;
      const footerHeight = footer?.getBoundingClientRect().height ?? 0;
      const searchHeight = searchContainer?.getBoundingClientRect().height ?? 0;
      const nextHeight = Math.max(
        MIN_LIST_HEIGHT,
        window.innerHeight - headerHeight - footerHeight - searchHeight,
      );

      setListHeight(nextHeight);
    };

    calculateListHeight();
    window.addEventListener("resize", calculateListHeight);

    const resizeObserver = new ResizeObserver(calculateListHeight);
    const header = document.querySelector<HTMLElement>("[data-layout-header]");
    const footer = document.querySelector<HTMLElement>("[data-layout-footer]");

    if (header) {
      resizeObserver.observe(header);
    }
    if (footer) {
      resizeObserver.observe(footer);
    }
    if (searchRef.current) {
      resizeObserver.observe(searchRef.current);
    }

    return () => {
      window.removeEventListener("resize", calculateListHeight);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={searchRef}>
        <Search onQueryChange={setQuery} query={query} />
      </div>
      <BookList listHeight={listHeight} query={query} />
    </>
  );
};

export default SearchWithBookList;
