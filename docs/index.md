# Developer guide

How to build, run, and test the project, plus the conventions the code follows. For what the product does, see [spec.md](./spec.md).

## Prerequisites

- Node.js (the server targets `@types/node` 24)
- yarn (server) and npm (web)
- MongoDB running locally on `mongodb://localhost:27017`

The two apps are independent packages. There is no root `package.json`, so every command runs from inside the app's directory.

| App | Path | Package manager | Port |
| --- | --- | --- | --- |
| API (NestJS 12) | `apps/server` | yarn | 4000 (`PORT` overrides) |
| Web (Next.js 16, React 19) | `apps/web` | npm | 3000 |

## Run

Start MongoDB, then the server, then the web app.

```sh
# terminal 1
cd apps/server
yarn install
yarn start:dev          # http://localhost:4000/api

# terminal 2
cd apps/web
npm install
npm run dev             # http://localhost:3000
```

Configuration:

- **Server** — the Mongo connection string `mongodb://localhost:27017/abu-nest-back` is hardcoded in `src/app.module.ts`. Only `PORT` is read from the environment.
- **Web** — `NEXT_PUBLIC_DOMAIN_API` in `apps/web/.env.local` sets the API base URL. It falls back to `http://localhost:4000/api`.

## Build

```sh
cd apps/server && yarn build && yarn start:prod    # nest build -> dist/, then node dist/main
cd apps/web && npm run build && npm run start
```

## Lint and format

```sh
cd apps/server && yarn lint      # oxlint --type-aware
cd apps/server && yarn format    # prettier --write
cd apps/web && npm run lint      # eslint (next core-web-vitals + typescript)
```

## Test

Only the server has a test runner (Jest with `ts-jest`). It picks up any `*.spec.ts` under `apps/server`.

```sh
cd apps/server
yarn test                               # all specs
yarn test src/blog/blog.service.spec.ts # one file
yarn test -t "name of the test"         # one test by name
yarn test:watch
yarn test:cov
```

Current state:

- There are no spec files yet.
- `yarn test:e2e` points at `test/jest-e2e.json`, which does not exist, so it fails until that config is added.
- The web app has no test runner.

For manual API testing, open the Bruno collection in `apps/server/abu-nest-back/`. It has one request per blog endpoint, aimed at `http://localhost:4000/api`.

## Folder structure

```
apps/
  server/
    src/
      main.ts              bootstrap: /api prefix, CORS, global ValidationPipe
      app.module.ts        root module, Mongo connection
      blog/                the only feature module
        blog.controller.ts
        blog.service.ts
        blog.module.ts
        dto/               request validation (class-validator)
        schema/            Mongoose schema
    abu-nest-back/         Bruno request collection
  web/
    src/
      app/                 Next.js routes (thin shells), layout, error/loading/not-found
      views/               one page composition per route (server components)
      widgets/             header, footer, post-grid, hero-3d
      features/            user actions: create-post, edit-post, delete-post, search-posts, post-form
      entities/blog/       types, API calls, presentational UI
      shared/              lib/ (api-client, theme) and ui/ (Button, Field)
      styles/globals.css   Tailwind v4 setup, CSS variables, glass-* helper classes
docs/
```

The web app follows Feature-Sliced Design. Layers import downward only:

`app` → `views` → `widgets` → `features` → `entities` → `shared`

## Code style

### Server

- Prettier: single quotes, trailing commas everywhere.
- oxlint with type-aware rules. `no-floating-promises` is an error; `no-explicit-any` is off.
- Standard Nest shape per feature: `*.controller.ts` → `*.service.ts` → Mongoose model, with `dto/` and `schema/` subfolders.
- `strictPropertyInitialization` is off so DTO and schema classes can declare fields without initialisers.
- `module` is `nodenext`.

### Web

- Double quotes and semicolons, 2-space indent (ESLint only; no Prettier config).
- Import through the `@/*` alias (`@/shared/ui/Button`), not long relative paths.
- Named exports for components. Default exports only where Next.js requires them (`page.tsx`, `layout.tsx`, `error.tsx`, `loading.tsx`, `not-found.tsx`).
- Add `"use client"` only to components that need state, effects, or browser APIs. Views are async server components.
- Styling is Tailwind utility classes inline. Shared tokens and the `glass-panel`, `glass-card`, `glass-input`, `glass-bar` helpers live in `globals.css`. There is no `tailwind.config`.
- Accent colours are `#9a3412` (light) and `#f97316` (dark). Every coloured element carries a `dark:` variant.
- The React Compiler is enabled.

## Do and don't

### Do

- Run commands from `apps/server` or `apps/web`, with yarn and npm respectively.
- Change the DTO, the Mongoose schema, and `apps/web/src/entities/blog/types.ts` together when a blog field changes. The server rejects any body field the DTO does not declare.
- Keep every backend call in `entities/blog/api.ts`, going through `apiClient`.
- Turn caught API errors into text with `getApiErrorMessage` before showing them.
- Keep route files in `app/` thin: await `params`, render a view.
- Keep client-side form rules in `PostForm` at least as strict as `BlogDto`.
- Keep the theme key (`abu-theme`) and the class/attribute logic identical in `app/layout.tsx`'s inline script and `shared/lib/theme.tsx`.
- `await` or `void` every promise on the server; the linter fails otherwise.

### Don't

- Don't add a root `package.json` or mix package managers inside an app (no `npm install` in `apps/server`, no `yarn` in `apps/web`).
- Don't import upward across web layers (for example `shared` importing from `entities`). One existing exception to avoid copying: `entities/blog/ui/PostCard.tsx` and `PostDetail.tsx` import `DeleteButton` from `features`.
- Don't call `axios` or `fetch` directly from components.
- Don't send extra fields in request bodies; `forbidNonWhitelisted` turns them into a 400.
- Don't use a non-`NEXT_PUBLIC_` env var for the API URL. The same API functions run on the server and in the browser.
- Don't add react-three-fiber for the hero; it is plain three.js on a canvas.
- Don't commit `.env.local`, `dist/`, `.next/`, or `*.tsbuildinfo`.
