/* @vitest-environment jsdom */

import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Search from "./index";

vi.mock("next-intl", () => ({
  useTranslations:
    (namespace: string) =>
    (key: string): string => {
      if (namespace !== "HomePage.search") {
        return key;
      }

      const messages: Record<string, string> = {
        label: "Search for books",
        placeholder: "Harry Potter",
        validationMin: "Enter at least 3 characters",
      };

      return messages[key] ?? key;
    },
}));

describe("Search integration", () => {
  afterEach(() => {
    cleanup();
  });

  it("calls onQueryChange only after debounce delay for a valid query", async () => {
    const onQueryChange = vi.fn();

    render(<Search onQueryChange={onQueryChange} query="" />);

    const input = screen.getByLabelText("Search for books");

    onQueryChange.mockClear();
    fireEvent.change(input, { target: { value: "harry potter" } });

    await waitFor(() => {
      expect(onQueryChange).toHaveBeenCalledWith("harry potter");
    });
  });

  it("shows validation message for too short query", async () => {
    const onQueryChange = vi.fn();

    render(<Search onQueryChange={onQueryChange} query="" />);

    const input = screen.getByLabelText("Search for books");
    fireEvent.change(input, { target: { value: "a" } });

    await waitFor(() => {
      expect(screen.getByText("Enter at least 3 characters")).toBeInTheDocument();
    });
  });
});
