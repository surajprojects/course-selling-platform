import type { IncomingMessage, ServerResponse } from 'http';
import prisma from "@course-selling-platform/db";

export interface CreateInnerContextOptions {
    prisma: typeof prisma;
    userId?: string;
    req?: IncomingMessage;
    res?: ServerResponse;
}

export async function createInnerTRPCContext(opts: CreateInnerContextOptions) {
    return {
        prisma,
        userId: opts.userId ?? null,
    };
}

export const createTRPCContext = async (opts: CreateInnerContextOptions) => {
    const innerContext = await createInnerTRPCContext({
        prisma,
        userId: opts.userId,
    });

    return {
        ...innerContext,
        req: opts.req,
        res: opts.res,
    };
};