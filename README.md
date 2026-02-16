# Digital Library Showcase

## Links

- App: https://digital-library-showcase.vercel.app/en
- Components (Chromatic): https://6992ba4cbddef535264b63e4-wucxhqivxa.chromatic.com/

## Documentation

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

<img width="1633" height="1040" alt="Screenshot 2026-02-16 at 20 44 50" src="https://github.com/user-attachments/assets/e4c5eeaa-350c-4d05-87a7-8c2fe6e0a84f" />

<img width="1645" height="1040" alt="Screenshot 2026-02-16 at 20 45 08" src="https://github.com/user-attachments/assets/d87e0610-f7f7-4ada-90ab-32325b91be33" />

### Mobile

<img width="990" height="820" alt="Screenshot 2026-02-16 at 20 45 29" src="https://github.com/user-attachments/assets/e8a584f4-36af-47c3-b93a-195687246a8a" />

<img width="1000" height="810" alt="Screenshot 2026-02-16 at 20 45 38" src="https://github.com/user-attachments/assets/a557f8b9-8de5-4fed-b981-aa84cdb5f32b" />



