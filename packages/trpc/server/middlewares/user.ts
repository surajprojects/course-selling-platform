import { TRPCError } from '@trpc/server';
import { middleware } from "../trpc";

export const isLoggedIn = middleware(async (opts) => {
    const { ctx } = opts;
    if (!ctx.userId) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    // jwt verify
    let user = await ctx.prisma.user.findUnique({
        where: {
            id: Number(ctx.userId),
        }
    });

    if (!user) {
        throw new TRPCError({ code: 'NOT_FOUND' });
    }

    return opts.next({
        ctx: {
            user
        },
    });
});