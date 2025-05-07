import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { z } from "zod";
import { user } from "../db/schema";
import { protectedProcedure, router } from "../lib/trpc";

export const userRouter = router({
	getProfile: protectedProcedure.query(async ({ ctx }) => {
		const db = drizzle(ctx.env.DB);
		const userData = await db
			.select()
			.from(user)
			.where(eq(user.id, ctx.session.user.id))
			.get();

		return userData;
	}),
	updateProfile: protectedProcedure
		.input(
			z.object({
				name: z.string().min(1),
				image: z.string().optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const db = drizzle(ctx.env.DB);
			return await db
				.update(user)
				.set({
					name: input.name,
					image: input.image,
					updatedAt: new Date(),
				})
				.where(eq(user.id, ctx.session.user.id))
				.returning()
				.get();
		}),
});
