import { drizzle } from "drizzle-orm/d1";
import type { Context as HonoContext } from "hono";
import { auth } from "./auth";

export async function createContext({
	req,
	env,
	workerCtx,
}: {
	req: Request;
	env: Cloudflare.Env;
	workerCtx: HonoContext["executionCtx"];
}) {
	const db = drizzle(env.DB);

	const session = await auth(db, env).api.getSession({
		headers: req.headers,
	});

	return {
		req,
		env,
		workerCtx,
		session,
	};
}

export type Context = Awaited<ReturnType<typeof createContext>>;
