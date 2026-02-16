# Digital Library Showcase

## Links

- App: https://digital-library-showcase.vercel.app/en
- Components (Chromatic): https://6992ba4cbddef535264b63e4-wucxhqivxa.chromatic.com/

## Documentation

- Architecture: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- API: [docs/API.md](docs/API.md)
- Internationalization: [docs/I18N.md](docs/I18N.md)
- Components: [docs/COMPONENTS.md](docs/COMPONENTS.md)
- Performance: [docs/PERFORMANCE.md](docs/PERFORMANCE.md)
- Accessibility: [docs/A11Y.md](docs/A11Y.md)
- Testing: [docs/TESTING.md](docs/TESTING.md)
- Security: [docs/SECURITY.md](docs/SECURITY.md)
- Deployment: [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

## Run The App

Node version: `v24.11.1`

1. Create `.env.local`:

Note: for this test project, the value is shared in this README. In a real app, I would not share `.env.local` values on GitHub.

```bash
NEXT_PUBLIC_GOOGLE_BOOKS_API_URL=https://www.googleapis.com/books/v1
```

Note: sometimes Google Books API responds with `429 Too Many Requests`. I hope the app will work fine for you.

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

4. Open:

`http://localhost:3000`

## Run With Docker

```bash
docker compose up --build
```

## App Screenshots

### Desktop



### Mobile


