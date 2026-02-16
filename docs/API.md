# API

## Provider

The project uses Google Books API.

Base URL comes from:

- `NEXT_PUBLIC_GOOGLE_BOOKS_API_URL`

## Endpoints Used

- Search books: `/volumes?q={query}&maxResults=20&startIndex={offset}`
- Book details: `/volumes/{id}`

## Mapping

API access and mapping are handled in:

- `lib/api/googleBooks/index.ts`
