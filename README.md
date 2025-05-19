# Turbo Cloud

A monorepo template for Cloudflare Workers using Turborepo, with a React frontend and Hono backend.

## Structure

- `apps/web`: React frontend built with Vite
- `apps/server`: Hono API backend deployed as a Cloudflare Worker
- `packages/shared`: Common code used by either app (TODO)

## Tech Stack

- 🖥️ **Frontend App**: React 19, TypeScript, Vite for fast builds & HMR
- 🌐 **Backend App**: Hono on Cloudflare Workers, end-to-end type-safe API with tRPC & Zod
- 🔒 **Authentication**: Email OTP & social OAuth using Better Auth
- 💾 **Database**: Cloudflare D1 via Drizzle ORM with migrations & local SQLite file for development
- 🔄 **Routing & Data**: Tanstack Router, Query, and Form
- 🎨 **Styling**: Tailwind CSS, shadcn/ui components, sonner toast notifications
- 🌍 **Edge-First Deployment**: Cloudflare Workers provides a global CDN and cache for fast rendering
- 🧰 **Tooling**: Biome for linting/formatting, pnpm for package management and monorepo workspaces

## Development

### Prerequisites

- Node.js 18 or higher
- PNPM package manager
- Wrangler CLI

### Setup

1. Install dependencies:

```bash
pnpm install
```

2. Start the development servers:

```bash
pnpm dev
```

This will start both the web and server apps concurrently using Turborepo:
- Web: http://localhost:3001
- Server: http://localhost:3000

During development:
- You'll mainly keep the `web` dev server loaded in your browser
- The `web` app will proxy API requests from the `server` app
- You can make changes to either app with HMR

## Building for Production

```bash
cd apps/web
pnpm build
```

This will build both the `web` app.

## Deployment

To deploy the unified application to Cloudflare:

```bash
cd apps/server
pnpm cf:deploy
```

This will deploy the `server` app with the `web` app's built static assets bundled in.

## Key Features

- **Unified Development**: Run both frontend and backend together with `turbo dev`
- **Shared Code**: Add shared code in the `packages/` directory
- **Unified Deployment**: Deploy as a single Cloudflare Worker for production
- **Optimized Development**: Fast builds with Turborepo caching

## Customizing

- Update the worker name in `apps/server/wrangler.jsonc`
- Customize API endpoints in `apps/server/src/index.ts`
- Add additional pages to your frontend in `apps/web/src`

## License

MIT