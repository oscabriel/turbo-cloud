# Web Frontend for Turbo Cloud

This is the React frontend for the Turbo Cloud monorepo, built with modern technologies for an excellent developer experience.

## Technologies Used

- [React 19](https://react.dev/) - UI framework
- [Vite](https://vitejs.dev/) - Build tool and dev server
- [TanStack Router](https://tanstack.com/router) - File-based routing with type safety
- [TanStack Query](https://tanstack.com/query) - Data fetching and caching
- [Tanstack Form](https://tanstack.com/form) - Form state management
- [TanStack Store](https://tanstack.com/store) - Type-safe state management
- [tRPC](https://trpc.io/) - End-to-end typesafe API
- [Shadcn UI](https://ui.shadcn.com/) - Component library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS

## Getting Started

To run this application:

```bash
pnpm install
pnpm dev  
```

This will start the development server at http://localhost:3001.

## Building For Production

To build this application for production:

```bash
pnpm build
```

## Structure

The application follows a standard structure:

- `src/components/` - Reusable UI components
- `src/routes/` - File-based routing
- `src/lib/` - Utility functions and configuration

## Data Fetching

This application uses tRPC with TanStack Query for type-safe data fetching:

```tsx
const { data } = trpc.yourQueryName.useQuery();
```

## Styling

This project uses Tailwind CSS for styling with Shadcn UI components. Add new Shadcn components with:

```bash
pnpx shadcn@latest add button
```

## Environment Variables

Type-safe environment variables are available through:

```ts
import { env } from "@/env";
```

## Development Tools

The project includes several development tools:

```bash
pnpm lint     # Run Biome linting
pnpm format   # Run Biome formatting
pnpm check    # Run Biome checks
```

## Testing

This project uses Vitest for testing:

```bash
pnpm test
```

## Linting & Formatting

This project uses [Biome](https://biomejs.dev/) for linting and formatting. The following scripts are available:

```bash
pnpm lint
pnpm format
pnpm check
```

## Shadcn

Add components using the latest version of [Shadcn](https://ui.shadcn.com/).

```bash
pnpx shadcn@latest add button
```

## Routing
This project uses [TanStack Router](https://tanstack.com/router). The initial setup is a file based router. Which means that the routes are managed as files in `src/routes`.

### Adding A Route

To add a new route to your application just add another a new file in the `./src/routes` directory.

TanStack will automatically generate the content of the route file for you.

Now that you have two routes you can use a `Link` component to navigate between them.

### Adding Links

To use SPA (Single Page Application) navigation you will need to import the `Link` component from `@tanstack/react-router`.

```tsx
import { Link } from "@tanstack/react-router";
```

Then anywhere in your JSX you can use it like so:

```tsx
<Link to="/about">About</Link>
```

This will create a link that will navigate to the `/about` route.

More information on the `Link` component can be found in the [Link documentation](https://tanstack.com/router/v1/docs/framework/react/api/router/linkComponent).

### Using A Layout

In the File Based Routing setup the layout is located in `src/routes/__root.tsx`. Anything you add to the root route will appear in all the routes. The route content will appear in the JSX where you use the `<Outlet />` component.

Here is an example layout that includes a header:

```tsx
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { Link } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})
```

The `<TanStackRouterDevtools />` component is not required so you can remove it if you don't want it in your layout.

More information on layouts can be found in the [Layouts documentation](https://tanstack.com/router/latest/docs/framework/react/guide/routing-concepts#layouts).

# Learn More

You can learn more about all of the offerings from TanStack in the [TanStack documentation](https://tanstack.com).
