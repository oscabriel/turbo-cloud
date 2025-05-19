# Server API for Turbo Cloud

This is the backend API for the Turbo Cloud monorepo, built to run on Cloudflare Workers using modern technologies for a robust and scalable API.

## Technologies Used

- [Hono](https://hono.dev/) - Lightweight, fast web framework
- [tRPC](https://trpc.io/) - End-to-end typesafe API
- [Drizzle ORM](https://orm.drizzle.team/) - SQL ORM with Cloudflare D1
- [better-auth](https://github.com/better-auth/better-auth) - Authentication
- [Cloudflare Workers](https://workers.cloudflare.com/) - Serverless compute platform
- [Cloudflare D1](https://developers.cloudflare.com/d1/) - Serverless SQL database

## Getting Started

To run the development server:

```bash
pnpm install
pnpm dev
```

This will start the server at http://localhost:3000 with Wrangler.

## Database Management

The application uses Drizzle ORM with Cloudflare D1:

```bash
# Generate database schema
pnpm db:generate

# Apply migrations locally
pnpm db:migrate

# Apply migrations to production
pnpm db:migrate:prod

# Open Drizzle Studio (local)
pnpm db:studio

# Open Drizzle Studio (production)
pnpm db:studio:prod
```

## Deployment

To deploy the API to Cloudflare Workers:

```bash
# Generate types based on your Worker configuration
pnpm cf:typegen

# Deploy to Cloudflare
pnpm cf:deploy
```

## Configuration

- Update environment variables in `.dev.vars` for local development
- Configure worker settings in `wrangler.jsonc`
- Upload production environment variables to CF via wrangler CLI or dashboard
