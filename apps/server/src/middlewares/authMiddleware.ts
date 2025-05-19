import type { MiddlewareHandler } from "hono";
import { initDb } from "../db";
import { auth } from "../lib/auth";
import type { AppBindings } from "../lib/types";

// Database & Auth instantiation middleware
const authMiddleware: MiddlewareHandler<AppBindings> = (c, next) => {
	const db = initDb(c.env);
	const authInstance = auth(db, c.env);
	c.set("db", db);
	c.set("auth", authInstance);
	return next();
};

export default authMiddleware;
