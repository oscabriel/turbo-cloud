import { trpcServer } from "@hono/trpc-server";
import type { Session, User } from "better-auth";
import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { auth } from "./lib/auth";
import { createContext } from "./lib/context";
import { appRouter } from "./routers";

const app = new Hono<{
	Bindings: {
		DB: D1Database;
		CORS_ORIGIN: string;
		ENVIRONMENT: string;
		CLOUDFLARE_ACCOUNT_ID: string;
		CLOUDFLARE_DATABASE_ID: string;
		CLOUDFLARE_TOKEN: string;
		BETTER_AUTH_SECRET: string;
		BETTER_AUTH_URL: string;
		GOOGLE_CLIENT_ID: string;
		GOOGLE_CLIENT_SECRET: string;
		GITHUB_CLIENT_ID: string;
		GITHUB_CLIENT_SECRET: string;
		RESEND_API_KEY: string;
		RESEND_FROM_EMAIL: string;
		APP_NAME: string;
	};
	Variables: {
		user: User | null;
		session: Session | null;
	};
}>({ strict: false });

const route = app
	.use(logger())
	.use("*", (c, next) =>
		cors({
			origin: c.env.CORS_ORIGIN,
			maxAge: 86400,
			credentials: true,
		})(c, next),
	)
	.use("*", async (c, next) => {
		const db = drizzle(c.env.DB);
		const session = await auth(db, c.env).api.getSession({
			headers: c.req.raw.headers,
		});

		if (!session) {
			c.set("user", null);
			c.set("session", null);
			return next();
		}

		c.set("user", session.user);
		c.set("session", session.session);
		return next();
	})
	.on(["POST", "GET"], "/api/auth/**", async (c) => {
		const db = drizzle(c.env.DB);
		const authInstance = auth(db, c.env);
		const response = await authInstance.handler(c.req.raw);
		return response;
	})
	.use("/trpc/*", async (c, next) => {
		return trpcServer({
			router: appRouter,
			createContext: async (_opts, c) => {
				return createContext({
					req: c.req.raw,
					env: c.env,
					workerCtx: c.executionCtx,
				});
			},
		})(c, next);
	})
	.get("/", (c) => {
		return c.json({ message: "CF+Hono+tRPC!" });
	});

export type AppType = typeof route;
export default route;
