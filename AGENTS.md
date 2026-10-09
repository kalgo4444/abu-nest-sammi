# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Layout

A learning project ("Sammi NestJS Learn"): a blog CRUD API and a Next.js front end that consumes it. The two apps are independent packages — there is no root `package.json` or workspace tooling, so run every command from inside the app directory.

- `apps/server` — NestJS 12 API (package name `backend`), **yarn** (`yarn.lock`)
- `apps/web` — Next.js 16 / React 19 front end (package name `abu-next-front`), **npm** (`package-lock.json`)

## Commands

### apps/server

```sh
yarn start:dev        # watch mode, listens on PORT or 4000
yarn build            # nest build -> dist/
yarn lint             # oxlint --type-aware (not ESLint)
yarn format           # prettier (single quotes, trailing commas)
yarn test             # jest, matches *.spec.ts anywhere under apps/server
yarn test path/to/file.spec.ts        # single file
yarn test -t "name of the test"       # single test by name
```

- Requires a local MongoDB: the connection string `mongodb://localhost:27017/abu-nest-back` is hardcoded in `src/app.module.ts` (not read from env, even though `ConfigModule` is loaded).
- There are currently no spec files, and `test:e2e` points at `test/jest-e2e.json`, which does not exist.
- `abu-nest-back/` is a Bruno (OpenCollection) request collection for manually exercising the blog endpoints against `http://localhost:4000/api`.

### apps/web

```sh
npm run dev           # next dev on :3000
npm run build
npm run lint          # eslint (eslint-config-next core-web-vitals + typescript)
```

- No test runner is configured.
- API base URL comes from `NEXT_PUBLIC_DOMAIN_API` (`.env.local`), falling back to `http://localhost:4000/api`. The server must be running for any page to render data.

## Server architecture

- `src/main.ts` sets a global `/api` prefix, enables CORS, and installs a global `ValidationPipe` with `whitelist`, `forbidNonWhitelisted`, and `transform`. Any request body field not declared on the DTO is rejected with a 400, so adding a field means updating the DTO, the Mongoose schema, and the web types together.
- One feature module, `src/blog/`, in the standard Nest shape: controller → service → Mongoose model (`schema/blog.schema.ts`), with `dto/blog.dto.ts` validated by `class-validator`. Routes are `GET/POST /api/blog` and `GET/PATCH/DELETE /api/blog/:id`.
- `BlogDto` is used for both create and update, so `PATCH` requires the full body (`title`, `excerpt`, `description` with min length 20).
- The service returns Mongoose queries directly: a missing id yields `null` with 200 rather than a 404, and `update` returns the pre-update document (`findByIdAndUpdate` without `new: true`).
- TypeScript uses `module: nodenext`; `strictPropertyInitialization` is off for decorator-style classes.

## Web architecture

Feature-Sliced Design under `apps/web/src`, imported through the `@/*` alias. Layers depend downward only:

`app` → `views` → `widgets` → `features` → `entities` → `shared`

- `app/` — App Router route files are thin shells: they await `params` (a Promise in Next 16) and render a component from `views/`. `layout.tsx`, `error.tsx`, `loading.tsx`, `not-found.tsx` live here too.
- `views/` — one page composition per route. These are async **server components** that fetch through `entities/blog/api` and handle failures (list page renders an inline error panel via `getApiErrorMessage`; detail/edit pages call `notFound()`).
- `widgets/` — header, footer, `post-grid` (client-side search and optimistic removal of deleted posts), `hero-3d` (a raw three.js canvas, no react-three-fiber).
- `features/` — user actions as client components (`create-post`, `edit-post`, `delete-post`, `search-posts`); create and edit both wrap the shared `post-form`.
- `entities/blog/` — `types.ts`, `api.ts` (the only place that calls the backend), and presentational UI. `Blog` uses Mongo's `_id`.
- `shared/` — `lib/api-client.ts` (axios instance + `getApiErrorMessage`, which flattens Nest's `message: string[]` validation errors), `lib/theme.tsx`, and `ui/` primitives.

The same `entities/blog/api` functions run both server-side (in views) and in the browser (in features), which is why the base URL env var is `NEXT_PUBLIC_`. After a client-side mutation, features navigate with `router.push` or call `router.refresh()` to re-run the server fetch.

### Styling and theme

- Tailwind CSS v4 with no config file: everything is declared in `src/styles/globals.css` (`@import "tailwindcss"`, CSS variables, and helper classes like `glass-panel` / `glass-input`).
- Dark mode is class-based via `@custom-variant dark` on `html.dark`. An inline script in `app/layout.tsx` applies the stored theme before hydration, and `shared/lib/theme.tsx` keeps it in sync through `useSyncExternalStore`, the `abu-theme` localStorage key, and a `themechange` window event. Both places must agree on the key and the class/attribute they set.
- The React Compiler is enabled (`reactCompiler: true` in `next.config.ts`).
