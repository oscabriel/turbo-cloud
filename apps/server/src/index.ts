import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

// Add CORS middleware
app.use(
	"/api/*",
	cors({
		origin: ["http://localhost:5173", "*"], // Allow both local dev and production
		allowMethods: ["GET", "POST", "OPTIONS"],
		maxAge: 86400,
	}),
);

// API routes
app.get("/api/", (c) => {
	return c.json({
		name: "Cloudflare!",
	});
});

// Health check
app.get("/", (c) => {
	return c.json({
		status: "ok",
		timestamp: new Date().toISOString(),
	});
});

export default app;
