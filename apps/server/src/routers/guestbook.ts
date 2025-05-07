import { desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { z } from "zod";
import { guestbook_message } from "../db/schema";
import { publicProcedure, router } from "../lib/trpc";

export const guestbookRouter = router({
	getAll: publicProcedure.query(async ({ ctx }) => {
		const db = drizzle(ctx.env.DB);
		return await db
			.select()
			.from(guestbook_message)
			.orderBy(desc(guestbook_message.createdAt));
	}),
	create: publicProcedure
		.input(
			z.object({
				name: z.string().min(1),
				message: z.string().min(1),
				country: z.string().optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const db = drizzle(ctx.env.DB);
			return await db
				.insert(guestbook_message)
				.values({
					name: input.name,
					message: input.message,
					country: input.country || null,
				})
				.returning()
				.get();
		}),
});
