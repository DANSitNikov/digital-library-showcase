# Documentation

- [README](../README.md)
- [API](./API.md)
- [I18N](./I18N.md)
- [Components](./COMPONENTS.md)
- [Performance](./PERFORMANCE.md)
- [Accessibility](./A11Y.md)
- [Testing](./TESTING.md)
- [Deployment](./DEPLOYMENT.md)
- [Tech Stack](./TECH_STACK.md)

# Security

## Environment Variables

- Store local config in `.env.local`
- Keep real secrets out of git (except intentionally shared test-only values)

## External Requests

- API URL is validated in `lib/env.ts`
- Book IDs are URL-encoded before request

## Links

- External links use `rel="noreferrer noopener"` with `target="_blank"`
