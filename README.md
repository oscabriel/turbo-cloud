# Turbo Cloud

A monorepo template for Cloudflare Workers using Turborepo, with a React frontend and Hono backend.

## Structure

- `apps/web`: React frontend built with Vite and deployed as a Cloudflare Worker
- `apps/server`: Hono API backend deployed as a Cloudflare Worker
- Both apps can be deployed separately during development, and combined for production

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

This will start both the web and server apps concurrently:
- Web: http://localhost:5173
- Server: http://localhost:8787

During development:
- The web app will proxy API requests to the server app
- You can make changes to either app and they'll hot reload

## Building for Production

```bash
pnpm build
```

This will build both the web and server apps, with the server app configured to serve the static assets from the web app.

## Deployment

To deploy the unified application to Cloudflare:

```bash
cd apps/server
pnpm wrangler deploy
```

This will:
1. Build both apps
2. Deploy the server app with the web app's static assets bundled in

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