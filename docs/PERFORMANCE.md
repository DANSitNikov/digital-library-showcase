# Performance

## Current Choices

- Virtualized list rendering with `react-window`
- Infinite pagination with React Query
- Debounced search input updates
- `next/image` for optimized image delivery

## Notes

- Keep `rowHeight` in sync with rendered row height to avoid overlap.
- For `Image` with `fill`, provide `sizes`.
