# Documentation

- [README](../README.md)
- [API](./API.md)
- [I18N](./I18N.md)
- [Components](./COMPONENTS.md)
- [Performance](./PERFORMANCE.md)
- [Accessibility](./A11Y.md)
- [Security](./SECURITY.md)
- [Deployment](./DEPLOYMENT.md)
- [Tech Stack](./TECH_STACK.md)

# Testing

## Test Stack

- Vitest
- Testing Library
- JSDOM

## Test Types

- Unit tests
  - `app/hooks/useDebounce/useDebounce.test.tsx`
  - `lib/api/googleBooks/googleBooks.test.ts`
- Integration test
  - `app/[locale]/(books)/components/Search/Search.test.tsx`

## CI

Tests are executed automatically in GitHub Actions on pull requests
targeting `main` via:

- `.github/workflows/ci.yml`

## Run Tests

```bash
npm run test
```
