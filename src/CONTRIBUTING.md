# Contributing to dndbench

Thanks for your interest in improving dndbench! This project thrives on community
input — especially corrections to the feature comparison and new library additions.

## Ways to contribute

- **Fix an inaccuracy** in the feature matrix or a demo template.
- **Add a library** to the comparison.
- **Improve a use-case demo** so it better reflects a library's idiomatic API.
- **Report a bug** or suggest an enhancement via an issue.

## Development setup

```bash
npm install
npm run dev
```

## Project structure

- `src/data/dndComparison.js` — the source of truth for libraries, use cases, and the
  native feature-support matrix.
- `src/components/dnd/` — per-library demo implementations, grouped by library, plus
  shared building blocks under `shared/`.
- `src/pages/` — Home (playground), Features (comparison matrix), and FAQ.

## Adding or changing a library

1. Add or update the library entry in `src/data/dndComparison.js`, including its
   `featureMatrix` support values.
2. Implement its demos under `src/components/dnd/<library>/` following an existing
   library as a template.
3. Use each library's **native** API — prefer built-in features over external wrappers,
   and surface real limitations with the `CapabilityNote` component instead of faking
   unsupported behavior.

## Pull request guidelines

- Keep changes focused and the diff minimal.
- Match the existing code style and component structure.
- Describe what you changed and why, and note any library behavior trade-offs.

## Code of conduct

By participating, you agree to uphold our [Code of Conduct](./CODE_OF_CONDUCT.md).