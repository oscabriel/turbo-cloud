import "dotenv/config";
import { config } from "dotenv";
import { type Config, defineConfig } from "drizzle-kit";
import { getLocalSQLiteDBPath } from "./src/db/utils";

let drizzleConfig: Config;

if (process.env.ENVIRONMENT === "production") {
	config({ path: "./.prod.vars" });

	const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
	const CLOUDFLARE_DATABASE_ID = process.env.CLOUDFLARE_DATABASE_ID;
	const CLOUDFLARE_TOKEN = process.env.CLOUDFLARE_TOKEN;

	if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_DATABASE_ID || !CLOUDFLARE_TOKEN) {
		console.error("Configuration Failed: Missing Cloudflare Credentials");
		process.exit(1);
	}

	drizzleConfig = defineConfig({
		out: "./src/db/migrations",
		schema: "./src/db/schema.ts",
		dialect: "sqlite",
		driver: "d1-http",
		casing: "snake_case",
		dbCredentials: {
			accountId: CLOUDFLARE_ACCOUNT_ID,
			databaseId: CLOUDFLARE_DATABASE_ID,
			token: CLOUDFLARE_TOKEN,
		},
	});
} else {
	config({ path: "./.dev.vars" });

	const localDbPath = getLocalSQLiteDBPath();

	if (!localDbPath) {
		console.error("Configuration Failed: Missing Local DB");
		process.exit(1);
	}

	drizzleConfig = defineConfig({
		out: "./src/db/migrations",
		schema: "./src/db/schema.ts",
		dialect: "sqlite",
		casing: "snake_case",
		dbCredentials: {
			url: localDbPath,
		},
	});
}

export default drizzleConfig;
