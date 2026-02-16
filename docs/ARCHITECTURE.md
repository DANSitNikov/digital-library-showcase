# Architecture

## Overview

The app is a Next.js App Router project with:

- locale-based routes via `next-intl`
- server-rendered route segments for pages and metadata
- client components for interactive search and forms
- `@tanstack/react-query` for paginated book fetching

## Main Folders

- `app/[locale]/(books)` for home/search/list flow
- `app/[locale]/(book)/[id]` for book details flow
- `app/components/ui` for reusable UI components
- `app/components/features` for app-specific composed components
- `lib/api` for external API adapters
- `i18n` for locale routing and message catalogs
