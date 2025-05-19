/// <reference path="../../worker-configuration.d.ts" />

import type { Session, User } from "better-auth";
import type { DBInstance } from "../db";
import type { BetterAuthInstance } from "./auth";

// Hono bindings
export interface AppBindings {
	Bindings: {
		ASSETS: Fetcher;
		DB: D1Database;
		SESSION_KV: KVNamespace;
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
		FRONTEND_URL: string;
	};
	Variables: {
		user: User | null;
		session: Session | null;
		db: DBInstance;
		auth: BetterAuthInstance;
	};
}

// tRPC context reflects what we inject from Hono: env, db, and session
export interface tRPCContext {
	env: AppBindings["Bindings"];
	db: DBInstance;
	session: Session | null;
}
