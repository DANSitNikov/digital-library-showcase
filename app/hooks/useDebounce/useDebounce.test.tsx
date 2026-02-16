/* @vitest-environment jsdom */

import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import useDebounce from "./index";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns the initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("Harry", 300));

    expect(result.current).toBe("Harry");
  });

  it("updates only after the delay", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: "Ha" } },
    );

    rerender({ value: "Harry Potter" });

    expect(result.current).toBe("Ha");

    act(() => {
      vi.advanceTimersByTime(299);
    });

    expect(result.current).toBe("Ha");

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(result.current).toBe("Harry Potter");
  });
});
