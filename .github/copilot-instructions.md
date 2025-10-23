<!-- .github/copilot-instructions.md - Guidance for AI coding agents working on Pets-Ride-App -->

# Pets-Ride-App — Copilot instructions (concise)

Purpose: help an AI agent be immediately productive in this Vite + React project.

- Project type: React (React 19) + Vite (plugin-react-swc). Entry: `src/main.jsx`.
- Package manager: pnpm (README recommends `pnpm install`) but `package.json` also provides scripts for common tasks.

Key commands
- Install deps: `pnpm install` (project README recommends pnpm).
- Start dev server: `pnpm dev` (maps to `vite`).
- Build: `pnpm build` (vite build). Preview build: `pnpm preview`.
- Lint: `pnpm lint` (runs `eslint .`).

Big-picture architecture & conventions
- Single-page React app using client routing via `react-router-dom`. Root mounts in `src/main.jsx` and routes are declared in `src/App.jsx`.
- Components live under `src/Components/`. Example: `HomePage` at `src/Components/HomePage.jsx`.
- Styling: CSS files at project root `src/index.css` and `src/App.css` for global/feature styles.
- UI libs: Material UI (`@mui/material`, `@mui/icons-material`) and Emotion (`@emotion/react`, `@emotion/styled`) are installed — prefer MUI + Emotion patterns when adding UI.
- Module format: ESM (`type: "module"` in `package.json`). Use import/export syntax.

Files to consult for context
- `src/main.jsx` — app bootstrap, router provider.
- `src/App.jsx` — top-level routes. Add new routes here for pages.
- `src/Components/*` — component implementations.
- `vite.config.js` — Vite configuration (uses `@vitejs/plugin-react-swc`).
- `package.json` — scripts, deps, and the project's package manager hints.
- `README.md` — quick setup note (pnpm).

Project-specific patterns & examples
- Routing: routes are declared using <Routes> / <Route> in `src/App.jsx`. Example route for home:

  <Routes>
    <Route path="/" element={<HomePage/>} />
  </Routes>

- Navigation inside components uses `useNavigate()` (see `HomePage.jsx`). Follow this pattern to implement client navigation.
- Component exports: components use default exports (e.g., `export default function HomePage(){...}`) — when adding new components, export default to match existing imports.

Integration points & external dependencies
- react-router-dom: client routing, BrowserRouter is used in `src/main.jsx`.
- MUI + Emotion: prefer using MUI theming and Emotion styled components when adding UI.
- No backend/API clients are present in the repo; if integrating APIs, add a new `src/services/` or `src/api/` folder and document environment variables in a future update.

Developer workflows & debugging tips
- HMR: Vite provides hot module replacement during `pnpm dev`.
- Linting: `pnpm lint` runs ESLint. Check eslint.config.js at repo root for rule details.
- If changing build config, update `vite.config.js` (currently minimal, only react-swc plugin).

What NOT to change without confirmation
- `type: "module"` in `package.json` (affects import behavior).
- The chosen React compiler plugin in `vite.config.js` (`@vitejs/plugin-react-swc`) — replacing it may change build/tooling behavior.

Examples of small, safe tasks an AI can do autonomously
- Add a new route and page component (follow patterns in `src/App.jsx` and `src/Components/HomePage.jsx`).
- Fix simple lint errors surfaced by `pnpm lint`.
- Add a small MUI-based component using Emotion styling.

If you need more context or conventions to be recorded, ask the maintainers to add:
- preferred branch/workflow (PR template, CI) — none present in the repo.
- API endpoints and environment variables (add `.env.example`).

End of instructions.
