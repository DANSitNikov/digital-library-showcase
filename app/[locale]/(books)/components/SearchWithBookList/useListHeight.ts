"use client";

import { useEffect, useState } from "react";

const MIN_LIST_HEIGHT = 240;
const INITIAL_LIST_HEIGHT = 720;

export const useListHeight = () => {
  const [listHeight, setListHeight] = useState(INITIAL_LIST_HEIGHT);

  useEffect(() => {
    let rafId = 0;

    const calculateListHeight = () => {
      const header = document.querySelector<HTMLElement>(
        "[data-layout-header]",
      );
      const footer = document.querySelector<HTMLElement>(
        "[data-layout-footer]",
      );
      const searchContainer = document.querySelector<HTMLElement>(
        "[data-search-container]",
      );

      const headerHeight = header?.getBoundingClientRect().height ?? 0;
      const footerHeight = footer?.getBoundingClientRect().height ?? 0;
      const searchHeight = searchContainer?.getBoundingClientRect().height ?? 0;
      const nextHeight = Math.max(
        MIN_LIST_HEIGHT,
        window.innerHeight - headerHeight - footerHeight - searchHeight,
      );

      setListHeight((prevHeight) =>
        prevHeight === nextHeight ? prevHeight : nextHeight,
      );
    };

    const schedule = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(calculateListHeight);
    };

    schedule();
    window.addEventListener("resize", schedule);

    const resizeObserver = new ResizeObserver(schedule);
    const header = document.querySelector<HTMLElement>("[data-layout-header]");
    const footer = document.querySelector<HTMLElement>("[data-layout-footer]");
    const searchContainer = document.querySelector<HTMLElement>(
      "[data-search-container]",
    );

    if (header) {
      resizeObserver.observe(header);
    }
    if (footer) {
      resizeObserver.observe(footer);
    }
    if (searchContainer) {
      resizeObserver.observe(searchContainer);
    }

    return () => {
      window.removeEventListener("resize", schedule);
      resizeObserver.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return { listHeight };
};
