# Documentation

- [README](../README.md)
- [API](./API.md)
- [I18N](./I18N.md)
- [Components](./COMPONENTS.md)
- [Performance](./PERFORMANCE.md)
- [Accessibility](./A11Y.md)
- [Testing](./TESTING.md)
- [Security](./SECURITY.md)
- [Deployment](./DEPLOYMENT.md)

# Tech Stack

## Core

- Next.js 16 (App Router)
- React 19
- TypeScript

## Styling

- SCSS Modules
- `modern-normalize`: CSS baseline used to reduce browser default inconsistencies.
- `clsx`: Utility used to compose conditional class names cleanly.

## Data & State

- `@tanstack/react-query`: Server-state library used for fetching, caching, and pagination.
- `react-hook-form`: Form library used for performant form state management and validation flow.
- `zod`: Schema validation library used to define and validate input constraints.
- `Redux/Zustand` (not used): Omitted because this app does not require complex global client state.

## Internationalization

- `next-intl`: Localization library used for locale routing and translated messages.

## UI Development

- `Storybook`: Component workshop used to document and review UI states in isolation.
- `Chromatic`: Cloud service used to publish and share Storybook builds per pull request.

## Testing

- `Vitest`: Test runner used for fast unit and integration tests.
- `Testing Library`: Utilities used to test components through user-facing behavior.
- `JSDOM`: Browser-like environment used to run UI tests in Node.js.

## Tooling

- `ESLint`: Linting tool used to enforce code quality and consistency rules.
- `Prettier`: Formatter used to keep code style consistent across the project.
- `Docker / Docker Compose`: Container tooling used to run the app in a reproducible local environment.
