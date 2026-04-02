# Repository Guidelines

## Project Structure & Module Organization
This project is a TanStack Start + React + TypeScript app for a POS-style web/mobile UI.

- `src/routes/`: file-based routes such as `/`, `/dashboard`, `/products`, and `/profile`
- `src/components/`: shared UI like `MobileAppShell.tsx` and `ThemeToggle.tsx`
- `src/lib/`: auth and client utilities (`auth.ts`, `auth-client.ts`)
- `src/db/` and `src/db.ts`: database schema and access helpers
- `src/integrations/`: TanStack Query integration and devtools wiring
- `public/`: static assets and manifest files
- `drizzle/` and `db/`: migration output and SQL bootstrap files
- `scripts/`: utility scripts such as `create-auth-user.ts`

Do not edit `src/routeTree.gen.ts` manually; it is generated.

## Build, Test, and Development Commands
- `pnpm dev`: start the local dev server on port `3000`
- `pnpm build`: create the production client/server build
- `pnpm preview`: preview the built app
- `pnpm test`: run Vitest once
- `pnpm lint`: run ESLint
- `pnpm format`: check Prettier formatting
- `pnpm check`: apply Prettier and ESLint fixes
- `pnpm auth:create-user`: create a local auth user from the script
- `pnpm db:generate | db:migrate | db:push | db:studio`: manage Drizzle schema changes

## Coding Style & Naming Conventions
Use TypeScript, 2-space indentation, and existing React function component patterns. Prefer:

- PascalCase for components: `MobileAppShell.tsx`
- camelCase for variables and functions
- file-based route names matching the route path: `dashboard.tsx`, `profile.tsx`

Formatting is enforced with Prettier and ESLint. Run `pnpm check` before opening a PR.

## Testing Guidelines
Vitest is configured via `pnpm test`, but this repository currently has little or no test coverage. Add tests for new logic where practical, especially auth flows, route guards, and reusable components. Use clear names like `theme-toggle.test.tsx` or `auth-client.test.ts`.

## Commit & Pull Request Guidelines
Current history is minimal but suggests short, imperative commits, optionally prefixed by type, for example `chore: start scripts`. Prefer:

- `feat: add profile theme toggle`
- `fix: correct dashboard hero contrast`

PRs should include a short description, impacted routes/components, any setup or migration notes, and screenshots for UI changes.

## Security & Configuration Tips
Keep secrets in environment variables, not in source files. Review auth, database, and Drizzle changes carefully before merging, and avoid committing generated output unless the workflow requires it.
