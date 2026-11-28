# Portfolio

A one-page Vite + React + TypeScript portfolio styled as a Eurorack modular case. Modules are fixed; the patch cables are interactive. React Flow powers the patching, while the rack layout, blank panels, fit, zoom, and pan are controlled by the homepage.

## Structure

```
src/
├── main.tsx              # entry point; mounts the providers and HomePage
├── pages/Home/           # single page: layout, fit/zoom, loader, edges
├── shared/
│   ├── Icon/             # shared Icon wrapper around lucide-react
│   ├── Handler/          # shared handle/pill helper
│   ├── LoadingScreen/    # full-screen node-style repack overlay
│   ├── data/             # localized project data and media helpers
│   └── nodes/            # node components, graph helpers, layout, timing
├── context/Theme/        # light/dark theme state and storage
├── i18n/                 # i18next resources and helpers (nl / en)
├── assets/               # imported images and media
└── styles/
    ├── main.scss         # global Sass entry point
    ├── abstract/         # theme tokens, mixins, forwarded Sass API
    └── base/             # reset, boilerplate, React Flow overrides
```

UI folders generally use a component, props file, SCSS module, and `index.ts` barrel. Node folders keep the component-local files together; shared helpers live at the `shared/nodes` root.

## Path aliases

- `@home` → `src/pages/Home`
- `@shared` → `src/shared`
- `@nodes` → `src/shared/nodes`
- `@styles` → `src/styles`
- `@context` → `src/context`
- `@assets` → `src/assets`
- `@` → `src` (general fallback)

```ts
import { HomePage } from "@home";
import { getRackLayout } from "@nodes";
import "@styles/main.scss";
```

## Theme and language

- Theme is light or dark only. The inline script in `index.html` applies the saved theme before CSS/React loads; `ThemeProvider` keeps `document.documentElement.dataset.theme` and `portfolio-theme` storage in sync.
- Language detection order is `localStorage` → `navigator.language` → `en`, stored under `portfolio-language`. `i18n` keeps `<html lang>` in sync after initialization and on language changes.
- Motion timings are shared between CSS (`:root` tokens in `styles/abstract/_themes.scss`) and TypeScript (`shared/nodes/timing.ts`).

## Scripts

- `npm run dev` — start the development server
- `npm run build` — type-check and build for production
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint
- `npm run deploy` — build and deploy to GitHub Pages
