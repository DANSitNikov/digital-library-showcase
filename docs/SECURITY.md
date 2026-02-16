# Security

## Environment Variables

- Store local config in `.env.local`
- Keep real secrets out of git (except intentionally shared test-only values)

## External Requests

- API URL is validated in `lib/env.ts`
- Book IDs are URL-encoded before request

## Links

- External links use `rel="noreferrer noopener"` with `target="_blank"`
