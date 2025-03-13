import { initTRPC, TRPCError } from "@trpc/server";
import { createTRPCContext } from "./context/context"

const t = initTRPC.context<typeof createTRPCContext>().create();

export const router = t.router;

export const publicProcedure = t.procedure;

export const authedProcedure = t.procedure.use(async ({ ctx, next }) => {
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

    return next({
        ctx: {
            user
        },
    });
});

export const adminProcedure = authedProcedure.use(async ({ ctx, next }) => {
    if (ctx.user?.role !== 'ADMIN') {
        throw new TRPCError({ code: 'FORBIDDEN' });
    }
    return next();
});


