# Documentation

- [README](../README.md)
- [API](./API.md)
- [I18N](./I18N.md)
- [Components](./COMPONENTS.md)
- [Accessibility](./A11Y.md)
- [Testing](./TESTING.md)
- [Security](./SECURITY.md)
- [Deployment](./DEPLOYMENT.md)
- [Tech Stack](./TECH_STACK.md)

# Performance

## Main Optimizations

1. Debounced search requests  
   Search input updates are debounced, so the app waits briefly while
   the user is typing before sending a request.
   This reduces unnecessary API calls, lowers network usage, and avoids
   request spam on every keystroke.

2. Virtualized infinite list with paginated fetching  
   The book list uses `react-window`, so only visible rows are rendered
   in the DOM instead of rendering all cards at once.
   Google Books API pagination is used to load data in chunks; when the
   user scrolls near the end of the current list, the next page is
   fetched and appended.
   This keeps scrolling smooth and memory usage predictable even for
   large result sets.

## Validation

I tested the app with Lighthouse and provide screenshots below.
