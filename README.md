# Portfolio

A Vite + React + TypeScript one-pager with a Sass design system.

## Structure

```
src/
├── main.tsx          # entry point, renders the homepage
├── pages/Home/       # page component, props, SCSS module, barrel file
├── shared/Icon/      # reusable Icon component with lucide-react
└── styles/
    ├── main.scss     # global entry point
    ├── abstract/     # tokens, mixins and forwarded variables
    ├── base/         # reset, boilerplate and @font-face placeholder
    └── fonts/        # placeholder for local font files
```

Every page/component folder follows the same four-file pattern: a component file, a props file, an SCSS module and an `index.ts` barrel.

## Path aliases

- `@home` → `src/pages/Home`
- `@shared` → `src/shared`
- `@styles` → `src/styles`
- `@` → `src` (general fallback)

```ts
import { HomePage } from "@home";
import "@styles/main.scss";
```

## Scripts

- `npm run dev` — start the development server
- `npm run build` — type-check and build for production
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint
- `npm run deploy` — build and deploy to GitHub Pages
