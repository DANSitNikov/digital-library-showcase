# Documentation

- [README](../README.md)
- [API](./API.md)
- [I18N](./I18N.md)
- [Performance](./PERFORMANCE.md)
- [Accessibility](./A11Y.md)
- [Testing](./TESTING.md)
- [Security](./SECURITY.md)
- [Deployment](./DEPLOYMENT.md)
- [Tech Stack](./TECH_STACK.md)

# Components

## Design Approach

Most of the time, I use Atomic Design as a base for building a component
library:
[Atomic Design by Brad Frost](https://atomicdesign.bradfrost.com/chapter-2/).

For this test project, I simplified the structure and kept a practical
split into reusable UI components and app-level feature components.
For a larger production app, this structure can be expanded into
atoms, molecules, organisms, and templates.

## Layers

- `app/components/ui`: generic reusable UI
- `app/components/features`: composed app-specific components

## UI Groups

- Typography: `Text`, `TextSkeleton`
- Primitives: `Button`, `Loader`, `Skeleton`
- Forms: `Input`, `Select`, `Error` and skeleton variants
- Icons: `ArrowBack`, `KeyboardArrowDown`, `Sync`

## Feature Components

- `BackButton`

## Documentation And Delivery

I use Storybook to document the component library, so team members can
quickly see available components, states, and usage examples.

Storybook is deployed with Chromatic and integrated with GitHub PR
workflow, so each pull request gets an updated Storybook build and URL. Chromatic: https://6992ba4cbddef535264b63e4-bkciotodmw.chromatic.com/

<img width="837" height="455" alt="Screenshot 2026-02-16 at 18 06 33" src="https://github.com/user-attachments/assets/6029585f-bb94-4189-8e60-0bb5eb5ff378" />

<img width="1911" height="1021" alt="Screenshot 2026-02-16 at 21 32 25" src="https://github.com/user-attachments/assets/be21484a-4035-4cda-93ef-2d35aa958439" />


