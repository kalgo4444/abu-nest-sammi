<h1 align="center">Sammi NestJS Learn</h1>

## About

A learning project: a blog CRUD API built with NestJS and a Next.js front end that consumes it.

- `apps/server` — NestJS 12 API with MongoDB (Mongoose), validated with `class-validator`
- `apps/web` — Next.js 16 / React 19 front end, structured with Feature-Sliced Design and styled with Tailwind CSS v4

## Getting started

The two apps are independent packages, so run each from its own directory. The server needs a local MongoDB on `mongodb://localhost:27017`.

```sh
# API on http://localhost:4000/api
cd apps/server
yarn
yarn start:dev

# Front end on http://localhost:3000
cd apps/web
npm install
npm run dev
```
