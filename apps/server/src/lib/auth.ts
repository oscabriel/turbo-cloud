import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { emailOTP } from "better-auth/plugins";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { Resend } from "resend";
import * as schema from "../db/schema/auth";
import { verificationCodeEmail } from "./email-templates";
import type { AppBindings } from "./types";

export const auth = (db: DrizzleD1Database, env: AppBindings["Bindings"]) => {
	return betterAuth({
		database: drizzleAdapter(db, {
			provider: "sqlite",
			schema,
		}),
		secret: env.BETTER_AUTH_SECRET,
		baseURL: env.BETTER_AUTH_URL,
		basePath: "/api/auth",
		trustedOrigins: [env.CORS_ORIGIN || ""],
		socialProviders: {
			google: {
				clientId: env.GOOGLE_CLIENT_ID || "",
				clientSecret: env.GOOGLE_CLIENT_SECRET || "",
			},
			github: {
				clientId: env.GITHUB_CLIENT_ID || "",
				clientSecret: env.GITHUB_CLIENT_SECRET || "",
			},
		},
		// secondaryStorage: {
		// 	get: async (key) => {
		// 		const value = await env.SESSION_KV.get(key);
		// 		console.log(`KV Cache GET: ${key} → ${value ? "HIT" : "MISS"}`);
		// 		return value;
		// 	},
		// 	set: async (key, value, ttl) => {
		// 		console.log(`KV Cache SET: ${key} (TTL: ${ttl || "none"})`);
		// 		if (ttl) {
		// 			await env.SESSION_KV.put(key, value, { expirationTtl: ttl });
		// 		} else {
		// 			await env.SESSION_KV.put(key, value);
		// 		}
		// 	},
		// 	delete: async (key) => {
		// 		await env.SESSION_KV.delete(key);
		// 	},
		// },
		plugins: [
			emailOTP({
				async sendVerificationOTP({ email, otp, type }) {
					if (env.ENVIRONMENT === "development") {
						console.log(`Sending verification code to ${email}: ${otp}`);
						return;
					}
					if (type === "sign-in") {
						const resend = new Resend(env.RESEND_API_KEY);
						await resend.emails.send({
							from: `${env.APP_NAME} <${env.RESEND_FROM_EMAIL}>`,
							to: email,
							subject: "Your Verification Code",
							html: verificationCodeEmail(otp),
						});
					}
				},
			}),
		],
		// rateLimit: {
		// 	storage: "secondary-storage",
		// },
		advanced: {
			crossSubDomainCookies: {
				enabled: true,
			},
		},
		session: {
			cookieCache: {
				enabled: true,
				maxAge: 5 * 60, // Cache for 5 minutes
			},
		},
	});
};

export type BetterAuthInstance = ReturnType<typeof auth>;

/*
To generate better-auth schema using bunx @better-auth/cli generate,
uncomment the following auth config and comment out the above auth config.
*/

// const db = drizzle(process.env.BETTER_AUTH_DB!);

// export const auth = betterAuth({
//   database: drizzleAdapter(db, {
//     provider: "sqlite",
//   }),
// });
