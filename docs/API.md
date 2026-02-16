# Documentation

- [README](../README.md)
- [I18N](./I18N.md)
- [Components](./COMPONENTS.md)
- [Performance](./PERFORMANCE.md)
- [Accessibility](./A11Y.md)
- [Testing](./TESTING.md)
- [Security](./SECURITY.md)
- [Deployment](./DEPLOYMENT.md)
- [Tech Stack](./TECH_STACK.md)

# API

## Provider

The project uses Google Books API.
I decided to pick Google Books API because it provides all the
necessary information for this app: searchable titles, authors, cover
images, categories, page count, language, preview links, and book IDs
for detail pages.

Base URL comes from:

- `NEXT_PUBLIC_GOOGLE_BOOKS_API_URL`

## Request Management

I decided to use TanStack Query because it simplifies server request
handling through built-in caching, loading/error states, pagination
support. It also keeps API logic predictable and reduces manual state-management
code around network calls.

## Endpoints Used

- Search books: `/volumes?q={query}&maxResults=20&startIndex={offset}`
- Book details: `/volumes/{id}`

## Mapping

API access and mapping are handled in:

- `lib/api/googleBooks/index.ts`
